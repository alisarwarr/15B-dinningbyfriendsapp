/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser($name: String!) {
    createUser(name: $name) {
      result
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser($id: ID!, $name: String!) {
    deleteUser(id: $id, name: $name) {
      result
    }
  }
`;
export const createRestaurant = /* GraphQL */ `
  mutation CreateRestaurant(
    $name: String!
    $cuisine: String!
    $address: String!
  ) {
    createRestaurant(name: $name, cuisine: $cuisine, address: $address) {
      result
    }
  }
`;
export const deleteRestaurant = /* GraphQL */ `
  mutation DeleteRestaurant($id: ID!) {
    deleteRestaurant(id: $id) {
      result
    }
  }
`;
export const createUserfriend = /* GraphQL */ `
  mutation CreateUserfriend($idFrom: ID!, $idTo: ID!) {
    createUserfriend(idFrom: $idFrom, idTo: $idTo) {
      result
    }
  }
`;
export const deleteUserfriend = /* GraphQL */ `
  mutation DeleteUserfriend($idFrom: ID!, $idTo: ID!) {
    deleteUserfriend(idFrom: $idFrom, idTo: $idTo) {
      result
    }
  }
`;
export const createUserrestaurant = /* GraphQL */ `
  mutation CreateUserrestaurant($idFrom: ID!, $idTo: ID!) {
    createUserrestaurant(idFrom: $idFrom, idTo: $idTo) {
      result
    }
  }
`;
export const deleteUserrestaurant = /* GraphQL */ `
  mutation DeleteUserrestaurant($idFrom: ID!, $idTo: ID!) {
    deleteUserrestaurant(idFrom: $idFrom, idTo: $idTo) {
      result
    }
  }
`;
export const createRestaurantuser = /* GraphQL */ `
  mutation CreateRestaurantuser($idFrom: ID!, $idTo: ID!) {
    createRestaurantuser(idFrom: $idFrom, idTo: $idTo) {
      result
    }
  }
`;
export const deleteRestaurantuser = /* GraphQL */ `
  mutation DeleteRestaurantuser($idFrom: ID!, $idTo: ID!) {
    deleteRestaurantuser(idFrom: $idFrom, idTo: $idTo) {
      result
    }
  }
`;
export const createRestaurantuserreview = /* GraphQL */ `
  mutation CreateRestaurantuserreview(
    $idFrom: ID!
    $idTo: ID!
    $hisName: String!
    $text: String!
  ) {
    createRestaurantuserreview(
      idFrom: $idFrom
      idTo: $idTo
      hisName: $hisName
      text: $text
    ) {
      result
    }
  }
`;
export const deleteRestaurantuserreview = /* GraphQL */ `
  mutation DeleteRestaurantuserreview($idFrom: ID!, $idTo: ID!) {
    deleteRestaurantuserreview(idFrom: $idFrom, idTo: $idTo) {
      result
    }
  }
`;
export const editRestaurantuserreview = /* GraphQL */ `
  mutation EditRestaurantuserreview($idFrom: ID!, $idTo: ID!, $text: String!) {
    editRestaurantuserreview(idFrom: $idFrom, idTo: $idTo, text: $text) {
      result
    }
  }
`;
export const createRestaurantuserreviewpersonalization = /* GraphQL */ `
  mutation CreateRestaurantuserreviewpersonalization(
    $idFrom: ID!
    $idTo: ID!
    $hisId: ID!
    $hisName: String!
    $useful: Boolean!
  ) {
    createRestaurantuserreviewpersonalization(
      idFrom: $idFrom
      idTo: $idTo
      hisId: $hisId
      hisName: $hisName
      useful: $useful
    ) {
      result
    }
  }
`;
export const deleteRestaurantuserreviewpersonalization = /* GraphQL */ `
  mutation DeleteRestaurantuserreviewpersonalization(
    $idFrom: ID!
    $idTo: ID!
    $hisId: ID!
  ) {
    deleteRestaurantuserreviewpersonalization(
      idFrom: $idFrom
      idTo: $idTo
      hisId: $hisId
    ) {
      result
    }
  }
`;
export const editRestaurantuserreviewpersonalization = /* GraphQL */ `
  mutation EditRestaurantuserreviewpersonalization(
    $idFrom: ID!
    $idTo: ID!
    $hisId: ID!
    $useful: Boolean!
  ) {
    editRestaurantuserreviewpersonalization(
      idFrom: $idFrom
      idTo: $idTo
      hisId: $hisId
      useful: $useful
    ) {
      result
    }
  }
`;