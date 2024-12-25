import { gql } from "@apollo/client";

const PACAKGE_POST = gql`
  mutation createPlan($timeSlots: [Int!]!, $name: String, $image: Upload, $description: String, $price: Int, $credits: Int, $type: String, $status: Boolean) {
    createPlan(timeSlots: $timeSlots, name: $name, image: $image, description: $description, price: $price, credits: $credits, type: $type, status: $status) {
    id
    name
    image
    description
    price
    credits
    timeSlots {
      planId
      slots {
        endTime
        startTime
      }
      timeSlotId
    }
    type
    status
    createdAt
    updatedAt
    }
  }
`;
const PACAKGE_PUT = gql`
  mutation updatePlan($id: ID!, $name: String, $description: String, $price: Int, $credits: Int, $timeSlots: [Int!], $type: String, $status: Boolean, $image: Upload) {
    updatePlan(id: $id, name: $name, description: $description, price: $price, credits: $credits, timeSlots: $timeSlots, type: $type, status: $status, image: $image) {
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
        endTime
        startTime
      }
      timeSlotId
    }
    type
    updatedAt
    }
  }
`;

export { PACAKGE_POST, PACAKGE_PUT }