// Node.js Express server that requests TTS audio from Google's Gemini TTS model
// (model: gemini-2.5-flash-preview-tts) and writes MP3 files to public/narration.
//
// This server supports:
// - POST /api/tts    -> single line generation. Body: { sceneId, lineIndex, text, stylePrompt? }
// - POST /api/tts/batch -> batch generation. Body: { parts: [{ sceneId, lineIndex, text, emotion? }], apiKey? }
//
// Voice: this implementation uses the prebuilt voice 'leda' for single-speaker narration.
// Response modality: AUDIO (requested in the API call).
//
// API key: set GEMINI_API_KEY in the environment, e.g. (Windows PowerShell):
//   $env:GEMINI_API_KEY = 'your_api_key_here'
// then start the server:
//   node tts-server.js
//
// For development you can optionally pass an apiKey in the request body to /api/tts/batch,
// but DO NOT do this in production or expose keys from the browser.
//
// Example batch request payload:
// {
//   "parts": [
//     { "sceneId": "scene1", "lineIndex": 0, "text": "Hello there!", "emotion": "happy" },
//     { "sceneId": "scene1", "lineIndex": 1, "text": "It was a dark and stormy night.", "emotion": "fearful" }
//   ]
// }
//
// The server writes MP3 files to public/narration named <sceneId>-<lineIndex>.mp3 and
// returns URLs under /narration/.
//
// Usage note: The exact Gemini TTS REST fields used here (responseModality, voice, audioConfig)
// reflect the preview API shape at the time this file was written. If the upstream API
// changes, update the request payload parsing accordingly.

const express = require('express');
const fs = require('fs-extra');
const path = require('path');
const fetch = require('node-fetch');

const app = express();
app.use(express.json({ limit: '1mb' }));

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const NARRATION_DIR = path.resolve(__dirname, 'public/narration');
fs.ensureDirSync(NARRATION_DIR);

// Helper: call Gemini TTS generateAudio endpoint.
// Uses: model: gemini-2.5-flash-preview-tts, responseModality: 'AUDIO', VoiceConfig with prebuilt voice 'leda'.
// The function accepts an optional apiKey to override the environment variable (useful for testing).
async function callGeminiTTS({ text, stylePrompt = '', apiKey = null }) {
  const key = apiKey || GEMINI_API_KEY;
  if (!key) throw new Error('GEMINI_API_KEY not configured and no apiKey provided');

  // Build the prompt: include a short style instruction before the text.
  const promptText = (stylePrompt ? `${stylePrompt}\n` : '') + text;

  // Endpoint for audio generation. Keep the model and request shape in line with
  // Google's generative language TTS preview. This requests AUDIO modality and
  // uses a VoiceConfig object to pick the prebuilt voice 'leda'.
  const url = 'https://generativelanguage.googleapis.com/v1beta2/models/gemini-2.5-flash-preview-tts:generateAudio';

  const body = {
    // Modality
    responseModality: 'AUDIO',
    // Input with style instructions embedded in prompt
    input: { text: promptText },
    // Use the prebuilt voice via a voice config object
    voice: {
      // prebuilt voice name
      name: 'leda',
    },
    // Audio output config
    audioConfig: {
      audioEncoding: 'MP3',
      // You can expose sampleRateHertz or other fields here if needed.
    },
  };

  const resp = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify(body),
  });

  if (!resp.ok) {
    const textResp = await resp.text();
    const err = new Error(`Gemini TTS failed: ${resp.status} ${textResp}`);
    err.status = resp.status;
    throw err;
  }

  // The preview API may return JSON with base64 audio in several fields or
  // stream binary. Try common locations; adapt if your API returns differently.
  const data = await resp.json();
  const base64 = data?.audio?.audio ?? data?.audioContent ?? data?.audioContentBase64 ?? data?.audio ?? null;
  if (!base64) {
    throw new Error('No audio content returned from Gemini TTS (check API shape)');
  }
  return base64;
}

app.post('/api/tts', async (req, res) => {
  try {
    const { sceneId, lineIndex, text, stylePrompt = '' } = req.body;
    if (!sceneId || typeof lineIndex === 'undefined' || !text) {
      return res.status(400).json({ error: 'sceneId, lineIndex, text required' });
    }

    const outName = `${sceneId}-${lineIndex}.mp3`;
    const outPath = path.join(NARRATION_DIR, outName);
    if (await fs.pathExists(outPath)) {
      return res.json({ url: `/narration/${outName}`, cached: true });
    }

    // Call Gemini TTS
    const audioBase64 = await callGeminiTTS({ text, stylePrompt });
    await fs.writeFile(outPath, Buffer.from(audioBase64, 'base64'));
    return res.json({ url: `/narration/${outName}`, cached: false });
  } catch (err) {
    console.error('TTS error', err);
    const message = err.message || 'TTS generation failed';
    res.status(500).json({ error: message });
  }
});

// Emotion -> style prompt mapping. Update or expand as needed.
const EMOTION_STYLE_MAP = {
  neutral: 'Read in a calm, neutral tone.',
  happy: 'Read in a friendly, upbeat tone with a slightly faster pace.',
  sad: 'Read slowly with a soft, melancholic tone.',
  angry: 'Read with a firm, intense tone and quicker pace.',
  surprised: 'Read with a brighter tone and slightly higher pitch, with emphasis on exclamations.',
  fearful: 'Read with a hushed, tense tone and slower pace.',
  authoritative: 'Say in an authoritative tone, clear and steady.',
};

/**
 * Batch TTS endpoint
 * Accepts: { parts: [{ sceneId, lineIndex, text, emotion? }], apiKey? }
 * Returns: { results: [{ sceneId, lineIndex, url, cached }] }
 *
 * This endpoint will apply a style prompt based on the provided `emotion` field for
 * each part. If no emotion is provided, 'neutral' is used.
 *
 * Security: Prefer setting GEMINI_API_KEY in server env. Passing apiKey in the
 * request is supported for development but NOT recommended in production.
 */
app.post('/api/tts/batch', async (req, res) => {
  try {
    const { parts, apiKey = null } = req.body;
    if (!Array.isArray(parts) || parts.length === 0) {
      return res.status(400).json({ error: 'parts must be a non-empty array' });
    }

    const results = [];
    for (const part of parts) {
      const { sceneId, lineIndex, text, emotion = 'neutral' } = part;
      if (!sceneId || typeof lineIndex === 'undefined' || !text) {
        results.push({ sceneId, lineIndex, error: 'sceneId, lineIndex, text required' });
        continue;
      }

      const outName = `${sceneId}-${lineIndex}.mp3`;
      const outPath = path.join(NARRATION_DIR, outName);
      if (await fs.pathExists(outPath)) {
        results.push({ sceneId, lineIndex, url: `/narration/${outName}`, cached: true });
        continue;
      }

      // Map emotion to a style prompt; fallback to neutral.
      const stylePrompt = EMOTION_STYLE_MAP[emotion.toLowerCase()] || EMOTION_STYLE_MAP.neutral;

      try {
        const audioBase64 = await callGeminiTTS({ text, stylePrompt, apiKey });
        await fs.writeFile(outPath, Buffer.from(audioBase64, 'base64'));
        results.push({ sceneId, lineIndex, url: `/narration/${outName}`, cached: false });
      } catch (innerErr) {
        console.error('TTS generation failed for part', part, innerErr);
        results.push({ sceneId, lineIndex, error: innerErr.message || 'generation failed' });
      }
    }

    res.json({ results });
  } catch (err) {
    console.error('Batch TTS error', err);
    res.status(500).json({ error: err.message || 'Batch TTS failed' });
  }
});

app.listen(3000, () => console.log('TTS server running on http://localhost:3000'));
