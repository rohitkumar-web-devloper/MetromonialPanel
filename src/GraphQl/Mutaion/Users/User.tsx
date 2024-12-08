import { gql } from "@apollo/client";

const USER_POST = gql`
  mutation createUser($name: String, $email: String, $password: String,$status:Boolean,$profile:FileUpload = null) {
    createUser(name: $name, status: $status,email:$email,password:$password,profile:$profile) {
    id
    name
    email
    password
    token
    createdAt
    updatedAt
    profile
    }
  }
`;
const USER_PUT = gql`
  mutation UpdateUser($name: String, $email: String, $password: String,$status:Boolean,$profile:FileUpload,$updateUserId:ID) {
    updateUser(name: $name, status: $status,email:$email,password:$password,profile:$profile,updateUserId:$updateUserId) {
    id
    name
    email
    password
    token
    createdAt
    updatedAt
    message
    success
    profile
    }
  }
`;

export { USER_POST, USER_PUT }