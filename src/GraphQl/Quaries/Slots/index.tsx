import { gql } from '@apollo/client';
export const SLOT_GET = gql`
  query timeSlots($page: Int, $pageSize: Int, $filter: PlanFilter) {
    timeSlots(page: $page, pageSize: $pageSize, filter: $filter) {
        timeSlot {
      createdById
      createdByName
      endTime
      id
      name
      startTime 
      status
    }
    totalCount
    page
    pageSize
    totalPages
    }
  }
`;