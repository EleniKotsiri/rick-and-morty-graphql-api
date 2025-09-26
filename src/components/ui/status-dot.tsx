import { CharacterBasic } from "@/types/character-types";

export default function StatusDot({ status }: { status: CharacterBasic["status"] | undefined }) {
  const color =
    status === "Alive"
      ? "bg-emerald-500"
      : status === "Dead"
      ? "bg-rose-500"
      : "bg-muted";
  return (
    <span
      className={`h-2.5 w-2.5 rounded-full ${color}`}
      aria-hidden
    />
  );
}