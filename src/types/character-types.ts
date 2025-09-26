export type CharacterStatus = "Alive" | "Dead" | "unknown";

// main types
export type CharacterBasic = {
  id: string;
  name: string;
  status: CharacterStatus;
  species: string;
  gender: string;
};

export type CharacterDetailType = CharacterBasic & {
  image: string;
  origin: { name: string } | null;
  location: { name: string } | null;
  episode: { id: string }[];
};

// data types
export type CharactersQueryData = {
  characters: {
    info: {
      count: number;
      pages: number;
      next: number | null;
      prev: number | null;
    };
    results: CharacterBasic[] | null;
  } | null;
};

export type CharacterDetailData = {
  character: CharacterDetailType;
};

// variables types
export type CharactersQueryVars = {
  page?: number;
  name?: string;
};

export type CharacterDetailVars = { id: string };