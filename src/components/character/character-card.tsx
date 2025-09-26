import { Card, CardBody } from "@heroui/react";
import { CharacterBasic } from "@/types/character-types";
import { normalizeLabel } from "@/lib/utils";
import StatusDot from "../ui/status-dot";

export default function CharacterCard({
  char,
  onClick,
}: {
  char: CharacterBasic;
  onClick?: () => void;
}) {
  return (
    <Card
      isPressable
      onPress={onClick}
      className="h-full w-full min-w-[300px] sm:min-w-[280px] shadow-none flex flex-col bg-content-2 overflow-hidden rounded-xl transition-transform will-change-transform hover:scale-[1.01]"
      role="article"
      aria-label={char.name}
    >
      <CardBody className="p-4 flex flex-col space-y-2">
        <h3 className="text-lg font-semibold leading-tight break-words">{char.name}</h3>

        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
          <StatusDot status={char.status} />
          <span className="text-foreground">{normalizeLabel(char.status, { singleWord: true })}</span>
          <span className="text-foreground/50">•</span>
          <span className="text-foreground">{char.species}</span>
          <span className="text-foreground/50">•</span>
          <span className="text-foreground">{normalizeLabel(char.gender, { singleWord: true })}</span>
        </div>
      </CardBody>
    </Card>
  );
}