import { gql } from '@apollo/client';

const CATEGORY_POST = gql`
  mutation createCategories($name: String!, $status: Boolean!) {
    createCategories(name: $name, status: $status) {
    createdAt
    id
    name
    createdByName
    updatedAt
    message
    success
    }
  }
`;
const CATEGORY_PUT = gql`
  mutation updateCategories($name: String!, $status: Boolean!,$id: ID!) {
    updateCategories(name: $name, status: $status, id: $id) {
    createdAt
    id
    name
    createdByName
    updatedAt
    message
    success
    }
  }
`;

export { CATEGORY_PUT, CATEGORY_POST };
