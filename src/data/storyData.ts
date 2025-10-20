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
        audio_file: "[Generated Audio for: Narrator - Charon - Speak in a calm, deep, and slightly mysterious voice: You awaken to the hum of gentle waves. The water below glows like liquid starlight.]",
      },
      {
        speaker: "You",
        text: "Where am I? The stars... they feel close enough to touch.",
        emotion: "worried",
        audio_file: "[Generated Audio for: You - Leda - Speak with a tone that matches the emotion of the text (worried): Where am I? The stars... they feel close enough to touch.]",
      },
      {
        speaker: "Whispering Voice",
        text: "The lost drift until they remember why they came.",
        emotion: "neutral",
        audio_file: "[Generated Audio for: Whispering Voice - Zephyr - Speak in a soft, ethereal whisper with an ancient echo: The lost drift until they remember why they came.]",
      },
    ],
    choices: [
      {
        text: "Enter the captain’s cabin",
        nextScene: "cabin",
        impact: "neutral",
      },
      {
        text: "Look over the railing at the starlit sea",
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
        audio_file: "[Generated Audio for: Narrator - Charon - Speak in a calm, deep, and slightly mysterious voice: The air smells of salt and ink. A map pinned to the wall trembles as if it remembers your touch.]",
      },
      {
        speaker: "You",
        text: "Tide Altar... perhaps that’s the key to leaving this sea.",
        emotion: "hopeful",
        audio_file: "[Generated Audio for: You - Leda - Speak with a tone that matches the emotion of the text (hopeful): Tide Altar... perhaps that’s the key to leaving this sea.]",
      },
      {
        speaker: "Voice from the shadows",
        text: "Every key turns two ways — one to open, one to bind.",
        emotion: "neutral",
        audio_file: "[Generated Audio for: Voice from the shadows - Zephyr - Speak in a soft, ethereal whisper with an ancient echo: Every key turns two ways — one to open, one to bind.]",
      },
    ],
    choices: [
      {
        text: "Examine the Captain's Journal",
        nextScene: "journal",
        impact: "neutral",
      },
      {
        text: "Take the map and head back to the deck",
        nextScene: "start",
        impact: "neutral",
      },
    ],
    environment: "cabin",
    cameraPosition: [2, 5, 10],
    cameraTarget: [0, 0, 0],
  },

  journal: {
    id: "journal",
    title: "The Captain's Tale",
    description:
      "The journal details the Captain's journey to this sea. The final entry reads: 'The sea is a mirror of the self. The **Lighthouse** guides to the shore; the **Altar** opens the way home.'",
    dialogue: [
      {
        speaker: "Narrator",
        text: "The ink is faded, but the Captain's hope is clear. Their goal was not to escape, but to understand.",
        emotion: "neutral",
        audio_file: "[Generated Audio for: Narrator - Charon - Speak in a calm, deep, and slightly mysterious voice: The ink is faded, but the Captain's hope is clear. Their goal was not to escape, but to understand.]",
      },
      {
        speaker: "You",
        text: "A lighthouse... perhaps a true beacon in this endless night.",
        emotion: "hopeful",
        audio_file: "[Generated Audio for: You - Leda - Speak with a tone that matches the emotion of the text (hopeful): A lighthouse... perhaps a true beacon in this endless night.]",
      },
      {
        speaker: "Whispering Voice",
        text: "Truth can be a harsh light.",
        emotion: "neutral",
        audio_file: "[Generated Audio for: Whispering Voice - Zephyr - Speak in a soft, ethereal whisper with an ancient echo: Truth can be a harsh light.]",
      },
    ],
    choices: [
      {
        text: "Head toward the shore to find the Lighthouse",
        nextScene: "shore",
        impact: "positive",
      },
      {
        text: "Return to the deck and prepare to sail toward the Altar",
        nextScene: "start",
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
      "The ship drifts to rest against a shore of shining sand. A faint, rhythmic pulse of light can be seen far in the distance.",
    dialogue: [
      {
        speaker: "Narrator",
        text: "You step onto the glowing shore. Every grain of sand seems alive with memory.",
        emotion: "neutral",
        audio_file: "[Generated Audio for: Narrator - Charon - Speak in a calm, deep, and slightly mysterious voice: You step onto the glowing shore. Every grain of sand seems alive with memory.]",
      },
      {
        speaker: "You",
        text: "There is a light... I must follow it.",
        emotion: "hopeful",
        audio_file: "[Generated Audio for: You - Leda - Speak with a tone that matches the emotion of the text (hopeful): There is a light... I must follow it.]",
      },
      {
        speaker: "Spirit",
        text: "All things here remember. The light is your purpose.",
        emotion: "neutral",
        audio_file: "[Generated Audio for: Spirit - Zephyr - Speak in a soft, ethereal whisper with an ancient echo: All things here remember. The light is your purpose.]",
      },
    ],
    choices: [
      {
        text: "Follow the distant light toward the Lighthouse",
        nextScene: "lighthouse",
        impact: "positive",
      },
      {
        text: "Dive beneath the glowing waves to explore the ship's keel",
        nextScene: "depths",
        impact: "neutral",
      },
    ],
    environment: "beach",
    cameraPosition: [0, 6, 12],
    cameraTarget: [0, 0, 0],
  },

  lighthouse: {
    id: "lighthouse",
    title: "The Silent Watcher",
    description:
      "You stand before a tall, slender structure of obsidian that catches the starlight. The light it emits is a steady, gentle glow, not a frantic beam.",
    dialogue: [
      {
        speaker: "Narrator",
        text: "The Lighthouse stands silent, a guardian of this lost sea. As you draw near, the light settles on your chest.",
        emotion: "neutral",
        audio_file: "[Generated Audio for: Narrator - Charon - Speak in a calm, deep, and slightly mysterious voice: The Lighthouse stands silent, a guardian of this lost sea. As you draw near, the light settles on your chest.]",
      },
      {
        speaker: "You",
        text: "It feels like I'm being measured... judged.",
        emotion: "worried",
        audio_file: "[Generated Audio for: You - Leda - Speak with a tone that matches the emotion of the text (worried): It feels like I'm being measured... judged.]",
      },
      {
        speaker: "Keeper's Voice",
        text: "The Light measures only truth. The **Tide Altar** is the destination, but the path must be known.",
        emotion: "neutral",
        audio_file: "[Generated Audio for: Keeper's Voice - Zephyr - Speak in a soft, ethereal whisper with an ancient echo: The Light measures only truth. The Tide Altar is the destination, but the path must be known.]",
      },
    ],
    choices: [
      {
        text: "Ask the Keeper for the path to the Altar",
        nextScene: "altar",
        impact: "positive",
      },
      {
        text: "Question the Keeper about the nature of the sea",
        nextScene: "journal", // Loop back to journal's core message
        impact: "neutral",
      },
    ],
    environment: "lighthouse",
    cameraPosition: [-5, 8, 10],
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
        audio_file: "[Generated Audio for: Narrator - Charon - Speak in a calm, deep, and slightly mysterious voice: The starlit water shows fragments of your past — laughter, sorrow, choices that shaped you.]",
      },
      {
        speaker: "You",
        text: "This place knows who I am.",
        emotion: "worried",
        audio_file: "[Generated Audio for: You - Leda - Speak with a tone that matches the emotion of the text (worried): This place knows who I am.]",
      },
      {
        speaker: "Echoing Voice",
        text: "To move forward, you must face what you left behind.",
        emotion: "neutral",
        audio_file: "[Generated Audio for: Echoing Voice - Zephyr - Speak in a soft, ethereal whisper with an ancient echo: To move forward, you must face what you left behind.]",
      },
    ],
    choices: [
      {
        text: "Step into the memory of light (Embrace Past Joy)",
        nextScene: "starPath",
        impact: "positive",
      },
      {
        text: "Step into the memory of shadow (Confront Past Regret)",
        nextScene: "deepLabyrinth",
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
        audio_file: "[Generated Audio for: Narrator - Charon - Speak in a calm, deep, and slightly mysterious voice: You ascend on a road made of stars. The air is warm, and your burdens fade with every step.]",
      },
      {
        speaker: "You",
        text: "I see now — every choice I made led here.",
        emotion: "hopeful",
        audio_file: "[Generated Audio for: You - Leda - Speak with a tone that matches the emotion of the text (hopeful): I see now — every choice I made led here.]",
      },
      {
        speaker: "Celestial Guardian",
        text: "Will you ascend to freedom, or remain to guide the lost?",
        emotion: "neutral",
        audio_file: "[Generated Audio for: Celestial Guardian - Zephyr - Speak in a soft, ethereal whisper with an ancient echo: Will you ascend to freedom, or remain to guide the lost?]",
      },
    ],
    choices: [
      {
        text: "Accept freedom and rise to the stars (The Wanderer)",
        nextScene: "freedomEnding",
        impact: "positive",
      },
      {
        text: "Return to guide others (The Guardian)",
        nextScene: "guardianEnding",
        impact: "positive",
      },
    ],
    environment: "sky",
    cameraPosition: [0, 9, 18],
    cameraTarget: [0, 0, 0],
  },
  
  deepLabyrinth: {
    id: "deepLabyrinth",
    title: "Labyrinth of Regret",
    description:
      "You find yourself in a maze of shifting, watery tunnels. Each turn shows a moment of regret from your past, vivid and painful.",
    dialogue: [
      {
        speaker: "Narrator",
        text: "The air here is heavy, scented with what could have been. Your forgotten mistakes cling to you like seaweed.",
        emotion: "worried",
        audio_file: "[Generated Audio for: Narrator - Charon - Speak in a calm, deep, and slightly mysterious voice: The air here is heavy, scented with what could have been. Your forgotten mistakes cling to you like seaweed.]",
      },
      {
        speaker: "Phantom",
        text: "Why did you abandon me? Why did you turn away?",
        emotion: "sad",
        audio_file: "[Generated Audio for: Phantom - Zephyr - Speak in a soft, ethereal whisper with an ancient echo: Why did you abandon me? Why did you turn away?]",
      },
      {
        speaker: "You",
        text: "I can't change the past. I must move forward.",
        emotion: "determined",
        audio_file: "[Generated Audio for: You - Leda - Speak with a tone that matches the emotion of the text (determined): I can't change the past. I must move forward.]",
      },
    ],
    choices: [
      {
        text: "Find the heart of the Labyrinth to gain understanding",
        nextScene: "depths",
        impact: "neutral",
      },
      {
        text: "Retreat back toward the Altar",
        nextScene: "altar",
        impact: "positive",
      },
    ],
    environment: "ocean",
    cameraPosition: [-5, 5, 5],
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
        audio_file: "[Generated Audio for: Narrator - Charon - Speak in a calm, deep, and slightly mysterious voice: In the depths, shapes drift like dreams. Each whisper feels like a forgotten memory.]",
      },
      {
        speaker: "You",
        text: "Are you… the souls who came before me?",
        emotion: "worried",
        audio_file: "[Generated Audio for: You - Leda - Speak with a tone that matches the emotion of the text (worried): Are you… the souls who came before me?]",
      },
      {
        speaker: "Voices",
        text: "We are echoes. Stay, and remember with us.",
        emotion: "neutral",
        audio_file: "[Generated Audio for: Voices - Zephyr - Speak in a soft, ethereal whisper with an ancient echo: We are echoes. Stay, and remember with us.]",
      },
    ],
    choices: [
      {
        text: "Join the sea of memories (The Eternal Echo)",
        nextScene: "eternalEnding",
        impact: "neutral",
      },
      {
        text: "Fight toward the surface (Seek the Altar)",
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
        audio_file: "[Generated Audio for: Narrator - Charon - Speak in a calm, deep, and slightly mysterious voice: You have faced yourself and chosen freedom. The world awaits — vast, untamed, and beautiful.]",
      },
      {
        speaker: "You",
        text: "I am no longer lost. My journey begins anew.",
        emotion: "happy",
        audio_file: "[Generated Audio for: You - Leda - Speak with a tone that matches the emotion of the text (happy): I am no longer lost. My journey begins anew.]",
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
        audio_file: "[Generated Audio for: Narrator - Charon - Speak in a calm, deep, and slightly mysterious voice: The sea hums in harmony. You are its keeper now, a beacon for all who drift in the dark.]",
      },
      {
        speaker: "You",
        text: "Then let no one be lost again.",
        emotion: "hopeful",
        audio_file: "[Generated Audio for: You - Leda - Speak with a tone that matches the emotion of the text (hopeful): Then let no one be lost again.]",
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
        audio_file: "[Generated Audio for: Narrator - Charon - Speak in a calm, deep, and slightly mysterious voice: The sea claims you gently. Your memories scatter like pearls in the tide, endless and eternal.]",
      },
      {
        speaker: "You",
        text: "Maybe being remembered is enough.",
        emotion: "hopeful",
        audio_file: "[Generated Audio for: You - Leda - Speak with a tone that matches the emotion of the text (hopeful): Maybe being remembered is enough.]",
      },
    ],
    environment: "ocean",
    cameraPosition: [0, 8, 15],
    cameraTarget: [0, 0, 0],
    isEnding: true,
    endingType: "neutral",
  },
};