import { gql } from '@apollo/client'

const CITY_POST = gql`
  mutation createCity($name: String, $createCityStateId2: ID) {
    createCity(name: $name, stateId: $createCityStateId2) {
      createdAt
      id
      name
      stateId
      updatedAt
    }
  }
`
const CITY_PUT = gql`
  mutation updateCity($id: Int, $name: String, $stateId: ID) {
    updateCity(id: $id, name: $name, stateId: $stateId) {
      createdAt
      id
      name
      stateId
      updatedAt
    }
  }
`

export { CITY_POST, CITY_PUT }
