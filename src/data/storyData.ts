import { Scene } from "@/types/story";

export const scenes: Record<string, Scene> = {
  start: {
    id: "start",
    title: "The Drifting Deck",
    description:
      "You awaken on a weathered ship floating on a glowing ocean beneath an endless night sky. The stars shimmer above and below, as if the sea mirrors the heavens.",
    dialogue: [
      {
        speaker: "Narrator",
        text: "You awaken to the hum of gentle waves. The water below glows like liquid starlight.",
        emotion: "neutral",
      },
      {
        speaker: "You",
        text: "Where am I? The stars... they feel close enough to touch.",
        emotion: "worried",
      },
      {
        speaker: "Whispering Voice",
        text: "The lost drift until they remember why they came.",
        emotion: "neutral",
      },
    ],
    choices: [
      {
        text: "Enter the captain’s cabin",
        nextScene: "cabin",
        impact: "neutral",
      },
      {
        text: "Climb down to the starlit shore",
        nextScene: "shore",
        impact: "positive",
      },
    ],
    environment: "ship",
    cameraPosition: [0, 6, 12],
    cameraTarget: [0, 0, 0],
  },

  cabin: {
    id: "cabin",
    title: "The Captain’s Memory",
    description:
      "Inside the dimly lit cabin, old maps and journals scatter across the table. One map glows faintly, marking a place called the 'Tide Altar'.",
    dialogue: [
      {
        speaker: "Narrator",
        text: "The air smells of salt and ink. A map pinned to the wall trembles as if it remembers your touch.",
        emotion: "neutral",
      },
      {
        speaker: "You",
        text: "Tide Altar... perhaps that’s the key to leaving this sea.",
        emotion: "hopeful",
      },
      {
        speaker: "Voice from the shadows",
        text: "Every key turns two ways — one to open, one to bind.",
        emotion: "neutral",
      },
    ],
    choices: [
      {
        text: "Take the map and head to the Altar",
        nextScene: "altar",
        impact: "positive",
      },
      {
        text: "Ignore the warning and explore the lower decks",
        nextScene: "depths",
        impact: "neutral",
      },
    ],
    environment: "cabin",
    cameraPosition: [2, 5, 10],
    cameraTarget: [0, 0, 0],
  },

  shore: {
    id: "shore",
    title: "Shore of Stars",
    description:
      "The ship drifts to rest against a shore of shining sand. The air hums softly, as if the stars themselves breathe.",
    dialogue: [
      {
        speaker: "Narrator",
        text: "You step onto the glowing shore. Every grain of sand seems alive with memory.",
        emotion: "neutral",
      },
      {
        speaker: "You",
        text: "It feels alive... like it knows me.",
        emotion: "hopeful",
      },
      {
        speaker: "Spirit",
        text: "All things here remember. Even you.",
        emotion: "neutral",
      },
    ],
    choices: [
      {
        text: "Follow the spirits to the Tide Altar",
        nextScene: "altar",
        impact: "positive",
      },
      {
        text: "Dive beneath the glowing waves",
        nextScene: "depths",
        impact: "neutral",
      },
    ],
    environment: "beach",
    cameraPosition: [0, 6, 12],
    cameraTarget: [0, 0, 0],
  },

  altar: {
    id: "altar",
    title: "The Tide Altar",
    description:
      "Stone pillars rise from the sea, circling a glowing pool. In the reflection, you see not your face, but your memories.",
    dialogue: [
      {
        speaker: "Narrator",
        text: "The starlit water shows fragments of your past — laughter, sorrow, choices that shaped you.",
        emotion: "neutral",
      },
      {
        speaker: "You",
        text: "This place knows who I am.",
        emotion: "worried",
      },
      {
        speaker: "Echoing Voice",
        text: "To move forward, you must face what you left behind.",
        emotion: "neutral",
      },
    ],
    choices: [
      {
        text: "Step into the memory of light",
        nextScene: "starPath",
        impact: "positive",
      },
      {
        text: "Step into the memory of shadow",
        nextScene: "depths",
        impact: "neutral",
      },
    ],
    environment: "altar",
    cameraPosition: [0, 7, 14],
    cameraTarget: [0, 1, 0],
  },

  starPath: {
    id: "starPath",
    title: "Path of Light",
    description:
      "Golden bridges of light rise into the sky, each step echoing with your heartbeat and the hum of distant constellations.",
    dialogue: [
      {
        speaker: "Narrator",
        text: "You ascend on a road made of stars. The air is warm, and your burdens fade with every step.",
        emotion: "hopeful",
      },
      {
        speaker: "You",
        text: "I see now — every choice I made led here.",
        emotion: "hopeful",
      },
      {
        speaker: "Celestial Guardian",
        text: "Will you ascend to freedom, or remain to guide the lost?",
        emotion: "neutral",
      },
    ],
    choices: [
      {
        text: "Accept freedom and rise to the stars",
        nextScene: "freedomEnding",
        impact: "positive",
      },
      {
        text: "Return to guide others",
        nextScene: "guardianEnding",
        impact: "positive",
      },
    ],
    environment: "sky",
    cameraPosition: [0, 9, 18],
    cameraTarget: [0, 0, 0],
  },

  depths: {
    id: "depths",
    title: "The Sea Below",
    description:
      "You dive beneath the glowing waves. The darkness embraces you, soft and endless, filled with whispers of the past.",
    dialogue: [
      {
        speaker: "Narrator",
        text: "In the depths, shapes drift like dreams. Each whisper feels like a forgotten memory.",
        emotion: "neutral",
      },
      {
        speaker: "You",
        text: "Are you… the souls who came before me?",
        emotion: "worried",
      },
      {
        speaker: "Voices",
        text: "We are echoes. Stay, and remember with us.",
        emotion: "neutral",
      },
    ],
    choices: [
      {
        text: "Join the sea of memories",
        nextScene: "eternalEnding",
        impact: "neutral",
      },
      {
        text: "Fight toward the surface",
        nextScene: "altar",
        impact: "positive",
      },
    ],
    environment: "ocean",
    cameraPosition: [0, 5, 10],
    cameraTarget: [0, 0, 0],
  },

  freedomEnding: {
    id: "freedomEnding",
    title: "The Sky Beyond",
    description:
      "You rise through the sky, leaving the starlit sea behind. A new world glows before you, boundless and alive.",
    dialogue: [
      {
        speaker: "Narrator",
        text: "You have faced yourself and chosen freedom. The world awaits — vast, untamed, and beautiful.",
        emotion: "hopeful",
      },
      {
        speaker: "You",
        text: "I am no longer lost. My journey begins anew.",
        emotion: "happy",
      },
    ],
    environment: "sky",
    cameraPosition: [12, 10, 18],
    cameraTarget: [0, 0, -12],
    isEnding: true,
    endingType: "good",
  },

  guardianEnding: {
    id: "guardianEnding",
    title: "Keeper of the Sea",
    description:
      "You descend back to the altar, glowing brighter than before. The lost gather around your light, drawn home by your presence.",
    dialogue: [
      {
        speaker: "Narrator",
        text: "The sea hums in harmony. You are its keeper now, a beacon for all who drift in the dark.",
        emotion: "hopeful",
      },
      {
        speaker: "You",
        text: "Then let no one be lost again.",
        emotion: "hopeful",
      },
    ],
    environment: "altar",
    cameraPosition: [0, 12, 20],
    cameraTarget: [0, 0, 0],
    isEnding: true,
    endingType: "good",
  },

  eternalEnding: {
    id: "eternalEnding",
    title: "The Last Echo",
    description:
      "You surrender to the sea, your form dissolving into shimmering currents. The ocean sings your story forever.",
    dialogue: [
      {
        speaker: "Narrator",
        text: "The sea claims you gently. Your memories scatter like pearls in the tide, endless and eternal.",
        emotion: "neutral",
      },
      {
        speaker: "You",
        text: "Maybe being remembered is enough.",
        emotion: "hopeful",
      },
    ],
    environment: "ocean",
    cameraPosition: [0, 8, 15],
    cameraTarget: [0, 0, 0],
    isEnding: true,
    endingType: "neutral",
  },
};
