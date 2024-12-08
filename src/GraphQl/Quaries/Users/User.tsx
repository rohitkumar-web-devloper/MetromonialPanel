import { gql } from '@apollo/client';
export const USERS_GET = gql`
  query users($page: Int, $pageSize: Int, $filter: UserFilter) {
    users(page: $page, pageSize: $pageSize, filter: $filter) {
      users {
      id
      name
      email
      mobile
      profile
      status
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


