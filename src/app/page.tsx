import { PreloadQuery } from "@/apollo/apollo-client";
import { GET_CHARACTERS } from "@/graphql/queries/characters-list.query";
import { CharactersQueryVars } from "@/types/character-types";
import CharactersList from "@/components/character/characters-list";

export default async function Home() {
  const variables: CharactersQueryVars = { page: 1, name: "" };

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
          <CharactersList initialPage={1} initialName="" />
        </PreloadQuery>
      </section>
    </>
  );
}
