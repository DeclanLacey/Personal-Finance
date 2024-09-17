import { generateClient } from "aws-amplify/data";
import { type Schema } from "@/../../amplify/data/resource";
import initialData from "../../src/data/data.json"

const client = generateClient<Schema>({
    authMode: "userPool",
});

// export const addBalanceData = async () => {
//     client.models.Balance.create(initialData.balance)
// }

// export const addPotData = async () => {
//     for (let i = 0; i < initialData.pots.length; i++) {
//         client.models.Pot.create(initialData.pots[i])
//     }
// }

// export const addTransactionData = async () => {
//     for (let i = 0; i < initialData.transactions.length; i++) {
//         client.models.Transaction.create(initialData.transactions[i])
//     }
// }

// export const addBudgetData = async () => {
//     for (let i = 0; i < initialData.budgets.length; i++) {
//         client.models.Budget.create(initialData.budgets[i])
//     }
// }

export const getBalances = async () => {
    const { data, errors } = await client.models.Balance.list();
    if (errors) {
      console.log(errors);
    } else {
      return data;
    }
};

export const getBudgets = async () => {
    const { data, errors } = await client.models.Budget.list();
    if (errors) {
        console.log(errors);
    } else {
        return data;
    }
};

export const getTransactions = async () => {
    const { data, errors } = await client.models.Transaction.list();
    if (errors) {
        console.log(errors);
    } else {
        return data;
    }
};

export const getPots = async () => {
    const { data, errors } = await client.models.Pot.list();
    if (errors) {
        console.log(errors);
    } else {
        return data;
    }
};