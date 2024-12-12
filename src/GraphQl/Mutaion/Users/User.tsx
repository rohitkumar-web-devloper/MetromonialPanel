import { gql } from "@apollo/client";

const USER_POST = gql`
  mutation createUser($name: String, $email: String, $password: String,$status:Boolean,$profile:Upload = null,$mobile:String) {
    createUser(name: $name, status: $status,email:$email,password:$password,profile:$profile,mobile:$mobile) {
    id
    name
    email
    mobile
    password
    token
    createdAt
    updatedAt
    profile
    }
  }
`;
const USER_PUT = gql`
  mutation UpdateUser($name: String, $email: String, $password: String,$status:Boolean,$id:ID!,$mobile:String,$profile:Upload = null) {
    updateUser(name: $name, status: $status,email:$email,password:$password,id:$id,mobile:$mobile,profile:$profile) {
    id
    name
    email
    mobile
    status
    profile
    password
    }
  }
`;

export { USER_POST, USER_PUT }