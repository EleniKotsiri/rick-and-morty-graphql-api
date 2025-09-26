"use client";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Button,
  Image,
} from "@heroui/react";
import { GET_CHARACTER_DETAIL } from "@/graphql/queries/character-detail.query";
import { CharacterBasic, CharacterDetailType, CharacterDetailData, CharacterDetailVars } from "@/types/character-types";
import { useQuery } from "@apollo/client/react";
import StatusDot from "../ui/status-dot";
import { normalizeLabel } from "@/lib/utils";

function CharacterDetailContent({
  id,
  fallbackBasic,
}: {
  id: string;
  fallbackBasic?: CharacterBasic;
}) {
  const { data, loading, error } = useQuery<
    CharacterDetailData,
    CharacterDetailVars
  >(GET_CHARACTER_DETAIL, {
    variables: { id: String(id) },
    skip: !id, // ensures it won't be called if undefined
    fetchPolicy: "cache-first",
  });

  if (!id) return null;
  if (loading && !data)
    return <div className="py-6 text-sm">Loading details…</div>;
  if (error)
    return (
      <div className="py-6 text-sm text-red-600">Failed to load details.</div>
    );

  const c: CharacterDetailType = data!.character ?? fallbackBasic;
  const episodes = Array.isArray((c as any).episode)
    ? (c as any).episode.length
    : 0;

  return (
    <>
      {c.image ? (
        <Image
          src={c.image}
          alt={c.name}
          width={400}
          height={300}
          className="w-full object-cover aspect-[4/3] rounded-lg"
        />
      ) : null}

      <dl className="grid gap-2 text-sm">
        <DetailField label="Status" value={normalizeLabel(c.status, { singleWord: true })} />
        <DetailField label="Species" value={c.species} />
        <DetailField label="Gender" value={normalizeLabel(c.gender, { singleWord: true })}/>
        <DetailField label="Origin" value={normalizeLabel(c.origin?.name)} />
        <DetailField label="Location" value={normalizeLabel(c.location?.name)} />
        <DetailField label="Episode count" value={String(episodes)} />
      </dl>
    </>
  );
}

export default function CharacterDetail({
  charId,
  fallbackBasic,
  onClose,
}: {
  charId: string | null;
  fallbackBasic?: CharacterBasic;
  onClose: () => void;
}) {
  const open = Boolean(charId);

  return (
    <Drawer
      isOpen={open}
      onOpenChange={(v) => !v && onClose()}
      placement="left"
      hideCloseButton
      size="md"
    >
      <DrawerContent className="bg-content-2 h-[85dvh] mt-3 p-2 sm:p-4 sm:h-[100dvh] sm:mt-0">
        {(close) => (
          <>
            <DrawerHeader className="px-4 py-3 border-b border-border/50">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold">{fallbackBasic?.name}</h2>
                {charId ? <StatusDot status={fallbackBasic?.status} /> : null}
                <span className="text-foreground/50">{normalizeLabel(fallbackBasic?.status, { singleWord: true })}</span>
              </div>
            </DrawerHeader>

            <DrawerBody className="px-4 py-4 space-y-4">
              {charId ? (
                <CharacterDetailContent id={charId} fallbackBasic={fallbackBasic} />
              ) : null}

              <div className="pt-2">
                <Button variant="ghost" onPress={close} className="w-full p-2 sm:p-4" aria-label="Close details">
                  Close
                </Button>
              </div>
            </DrawerBody>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
}

function DetailField({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-2">
      <dt className="w-32 shrink-0 text-foreground/60">{label}</dt>
      <dd className="font-medium">{value}</dd>
    </div>
  );
}
