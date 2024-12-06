import { gql } from '@apollo/client';
const Users = gql`
  query Users {
    users {
      id
      email
      name
      message
      success
    }
  }
`;

export { Users };
