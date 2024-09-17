/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createBalance = /* GraphQL */ `mutation CreateBalance(
  $condition: ModelBalanceConditionInput
  $input: CreateBalanceInput!
) {
  createBalance(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateBalanceMutationVariables,
  APITypes.CreateBalanceMutation
>;
export const createBudget = /* GraphQL */ `mutation CreateBudget(
  $condition: ModelBudgetConditionInput
  $input: CreateBudgetInput!
) {
  createBudget(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateBudgetMutationVariables,
  APITypes.CreateBudgetMutation
>;
export const createPot = /* GraphQL */ `mutation CreatePot(
  $condition: ModelPotConditionInput
  $input: CreatePotInput!
) {
  createPot(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreatePotMutationVariables,
  APITypes.CreatePotMutation
>;
export const createTransaction = /* GraphQL */ `mutation CreateTransaction(
  $condition: ModelTransactionConditionInput
  $input: CreateTransactionInput!
) {
  createTransaction(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateTransactionMutationVariables,
  APITypes.CreateTransactionMutation
>;
export const createUserProfile = /* GraphQL */ `mutation CreateUserProfile(
  $condition: ModelUserProfileConditionInput
  $input: CreateUserProfileInput!
) {
  createUserProfile(condition: $condition, input: $input) {
    createdAt
    email
    id
    profileOwner
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateUserProfileMutationVariables,
  APITypes.CreateUserProfileMutation
>;
export const deleteBalance = /* GraphQL */ `mutation DeleteBalance(
  $condition: ModelBalanceConditionInput
  $input: DeleteBalanceInput!
) {
  deleteBalance(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteBalanceMutationVariables,
  APITypes.DeleteBalanceMutation
>;
export const deleteBudget = /* GraphQL */ `mutation DeleteBudget(
  $condition: ModelBudgetConditionInput
  $input: DeleteBudgetInput!
) {
  deleteBudget(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteBudgetMutationVariables,
  APITypes.DeleteBudgetMutation
>;
export const deletePot = /* GraphQL */ `mutation DeletePot(
  $condition: ModelPotConditionInput
  $input: DeletePotInput!
) {
  deletePot(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeletePotMutationVariables,
  APITypes.DeletePotMutation
>;
export const deleteTransaction = /* GraphQL */ `mutation DeleteTransaction(
  $condition: ModelTransactionConditionInput
  $input: DeleteTransactionInput!
) {
  deleteTransaction(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteTransactionMutationVariables,
  APITypes.DeleteTransactionMutation
>;
export const deleteUserProfile = /* GraphQL */ `mutation DeleteUserProfile(
  $condition: ModelUserProfileConditionInput
  $input: DeleteUserProfileInput!
) {
  deleteUserProfile(condition: $condition, input: $input) {
    createdAt
    email
    id
    profileOwner
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteUserProfileMutationVariables,
  APITypes.DeleteUserProfileMutation
>;
export const updateBalance = /* GraphQL */ `mutation UpdateBalance(
  $condition: ModelBalanceConditionInput
  $input: UpdateBalanceInput!
) {
  updateBalance(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateBalanceMutationVariables,
  APITypes.UpdateBalanceMutation
>;
export const updateBudget = /* GraphQL */ `mutation UpdateBudget(
  $condition: ModelBudgetConditionInput
  $input: UpdateBudgetInput!
) {
  updateBudget(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateBudgetMutationVariables,
  APITypes.UpdateBudgetMutation
>;
export const updatePot = /* GraphQL */ `mutation UpdatePot(
  $condition: ModelPotConditionInput
  $input: UpdatePotInput!
) {
  updatePot(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdatePotMutationVariables,
  APITypes.UpdatePotMutation
>;
export const updateTransaction = /* GraphQL */ `mutation UpdateTransaction(
  $condition: ModelTransactionConditionInput
  $input: UpdateTransactionInput!
) {
  updateTransaction(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateTransactionMutationVariables,
  APITypes.UpdateTransactionMutation
>;
export const updateUserProfile = /* GraphQL */ `mutation UpdateUserProfile(
  $condition: ModelUserProfileConditionInput
  $input: UpdateUserProfileInput!
) {
  updateUserProfile(condition: $condition, input: $input) {
    createdAt
    email
    id
    profileOwner
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateUserProfileMutationVariables,
  APITypes.UpdateUserProfileMutation
>;
