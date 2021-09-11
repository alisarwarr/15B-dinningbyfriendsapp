/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const allUsers = /* GraphQL */ `
  query AllUsers {
    allUsers {
      id
      name
    }
  }
`;
export const getUserByName = /* GraphQL */ `
  query GetUserByName($name: String!) {
    getUserByName(name: $name) {
      id
      name
    }
  }
`;
export const allRestaurants = /* GraphQL */ `
  query AllRestaurants {
    allRestaurants {
      id
      name
      cuisine
      address
    }
  }
`;
export const getRestaurantByName = /* GraphQL */ `
  query GetRestaurantByName($name: ID!) {
    getRestaurantByName(name: $name) {
      id
      name
      cuisine
      address
    }
  }
`;
export const allUserfriends = /* GraphQL */ `
  query AllUserfriends($id: ID!) {
    allUserfriends(id: $id) {
      id
      name
    }
  }
`;
export const getUserfriendById = /* GraphQL */ `
  query GetUserfriendById($idFrom: ID!, $idTo: ID!) {
    getUserfriendById(idFrom: $idFrom, idTo: $idTo) {
      id
      name
    }
  }
`;
export const allUserrestaurants = /* GraphQL */ `
  query AllUserrestaurants($id: ID!) {
    allUserrestaurants(id: $id) {
      id
      name
      cuisine
      address
    }
  }
`;
export const getUserrestaurantById = /* GraphQL */ `
  query GetUserrestaurantById($idFrom: ID!, $idTo: ID!) {
    getUserrestaurantById(idFrom: $idFrom, idTo: $idTo) {
      id
      name
      cuisine
      address
    }
  }
`;
export const allRestaurantusers = /* GraphQL */ `
  query AllRestaurantusers($id: ID!) {
    allRestaurantusers(id: $id) {
      id
      name
    }
  }
`;
export const getRestaurantuserById = /* GraphQL */ `
  query GetRestaurantuserById($idFrom: ID!, $idTo: ID!) {
    getRestaurantuserById(idFrom: $idFrom, idTo: $idTo) {
      id
      name
    }
  }
`;
export const allRestaurantuserreviews = /* GraphQL */ `
  query AllRestaurantuserreviews($id: ID!) {
    allRestaurantuserreviews(id: $id) {
      r_id
      r_restaurantId_ExistInRestaurantsTable
      r_userId_ExistInUsersTable
      r_userName_ExistInUsersTable
      r_text
    }
  }
`;
export const getRestaurantuserreviewByUserId = /* GraphQL */ `
  query GetRestaurantuserreviewByUserId($idFrom: ID!, $idTo: ID!) {
    getRestaurantuserreviewByUserId(idFrom: $idFrom, idTo: $idTo) {
      r_id
      r_restaurantId_ExistInRestaurantsTable
      r_userId_ExistInUsersTable
      r_userName_ExistInUsersTable
      r_text
    }
  }
`;
export const allRestaurantuserreviewpersonalizations = /* GraphQL */ `
  query AllRestaurantuserreviewpersonalizations($id: ID!, $hisId: ID!) {
    allRestaurantuserreviewpersonalizations(id: $id, hisId: $hisId) {
      p_id
      p_reviewId_ExistInReviewsTable
      p_userId_ExistInUsersTable
      p_userName_ExistInUsersTable
      p_useful
    }
  }
`;
export const getRestaurantuserreviewpersonalizationByUserId = /* GraphQL */ `
  query GetRestaurantuserreviewpersonalizationByUserId(
    $idFrom: ID!
    $idTo: ID!
    $hisId: ID!
  ) {
    getRestaurantuserreviewpersonalizationByUserId(
      idFrom: $idFrom
      idTo: $idTo
      hisId: $hisId
    ) {
      p_id
      p_reviewId_ExistInReviewsTable
      p_userId_ExistInUsersTable
      p_userName_ExistInUsersTable
      p_useful
    }
  }
`;
export const all_Restaurantuserreviews_Restaurantuserreviewpersonalizations_InOneRestaurant_ByUserId = /* GraphQL */ `
  query All_Restaurantuserreviews_Restaurantuserreviewpersonalizations_InOneRestaurant_ByUserId(
    $id: ID!
    $hisId: ID!
  ) {
    all_Restaurantuserreviews_Restaurantuserreviewpersonalizations_InOneRestaurant_ByUserId(
      id: $id
      hisId: $hisId
    ) {
      r_id
      r_restaurantId_ExistInRestaurantsTable
      r_userId_ExistInUsersTable
      r_userName_ExistInUsersTable
      r_text
      p_id
      p_reviewId_ExistInReviewsTable
      p_userId_ExistInUsersTable
      p_userName_ExistInUsersTable
      p_useful
    }
  }
`;
export const all_Restaurantuserreviews_Restaurantuserreviewpersonalizations_InAllRestaurants_ByUserId = /* GraphQL */ `
  query All_Restaurantuserreviews_Restaurantuserreviewpersonalizations_InAllRestaurants_ByUserId(
    $id: ID!
    $hisId: ID!
  ) {
    all_Restaurantuserreviews_Restaurantuserreviewpersonalizations_InAllRestaurants_ByUserId(
      id: $id
      hisId: $hisId
    ) {
      r_id
      r_restaurantId_ExistInRestaurantsTable
      r_userId_ExistInUsersTable
      r_userName_ExistInUsersTable
      r_text
      p_id
      p_reviewId_ExistInReviewsTable
      p_userId_ExistInUsersTable
      p_userName_ExistInUsersTable
      p_useful
    }
  }
`;