import { gql } from '@apollo/client';
export const PACKAGES_GET = gql`
  query Plans($page: Int, $pageSize: Int, $filter: PlanFilter) {
    plans(page: $page, pageSize: $pageSize, filter: $filter) {
      plans {
        id
      name
      image
      description
      price
      credits
      timeSlots
      type
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

