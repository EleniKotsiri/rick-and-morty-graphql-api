import { PreloadQuery } from "@/apollo/apollo-client";
import { GET_CHARACTERS } from "@/graphql/queries/characters-list.query";
import { CharactersQueryVars } from "@/types/character-types";
import CharactersList from "@/components/character/characters-list";

type PageProps = {
  [key: string]: string | string[] | undefined;
};

export default async function Home({
  searchParams,
}: {
  searchParams?: Promise<PageProps>;
}) {
  const searchPars = (await searchParams) ?? {};
  const nameParam = Array.isArray(searchPars.name)
    ? searchPars.name[0]
    : searchPars.name;
  const pageParam = Array.isArray(searchPars.page)
    ? searchPars.page[0]
    : searchPars.page;

  const initialName = typeof nameParam === "string" ? nameParam : "";
  const parsed = Number.parseInt(String(pageParam ?? "1"), 10);
  const initialPage = Number.isFinite(parsed) && parsed > 0 ? parsed : 1;

  const variables: CharactersQueryVars = {
    page: initialPage,
    name: initialName || undefined,
  };

  return (
    <>
      <section
        className="container px-3 sm:px-5 mx-auto"
        aria-labelledby="heading"
      >
        <h1 id="heading" className="text-2xl font-semibold">
          Rick & Morty Characters
        </h1>
        <p className="text-sm text-foreground/70">
          Search, paginate and click a card for details.
        </p>
      </section>
      <section
        className="container px-3 sm:px-5 mx-auto"
        aria-labelledby="main-content"
      >
        <PreloadQuery query={GET_CHARACTERS} variables={variables}>
          <CharactersList initialPage={initialPage} initialName={initialName} />
        </PreloadQuery>
      </section>
    </>
  );
}
