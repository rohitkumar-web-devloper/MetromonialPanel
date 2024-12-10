import { gql } from "@apollo/client";

export const SLOT_POST = gql`
  mutation createTimeSlot($name: String, $startTime: String, $endTime: String, $status: Boolean) {
    createTimeSlot(name: $name, startTime: $startTime, endTime: $endTime, status: $status) {
    createdById
    createdByName
    endTime
    id
    name
    startTime
    status
    }
  }
`;
export const SLOT_PUT = gql`
  mutation updateTimeSlot($id: ID!, $ name: String, $startTime: String, $endTime: String, $status: Boolean) {
    updateTimeSlot(id: $id, name: $name, startTime: $startTime, endTime: $endTime, status: $status) {
    createdById
    createdByName
    endTime
    id
    name
    startTime
    status
    }
  }
`;