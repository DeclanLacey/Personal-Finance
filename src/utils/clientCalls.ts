import { generateClient } from "aws-amplify/data";
import { type Schema } from "@/../../amplify/data/resource";
import initialData from "../data/data.json"
import { UpdatedBalance, NewBudget, NewPot, NewTransaction, UpdatedBudget, UpdatedPot, UpdatedTotalPot } from "../types/types";

const client = generateClient<Schema>({
    authMode: "userPool",
});

///////////////////////////////////////////////////////////////////
///////////// Functions for deleting a single record //////////////
//////////////////////////////////////////////////////////////////

export const deleteBudget = async (budgetId: string) => {
    const idObject = {id: budgetId}
    try {
        await client.models.Budget.delete(idObject)
    }catch(error) {
        console.log(error)
    }
}

export const deletePot = async (potId: string) => {
    const idObject = {id: potId} 
    try {
        await client.models.Pot.delete(idObject)
    }catch(error) {
        console.log(error)
    }
}

//////////////////////////////////////////////////////////////////
//////////// Functions for adding a single record ////////////////
//////////////////////////////////////////////////////////////////

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

export const addPot = async (data: NewPot) => {
    try {
        await client.models.Pot.create(data)
    }catch(error) {
        console.log(error)
    }
}

//////////////////////////////////////////////////////////////////
//////////// Functions for updating a single record //////////////
//////////////////////////////////////////////////////////////////

export const updateBudget = async (data: UpdatedBudget) => {
    try {
        await client.models.Budget.update(data)
    }catch(error) {
        console.log(error)
    }
}

export const updatePot = async (data: UpdatedPot) => {
    try {
        await client.models.Pot.update(data)
    }catch(error) {
        console.log(error)
    }
}

export const updatePotTotal = async (data: UpdatedTotalPot) => {
    try {
        await client.models.Pot.update(data)
    }catch(error) {
        console.log(error)
    }
}

export const updateBalance = async (newTransactionAmount: number) => {
    const currentBalanceData = await getBalances()
    
    if (currentBalanceData) {
        let newIncome = currentBalanceData[0].income
        let newExpenses = currentBalanceData[0].expenses
        let newBalance = currentBalanceData[0].current
        if (newTransactionAmount < 0) {
            newExpenses += newTransactionAmount / -1
        }else {
            newIncome += newTransactionAmount
        }
        newBalance = newIncome - newExpenses

        const newBalanceData : UpdatedBalance = {
            current: newBalance,
            income: newIncome,
            expenses: newExpenses,
            id: currentBalanceData[0].id
        }
    
        try {
            await client.models.Balance.update(newBalanceData)
        }catch(error) {
            console.log(error)
        }
    }

    
}

/////////////////////////////////////////////////////////////
/////////// Functions for getting all records ///////////////
/////////////////////////////////////////////////////////////

export const getMadeDataChoice = async () => {
    const {data, errors} = await client.models.MadeDataChoice.list()
    if (errors) {
        console.log(errors)
    }else {
        return data
    }
}

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

/////////////////////////////////////////////////////////////
/////////// Functions for populating all records ////////////
/////////////////////////////////////////////////////////////

export const addSeedTransactions = async () => {
    try {
        for (let i = 0; i < initialData.transactions.length; i++) {
            await client.models.Transaction.create(initialData.transactions[i])
        }
    }catch(error) {
        console.log(error)
    }
}

export const addSeedBudgets = async () => {
    try {
        for (let i = 0; i < initialData.budgets.length; i++) {
            await client.models.Budget.create(initialData.budgets[i])
        }
    }catch(error) {
        console.log(error)
    }
}

export const addSeedPots = async () => {
    try {
        for (let i = 0; i < initialData.pots.length; i++) {
            await client.models.Pot.create(initialData.pots[i])
        }
    }catch(error) {
        console.log(error)
    }
}

export const addSeedBalance = async () => {
    try {
        await client.models.Balance.create(initialData.balance)
    }catch(error) {
        console.log(error)
    }
}

export const addBlankSeedBalance = async () => {
    try {
        await client.models.Balance.create({income: 0, expenses: 0, current: 0})
    }catch(error) {
        console.log(error)
    }
}

export const addMadeDataChoice = async () => {
    try {
        await client.models.MadeDataChoice.create({madeChoice: true})
    }catch(error) {
        console.log(error)
    }
}