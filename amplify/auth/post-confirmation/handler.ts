import type { PostConfirmationTriggerHandler } from "aws-lambda";
import { type Schema } from "../../data/resource";
import initialData from "../../../src/data/data.json"
import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/data";
import { env } from "$amplify/env/post-confirmation";
import {createBalance, createBudget, createPot, createTransaction, createUserProfile } from "./graphql/mutations";

Amplify.configure(
  {
    API: {
      GraphQL: {
        endpoint: env.AMPLIFY_DATA_GRAPHQL_ENDPOINT,
        region: env.AWS_REGION,
        defaultAuthMode: "iam",
      },
    },
  },
  {
    Auth: {
      credentialsProvider: {
        getCredentialsAndIdentityId: async () => ({
          credentials: {
            accessKeyId: env.AWS_ACCESS_KEY_ID,
            secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
            sessionToken: env.AWS_SESSION_TOKEN,
          },
        }),
        clearCredentialsAndIdentityId: () => {
          /* noop */
        },
      },
    },
  }
);

const client = generateClient<Schema>({
  authMode: "iam",
});

export const handler: PostConfirmationTriggerHandler = async (event) => {

  await client.graphql({
    query: createBalance,
    variables: {
      input: {
        current: initialData.balance.current,
        income: initialData.balance.income,
        expenses: initialData.balance.expenses
      }
    }
  })

  for (let i = 0; i < initialData.transactions.length; i++) {
    await client.graphql({
      query: createTransaction,
      variables: {
        input: {
          avatar: initialData.transactions[i].avatar,
          name: initialData.transactions[i].name,
          category: initialData.transactions[i].category,
          date: initialData.transactions[i].date,
          amount: initialData.transactions[i].amount,
          recurring: initialData.transactions[i].recurring
        }
      }
    })
  }

  for (let i = 0; i < initialData.budgets.length; i++) {
    await client.graphql({
      query: createBudget,
      variables: {
        input: {
          category: initialData.budgets[i].category,
          maximum: initialData.budgets[i].maximum,
          theme: initialData.budgets[i].theme
        }
      }
    })
  }

  for(let i = 0; i < initialData.pots.length; i++) {
    await client.graphql({
      query: createPot,
      variables: {
        input: {
          name: initialData.pots[i].name,
          target: initialData.pots[i].target,
          total: initialData.pots[i].total,
          theme: initialData.pots[i].theme
        }
      }
    })
  }

  await client.graphql({
    query: createUserProfile,
    variables: {
      input: {
        email: event.request.userAttributes.email,
        profileOwner: `${event.request.userAttributes.sub}::${event.userName}`,
      },
    },
  },
)

  return event;
};


/// I get this error when trying to confirm an account, but it still creates the account
// PostConfirmation failed with error TypeError: Cannot read properties of undefined (reading 'create').

// PostConfirmation failed with error [object Object].


// PostConfirmation failed with error 2024-09-17T20:31:07.019Z 266cfb3f-4bba-4312-8d80-5a64dfc26126 Task timed out after 3.01 seconds.