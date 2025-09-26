import { gql } from "@apollo/client";

export const BASIC_CHARACTER_FIELDS = gql`
  fragment BasicCharacterFields on Character {
    id
    name
    status
    species
    gender
  }
`;

export const DETAIL_CHARACTER_FIELDS = gql`
  ${BASIC_CHARACTER_FIELDS}
  fragment DetailCharacterFields on Character {
    ...BasicCharacterFields
    image
    origin {
      name
    }
    location {
      name
    }
    episode {
      id
    }
  }
`;
