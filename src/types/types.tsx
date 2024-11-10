export type Transaction = {
    avatar: string,
    name: string,
    category: string,
    date: string,
    amount: number,
    recurring: boolean,
    createdAt: string,
    id: string,
    profileOwner: string,
    updatedAt: string
}

export type NewTransaction = {
    avatar: string,
    name: string,
    category: string,
    date: string,
    amount: number,
    recurring: boolean
}

export type Budget = {
    category: string,
    createdAt: string,
    id: string,
    maximum: number,
    profileOwner: string,
    theme: string,
    updatedAt: string
}

export type Pot = {
    name: string, 
    target: number,
    total: number,
    theme: string,
    profileOwner: string,
    updatedAt: string,
    createdAt: string,
    id: string,
}

export type Balance = {
    current: number,
    income: number,
    expenses: number
}

export type PieChartSeries = {
    value: number,
    className: String
}

export type SpendPerBudget = {
    name: string,
    max: number,
    amount: number
}

export type Category = {
    name: string
}