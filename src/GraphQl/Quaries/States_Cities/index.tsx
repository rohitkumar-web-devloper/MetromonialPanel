import { gql } from '@apollo/client';
export const STATES_GET = gql`
  query states($page: Int, $pageSize: Int, $filter: UserFilter) {
    states(page: $page, pageSize: $pageSize, filter: $filter) {
    page
    pageSize
    states {
    id
    name
    updatedAt
    createdAt
    }
      totalCount
      totalPages
    }
  }
`;
export const CITIES_GET = gql`
  query cities($stateId: ID, $page: Int, $pageSize: Int, $filter: UserFilter) {
    cities(stateId: $stateId, page: $page, pageSize: $pageSize, filter: $filter) {
        cities {
        id
        name
        stateId
        updatedAt
        createdAt
      }
      page
      pageSize
      totalCount
      totalPages
    }
  }
`;