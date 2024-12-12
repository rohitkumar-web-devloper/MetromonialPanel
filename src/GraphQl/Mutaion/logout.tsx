import { gql } from "@apollo/client";

export const LOGOUT_POST = gql`
  mutation logoutUser {
    logoutUser {
        message
        success
    }
  }
`;