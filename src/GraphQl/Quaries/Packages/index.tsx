import { gql } from '@apollo/client';
export const PACKAGES_GET = gql`
  query Plans($page: Int, $pageSize: Int, $filter: PlanFilter) {
    plans(page: $page, pageSize: $pageSize, filter: $filter) {
      page
    pageSize
    plans {
      createdAt
      credits
      description
      id
      image
      name
      price
      status
      timeSlots {
        planId
        slots {
          startTime
          endTime
        }
        timeSlotId
      }
      type
      updatedAt
    }
    totalCount
    totalPages
    }
  }
`;

