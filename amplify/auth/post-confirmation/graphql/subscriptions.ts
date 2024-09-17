/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateBalance = /* GraphQL */ `subscription OnCreateBalance(
  $filter: ModelSubscriptionBalanceFilterInput
  $owner: String
) {
  onCreateBalance(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnCreateBalanceSubscriptionVariables,
  APITypes.OnCreateBalanceSubscription
>;
export const onCreateBudget = /* GraphQL */ `subscription OnCreateBudget(
  $filter: ModelSubscriptionBudgetFilterInput
  $owner: String
) {
  onCreateBudget(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnCreateBudgetSubscriptionVariables,
  APITypes.OnCreateBudgetSubscription
>;
export const onCreatePot = /* GraphQL */ `subscription OnCreatePot(
  $filter: ModelSubscriptionPotFilterInput
  $owner: String
) {
  onCreatePot(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnCreatePotSubscriptionVariables,
  APITypes.OnCreatePotSubscription
>;
export const onCreateTransaction = /* GraphQL */ `subscription OnCreateTransaction(
  $filter: ModelSubscriptionTransactionFilterInput
  $owner: String
) {
  onCreateTransaction(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnCreateTransactionSubscriptionVariables,
  APITypes.OnCreateTransactionSubscription
>;
export const onCreateUserProfile = /* GraphQL */ `subscription OnCreateUserProfile(
  $filter: ModelSubscriptionUserProfileFilterInput
  $profileOwner: String
) {
  onCreateUserProfile(filter: $filter, profileOwner: $profileOwner) {
    createdAt
    email
    id
    profileOwner
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateUserProfileSubscriptionVariables,
  APITypes.OnCreateUserProfileSubscription
>;
export const onDeleteBalance = /* GraphQL */ `subscription OnDeleteBalance(
  $filter: ModelSubscriptionBalanceFilterInput
  $owner: String
) {
  onDeleteBalance(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteBalanceSubscriptionVariables,
  APITypes.OnDeleteBalanceSubscription
>;
export const onDeleteBudget = /* GraphQL */ `subscription OnDeleteBudget(
  $filter: ModelSubscriptionBudgetFilterInput
  $owner: String
) {
  onDeleteBudget(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteBudgetSubscriptionVariables,
  APITypes.OnDeleteBudgetSubscription
>;
export const onDeletePot = /* GraphQL */ `subscription OnDeletePot(
  $filter: ModelSubscriptionPotFilterInput
  $owner: String
) {
  onDeletePot(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnDeletePotSubscriptionVariables,
  APITypes.OnDeletePotSubscription
>;
export const onDeleteTransaction = /* GraphQL */ `subscription OnDeleteTransaction(
  $filter: ModelSubscriptionTransactionFilterInput
  $owner: String
) {
  onDeleteTransaction(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteTransactionSubscriptionVariables,
  APITypes.OnDeleteTransactionSubscription
>;
export const onDeleteUserProfile = /* GraphQL */ `subscription OnDeleteUserProfile(
  $filter: ModelSubscriptionUserProfileFilterInput
  $profileOwner: String
) {
  onDeleteUserProfile(filter: $filter, profileOwner: $profileOwner) {
    createdAt
    email
    id
    profileOwner
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteUserProfileSubscriptionVariables,
  APITypes.OnDeleteUserProfileSubscription
>;
export const onUpdateBalance = /* GraphQL */ `subscription OnUpdateBalance(
  $filter: ModelSubscriptionBalanceFilterInput
  $owner: String
) {
  onUpdateBalance(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateBalanceSubscriptionVariables,
  APITypes.OnUpdateBalanceSubscription
>;
export const onUpdateBudget = /* GraphQL */ `subscription OnUpdateBudget(
  $filter: ModelSubscriptionBudgetFilterInput
  $owner: String
) {
  onUpdateBudget(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateBudgetSubscriptionVariables,
  APITypes.OnUpdateBudgetSubscription
>;
export const onUpdatePot = /* GraphQL */ `subscription OnUpdatePot(
  $filter: ModelSubscriptionPotFilterInput
  $owner: String
) {
  onUpdatePot(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnUpdatePotSubscriptionVariables,
  APITypes.OnUpdatePotSubscription
>;
export const onUpdateTransaction = /* GraphQL */ `subscription OnUpdateTransaction(
  $filter: ModelSubscriptionTransactionFilterInput
  $owner: String
) {
  onUpdateTransaction(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateTransactionSubscriptionVariables,
  APITypes.OnUpdateTransactionSubscription
>;
export const onUpdateUserProfile = /* GraphQL */ `subscription OnUpdateUserProfile(
  $filter: ModelSubscriptionUserProfileFilterInput
  $profileOwner: String
) {
  onUpdateUserProfile(filter: $filter, profileOwner: $profileOwner) {
    createdAt
    email
    id
    profileOwner
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateUserProfileSubscriptionVariables,
  APITypes.OnUpdateUserProfileSubscription
>;
