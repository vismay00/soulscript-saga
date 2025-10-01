import { DialogueLine, Choice } from "@/types/story";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface DialogueBoxProps {
  dialogue: DialogueLine[];
  currentLineIndex: number;
  choices?: Choice[];
  onChoice: (nextScene: string) => void;
  onNext: () => void;
  isEndingScene?: boolean;
}

export const DialogueBox = ({
  dialogue,
  currentLineIndex,
  choices,
  onChoice,
  onNext,
  isEndingScene,
}: DialogueBoxProps) => {
  const currentLine = dialogue[currentLineIndex];
  const showChoices = currentLineIndex >= dialogue.length - 1 && choices && choices.length > 0;

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
              <div className={`text-sm font-semibold mb-2 ${getEmotionColor(currentLine?.emotion)}`}>
                {currentLine?.speaker}
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
