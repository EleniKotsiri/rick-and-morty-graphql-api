"use client";

import { Pagination } from "@heroui/react";
import { Suspense, useState, useMemo, useEffect, useRef } from "react";
import { GET_CHARACTERS } from "@/graphql/queries/characters-list.query";
import {
  CharacterBasic,
  CharactersQueryData,
  CharactersQueryVars,
} from "@/types/character-types";
import { useSuspenseQuery } from "@apollo/client/react";
import CharacterCard from "./character-card";
import CharacterDetail from "./character-detail";
import { useDebounce } from "@/hooks/use-debounce";
import SearchBar from "../ui/search-input";
import SkeletonGrid from "../ui/skeleton-grid";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function CharactersList({
  initialPage = 1,
  initialName = "",
}: {
  initialPage?: number;
  initialName?: string;
}) {
  const [page, setPage] = useState(initialPage);
  const [name, setName] = useState(initialName);
  const [selected, setSelected] = useState<CharacterBasic | null>(null);
  const debouncedName = useDebounce(name, 450);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Reset page when the user uses search input
  const didMount = useRef(false);
  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      return;
    }
    setPage(1);
  }, [name]);

  // Sync state
  useEffect(() => {
    const params = new URLSearchParams();

    const trimmed = name.trim();
    if (trimmed) params.set("name", trimmed);
    if (page > 1) params.set("page", String(page));

    if (page > 1) params.set("page", String(page));
    else params.delete("page");

    const next = params.toString();
    const curr = searchParams.toString();
    if (next !== curr) {
      router.replace(next ? `${pathname}?${next}` : pathname, {
        scroll: false,
      });
    }
  }, [name, page, pathname, router, searchParams]);

  return (
    <section className="space-y-4" aria-labelledby="characters-list">
      <SearchBar
        value={name}
        onChange={setName}
        className="bg-background/70 rounded-xl p-0 my-4 md:my-6"
      />
      <h2 id="results-heading" className="sr-only">
        Results
      </h2>

      <Suspense
        fallback={
          <div className="flex-1 min-h-[60vh]">
            <SkeletonGrid />
          </div>
        }
      >
        <CharactersResults
          page={page}
          name={debouncedName}
          onSetPage={setPage}
          onSelect={setSelected}
        />
      </Suspense>
      <CharacterDetail
        charId={selected?.id ?? null}
        fallbackBasic={selected ?? undefined}
        onClose={() => setSelected(null)}
      />
    </section>
  );
}

function CharactersResults({
  page,
  name,
  onSetPage,
  onSelect,
}: {
  page: number;
  name: string;
  onSetPage: (p: number) => void;
  onSelect: (c: CharacterBasic | null) => void;
}) {
  const variables = useMemo<CharactersQueryVars>(
    () => ({
      page,
      name: name.trim() ? name.trim() : undefined,
    }),
    [page, name]
  );

  const { data } = useSuspenseQuery<CharactersQueryData, CharactersQueryVars>(
    GET_CHARACTERS,
    { variables }
  );

  const info = data?.characters?.info;
  const results = data?.characters?.results ?? [];

  // clamp page if it doesn't exist
  useEffect(() => {
    const total = info?.pages;
    if (typeof total === "number" && page > total) onSetPage(1);
  }, [info?.pages, page, onSetPage]);

  if (!results.length) {
    return (
      <div className="rounded border border-content-3 bg-content-2 p-4">
        {name ? <>No results for "{name}".</> : <>No character found.</>}
      </div>
    );
  }

  return (
    <>
      <h2 id="results-heading" className="sr-only">
        Results
      </h2>

      <ul
        role="list"
        className="grid gap-3 grid-cols-1 sm:[grid-template-columns:repeat(auto-fit,minmax(280px,1fr))] auto-rows-fr xl:gap-6"
      >
        {results.map((char) => (
          <li key={char!.id} className="h-full min-w-0 mx-auto sm:mx-0">
            <CharacterCard char={char!} onClick={() => onSelect(char!)} />
          </li>
        ))}
      </ul>

      <Pagination
        total={info?.pages ?? 1}
        page={page}
        onChange={onSetPage}
        showControls
        isCompact
        className="flex justify-center mt-2 sm:mt-6"
        classNames={{
          item: "cursor-pointer",
        }}
      />
    </>
  );
}
