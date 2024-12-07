import { gql } from "@apollo/client";

export const Categorys = gql`
  query GetCategories {
    categories {
    id
    name
    createdById
    createdByName
    createdAt
    updatedAt
    status
    }
  }
`;
