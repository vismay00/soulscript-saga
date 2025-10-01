import { Scene } from "@/types/story";

export const scenes: Record<string, Scene> = {
  start: {
    id: "start",
    title: "Awakening",
    description: "You wake up in a mysterious forest, moonlight filtering through ancient trees.",
    dialogue: [
      {
        speaker: "Narrator",
        text: "The world comes into focus slowly. You're lying on soft moss, surrounded by towering trees that seem to whisper secrets.",
        emotion: "neutral",
      },
      {
        speaker: "You",
        text: "Where... where am I?",
        emotion: "worried",
      },
      {
        speaker: "Narrator",
        text: "In the distance, you notice two paths: one glowing with a soft, inviting light, the other shrouded in darkness.",
        emotion: "neutral",
      },
    ],
    choices: [
      {
        text: "Follow the light",
        nextScene: "lightPath",
        impact: "positive",
      },
      {
        text: "Explore the darkness",
        nextScene: "darkPath",
        impact: "negative",
      },
    ],
    environment: "forest",
    cameraPosition: [0, 5, 10],
    cameraTarget: [0, 0, 0],
  },
  
  lightPath: {
    id: "lightPath",
    title: "The Clearing",
    description: "The light leads you to a beautiful clearing where a stranger awaits.",
    dialogue: [
      {
        speaker: "Narrator",
        text: "The path opens into a moonlit clearing. A figure stands at its center, their back turned to you.",
        emotion: "neutral",
      },
      {
        speaker: "Stranger",
        text: "I've been waiting for you. The forest has been calling out, seeking someone brave enough to answer.",
        emotion: "neutral",
      },
      {
        speaker: "Stranger",
        text: "There's a temple beyond the cliffs. Inside lies a choice that will define not just your fate, but the fate of all who wander here.",
        emotion: "hopeful",
      },
      {
        speaker: "You",
        text: "Why me? What makes me special?",
        emotion: "worried",
      },
      {
        speaker: "Stranger",
        text: "That's for you to discover. But know this: I can guide you there, or you can venture alone. The choice, as always, is yours.",
        emotion: "neutral",
      },
    ],
    choices: [
      {
        text: "Accept their guidance",
        nextScene: "guidedPath",
        impact: "positive",
      },
      {
        text: "Continue alone",
        nextScene: "alonePath",
        impact: "neutral",
      },
    ],
    environment: "clearing",
    cameraPosition: [5, 4, 8],
    cameraTarget: [0, 1, 0],
  },
  
  darkPath: {
    id: "darkPath",
    title: "The Cave",
    description: "Darkness envelops you as you enter a mysterious cave.",
    dialogue: [
      {
        speaker: "Narrator",
        text: "The darkness is not empty. It breathes around you, alive with whispers and echoes of forgotten voices.",
        emotion: "neutral",
      },
      {
        speaker: "Voice",
        text: "Turn back... while you still can...",
        emotion: "worried",
      },
      {
        speaker: "You",
        text: "I'm not afraid.",
        emotion: "neutral",
      },
      {
        speaker: "Narrator",
        text: "The cave opens up. Before you lies a chasm, and across it, a bridge of light materializes. But the path forward demands courage.",
        emotion: "neutral",
      },
    ],
    choices: [
      {
        text: "Cross the bridge of light",
        nextScene: "bridgeCrossing",
        impact: "positive",
      },
      {
        text: "Search for another way",
        nextScene: "alternativePath",
        impact: "neutral",
      },
    ],
    environment: "cave",
    cameraPosition: [0, 3, 12],
    cameraTarget: [0, 0, -5],
  },
  
  guidedPath: {
    id: "guidedPath",
    title: "The Guided Journey",
    description: "The stranger leads you through the forest with wisdom and care.",
    dialogue: [
      {
        speaker: "Stranger",
        text: "This forest has seen many travelers, but few who listen to their heart.",
        emotion: "hopeful",
      },
      {
        speaker: "Narrator",
        text: "You walk together in comfortable silence. The path ahead reveals a magnificent cliff overlooking an endless sea of stars.",
        emotion: "neutral",
      },
      {
        speaker: "Stranger",
        text: "At the temple ahead, you'll face the ultimate choice. Remember: true strength isn't in what you take, but in what you're willing to give.",
        emotion: "neutral",
      },
    ],
    choices: [
      {
        text: "Approach the temple",
        nextScene: "templeChoice",
        impact: "positive",
      },
    ],
    environment: "cliff",
    cameraPosition: [8, 6, 10],
    cameraTarget: [0, 2, -5],
  },
  
  alonePath: {
    id: "alonePath",
    title: "The Solitary Way",
    description: "You venture forward on your own, trusting your instincts.",
    dialogue: [
      {
        speaker: "Narrator",
        text: "The path is harder alone, but you feel a growing confidence with each step.",
        emotion: "neutral",
      },
      {
        speaker: "You",
        text: "I can do this. I have to.",
        emotion: "hopeful",
      },
      {
        speaker: "Narrator",
        text: "The temple emerges from the mist ahead, ancient and imposing. You've made it this far on your own strength.",
        emotion: "neutral",
      },
    ],
    choices: [
      {
        text: "Enter the temple",
        nextScene: "templeChoice",
        impact: "neutral",
      },
    ],
    environment: "cliff",
    cameraPosition: [6, 5, 12],
    cameraTarget: [0, 1, -5],
  },
  
  bridgeCrossing: {
    id: "bridgeCrossing",
    title: "The Bridge of Light",
    description: "You step onto the ethereal bridge, each step a leap of faith.",
    dialogue: [
      {
        speaker: "Narrator",
        text: "The bridge holds firm beneath your feet, rewarding your courage with solid ground.",
        emotion: "hopeful",
      },
      {
        speaker: "Voice",
        text: "You have proven yourself worthy. The temple awaits.",
        emotion: "hopeful",
      },
    ],
    choices: [
      {
        text: "Continue to the temple",
        nextScene: "templeChoice",
        impact: "positive",
      },
    ],
    environment: "cave",
    cameraPosition: [0, 4, 10],
    cameraTarget: [0, 0, -10],
  },
  
  alternativePath: {
    id: "alternativePath",
    title: "The Winding Path",
    description: "You find a narrow ledge around the chasm.",
    dialogue: [
      {
        speaker: "Narrator",
        text: "The path is treacherous, but your caution serves you well. Sometimes the longer road is the wiser choice.",
        emotion: "neutral",
      },
    ],
    choices: [
      {
        text: "Proceed to the temple",
        nextScene: "templeChoice",
        impact: "neutral",
      },
    ],
    environment: "cave",
    cameraPosition: [-5, 4, 8],
    cameraTarget: [0, 0, -5],
  },
  
  templeChoice: {
    id: "templeChoice",
    title: "The Final Choice",
    description: "Inside the temple, two pedestals stand before you, each holding an ancient artifact.",
    dialogue: [
      {
        speaker: "Narrator",
        text: "The temple's heart reveals itself. Two artifacts pulse with power: one radiates light, promising freedom and new beginnings. The other glows with warmth, offering to heal and restore all who suffer.",
        emotion: "neutral",
      },
      {
        speaker: "Ancient Voice",
        text: "Choose wisely, traveler. One will free you from this realm forever. The other will grant you the power to save others, but bind you to this place as its eternal guardian.",
        emotion: "neutral",
      },
      {
        speaker: "You",
        text: "This is... this is an impossible choice.",
        emotion: "worried",
      },
      {
        speaker: "Ancient Voice",
        text: "The most important choices always are.",
        emotion: "neutral",
      },
    ],
    choices: [
      {
        text: "Take the Light - Claim your freedom",
        nextScene: "endingFreedom",
        impact: "neutral",
      },
      {
        text: "Take the Warmth - Become the guardian",
        nextScene: "endingGuardian",
        impact: "positive",
      },
      {
        text: "Refuse both - Find your own way",
        nextScene: "endingNeutral",
        impact: "neutral",
      },
    ],
    environment: "temple",
    cameraPosition: [0, 5, 15],
    cameraTarget: [0, 2, 0],
  },
  
  endingFreedom: {
    id: "endingFreedom",
    title: "The Path to Freedom",
    description: "You chose to claim your freedom.",
    dialogue: [
      {
        speaker: "Narrator",
        text: "As your hand closes around the light, the temple dissolves. You find yourself standing on a hill at dawn, the forest far behind you.",
        emotion: "hopeful",
      },
      {
        speaker: "You",
        text: "I'm... I'm free.",
        emotion: "happy",
      },
      {
        speaker: "Narrator",
        text: "The world stretches before you, full of possibility. Your journey in the forest is over, but your story has only just begun.",
        emotion: "hopeful",
      },
      {
        speaker: "Narrator",
        text: "Sometimes, choosing yourself isn't selfishness—it's survival. And survival is its own kind of courage.",
        emotion: "neutral",
      },
    ],
    environment: "sunrise",
    cameraPosition: [10, 8, 15],
    cameraTarget: [0, 0, -10],
    isEnding: true,
    endingType: "neutral",
  },
  
  endingGuardian: {
    id: "endingGuardian",
    title: "The Guardian's Oath",
    description: "You chose to become the guardian.",
    dialogue: [
      {
        speaker: "Narrator",
        text: "As you grasp the warm artifact, power flows through you. The temple comes alive, responding to your presence.",
        emotion: "hopeful",
      },
      {
        speaker: "Ancient Voice",
        text: "You have chosen to carry the burden of compassion. From this day forward, you are the guardian of lost souls.",
        emotion: "neutral",
      },
      {
        speaker: "You",
        text: "I accept this responsibility. No one else should feel lost and alone as I did.",
        emotion: "hopeful",
      },
      {
        speaker: "Narrator",
        text: "The forest transforms around you, becoming a sanctuary. You feel the presence of every wanderer who will need your guidance. Your freedom is traded, but your purpose is eternal.",
        emotion: "hopeful",
      },
      {
        speaker: "Narrator",
        text: "In choosing to stay, you became exactly what the world needed. A light in the darkness. A guide for the lost.",
        emotion: "hopeful",
      },
    ],
    environment: "temple",
    cameraPosition: [0, 10, 20],
    cameraTarget: [0, 0, 0],
    isEnding: true,
    endingType: "good",
  },
  
  endingNeutral: {
    id: "endingNeutral",
    title: "The Third Path",
    description: "You refused to be bound by the temple's choices.",
    dialogue: [
      {
        speaker: "You",
        text: "No. I won't be forced into a choice designed by others.",
        emotion: "neutral",
      },
      {
        speaker: "Ancient Voice",
        text: "Interesting... In all the ages, none have refused both.",
        emotion: "neutral",
      },
      {
        speaker: "Narrator",
        text: "The temple begins to crumble, but not in anger—in respect. The artifacts dissolve, their power returning to the earth.",
        emotion: "neutral",
      },
      {
        speaker: "Ancient Voice",
        text: "Perhaps the greatest wisdom is knowing that some choices should never have been offered at all. You are free to forge your own path.",
        emotion: "hopeful",
      },
      {
        speaker: "Narrator",
        text: "As the temple fades, you find yourself back in the forest clearing. But this time, you understand: the journey was never about the destination.",
        emotion: "hopeful",
      },
      {
        speaker: "Narrator",
        text: "You walk forward, neither guardian nor wanderer, but something entirely your own. And that, perhaps, is the truest freedom of all.",
        emotion: "hopeful",
      },
    ],
    environment: "clearing",
    cameraPosition: [0, 6, 12],
    cameraTarget: [0, 0, 0],
    isEnding: true,
    endingType: "good",
  },
};
