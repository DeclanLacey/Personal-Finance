/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type Balance = {
  __typename: "Balance",
  createdAt: string,
  current?: number | null,
  expenses?: number | null,
  id: string,
  income?: number | null,
  owner?: string | null,
  updatedAt: string,
};

export type Budget = {
  __typename: "Budget",
  category?: string | null,
  createdAt: string,
  id: string,
  maximum?: number | null,
  owner?: string | null,
  theme?: string | null,
  updatedAt: string,
};

export type Pot = {
  __typename: "Pot",
  createdAt: string,
  id: string,
  name?: string | null,
  owner?: string | null,
  target?: number | null,
  theme?: string | null,
  total?: number | null,
  updatedAt: string,
};

export type Transaction = {
  __typename: "Transaction",
  amount?: number | null,
  avatar?: string | null,
  category?: string | null,
  createdAt: string,
  date?: string | null,
  id: string,
  name?: string | null,
  owner?: string | null,
  recurring?: boolean | null,
  updatedAt: string,
};

export type UserProfile = {
  __typename: "UserProfile",
  createdAt: string,
  email?: string | null,
  id: string,
  profileOwner?: string | null,
  updatedAt: string,
};

export type ModelBalanceFilterInput = {
  and?: Array< ModelBalanceFilterInput | null > | null,
  createdAt?: ModelStringInput | null,
  current?: ModelFloatInput | null,
  expenses?: ModelFloatInput | null,
  id?: ModelIDInput | null,
  income?: ModelFloatInput | null,
  not?: ModelBalanceFilterInput | null,
  or?: Array< ModelBalanceFilterInput | null > | null,
  owner?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelStringInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  _null = "_null",
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
}


export type ModelSizeInput = {
  between?: Array< number | null > | null,
  eq?: number | null,
  ge?: number | null,
  gt?: number | null,
  le?: number | null,
  lt?: number | null,
  ne?: number | null,
};

export type ModelFloatInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  between?: Array< number | null > | null,
  eq?: number | null,
  ge?: number | null,
  gt?: number | null,
  le?: number | null,
  lt?: number | null,
  ne?: number | null,
};

export type ModelIDInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  size?: ModelSizeInput | null,
};

export type ModelBalanceConnection = {
  __typename: "ModelBalanceConnection",
  items:  Array<Balance | null >,
  nextToken?: string | null,
};

export type ModelBudgetFilterInput = {
  and?: Array< ModelBudgetFilterInput | null > | null,
  category?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  id?: ModelIDInput | null,
  maximum?: ModelFloatInput | null,
  not?: ModelBudgetFilterInput | null,
  or?: Array< ModelBudgetFilterInput | null > | null,
  owner?: ModelStringInput | null,
  theme?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelBudgetConnection = {
  __typename: "ModelBudgetConnection",
  items:  Array<Budget | null >,
  nextToken?: string | null,
};

export type ModelPotFilterInput = {
  and?: Array< ModelPotFilterInput | null > | null,
  createdAt?: ModelStringInput | null,
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  not?: ModelPotFilterInput | null,
  or?: Array< ModelPotFilterInput | null > | null,
  owner?: ModelStringInput | null,
  target?: ModelFloatInput | null,
  theme?: ModelStringInput | null,
  total?: ModelFloatInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelPotConnection = {
  __typename: "ModelPotConnection",
  items:  Array<Pot | null >,
  nextToken?: string | null,
};

export type ModelTransactionFilterInput = {
  amount?: ModelFloatInput | null,
  and?: Array< ModelTransactionFilterInput | null > | null,
  avatar?: ModelStringInput | null,
  category?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  date?: ModelStringInput | null,
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  not?: ModelTransactionFilterInput | null,
  or?: Array< ModelTransactionFilterInput | null > | null,
  owner?: ModelStringInput | null,
  recurring?: ModelBooleanInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelBooleanInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  eq?: boolean | null,
  ne?: boolean | null,
};

export type ModelTransactionConnection = {
  __typename: "ModelTransactionConnection",
  items:  Array<Transaction | null >,
  nextToken?: string | null,
};

export type ModelUserProfileFilterInput = {
  and?: Array< ModelUserProfileFilterInput | null > | null,
  createdAt?: ModelStringInput | null,
  email?: ModelStringInput | null,
  id?: ModelIDInput | null,
  not?: ModelUserProfileFilterInput | null,
  or?: Array< ModelUserProfileFilterInput | null > | null,
  profileOwner?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelUserProfileConnection = {
  __typename: "ModelUserProfileConnection",
  items:  Array<UserProfile | null >,
  nextToken?: string | null,
};

export type ModelBalanceConditionInput = {
  and?: Array< ModelBalanceConditionInput | null > | null,
  createdAt?: ModelStringInput | null,
  current?: ModelFloatInput | null,
  expenses?: ModelFloatInput | null,
  income?: ModelFloatInput | null,
  not?: ModelBalanceConditionInput | null,
  or?: Array< ModelBalanceConditionInput | null > | null,
  owner?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateBalanceInput = {
  current?: number | null,
  expenses?: number | null,
  id?: string | null,
  income?: number | null,
};

export type ModelBudgetConditionInput = {
  and?: Array< ModelBudgetConditionInput | null > | null,
  category?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  maximum?: ModelFloatInput | null,
  not?: ModelBudgetConditionInput | null,
  or?: Array< ModelBudgetConditionInput | null > | null,
  owner?: ModelStringInput | null,
  theme?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateBudgetInput = {
  category?: string | null,
  id?: string | null,
  maximum?: number | null,
  theme?: string | null,
};

export type ModelPotConditionInput = {
  and?: Array< ModelPotConditionInput | null > | null,
  createdAt?: ModelStringInput | null,
  name?: ModelStringInput | null,
  not?: ModelPotConditionInput | null,
  or?: Array< ModelPotConditionInput | null > | null,
  owner?: ModelStringInput | null,
  target?: ModelFloatInput | null,
  theme?: ModelStringInput | null,
  total?: ModelFloatInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreatePotInput = {
  id?: string | null,
  name?: string | null,
  target?: number | null,
  theme?: string | null,
  total?: number | null,
};

export type ModelTransactionConditionInput = {
  amount?: ModelFloatInput | null,
  and?: Array< ModelTransactionConditionInput | null > | null,
  avatar?: ModelStringInput | null,
  category?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  date?: ModelStringInput | null,
  name?: ModelStringInput | null,
  not?: ModelTransactionConditionInput | null,
  or?: Array< ModelTransactionConditionInput | null > | null,
  owner?: ModelStringInput | null,
  recurring?: ModelBooleanInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateTransactionInput = {
  amount?: number | null,
  avatar?: string | null,
  category?: string | null,
  date?: string | null,
  id?: string | null,
  name?: string | null,
  recurring?: boolean | null,
};

export type ModelUserProfileConditionInput = {
  and?: Array< ModelUserProfileConditionInput | null > | null,
  createdAt?: ModelStringInput | null,
  email?: ModelStringInput | null,
  not?: ModelUserProfileConditionInput | null,
  or?: Array< ModelUserProfileConditionInput | null > | null,
  profileOwner?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateUserProfileInput = {
  email?: string | null,
  id?: string | null,
  profileOwner?: string | null,
};

export type DeleteBalanceInput = {
  id: string,
};

export type DeleteBudgetInput = {
  id: string,
};

export type DeletePotInput = {
  id: string,
};

export type DeleteTransactionInput = {
  id: string,
};

export type DeleteUserProfileInput = {
  id: string,
};

export type UpdateBalanceInput = {
  current?: number | null,
  expenses?: number | null,
  id: string,
  income?: number | null,
};

export type UpdateBudgetInput = {
  category?: string | null,
  id: string,
  maximum?: number | null,
  theme?: string | null,
};

export type UpdatePotInput = {
  id: string,
  name?: string | null,
  target?: number | null,
  theme?: string | null,
  total?: number | null,
};

export type UpdateTransactionInput = {
  amount?: number | null,
  avatar?: string | null,
  category?: string | null,
  date?: string | null,
  id: string,
  name?: string | null,
  recurring?: boolean | null,
};

export type UpdateUserProfileInput = {
  email?: string | null,
  id: string,
  profileOwner?: string | null,
};

export type ModelSubscriptionBalanceFilterInput = {
  and?: Array< ModelSubscriptionBalanceFilterInput | null > | null,
  createdAt?: ModelSubscriptionStringInput | null,
  current?: ModelSubscriptionFloatInput | null,
  expenses?: ModelSubscriptionFloatInput | null,
  id?: ModelSubscriptionIDInput | null,
  income?: ModelSubscriptionFloatInput | null,
  or?: Array< ModelSubscriptionBalanceFilterInput | null > | null,
  owner?: ModelStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionStringInput = {
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  in?: Array< string | null > | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionFloatInput = {
  between?: Array< number | null > | null,
  eq?: number | null,
  ge?: number | null,
  gt?: number | null,
  in?: Array< number | null > | null,
  le?: number | null,
  lt?: number | null,
  ne?: number | null,
  notIn?: Array< number | null > | null,
};

export type ModelSubscriptionIDInput = {
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  in?: Array< string | null > | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionBudgetFilterInput = {
  and?: Array< ModelSubscriptionBudgetFilterInput | null > | null,
  category?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  maximum?: ModelSubscriptionFloatInput | null,
  or?: Array< ModelSubscriptionBudgetFilterInput | null > | null,
  owner?: ModelStringInput | null,
  theme?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionPotFilterInput = {
  and?: Array< ModelSubscriptionPotFilterInput | null > | null,
  createdAt?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  or?: Array< ModelSubscriptionPotFilterInput | null > | null,
  owner?: ModelStringInput | null,
  target?: ModelSubscriptionFloatInput | null,
  theme?: ModelSubscriptionStringInput | null,
  total?: ModelSubscriptionFloatInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionTransactionFilterInput = {
  amount?: ModelSubscriptionFloatInput | null,
  and?: Array< ModelSubscriptionTransactionFilterInput | null > | null,
  avatar?: ModelSubscriptionStringInput | null,
  category?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  date?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  or?: Array< ModelSubscriptionTransactionFilterInput | null > | null,
  owner?: ModelStringInput | null,
  recurring?: ModelSubscriptionBooleanInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionBooleanInput = {
  eq?: boolean | null,
  ne?: boolean | null,
};

export type ModelSubscriptionUserProfileFilterInput = {
  and?: Array< ModelSubscriptionUserProfileFilterInput | null > | null,
  createdAt?: ModelSubscriptionStringInput | null,
  email?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  or?: Array< ModelSubscriptionUserProfileFilterInput | null > | null,
  profileOwner?: ModelStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type GetBalanceQueryVariables = {
  id: string,
};

export type GetBalanceQuery = {
  getBalance?:  {
    __typename: "Balance",
    createdAt: string,
    current?: number | null,
    expenses?: number | null,
    id: string,
    income?: number | null,
    owner?: string | null,
    updatedAt: string,
  } | null,
};

export type GetBudgetQueryVariables = {
  id: string,
};

export type GetBudgetQuery = {
  getBudget?:  {
    __typename: "Budget",
    category?: string | null,
    createdAt: string,
    id: string,
    maximum?: number | null,
    owner?: string | null,
    theme?: string | null,
    updatedAt: string,
  } | null,
};

export type GetPotQueryVariables = {
  id: string,
};

export type GetPotQuery = {
  getPot?:  {
    __typename: "Pot",
    createdAt: string,
    id: string,
    name?: string | null,
    owner?: string | null,
    target?: number | null,
    theme?: string | null,
    total?: number | null,
    updatedAt: string,
  } | null,
};

export type GetTransactionQueryVariables = {
  id: string,
};

export type GetTransactionQuery = {
  getTransaction?:  {
    __typename: "Transaction",
    amount?: number | null,
    avatar?: string | null,
    category?: string | null,
    createdAt: string,
    date?: string | null,
    id: string,
    name?: string | null,
    owner?: string | null,
    recurring?: boolean | null,
    updatedAt: string,
  } | null,
};

export type GetUserProfileQueryVariables = {
  id: string,
};

export type GetUserProfileQuery = {
  getUserProfile?:  {
    __typename: "UserProfile",
    createdAt: string,
    email?: string | null,
    id: string,
    profileOwner?: string | null,
    updatedAt: string,
  } | null,
};

export type ListBalancesQueryVariables = {
  filter?: ModelBalanceFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListBalancesQuery = {
  listBalances?:  {
    __typename: "ModelBalanceConnection",
    items:  Array< {
      __typename: "Balance",
      createdAt: string,
      current?: number | null,
      expenses?: number | null,
      id: string,
      income?: number | null,
      owner?: string | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListBudgetsQueryVariables = {
  filter?: ModelBudgetFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListBudgetsQuery = {
  listBudgets?:  {
    __typename: "ModelBudgetConnection",
    items:  Array< {
      __typename: "Budget",
      category?: string | null,
      createdAt: string,
      id: string,
      maximum?: number | null,
      owner?: string | null,
      theme?: string | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListPotsQueryVariables = {
  filter?: ModelPotFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPotsQuery = {
  listPots?:  {
    __typename: "ModelPotConnection",
    items:  Array< {
      __typename: "Pot",
      createdAt: string,
      id: string,
      name?: string | null,
      owner?: string | null,
      target?: number | null,
      theme?: string | null,
      total?: number | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListTransactionsQueryVariables = {
  filter?: ModelTransactionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTransactionsQuery = {
  listTransactions?:  {
    __typename: "ModelTransactionConnection",
    items:  Array< {
      __typename: "Transaction",
      amount?: number | null,
      avatar?: string | null,
      category?: string | null,
      createdAt: string,
      date?: string | null,
      id: string,
      name?: string | null,
      owner?: string | null,
      recurring?: boolean | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListUserProfilesQueryVariables = {
  filter?: ModelUserProfileFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUserProfilesQuery = {
  listUserProfiles?:  {
    __typename: "ModelUserProfileConnection",
    items:  Array< {
      __typename: "UserProfile",
      createdAt: string,
      email?: string | null,
      id: string,
      profileOwner?: string | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type CreateBalanceMutationVariables = {
  condition?: ModelBalanceConditionInput | null,
  input: CreateBalanceInput,
};

export type CreateBalanceMutation = {
  createBalance?:  {
    __typename: "Balance",
    createdAt: string,
    current?: number | null,
    expenses?: number | null,
    id: string,
    income?: number | null,
    owner?: string | null,
    updatedAt: string,
  } | null,
};

export type CreateBudgetMutationVariables = {
  condition?: ModelBudgetConditionInput | null,
  input: CreateBudgetInput,
};

export type CreateBudgetMutation = {
  createBudget?:  {
    __typename: "Budget",
    category?: string | null,
    createdAt: string,
    id: string,
    maximum?: number | null,
    owner?: string | null,
    theme?: string | null,
    updatedAt: string,
  } | null,
};

export type CreatePotMutationVariables = {
  condition?: ModelPotConditionInput | null,
  input: CreatePotInput,
};

export type CreatePotMutation = {
  createPot?:  {
    __typename: "Pot",
    createdAt: string,
    id: string,
    name?: string | null,
    owner?: string | null,
    target?: number | null,
    theme?: string | null,
    total?: number | null,
    updatedAt: string,
  } | null,
};

export type CreateTransactionMutationVariables = {
  condition?: ModelTransactionConditionInput | null,
  input: CreateTransactionInput,
};

export type CreateTransactionMutation = {
  createTransaction?:  {
    __typename: "Transaction",
    amount?: number | null,
    avatar?: string | null,
    category?: string | null,
    createdAt: string,
    date?: string | null,
    id: string,
    name?: string | null,
    owner?: string | null,
    recurring?: boolean | null,
    updatedAt: string,
  } | null,
};

export type CreateUserProfileMutationVariables = {
  condition?: ModelUserProfileConditionInput | null,
  input: CreateUserProfileInput,
};

export type CreateUserProfileMutation = {
  createUserProfile?:  {
    __typename: "UserProfile",
    createdAt: string,
    email?: string | null,
    id: string,
    profileOwner?: string | null,
    updatedAt: string,
  } | null,
};

export type DeleteBalanceMutationVariables = {
  condition?: ModelBalanceConditionInput | null,
  input: DeleteBalanceInput,
};

export type DeleteBalanceMutation = {
  deleteBalance?:  {
    __typename: "Balance",
    createdAt: string,
    current?: number | null,
    expenses?: number | null,
    id: string,
    income?: number | null,
    owner?: string | null,
    updatedAt: string,
  } | null,
};

export type DeleteBudgetMutationVariables = {
  condition?: ModelBudgetConditionInput | null,
  input: DeleteBudgetInput,
};

export type DeleteBudgetMutation = {
  deleteBudget?:  {
    __typename: "Budget",
    category?: string | null,
    createdAt: string,
    id: string,
    maximum?: number | null,
    owner?: string | null,
    theme?: string | null,
    updatedAt: string,
  } | null,
};

export type DeletePotMutationVariables = {
  condition?: ModelPotConditionInput | null,
  input: DeletePotInput,
};

export type DeletePotMutation = {
  deletePot?:  {
    __typename: "Pot",
    createdAt: string,
    id: string,
    name?: string | null,
    owner?: string | null,
    target?: number | null,
    theme?: string | null,
    total?: number | null,
    updatedAt: string,
  } | null,
};

export type DeleteTransactionMutationVariables = {
  condition?: ModelTransactionConditionInput | null,
  input: DeleteTransactionInput,
};

export type DeleteTransactionMutation = {
  deleteTransaction?:  {
    __typename: "Transaction",
    amount?: number | null,
    avatar?: string | null,
    category?: string | null,
    createdAt: string,
    date?: string | null,
    id: string,
    name?: string | null,
    owner?: string | null,
    recurring?: boolean | null,
    updatedAt: string,
  } | null,
};

export type DeleteUserProfileMutationVariables = {
  condition?: ModelUserProfileConditionInput | null,
  input: DeleteUserProfileInput,
};

export type DeleteUserProfileMutation = {
  deleteUserProfile?:  {
    __typename: "UserProfile",
    createdAt: string,
    email?: string | null,
    id: string,
    profileOwner?: string | null,
    updatedAt: string,
  } | null,
};

export type UpdateBalanceMutationVariables = {
  condition?: ModelBalanceConditionInput | null,
  input: UpdateBalanceInput,
};

export type UpdateBalanceMutation = {
  updateBalance?:  {
    __typename: "Balance",
    createdAt: string,
    current?: number | null,
    expenses?: number | null,
    id: string,
    income?: number | null,
    owner?: string | null,
    updatedAt: string,
  } | null,
};

export type UpdateBudgetMutationVariables = {
  condition?: ModelBudgetConditionInput | null,
  input: UpdateBudgetInput,
};

export type UpdateBudgetMutation = {
  updateBudget?:  {
    __typename: "Budget",
    category?: string | null,
    createdAt: string,
    id: string,
    maximum?: number | null,
    owner?: string | null,
    theme?: string | null,
    updatedAt: string,
  } | null,
};

export type UpdatePotMutationVariables = {
  condition?: ModelPotConditionInput | null,
  input: UpdatePotInput,
};

export type UpdatePotMutation = {
  updatePot?:  {
    __typename: "Pot",
    createdAt: string,
    id: string,
    name?: string | null,
    owner?: string | null,
    target?: number | null,
    theme?: string | null,
    total?: number | null,
    updatedAt: string,
  } | null,
};

export type UpdateTransactionMutationVariables = {
  condition?: ModelTransactionConditionInput | null,
  input: UpdateTransactionInput,
};

export type UpdateTransactionMutation = {
  updateTransaction?:  {
    __typename: "Transaction",
    amount?: number | null,
    avatar?: string | null,
    category?: string | null,
    createdAt: string,
    date?: string | null,
    id: string,
    name?: string | null,
    owner?: string | null,
    recurring?: boolean | null,
    updatedAt: string,
  } | null,
};

export type UpdateUserProfileMutationVariables = {
  condition?: ModelUserProfileConditionInput | null,
  input: UpdateUserProfileInput,
};

export type UpdateUserProfileMutation = {
  updateUserProfile?:  {
    __typename: "UserProfile",
    createdAt: string,
    email?: string | null,
    id: string,
    profileOwner?: string | null,
    updatedAt: string,
  } | null,
};

export type OnCreateBalanceSubscriptionVariables = {
  filter?: ModelSubscriptionBalanceFilterInput | null,
  owner?: string | null,
};

export type OnCreateBalanceSubscription = {
  onCreateBalance?:  {
    __typename: "Balance",
    createdAt: string,
    current?: number | null,
    expenses?: number | null,
    id: string,
    income?: number | null,
    owner?: string | null,
    updatedAt: string,
  } | null,
};

export type OnCreateBudgetSubscriptionVariables = {
  filter?: ModelSubscriptionBudgetFilterInput | null,
  owner?: string | null,
};

export type OnCreateBudgetSubscription = {
  onCreateBudget?:  {
    __typename: "Budget",
    category?: string | null,
    createdAt: string,
    id: string,
    maximum?: number | null,
    owner?: string | null,
    theme?: string | null,
    updatedAt: string,
  } | null,
};

export type OnCreatePotSubscriptionVariables = {
  filter?: ModelSubscriptionPotFilterInput | null,
  owner?: string | null,
};

export type OnCreatePotSubscription = {
  onCreatePot?:  {
    __typename: "Pot",
    createdAt: string,
    id: string,
    name?: string | null,
    owner?: string | null,
    target?: number | null,
    theme?: string | null,
    total?: number | null,
    updatedAt: string,
  } | null,
};

export type OnCreateTransactionSubscriptionVariables = {
  filter?: ModelSubscriptionTransactionFilterInput | null,
  owner?: string | null,
};

export type OnCreateTransactionSubscription = {
  onCreateTransaction?:  {
    __typename: "Transaction",
    amount?: number | null,
    avatar?: string | null,
    category?: string | null,
    createdAt: string,
    date?: string | null,
    id: string,
    name?: string | null,
    owner?: string | null,
    recurring?: boolean | null,
    updatedAt: string,
  } | null,
};

export type OnCreateUserProfileSubscriptionVariables = {
  filter?: ModelSubscriptionUserProfileFilterInput | null,
  profileOwner?: string | null,
};

export type OnCreateUserProfileSubscription = {
  onCreateUserProfile?:  {
    __typename: "UserProfile",
    createdAt: string,
    email?: string | null,
    id: string,
    profileOwner?: string | null,
    updatedAt: string,
  } | null,
};

export type OnDeleteBalanceSubscriptionVariables = {
  filter?: ModelSubscriptionBalanceFilterInput | null,
  owner?: string | null,
};

export type OnDeleteBalanceSubscription = {
  onDeleteBalance?:  {
    __typename: "Balance",
    createdAt: string,
    current?: number | null,
    expenses?: number | null,
    id: string,
    income?: number | null,
    owner?: string | null,
    updatedAt: string,
  } | null,
};

export type OnDeleteBudgetSubscriptionVariables = {
  filter?: ModelSubscriptionBudgetFilterInput | null,
  owner?: string | null,
};

export type OnDeleteBudgetSubscription = {
  onDeleteBudget?:  {
    __typename: "Budget",
    category?: string | null,
    createdAt: string,
    id: string,
    maximum?: number | null,
    owner?: string | null,
    theme?: string | null,
    updatedAt: string,
  } | null,
};

export type OnDeletePotSubscriptionVariables = {
  filter?: ModelSubscriptionPotFilterInput | null,
  owner?: string | null,
};

export type OnDeletePotSubscription = {
  onDeletePot?:  {
    __typename: "Pot",
    createdAt: string,
    id: string,
    name?: string | null,
    owner?: string | null,
    target?: number | null,
    theme?: string | null,
    total?: number | null,
    updatedAt: string,
  } | null,
};

export type OnDeleteTransactionSubscriptionVariables = {
  filter?: ModelSubscriptionTransactionFilterInput | null,
  owner?: string | null,
};

export type OnDeleteTransactionSubscription = {
  onDeleteTransaction?:  {
    __typename: "Transaction",
    amount?: number | null,
    avatar?: string | null,
    category?: string | null,
    createdAt: string,
    date?: string | null,
    id: string,
    name?: string | null,
    owner?: string | null,
    recurring?: boolean | null,
    updatedAt: string,
  } | null,
};

export type OnDeleteUserProfileSubscriptionVariables = {
  filter?: ModelSubscriptionUserProfileFilterInput | null,
  profileOwner?: string | null,
};

export type OnDeleteUserProfileSubscription = {
  onDeleteUserProfile?:  {
    __typename: "UserProfile",
    createdAt: string,
    email?: string | null,
    id: string,
    profileOwner?: string | null,
    updatedAt: string,
  } | null,
};

export type OnUpdateBalanceSubscriptionVariables = {
  filter?: ModelSubscriptionBalanceFilterInput | null,
  owner?: string | null,
};

export type OnUpdateBalanceSubscription = {
  onUpdateBalance?:  {
    __typename: "Balance",
    createdAt: string,
    current?: number | null,
    expenses?: number | null,
    id: string,
    income?: number | null,
    owner?: string | null,
    updatedAt: string,
  } | null,
};

export type OnUpdateBudgetSubscriptionVariables = {
  filter?: ModelSubscriptionBudgetFilterInput | null,
  owner?: string | null,
};

export type OnUpdateBudgetSubscription = {
  onUpdateBudget?:  {
    __typename: "Budget",
    category?: string | null,
    createdAt: string,
    id: string,
    maximum?: number | null,
    owner?: string | null,
    theme?: string | null,
    updatedAt: string,
  } | null,
};

export type OnUpdatePotSubscriptionVariables = {
  filter?: ModelSubscriptionPotFilterInput | null,
  owner?: string | null,
};

export type OnUpdatePotSubscription = {
  onUpdatePot?:  {
    __typename: "Pot",
    createdAt: string,
    id: string,
    name?: string | null,
    owner?: string | null,
    target?: number | null,
    theme?: string | null,
    total?: number | null,
    updatedAt: string,
  } | null,
};

export type OnUpdateTransactionSubscriptionVariables = {
  filter?: ModelSubscriptionTransactionFilterInput | null,
  owner?: string | null,
};

export type OnUpdateTransactionSubscription = {
  onUpdateTransaction?:  {
    __typename: "Transaction",
    amount?: number | null,
    avatar?: string | null,
    category?: string | null,
    createdAt: string,
    date?: string | null,
    id: string,
    name?: string | null,
    owner?: string | null,
    recurring?: boolean | null,
    updatedAt: string,
  } | null,
};

export type OnUpdateUserProfileSubscriptionVariables = {
  filter?: ModelSubscriptionUserProfileFilterInput | null,
  profileOwner?: string | null,
};

export type OnUpdateUserProfileSubscription = {
  onUpdateUserProfile?:  {
    __typename: "UserProfile",
    createdAt: string,
    email?: string | null,
    id: string,
    profileOwner?: string | null,
    updatedAt: string,
  } | null,
};
