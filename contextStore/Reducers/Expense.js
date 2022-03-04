const expenses = [
    {
        id: 1,
        groupId: 0,
        month: 'MARCH',
        date: ' 28',
        name: "Starbucks",
        amount: 750,
        owner: "Gagan",
        transactions: [
            {
                ower: "Aditya raj",
                amount: 300,
                lender: "Gagan",
            },
            {
                ower: "Karanveer",
                amount: 300,
                lender: "Gagan",
            },
        ],
    },

]

export const ExpenseReducer = (state = expenses, action) => {

    switch (action.type) {
        case "ADDEXPENSE": {
            return [...state, action.payload.value]
        }

        default: return state
    }



}