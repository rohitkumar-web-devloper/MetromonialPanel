import { gql } from "@apollo/client";

const PACAKGE_POST = gql`
  mutation createPlan($name: String, $image: FileUpload = null, $description: String, $price: Int, $credits: Int, $timeSlots: String, $type: String, $status: Boolean) {
    createPlan(name: $name, image: $image, description: $description, price: $price, credits: $credits, timeSlots: $timeSlots, type: $type, status: $status) {
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
  }
`;
const PACAKGE_PUT = gql`
  mutation createPlan($id: ID!,$name: String,  $description: String, $price: Int, $credits: Int, $timeSlots: String, $type: String, $status: Boolean) {
    updatePlan(id:$id, name: $name, description: $description, price: $price, credits: $credits, timeSlots: $timeSlots, type: $type, status: $status) {
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
  }
`;

export { PACAKGE_POST, PACAKGE_PUT }