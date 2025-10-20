export interface Choice {
  text: string;
  nextScene: string;
  impact?: "positive" | "negative" | "neutral";
}

export interface DialogueLine {
  speaker: string;
  text: string;
  emotion?: "neutral" | "happy" | "sad" | "worried" | "hopeful" | "determined"; // Added 'determined' based on new story
  // Optional field that will hold generated audio data or a placeholder
  audio_file?: string;
}

export interface Scene {
  id: string;
  title: string;
  description: string;
  dialogue: DialogueLine[];
  choices?: Choice[];
  // Expanded environment union to include all used scene types
  environment:
    | "ship"
    | "cabin"
    | "journal" 
    | "beach"
    | "lighthouse" // New environment
    | "altar"
    | "sky"
    | "deepLabyrinth" // New environment
    | "ocean"
    | "freedomEnding" // Specific ending visual environment
    | "guardianEnding" // Specific ending visual environment
    | "eternalEnding"; // Specific ending visual environment

  cameraPosition: [number, number, number];
  cameraTarget: [number, number, number];
  isEnding?: boolean;
  endingType?: "good" | "bad" | "neutral";
}

export interface GameState {
  currentScene: string;
  visitedScenes: string[];
  choices: Record<string, string>;
}