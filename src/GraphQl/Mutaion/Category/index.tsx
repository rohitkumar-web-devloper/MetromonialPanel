import { gql } from '@apollo/client';

const CATEGORY_POST = gql`
  mutation createCategories($name: String!, $status: Boolean!,$image:Upload,$description:String) {
    createCategories(name: $name, status: $status,image:$image,description:$description ) {
    createdAt
    id
    name
    createdByName
    updatedAt
    }
  }
`;
const CATEGORY_PUT = gql`
  mutation updateCategories($name: String!, $status: Boolean!,$id: ID!,$image:Upload,$description:String) {
    updateCategories(name: $name, status: $status, id: $id,image:$image,description:$description) {
    createdAt
    id
    name
    createdByName
    updatedAt
    }
  }
`;

export { CATEGORY_PUT, CATEGORY_POST };
