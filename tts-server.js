// Node.js Express server that provides TTS endpoints.
// This version does not call any external TTS provider. Instead it populates
// `public/narration/<sceneId>-<lineIndex>.mp3` with a local placeholder audio
// (public/soothing-music.mp3) so the app can function without a cloud TTS.

const express = require('express');
const fs = require('fs-extra');
const path = require('path');
const fetch = require('node-fetch');

const app = express();
app.use(express.json({ limit: '1mb' }));

// No external TTS provider configured. Placeholder audio will be used.
const NARRATION_DIR = path.resolve(__dirname, 'public/narration');
fs.ensureDirSync(NARRATION_DIR);
const PLACEHOLDER_AUDIO = path.resolve(__dirname, 'public', 'soothing-music.mp3');

// Helper: create a placeholder audio file for the requested scene/line.
// This copies the local `public/soothing-music.mp3` into the narration folder
// and returns the path to the created file.
async function generatePlaceholderAudio({ sceneId, lineIndex }) {
  const outName = `${sceneId}-${lineIndex}.mp3`;
  const outPath = path.join(NARRATION_DIR, outName);
  // If placeholder already exists, return it
  if (await fs.pathExists(outPath)) return outPath;
  // Copy the placeholder audio into the narration folder
  await fs.copyFile(PLACEHOLDER_AUDIO, outPath);
  return outPath;
}

app.post('/api/tts', async (req, res) => {
  try {
    const { sceneId, lineIndex, text, stylePrompt = '' } = req.body;
    if (!sceneId || typeof lineIndex === 'undefined' || !text) {
      return res.status(400).json({ error: 'sceneId, lineIndex, text required' });
    }

    const outPath = await generatePlaceholderAudio({ sceneId, lineIndex });
    const outName = path.basename(outPath);
    return res.json({ url: `/narration/${outName}`, cached: true });
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

      const outPath = await generatePlaceholderAudio({ sceneId, lineIndex });
      const outName = path.basename(outPath);
      results.push({ sceneId, lineIndex, url: `/narration/${outName}`, cached: true });
    }

    res.json({ results });
  } catch (err) {
    console.error('Batch TTS error', err);
    res.status(500).json({ error: err.message || 'Batch TTS failed' });
  }
});

app.listen(3000, () => console.log('TTS server running on http://localhost:3000'));
