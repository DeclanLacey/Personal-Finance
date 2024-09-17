/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getBalance = /* GraphQL */ `query GetBalance($id: ID!) {
  getBalance(id: $id) {
    createdAt
    current
    expenses
    id
    income
    owner
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetBalanceQueryVariables,
  APITypes.GetBalanceQuery
>;
export const getBudget = /* GraphQL */ `query GetBudget($id: ID!) {
  getBudget(id: $id) {
    category
    createdAt
    id
    maximum
    owner
    theme
    updatedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.GetBudgetQueryVariables, APITypes.GetBudgetQuery>;
export const getPot = /* GraphQL */ `query GetPot($id: ID!) {
  getPot(id: $id) {
    createdAt
    id
    name
    owner
    target
    theme
    total
    updatedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.GetPotQueryVariables, APITypes.GetPotQuery>;
export const getTransaction = /* GraphQL */ `query GetTransaction($id: ID!) {
  getTransaction(id: $id) {
    amount
    avatar
    category
    createdAt
    date
    id
    name
    owner
    recurring
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetTransactionQueryVariables,
  APITypes.GetTransactionQuery
>;
export const getUserProfile = /* GraphQL */ `query GetUserProfile($id: ID!) {
  getUserProfile(id: $id) {
    createdAt
    email
    id
    profileOwner
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetUserProfileQueryVariables,
  APITypes.GetUserProfileQuery
>;
export const listBalances = /* GraphQL */ `query ListBalances(
  $filter: ModelBalanceFilterInput
  $limit: Int
  $nextToken: String
) {
  listBalances(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      createdAt
      current
      expenses
      id
      income
      owner
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListBalancesQueryVariables,
  APITypes.ListBalancesQuery
>;
export const listBudgets = /* GraphQL */ `query ListBudgets(
  $filter: ModelBudgetFilterInput
  $limit: Int
  $nextToken: String
) {
  listBudgets(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      category
      createdAt
      id
      maximum
      owner
      theme
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListBudgetsQueryVariables,
  APITypes.ListBudgetsQuery
>;
export const listPots = /* GraphQL */ `query ListPots($filter: ModelPotFilterInput, $limit: Int, $nextToken: String) {
  listPots(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      createdAt
      id
      name
      owner
      target
      theme
      total
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListPotsQueryVariables, APITypes.ListPotsQuery>;
export const listTransactions = /* GraphQL */ `query ListTransactions(
  $filter: ModelTransactionFilterInput
  $limit: Int
  $nextToken: String
) {
  listTransactions(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      amount
      avatar
      category
      createdAt
      date
      id
      name
      owner
      recurring
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListTransactionsQueryVariables,
  APITypes.ListTransactionsQuery
>;
export const listUserProfiles = /* GraphQL */ `query ListUserProfiles(
  $filter: ModelUserProfileFilterInput
  $limit: Int
  $nextToken: String
) {
  listUserProfiles(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      createdAt
      email
      id
      profileOwner
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListUserProfilesQueryVariables,
  APITypes.ListUserProfilesQuery
>;
