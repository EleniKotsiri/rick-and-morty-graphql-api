import { gql } from "@apollo/client";
import { DETAIL_CHARACTER_FIELDS } from "@/graphql/fragments";

export const GET_CHARACTER_DETAIL = gql`
  ${DETAIL_CHARACTER_FIELDS}
  query GetCharacterDetail($id: ID!) {
    character(id: $id) {
      ...DetailCharacterFields
    }
  }
`;
