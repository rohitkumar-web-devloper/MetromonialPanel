import { gql } from "@apollo/client";

export const Categorys = gql`
  query GetCategories($page: Int, $pageSize: Int, $filter: CategoryFilter) {
    categories(page: $page, pageSize: $pageSize, filter: $filter) {
      categories {
      createdAt
      createdById
      createdByName
      description
      id
      image
      name
      status
      updatedAt
    }
    page
    pageSize
    totalCount
    totalPages
    }
  }
`;
