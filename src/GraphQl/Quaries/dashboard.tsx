

import { gql } from '@apollo/client';
export const DASHBAORD_GET = gql`
    query dashboard {
        dashboard {
            Categories
    Adds
    Plans
    TimeSlots
    Users
      }
    }
  `;