import { gql } from '@apollo/client';
export const CUSTOMERS_GET = gql`
  query customers($page: Int, $pageSize: Int, $filter: PlanFilter) {
    customers(page: $page, pageSize: $pageSize, filter: $filter) {
        customers {
      createdAt
      email
      firstName
      id
      lastName
      mobile
      password
      profile
      status
      updatedAt
    }
    totalCount
    page
    pageSize
    totalPages
    }
  }
`;

