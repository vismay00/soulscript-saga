import { useEffect, useRef } from "react";

export type Environment = "forest" | "ruins" | "gorge" | "cliff" | "temple" | "sanctum" | "garden" | "grove" | "meadow" | "clearing" | "cave" | "sunrise";

interface BackgroundMusicProps {
  environment: Environment;
}

// Utility: create white noise buffer
function createNoiseBuffer(ctx: AudioContext) {
  const bufferSize = 2 * ctx.sampleRate;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  return buffer;
}

// Utility: random between a and b
function rand(a: number, b: number) {
  return a + Math.random() * (b - a);
}

export const BackgroundMusic = ({ environment }: BackgroundMusicProps) => {
  const ctxRef = useRef<AudioContext | null>(null);
  const envRef = useRef(environment);
  envRef.current = environment;
  const soundLayersRef = useRef<any>({});
  const fadeDuration = 2.5;

  // Sound layer definitions for each environment
  const ENV_LAYERS: Record<Environment, Array<{ key: string; create: (ctx: AudioContext, master: GainNode) => { gain: GainNode; stop: () => void } }>> = {
    forest: [
      // Wind
      {
        key: "wind",
        create: (ctx, master) => {
          const src = ctx.createBufferSource();
          src.buffer = createNoiseBuffer(ctx);
          src.loop = true;
          const filter = ctx.createBiquadFilter();
          filter.type = "lowpass";
          filter.frequency.value = 700;
          const gain = ctx.createGain();
          gain.gain.value = 0.18;
          src.connect(filter).connect(gain).connect(master);
          src.start();
          return { gain, stop: () => src.stop() };
        },
      },
      // Birds
      {
        key: "birds",
        create: (ctx, master) => {
          let stopped = false;
          const gain = ctx.createGain();
          gain.gain.value = 0.13;
          gain.connect(master);
          function chirp() {
            if (stopped) return;
            const osc = ctx.createOscillator();
            osc.type = "sine";
            osc.frequency.value = rand(1200, 2200);
            const chirpGain = ctx.createGain();
            chirpGain.gain.value = rand(0.07, 0.13);
            osc.connect(chirpGain).connect(gain);
            osc.start();
            osc.frequency.linearRampToValueAtTime(osc.frequency.value - rand(200, 600), ctx.currentTime + 0.18);
            chirpGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.2);
            osc.stop(ctx.currentTime + 0.22);
            osc.onended = () => {
              osc.disconnect();
              chirpGain.disconnect();
            };
            setTimeout(chirp, rand(1800, 5000));
          }
          setTimeout(chirp, rand(1000, 2000));
          return { gain, stop: () => { stopped = true; } };
        },
      },
      // Water drips
      {
        key: "waterDrip",
        create: (ctx, master) => {
          let stopped = false;
          const gain = ctx.createGain();
          gain.gain.value = 0.06;
          gain.connect(master);
          function drip() {
            if (stopped) return;
            const osc = ctx.createOscillator();
            osc.type = "triangle";
            osc.frequency.value = rand(700, 1200);
            const dripGain = ctx.createGain();
            dripGain.gain.value = rand(0.08, 0.13);
            osc.connect(dripGain).connect(gain);
            osc.start();
            dripGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.12);
            osc.stop(ctx.currentTime + 0.13);
            osc.onended = () => {
              osc.disconnect();
              dripGain.disconnect();
            };
            setTimeout(drip, rand(4000, 9000));
          }
          setTimeout(drip, rand(2000, 4000));
          return { gain, stop: () => { stopped = true; } };
        },
      },
      // Harmonic pad (ancient magic)
      {
        key: "pad",
        create: (ctx, master) => {
          const osc = ctx.createOscillator();
          osc.type = "sawtooth";
          osc.frequency.value = 220;
          const gain = ctx.createGain();
          gain.gain.value = 0.09;
          osc.connect(gain).connect(master);
          osc.start();
          return { gain, stop: () => osc.stop() };
        },
      },
    ],
    ruins: [
      // Wind whispers
      {
        key: "wind",
        create: (ctx, master) => {
          const src = ctx.createBufferSource();
          src.buffer = createNoiseBuffer(ctx);
          src.loop = true;
          const filter = ctx.createBiquadFilter();
          filter.type = "lowpass";
          filter.frequency.value = 400;
          const gain = ctx.createGain();
          gain.gain.value = 0.13;
          src.connect(filter).connect(gain).connect(master);
          src.start();
          return { gain, stop: () => src.stop() };
        },
      },
      // Bell chimes
      {
        key: "bells",
        create: (ctx, master) => {
          let stopped = false;
          const gain = ctx.createGain();
          gain.gain.value = 0.09;
          gain.connect(master);
          function bell() {
            if (stopped) return;
            const osc = ctx.createOscillator();
            osc.type = "triangle";
            osc.frequency.value = rand(600, 1200);
            const bellGain = ctx.createGain();
            bellGain.gain.value = rand(0.09, 0.15);
            osc.connect(bellGain).connect(gain);
            osc.start();
            bellGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.2);
            osc.stop(ctx.currentTime + 1.3);
            osc.onended = () => {
              osc.disconnect();
              bellGain.disconnect();
            };
            setTimeout(bell, rand(6000, 12000));
          }
          setTimeout(bell, rand(2000, 4000));
          return { gain, stop: () => { stopped = true; } };
        },
      },
      // Deep drone
      {
        key: "drone",
        create: (ctx, master) => {
          const osc = ctx.createOscillator();
          osc.type = "sine";
          osc.frequency.value = 55;
          const gain = ctx.createGain();
          gain.gain.value = 0.08;
          osc.connect(gain).connect(master);
          osc.start();
          return { gain, stop: () => osc.stop() };
        },
      },
    ],
    gorge: [
      // Flowing stream
      {
        key: "stream",
        create: (ctx, master) => {
          const src = ctx.createBufferSource();
          src.buffer = createNoiseBuffer(ctx);
          src.loop = true;
          const filter = ctx.createBiquadFilter();
          filter.type = "bandpass";
          filter.frequency.value = 900;
          filter.Q.value = 1.2;
          const gain = ctx.createGain();
          gain.gain.value = 0.13;
          src.connect(filter).connect(gain).connect(master);
          src.start();
          return { gain, stop: () => src.stop() };
        },
      },
      // Sparse mysterious birds
      {
        key: "mysteryBirds",
        create: (ctx, master) => {
          let stopped = false;
          const gain = ctx.createGain();
          gain.gain.value = 0.07;
          gain.connect(master);
          function chirp() {
            if (stopped) return;
            const osc = ctx.createOscillator();
            osc.type = "triangle";
            osc.frequency.value = rand(900, 1600);
            const chirpGain = ctx.createGain();
            chirpGain.gain.value = rand(0.05, 0.09);
            osc.connect(chirpGain).connect(gain);
            osc.start();
            osc.frequency.linearRampToValueAtTime(osc.frequency.value - rand(100, 300), ctx.currentTime + 0.18);
            chirpGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.2);
            osc.stop(ctx.currentTime + 0.22);
            osc.onended = () => {
              osc.disconnect();
              chirpGain.disconnect();
            };
            setTimeout(chirp, rand(6000, 12000));
          }
          setTimeout(chirp, rand(2000, 4000));
          return { gain, stop: () => { stopped = true; } };
        },
      },
      // Mist whoosh
      {
        key: "mist",
        create: (ctx, master) => {
          const src = ctx.createBufferSource();
          src.buffer = createNoiseBuffer(ctx);
          src.loop = true;
          const filter = ctx.createBiquadFilter();
          filter.type = "highpass";
          filter.frequency.value = 2000;
          const gain = ctx.createGain();
          gain.gain.value = 0.06;
          src.connect(filter).connect(gain).connect(master);
          src.start();
          return { gain, stop: () => src.stop() };
        },
      },
    ],
    cliff: [
      // Strong wind
      {
        key: "wind",
        create: (ctx, master) => {
          const src = ctx.createBufferSource();
          src.buffer = createNoiseBuffer(ctx);
          src.loop = true;
          const filter = ctx.createBiquadFilter();
          filter.type = "highpass";
          filter.frequency.value = 1200;
          const gain = ctx.createGain();
          gain.gain.value = 0.18;
          src.connect(filter).connect(gain).connect(master);
          src.start();
          return { gain, stop: () => src.stop() };
        },
      },
      // Eagle calls
      {
        key: "eagle",
        create: (ctx, master) => {
          let stopped = false;
          const gain = ctx.createGain();
          gain.gain.value = 0.09;
          gain.connect(master);
          function call() {
            if (stopped) return;
            const osc = ctx.createOscillator();
            osc.type = "sawtooth";
            osc.frequency.value = rand(700, 1100);
            const callGain = ctx.createGain();
            callGain.gain.value = rand(0.09, 0.13);
            osc.connect(callGain).connect(gain);
            osc.start();
            osc.frequency.linearRampToValueAtTime(osc.frequency.value + 200, ctx.currentTime + 0.18);
            callGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.3);
            osc.stop(ctx.currentTime + 0.32);
            osc.onended = () => {
              osc.disconnect();
              callGain.disconnect();
            };
            setTimeout(call, rand(8000, 16000));
          }
          setTimeout(call, rand(2000, 4000));
          return { gain, stop: () => { stopped = true; } };
        },
      },
      // Rockfall echoes
      {
        key: "rockfall",
        create: (ctx, master) => {
          let stopped = false;
          const gain = ctx.createGain();
          gain.gain.value = 0.07;
          gain.connect(master);
          function fall() {
            if (stopped) return;
            const osc = ctx.createOscillator();
            osc.type = "triangle";
            osc.frequency.value = rand(200, 400);
            const fallGain = ctx.createGain();
            fallGain.gain.value = rand(0.13, 0.18);
            osc.connect(fallGain).connect(gain);
            osc.start();
            fallGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.2);
            osc.stop(ctx.currentTime + 1.3);
            osc.onended = () => {
              osc.disconnect();
              fallGain.disconnect();
            };
            setTimeout(fall, rand(12000, 25000));
          }
          setTimeout(fall, rand(4000, 8000));
          return { gain, stop: () => { stopped = true; } };
        },
      },
    ],
    temple: [
      // Tibetan bells
      {
        key: "bells",
        create: (ctx, master) => {
          let stopped = false;
          const gain = ctx.createGain();
          gain.gain.value = 0.13;
          gain.connect(master);
          function bell() {
            if (stopped) return;
            const osc = ctx.createOscillator();
            osc.type = "triangle";
            osc.frequency.value = rand(800, 1400);
            const bellGain = ctx.createGain();
            bellGain.gain.value = rand(0.13, 0.18);
            osc.connect(bellGain).connect(gain);
            osc.start();
            bellGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.8);
            osc.stop(ctx.currentTime + 2.0);
            osc.onended = () => {
              osc.disconnect();
              bellGain.disconnect();
            };
            setTimeout(bell, rand(4000, 9000));
          }
          setTimeout(bell, rand(1000, 2000));
          return { gain, stop: () => { stopped = true; } };
        },
      },
      // Flute melodies
      {
        key: "flute",
        create: (ctx, master) => {
          let stopped = false;
          const gain = ctx.createGain();
          gain.gain.value = 0.09;
          gain.connect(master);
          function melody() {
            if (stopped) return;
            const osc = ctx.createOscillator();
            osc.type = "sine";
            osc.frequency.value = rand(400, 700);
            const melodyGain = ctx.createGain();
            melodyGain.gain.value = rand(0.09, 0.13);
            osc.connect(melodyGain).connect(gain);
            osc.start();
            melodyGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.2);
            osc.stop(ctx.currentTime + 1.3);
            osc.onended = () => {
              osc.disconnect();
              melodyGain.disconnect();
            };
            setTimeout(melody, rand(6000, 12000));
          }
          setTimeout(melody, rand(2000, 4000));
          return { gain, stop: () => { stopped = true; } };
        },
      },
      // Torch crackling (filtered noise)
      {
        key: "torch",
        create: (ctx, master) => {
          const src = ctx.createBufferSource();
          src.buffer = createNoiseBuffer(ctx);
          src.loop = true;
          const filter = ctx.createBiquadFilter();
          filter.type = "bandpass";
          filter.frequency.value = 1800;
          filter.Q.value = 2.5;
          const gain = ctx.createGain();
          gain.gain.value = 0.07;
          src.connect(filter).connect(gain).connect(master);
          src.start();
          return { gain, stop: () => src.stop() };
        },
      },
      // Faint chanting (low pad)
      {
        key: "chant",
        create: (ctx, master) => {
          const osc = ctx.createOscillator();
          osc.type = "triangle";
          osc.frequency.value = 110;
          const gain = ctx.createGain();
          gain.gain.value = 0.06;
          osc.connect(gain).connect(master);
          osc.start();
          return { gain, stop: () => osc.stop() };
        },
      },
    ],
    sanctum: [
      // Deep drone
      {
        key: "drone",
        create: (ctx, master) => {
          const osc = ctx.createOscillator();
          osc.type = "sine";
          osc.frequency.value = 40;
          const gain = ctx.createGain();
          gain.gain.value = 0.11;
          osc.connect(gain).connect(master);
          osc.start();
          return { gain, stop: () => osc.stop() };
        },
      },
      // Crystalline chimes
      {
        key: "chimes",
        create: (ctx, master) => {
          let stopped = false;
          const gain = ctx.createGain();
          gain.gain.value = 0.09;
          gain.connect(master);
          function chime() {
            if (stopped) return;
            const osc = ctx.createOscillator();
            osc.type = "triangle";
            osc.frequency.value = rand(1200, 2200);
            const chimeGain = ctx.createGain();
            chimeGain.gain.value = rand(0.09, 0.13);
            osc.connect(chimeGain).connect(gain);
            osc.start();
            chimeGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.2);
            osc.stop(ctx.currentTime + 1.3);
            osc.onended = () => {
              osc.disconnect();
              chimeGain.disconnect();
            };
            setTimeout(chime, rand(6000, 12000));
          }
          setTimeout(chime, rand(2000, 4000));
          return { gain, stop: () => { stopped = true; } };
        },
      },
      // Spirit whispers (filtered noise)
      {
        key: "whispers",
        create: (ctx, master) => {
          const src = ctx.createBufferSource();
          src.buffer = createNoiseBuffer(ctx);
          src.loop = true;
          const filter = ctx.createBiquadFilter();
          filter.type = "bandpass";
          filter.frequency.value = 3000;
          filter.Q.value = 3.5;
          const gain = ctx.createGain();
          gain.gain.value = 0.06;
          src.connect(filter).connect(gain).connect(master);
          src.start();
          return { gain, stop: () => src.stop() };
        },
      },
      // Rhythmic pulse
      {
        key: "pulse",
        create: (ctx, master) => {
          let stopped = false;
          const gain = ctx.createGain();
          gain.gain.value = 0.07;
          gain.connect(master);
          function pulse() {
            if (stopped) return;
            const osc = ctx.createOscillator();
            osc.type = "sine";
            osc.frequency.value = 80;
            const pulseGain = ctx.createGain();
            pulseGain.gain.value = 0.13;
            osc.connect(pulseGain).connect(gain);
            osc.start();
            pulseGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.3);
            osc.stop(ctx.currentTime + 0.32);
            osc.onended = () => {
              osc.disconnect();
              pulseGain.disconnect();
            };
            setTimeout(pulse, rand(2000, 4000));
          }
          setTimeout(pulse, rand(1000, 2000));
          return { gain, stop: () => { stopped = true; } };
        },
      },
    ],
    garden: [
      // Waterfall
      {
        key: "waterfall",
        create: (ctx, master) => {
          const src = ctx.createBufferSource();
          src.buffer = createNoiseBuffer(ctx);
          src.loop = true;
          const filter = ctx.createBiquadFilter();
          filter.type = "bandpass";
          filter.frequency.value = 1200;
          filter.Q.value = 1.8;
          const gain = ctx.createGain();
          gain.gain.value = 0.13;
          src.connect(filter).connect(gain).connect(master);
          src.start();
          return { gain, stop: () => src.stop() };
        },
      },
      // Chimes
      {
        key: "chimes",
        create: (ctx, master) => {
          let stopped = false;
          const gain = ctx.createGain();
          gain.gain.value = 0.09;
          gain.connect(master);
          function chime() {
            if (stopped) return;
            const osc = ctx.createOscillator();
            osc.type = "triangle";
            osc.frequency.value = rand(1200, 2200);
            const chimeGain = ctx.createGain();
            chimeGain.gain.value = rand(0.09, 0.13);
            osc.connect(chimeGain).connect(gain);
            osc.start();
            chimeGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.2);
            osc.stop(ctx.currentTime + 1.3);
            osc.onended = () => {
              osc.disconnect();
              chimeGain.disconnect();
            };
            setTimeout(chime, rand(6000, 12000));
          }
          setTimeout(chime, rand(2000, 4000));
          return { gain, stop: () => { stopped = true; } };
        },
      },
      // Insect hums
      {
        key: "insects",
        create: (ctx, master) => {
          const osc = ctx.createOscillator();
          osc.type = "triangle";
          osc.frequency.value = 420;
          const gain = ctx.createGain();
          gain.gain.value = 0.07;
          osc.connect(gain).connect(master);
          osc.start();
          return { gain, stop: () => osc.stop() };
        },
      },
      // Magical pad
      {
        key: "pad",
        create: (ctx, master) => {
          const osc = ctx.createOscillator();
          osc.type = "sawtooth";
          osc.frequency.value = 330;
          const gain = ctx.createGain();
          gain.gain.value = 0.09;
          osc.connect(gain).connect(master);
          osc.start();
          return { gain, stop: () => osc.stop() };
        },
      },
    ],
    grove: [
      // Waterfall
      {
        key: "waterfall",
        create: (ctx, master) => {
          const src = ctx.createBufferSource();
          src.buffer = createNoiseBuffer(ctx);
          src.loop = true;
          const filter = ctx.createBiquadFilter();
          filter.type = "bandpass";
          filter.frequency.value = 1200;
          filter.Q.value = 1.8;
          const gain = ctx.createGain();
          gain.gain.value = 0.13;
          src.connect(filter).connect(gain).connect(master);
          src.start();
          return { gain, stop: () => src.stop() };
        },
      },
      // Chimes
      {
        key: "chimes",
        create: (ctx, master) => {
          let stopped = false;
          const gain = ctx.createGain();
          gain.gain.value = 0.09;
          gain.connect(master);
          function chime() {
            if (stopped) return;
            const osc = ctx.createOscillator();
            osc.type = "triangle";
            osc.frequency.value = rand(1200, 2200);
            const chimeGain = ctx.createGain();
            chimeGain.gain.value = rand(0.09, 0.13);
            osc.connect(chimeGain).connect(gain);
            osc.start();
            chimeGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.2);
            osc.stop(ctx.currentTime + 1.3);
            osc.onended = () => {
              osc.disconnect();
              chimeGain.disconnect();
            };
            setTimeout(chime, rand(6000, 12000));
          }
          setTimeout(chime, rand(2000, 4000));
          return { gain, stop: () => { stopped = true; } };
        },
      },
      // Insect hums
      {
        key: "insects",
        create: (ctx, master) => {
          const osc = ctx.createOscillator();
          osc.type = "triangle";
          osc.frequency.value = 420;
          const gain = ctx.createGain();
          gain.gain.value = 0.07;
          osc.connect(gain).connect(master);
          osc.start();
          return { gain, stop: () => osc.stop() };
        },
      },
      // Magical pad
      {
        key: "pad",
        create: (ctx, master) => {
          const osc = ctx.createOscillator();
          osc.type = "sawtooth";
          osc.frequency.value = 330;
          const gain = ctx.createGain();
          gain.gain.value = 0.09;
          osc.connect(gain).connect(master);
          osc.start();
          return { gain, stop: () => osc.stop() };
        },
      },
    ],
    meadow: [
      // Joyful birds
      {
        key: "birds",
        create: (ctx, master) => {
          let stopped = false;
          const gain = ctx.createGain();
          gain.gain.value = 0.13;
          gain.connect(master);
          function chirp() {
            if (stopped) return;
            const osc = ctx.createOscillator();
            osc.type = "sine";
            osc.frequency.value = rand(1200, 2200);
            const chirpGain = ctx.createGain();
            chirpGain.gain.value = rand(0.07, 0.13);
            osc.connect(chirpGain).connect(gain);
            osc.start();
            osc.frequency.linearRampToValueAtTime(osc.frequency.value - rand(200, 600), ctx.currentTime + 0.18);
            chirpGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.2);
            osc.stop(ctx.currentTime + 0.22);
            osc.onended = () => {
              osc.disconnect();
              chirpGain.disconnect();
            };
            setTimeout(chirp, rand(1800, 5000));
          }
          setTimeout(chirp, rand(1000, 2000));
          return { gain, stop: () => { stopped = true; } };
        },
      },
      // Soft breezes
      {
        key: "breeze",
        create: (ctx, master) => {
          const src = ctx.createBufferSource();
          src.buffer = createNoiseBuffer(ctx);
          src.loop = true;
          const filter = ctx.createBiquadFilter();
          filter.type = "lowpass";
          filter.frequency.value = 900;
          const gain = ctx.createGain();
          gain.gain.value = 0.13;
          src.connect(filter).connect(gain).connect(master);
          src.start();
          return { gain, stop: () => src.stop() };
        },
      },
      // Rustling grass
      {
        key: "grass",
        create: (ctx, master) => {
          const src = ctx.createBufferSource();
          src.buffer = createNoiseBuffer(ctx);
          src.loop = true;
          const filter = ctx.createBiquadFilter();
          filter.type = "bandpass";
          filter.frequency.value = 1800;
          filter.Q.value = 2.5;
          const gain = ctx.createGain();
          gain.gain.value = 0.07;
          src.connect(filter).connect(gain).connect(master);
          src.start();
          return { gain, stop: () => src.stop() };
        },
      },
      // Light harp melodies
      {
        key: "harp",
        create: (ctx, master) => {
          let stopped = false;
          const gain = ctx.createGain();
          gain.gain.value = 0.09;
          gain.connect(master);
          function pluck() {
            if (stopped) return;
            const osc = ctx.createOscillator();
            osc.type = "triangle";
            osc.frequency.value = rand(800, 1600);
            const pluckGain = ctx.createGain();
            pluckGain.gain.value = rand(0.09, 0.13);
            osc.connect(pluckGain).connect(gain);
            osc.start();
            pluckGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.4);
            osc.stop(ctx.currentTime + 0.42);
            osc.onended = () => {
              osc.disconnect();
              pluckGain.disconnect();
            };
            setTimeout(pluck, rand(4000, 9000));
          }
          setTimeout(pluck, rand(2000, 4000));
          return { gain, stop: () => { stopped = true; } };
        },
      },
    ],
    // fallback for other environments
    clearing: [],
    cave: [],
    sunrise: [],
  };

  // Helper: fade gain to target
  function fadeGain(gain: GainNode, to: number, ctx: AudioContext, duration: number) {
    gain.gain.cancelScheduledValues(ctx.currentTime);
    gain.gain.setValueAtTime(gain.gain.value, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(to, ctx.currentTime + duration);
  }

  // Main effect: manage sound layers and crossfading
  useEffect(() => {
    let ctx = ctxRef.current;
    if (!ctx) {
      ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      ctxRef.current = ctx;
    }
    const masterGain = ctx.createGain();
    masterGain.gain.value = 0.18;
    masterGain.connect(ctx.destination);

    // Start new environment layers
    const newLayers = {};
    const envLayers = ENV_LAYERS[environment] || [];
    for (const layer of envLayers) {
      newLayers[layer.key] = layer.create(ctx, masterGain);
      // Fade in
      fadeGain(newLayers[layer.key].gain, newLayers[layer.key].gain.gain.value, ctx, fadeDuration);
    }

    // Fade out and stop old layers
    const oldLayers = soundLayersRef.current;
    for (const key in oldLayers) {
      if (!newLayers[key] && oldLayers[key]) {
        fadeGain(oldLayers[key].gain, 0, ctx, fadeDuration);
        setTimeout(() => oldLayers[key].stop(), fadeDuration * 1000 + 100);
      }
    }

    soundLayersRef.current = newLayers;

    return () => {
      // On unmount, fade out and stop all
      for (const key in newLayers) {
        fadeGain(newLayers[key].gain, 0, ctx, fadeDuration);
        setTimeout(() => newLayers[key].stop(), fadeDuration * 1000 + 100);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [environment]);

  return null;
};
