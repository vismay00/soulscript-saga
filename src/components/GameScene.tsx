import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Scene3D } from "./Scene3D";
import { DialogueBox } from "./DialogueBox";
import { scenes } from "@/data/storyData";
import { GameState } from "@/types/story";

export const GameScene = () => {
  const [gameState, setGameState] = useState<GameState>({
    currentScene: "start",
    visitedScenes: ["start"],
    choices: {},
  });
  
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [cameraPosition, setCameraPosition] = useState<[number, number, number]>([0, 5, 10]);
  const [cameraTarget, setCameraTarget] = useState<[number, number, number]>([0, 0, 0]);

  const currentScene = scenes[gameState.currentScene];

  useEffect(() => {
    // Smooth camera transition
    setCameraPosition(currentScene.cameraPosition);
    setCameraTarget(currentScene.cameraTarget);
    setCurrentLineIndex(0);
  }, [currentScene]);

  const handleNext = () => {
    if (currentLineIndex < currentScene.dialogue.length - 1) {
      setCurrentLineIndex(currentLineIndex + 1);
    }
  };

  const handleChoice = (nextScene: string) => {
    setGameState((prev) => ({
      currentScene: nextScene,
      visitedScenes: [...prev.visitedScenes, nextScene],
      choices: {
        ...prev.choices,
        [prev.currentScene]: nextScene,
      },
    }));
  };

  return (
    <div className="w-full h-screen relative">
      {/* Title overlay */}
      <div className="absolute top-6 left-6 z-10 pointer-events-none">
        <h1 className="text-4xl font-bold text-foreground glow-text animate-fade-in">
          {currentScene.title}
        </h1>
        <p className="text-muted-foreground mt-2 animate-fade-in">
          {currentScene.description}
        </p>
      </div>

      {/* 3D Canvas */}
      <Canvas>
        <PerspectiveCamera
          makeDefault
          position={cameraPosition}
          fov={75}
        />
        <OrbitControls
          target={cameraTarget}
          enablePan={false}
          enableZoom={true}
          maxDistance={20}
          minDistance={5}
          enableDamping
          dampingFactor={0.05}
        />
        <Scene3D environment={currentScene.environment} />
      </Canvas>

      {/* Dialogue UI */}
      <DialogueBox
        dialogue={currentScene.dialogue}
        currentLineIndex={currentLineIndex}
        choices={currentScene.choices}
        onChoice={handleChoice}
        onNext={handleNext}
        isEndingScene={currentScene.isEnding}
      />

      {/* Ending overlay */}
      {currentScene.isEnding && currentLineIndex >= currentScene.dialogue.length - 1 && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center animate-fade-in">
            <div className="text-6xl font-bold mb-4 glow-text">
              {currentScene.endingType === "good" ? "✨" : currentScene.endingType === "bad" ? "💔" : "🌟"}
            </div>
            <div className="text-2xl text-foreground">
              {currentScene.endingType === "good" && "A Meaningful End"}
              {currentScene.endingType === "bad" && "A Tragic End"}
              {currentScene.endingType === "neutral" && "A New Beginning"}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
