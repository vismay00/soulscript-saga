export interface Choice {
  text: string;
  nextScene: string;
  impact?: "positive" | "negative" | "neutral";
}

export interface DialogueLine {
  speaker: string;
  text: string;
  emotion?: "neutral" | "happy" | "sad" | "worried" | "hopeful";
}

export interface Scene {
  id: string;
  title: string;
  description: string;
  dialogue: DialogueLine[];
  choices?: Choice[];
  environment: "forest" | "clearing" | "cave" | "cliff" | "temple" | "sunrise";
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
