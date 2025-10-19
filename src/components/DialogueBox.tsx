import { DialogueLine, Choice } from "@/types/story";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface DialogueBoxProps {
  sceneId?: string;
  dialogue: DialogueLine[];
  currentLineIndex: number;
  choices?: Choice[];
  onChoice: (nextScene: string) => void;
  onNext: () => void;
  isEndingScene?: boolean;
}

export const DialogueBox = ({
  sceneId,
  dialogue,
  currentLineIndex,
  choices,
  onChoice,
  onNext,
  isEndingScene,
}: DialogueBoxProps) => {
  const currentLine = dialogue[currentLineIndex];
  const showChoices = currentLineIndex >= dialogue.length - 1 && choices && choices.length > 0;

  // TTS state: whether narration is enabled
  const [ttsEnabled, setTtsEnabled] = useState<boolean>(() => {
    try {
      const raw = localStorage.getItem("ttsEnabled");
      return raw ? JSON.parse(raw) : true;
    } catch {
      return true;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("ttsEnabled", JSON.stringify(ttsEnabled));
    } catch {}
  }, [ttsEnabled]);

  // Speak the current line when it changes (if TTS enabled)
  useEffect(() => {
    if (typeof window === "undefined") return;

    // If a recorded narration file exists for this scene line, play it.
    // Fallback to TTS if the fetch fails or file missing.
    let audioEl: HTMLAudioElement | null = null;
    let didPlayRecorded = false;

    async function tryPlayRecorded() {
      if (!sceneId) return false;
      const url = `/narration/${sceneId}-${currentLineIndex}.mp3`;
      try {
        const resp = await fetch(url, { method: "HEAD" });
        if (!resp.ok) return false;
      } catch {
        return false;
      }

      // Play via audio element
      audioEl = new Audio(`/narration/${sceneId}-${currentLineIndex}.mp3`);
      audioEl.autoplay = true;
      audioEl.onended = () => { /* cleanup handled in return */ };
      try {
        await audioEl.play();
        didPlayRecorded = true;
        return true;
      } catch {
        return false;
      }
    }

    (async () => {
      // Cancel any existing speech
      try { window.speechSynthesis.cancel(); } catch {}

      const played = await tryPlayRecorded();
      if (played) return;

      // If recorded not found, fallback to TTS if enabled
      if (!ttsEnabled) return;
      const synth = window.speechSynthesis;
      if (!synth) return;
      const utter = new SpeechSynthesisUtterance(`${currentLine.speaker}: ${currentLine.text}`);
      utter.rate = 1.0;
      utter.pitch = 1.0;
      try { synth.speak(utter); } catch {}
    })();

    return () => {
      try { window.speechSynthesis.cancel(); } catch {}
      if (audioEl) {
        try { audioEl.pause(); audioEl.src = ""; audioEl = null; } catch {}
      }
    };
  }, [currentLineIndex, currentLine, ttsEnabled]);

  const getEmotionColor = (emotion?: string) => {
    switch (emotion) {
      case "happy":
        return "text-accent";
      case "sad":
        return "text-primary";
      case "worried":
        return "text-destructive";
      case "hopeful":
        return "text-secondary";
      default:
        return "text-foreground";
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 p-6 pointer-events-none">
      <div className="max-w-4xl mx-auto pointer-events-auto">
        <Card className="bg-card/95 backdrop-blur-sm border-2 border-primary/30 shadow-[0_0_30px_hsl(var(--primary)/0.3)]">
          <div className="p-6 space-y-4">
            <div className="dialogue-enter">
              <div className="flex items-center justify-between">
                <div className={`text-sm font-semibold mb-2 ${getEmotionColor(currentLine?.emotion)}`}>
                  {currentLine?.speaker}
                </div>
                <div className="ml-4">
                  <Button size="sm" variant={ttsEnabled ? "default" : "ghost"} onClick={() => setTtsEnabled((v) => !v)}>
                    {ttsEnabled ? "🔊 Narration" : "🔈 Muted"}
                  </Button>
                </div>
              </div>
              <div className="text-lg leading-relaxed text-foreground/90">
                {currentLine?.text}
              </div>
            </div>

            {showChoices ? (
              <div className="space-y-3 pt-4">
                <div className="text-sm text-muted-foreground mb-3">Choose your path:</div>
                {choices.map((choice, index) => (
                  <Button
                    key={index}
                    onClick={() => onChoice(choice.nextScene)}
                    className="w-full justify-start text-left h-auto py-4 px-6 choice-hover"
                    variant={choice.impact === "positive" ? "default" : choice.impact === "negative" ? "destructive" : "secondary"}
                  >
                    <span className="text-base">{choice.text}</span>
                  </Button>
                ))}
              </div>
            ) : (
              <div className="flex justify-end pt-2">
                {isEndingScene && currentLineIndex >= dialogue.length - 1 ? (
                  <Button
                    onClick={() => window.location.reload()}
                    variant="default"
                    className="choice-hover"
                  >
                    Begin Again
                  </Button>
                ) : (
                  <Button
                    onClick={onNext}
                    variant="ghost"
                    className="text-primary hover:text-primary/80"
                  >
                    Continue →
                  </Button>
                )}
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};
