export type Transaction = {
    avatar: string,
    name: string,
    category: string,
    date: string,
    amount: number,
    recurring: boolean
}

export type PieChartSeries = {
    value: number,
    className: String
}

export type SpendPerBudget = {
    name: string,
    amount: number
}