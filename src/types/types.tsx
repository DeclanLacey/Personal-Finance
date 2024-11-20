// Type structure after AWS additions
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
// Type structure given by the user
export type NewTransaction = {
    avatar: string,
    name: string,
    category: string,
    date: string,
    amount: number,
    recurring: boolean
}


// Type structure after AWS additions
export type Budget = {
    category: string,
    createdAt: string,
    id: string,
    maximum: number,
    profileOwner: string,
    theme: string,
    updatedAt: string
}
// Type structure given by the user
export type NewBudget = {
    category: string,
    maximum: number,
    theme: string
}

// Type structure after AWS additions
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


// Type structure after AWS additions
export type Balance = {
    current: number,
    income: number,
    expenses: number
}


// Type structure after AWS additions
export type Category = {
    name: string
}


// Type structure after AWS additions
export type Theme = {
    name: string,
    hex: string,
    id: string,
    profileOwner: string,
    createdAt: string,
    updatedAt: string
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