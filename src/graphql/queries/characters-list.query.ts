// Get all characters
import { gql } from "@apollo/client";
import { BASIC_CHARACTER_FIELDS } from "@/graphql/fragments";

export const GET_CHARACTERS = gql`
  ${BASIC_CHARACTER_FIELDS}
  query GetCharacters($page: Int, $name: String) {
    characters(page: $page, filter: { name: $name }) {
      info {
        count
        pages
        next
        prev
      }
      results {
        ...BasicCharacterFields
      }
    }
  }
`;
