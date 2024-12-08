import { gql } from "@apollo/client";

export const Categorys = gql`
  query GetCategories($page: Int, $pageSize: Int, $filter: CategoryFilter) {
    categories(page: $page, pageSize: $pageSize, filter: $filter) {
      categories {
      id
      name
      status
      createdById
      createdByName
      createdAt
      updatedAt
    }
    totalCount
    page
    pageSize
    totalPages
    }
  }
`;
