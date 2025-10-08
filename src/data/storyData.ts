import { Scene } from "@/types/story";

export const scenes: Record<string, Scene> = {
  start: {
    id: "start",
    title: "The Awakening",
    description: "You open your eyes on a mossy forest floor as strange birds sing overhead. Ancient trees surround you, and in the distance, ruins glimmer beneath the morning sun.",
    dialogue: [
      {
        speaker: "Narrator",
        text: "You awaken in an unfamiliar wood, your memories clouded but your senses sharp. The world is vibrant, alive with possibility.",
        emotion: "neutral",
      },
      {
        speaker: "You",
        text: "All is new, yet oddly familiar. Where am I, and what brought me here?",
  emotion: "hopeful",
      },
      {
        speaker: "Narrator",
        text: "You notice a curious glowing compass in your hand. Two trails lead away: one towards an ancient archway bathed in light, the other winding into a misty gorge.",
        emotion: "neutral",
      }
    ],
    choices: [
      {
        text: "Investigate the ancient archway",
        nextScene: "archway",
        impact: "positive",
      },
      {
        text: "Journey into the misty gorge",
        nextScene: "gorge",
        impact: "negative",
      },
    ],
    environment: "forest",
    cameraPosition: [0, 6, 12],
    cameraTarget: [1, 0, 0],
  },

  archway: {
    id: "archway",
    title: "The Gleaming Archway",
    description: "A majestic ruin rises, sunlight pierces through stone columns. A wise figure awaits, wreathed in golden light.",
    dialogue: [
      {
        speaker: "Narrator",
        text: "The archway beckons, each stone etched with mysterious runes. A figure in a glowing robe stands within, their eyes full of stories.",
        emotion: "neutral",
      },
      {
        speaker: "Elder",
        text: "Many travelers arrive here, but only those who seek truth dare enter. Will you face the temple's riddles?",
        emotion: "neutral",
      },
      {
        speaker: "You",
        text: "I seek answers, and perhaps a place in this world.",
        emotion: "hopeful",
      },
      {
        speaker: "Elder",
        text: "Inside, your heart will be tested—not by force, but by choice.",
        emotion: "neutral",
      },
    ],
    choices: [
      {
        text: "Follow the Elder",
        nextScene: "templeExterior",
        impact: "positive",
      },
      {
        text: "Go alone into the temple",
        nextScene: "templeInterior",
        impact: "neutral",
      },
    ],
  environment: "temple",
    cameraPosition: [3, 8, 14],
    cameraTarget: [0, 2, 0],
  },

  gorge: {
    id: "gorge",
    title: "Mist and Echoes",
    description: "The air thickens with mist as shadows flicker. Echoes hint at hidden things.",
    dialogue: [
      {
        speaker: "Narrator",
        text: "The gorge descends steeply, twilight gathering by your feet. Strange shapes move in the haze. You sense you are watched.",
        emotion: "neutral",
      },
      {
        speaker: "Voice",
        text: "Are you lost... or are you searching?",
        emotion: "worried",
      },
      {
        speaker: "You",
        text: "Neither. I am finding my own way.",
  emotion: "hopeful",
      },
      {
        speaker: "Narrator",
        text: "A bridge of ancient wood crosses the ravine. It looks both inviting and perilous.",
        emotion: "neutral",
      },
    ],
    choices: [
      {
        text: "Cross the ancient bridge",
        nextScene: "bridge",
        impact: "negative",
      },
      {
        text: "Climb the cliff walls",
        nextScene: "cliffClimb",
        impact: "neutral",
      },
    ],
  environment: "cliff",
    cameraPosition: [0, 4, 14],
    cameraTarget: [0, 1, -3],
  },

  templeExterior: {
    id: "templeExterior",
    title: "Temple Steps",
    description: "The steps to the temple gleam under floating lanterns. The Elder pauses.",
    dialogue: [
      {
        speaker: "Elder",
        text: "Courage and kindness shape the journey ahead. Are you ready for what lies within?",
        emotion: "hopeful",
      },
      {
        speaker: "You",
        text: "Yes. I carry my past and hopes within me.",
        emotion: "hopeful",
      },
      {
        speaker: "Narrator",
        text: "You reach the ancient doors. They open inwards, revealing an inner sanctum filled with golden light.",
        emotion: "neutral",
      }
    ],
    choices: [
      {
        text: "Enter the sanctum",
        nextScene: "sanctum",
        impact: "positive",
      },
    ],
    environment: "temple",
    cameraPosition: [2, 6, 10],
    cameraTarget: [0, 1, 0],
  },

  templeInterior: {
    id: "templeInterior",
    title: "Temple Shadows",
    description: "You steal alone into the temple, every shadow heavy with meaning.",
    dialogue: [
      {
        speaker: "Narrator",
        text: "The silence inside the temple is profound. Carvings along the wall shift as you pass, telling stories of past wanderers.",
        emotion: "neutral",
      },
      {
        speaker: "You",
        text: "I am alone, but not afraid.",
  emotion: "hopeful",
      },
      {
        speaker: "Ancient Voice",
        text: "To enter the temple is to enter yourself. What burdens will you carry forward?",
        emotion: "neutral",
      },
    ],
    choices: [
      {
        text: "Continue deeper",
        nextScene: "sanctum",
        impact: "neutral",
      },
    ],
    environment: "temple",
    cameraPosition: [-2, 4, 8],
    cameraTarget: [0, 2, 0],
  },

  bridge: {
    id: "bridge",
    title: "The Crossing",
    description: "With steady steps, you cross the bridge. The mist parts, revealing a secret passage.",
    dialogue: [
      {
        speaker: "Narrator",
        text: "Wood creaks beneath your feet but holds. On the other side blooms a garden of silver flowers and a hidden stair.",
        emotion: "neutral",
      },
      {
        speaker: "You",
        text: "Safe, for now. What wonders lie ahead?",
  emotion: "hopeful",
      },
      {
        speaker: "Narrator",
        text: "The stair leads to a temple carved into the mountainside. It pulses with silent, waiting power.",
        emotion: "neutral",
      }
    ],
    choices: [
      {
        text: "Climb to the temple",
        nextScene: "sanctum",
        impact: "positive",
      },
    ],
  environment: "clearing",
    cameraPosition: [0, 7, 12],
    cameraTarget: [0, 1, 0],
  },

  cliffClimb: {
    id: "cliffClimb",
    title: "Cliffside Perseverance",
    description: "You scale the cliff, hands finding hidden holds. Each breath is effort, each movement will.",
    dialogue: [
      {
        speaker: "Narrator",
        text: "Your fingers find ancient carvings, worn by time and weather. At last, you crest the top and behold the temple bathed in sunset gold.",
        emotion: "hopeful",
      },
      {
        speaker: "You",
        text: "I earned this ascent. The temple calls to me.",
  emotion: "happy",
      },
    ],
    choices: [
      {
        text: "Enter the temple",
        nextScene: "sanctum",
        impact: "positive",
      },
    ],
    environment: "cliff",
    cameraPosition: [6, 12, 14],
    cameraTarget: [0, 0, 0],
  },

  sanctum: {
    id: "sanctum",
    title: "Sanctum of Choices",
    description: "Inside the sanctum, two altars shimmer: one of crystal, one of flame. Light and warmth wait for your decision.",
    dialogue: [
      {
        speaker: "Narrator",
        text: "The sanctum is sacred. Golden light falls from unseen sources. Two altars rise: one crystal, glowing with possibility; one flame, radiating comfort and safety.",
        emotion: "neutral",
      },
      {
        speaker: "Ancient Voice",
        text: "The crystal will grant freedom and adventure, but send you far from all you've known. The flame offers healing and guardianship, but you must remain and guide others.",
        emotion: "neutral",
      },
      {
        speaker: "You",
        text: "What do these choices mean for me and for the world?",
        emotion: "worried",
      },
      {
        speaker: "Ancient Voice",
        text: "Only you can decide. Will you walk the uncharted path or offer light to those who are lost?",
        emotion: "neutral",
      },
    ],
    choices: [
      {
        text: "Choose the Crystal",
        nextScene: "crystalEnding",
        impact: "neutral",
      },
      {
        text: "Choose the Flame",
        nextScene: "flameEnding",
        impact: "positive",
      },
      {
        text: "Refuse both and seek a hidden door",
        nextScene: "hiddenEnding",
        impact: "neutral",
      },
    ],
  environment: "temple",
    cameraPosition: [0, 9, 18],
    cameraTarget: [0, 2, 0],
  },

  crystalEnding: {
    id: "crystalEnding",
    title: "The Adventurer's Road",
    description: "You grasp the crystal. The walls dissolve, revealing the world beyond and endless possibility.",
    dialogue: [
      {
        speaker: "Narrator",
        text: "As your hand closes around the crystal, the world shifts. You stand on the edge of a vast new land, the temple fading behind you.",
        emotion: "hopeful",
      },
      {
        speaker: "You",
        text: "My journey is my own. I am ready to discover what waits.",
        emotion: "happy",
      },
      {
        speaker: "Narrator",
        text: "You step forward, heart alive, every step a new beginning.",
        emotion: "hopeful",
      },
      {
        speaker: "Narrator",
        text: "Adventures await for those who dare to choose themselves.",
        emotion: "neutral",
      },
    ],
  environment: "sunrise",
    cameraPosition: [12, 10, 18],
    cameraTarget: [0, 0, -12],
    isEnding: true,
    endingType: "neutral",
  },

  flameEnding: {
    id: "flameEnding",
    title: "The Guardian’s Promise",
    description: "You choose the flame and become the guardian. The temple fills with life, and you sense every soul who needs help.",
    dialogue: [
      {
        speaker: "Narrator",
        text: "Warmth floods through you as you hold the flame. The sanctum glows brighter, welcoming all travelers who may need sanctuary.",
        emotion: "hopeful",
      },
      {
        speaker: "Ancient Voice",
        text: "Compassion is the hardest path: you are now guide and guardian, forever present for the lost.",
        emotion: "neutral",
      },
      {
        speaker: "You",
        text: "I accept this gift. Let other wanderers find hope here.",
        emotion: "hopeful",
      },
      {
        speaker: "Narrator",
        text: "A new age begins for the temple. You are the flame in the darkness, a protector for every soul that passes.",
        emotion: "hopeful",
      },
    ],
  environment: "temple",
    cameraPosition: [0, 13, 22],
    cameraTarget: [0, 0, 0],
    isEnding: true,
    endingType: "good",
  },

  hiddenEnding: {
    id: "hiddenEnding",
    title: "Path of Mystery",
    description: "You search for another way. A hidden door opens, leading you to a moonlit grove where your story can truly begin.",
    dialogue: [
      {
        speaker: "Narrator",
        text: "Refusing both choices, you notice an engraving on the wall. Pressing it opens a secret passage.",
        emotion: "neutral",
      },
      {
        speaker: "Ancient Voice",
        text: "Few have sought this path. Uncertainty is its own adventure.",
        emotion: "neutral",
      },
      {
        speaker: "You",
        text: "Whatever comes next, I will face it as myself.",
        emotion: "hopeful",
      },
      {
        speaker: "Narrator",
        text: "You step into the grove, the moon bright above, your destiny shining in every shadow.",
        emotion: "hopeful",
      },
    ],
  environment: "forest",
    cameraPosition: [0, 8, 15],
    cameraTarget: [0, 0, 0],
    isEnding: true,
    endingType: "good",
  },
};
