import { generateClient } from "aws-amplify/data";
import { type Schema } from "@/../../amplify/data/resource";
import initialData from "../../src/data/data.json"

const client = generateClient<Schema>({
    authMode: "userPool",
});

// async function deleteBudget() {
//     const budgetDelete = {
//         id: "ef3c8305-3db4-4743-9b5f-320fa0cd1594"
//     }
//     const { data: deletedBudget, errors } = await client.models.Budget.delete(budgetDelete)
//     console.log(deletedBudget)
//     console.log(errors)
// }

// deleteBudget()

export const addBalanceData = async () => {
    client.models.Balance.create(initialData.balance)
}

export const addPotData = async () => {
    for (let i = 0; i < initialData.pots.length; i++) {
        client.models.Pot.create(initialData.pots[i])
    }
}

export const addTransactionData = async () => {
   
    for (let i = 0; i < initialData.transactions.length; i++) {
        try {
            await client.models.Transaction.create(initialData.transactions[i])
        }catch (error) {
            console.log(error)
        }
    }


}

// addPotData()

// const toBeDeletedTodo: any = {
//     id: "4190d406-6312-4f53-8a86-47b82744c68a"
// }

async function deletePot(id: any) {
    await client.models.Pot.delete(id)
}

// deletePot(toBeDeletedTodo)
// deletePot("77fbe775-66a8-4fe6-9e3b-101a963b718e")

export const addBudgetData = async () => {
    for (let i = 0; i < initialData.budgets.length; i++) {
        client.models.Budget.create(initialData.budgets[i])
    }
}

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

export const getCategoryNamesFromBudgets = async () => {
    let categoryNames = []
    const { data, errors } = await client.models.Budget.list();
    if (errors) {
        console.log(errors);
    } else {
        for (let i = 0; i < data.length; i++) {
            categoryNames.push(data[i].category)
        }
        return categoryNames
    }
}
