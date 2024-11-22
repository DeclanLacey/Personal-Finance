import { generateClient } from "aws-amplify/data";
import { type Schema } from "@/../../amplify/data/resource";
import initialData from "../../src/data/data.json"
import { NewBudget, NewTransaction } from "../types/types";

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
//         try {
//             await client.models.Transaction.create(initialData.transactions[i])
//         }catch (error) {
//             console.log(error)
//         }
//     }
// }

// export const addCategories = async () => {
//     for (let i = 0; i < initialData.categories.length; i++) {
//         try {
//             await client.models.Category.create(initialData.categories[i])
//         }catch(error) {
//             console.log(error)
//         }
//     }
// }

// export const addBudgetData = async () => {
//     for (let i = 0; i < initialData.budgets.length; i++) {
//         client.models.Budget.create(initialData.budgets[i])
//     }
// }

// const deleteTransaction = async () => {
//     const id = {id: "839e50a2-7b18-456d-9e5e-bc1e11607748"}
//     await client.models.Transaction.delete(id)
// }

// deleteTransaction()

// export const addThemes = async () => {
//     try {
//         for (let i = 0; i < initialData.themes.length; i++) {
//             await client.models.Theme.create(initialData.themes[i])
//         }
//     }catch (error) {
//         console.log(error)
//     }
// }
// Functions for deleting a single record

export const deleteBudget = async (budgetId: string) => {
    const idObject = {id: budgetId}
    try {
        await client.models.Budget.delete(idObject)
    }catch(error) {
        console.log(error)
    }
}


// Functions for adding a single record
export const addTransaction = async (data: NewTransaction) => {
    try {
        await client.models.Transaction.create(data)
    }catch(error) {
        console.log(error)
    }
}

export const addBudget = async (data: NewBudget) => {
    try {
        await client.models.Budget.create(data)
    }catch(error) {
        console.log(error)
    }
}

// Functions for getting all records
export const getCategories = async () => {
    const {data, errors} = await client.models.Category.list()
    if (errors) {
        console.log(errors)
    }else {
        return data
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

export const getThemes = async () => {
    const { data, errors } = await client.models.Theme.list();
    if (errors) {
        console.log(errors);
    } else {
        return data;
    }
};