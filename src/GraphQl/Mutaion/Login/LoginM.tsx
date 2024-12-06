import { gql } from '@apollo/client';

const USER_LOGIN_POST = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      id
      name
      email
      token
    }
  }
`;

export { USER_LOGIN_POST };
