

/*

expenses: [
            {
                expenseName: 'Lunch',
                owner: 'Gagan',
                amount: 600,
                divideEqually: true,
                participated_member: [
                    {
                        name: 'benny',
                        pay: '200',
                        didPay: false
                    }
                ],
                isSettled: false

            }
        ]


*/

const groups = [
    {
        groupid: 0,
        groupName: 'college friends',
        members: ['Gagan']
    }

]

export const GroupReducer = (state = groups, action) => {
    // console.log(action)
    switch (action.type) {

        case 'AddGroup': {
            return [...state, action.payload.value]
        }

        case "AddMemberToGroup":

            {
                var temp = state.map(x => {
                    //   console.log(action.payload.value.name, ' : namee')

                    if (x.groupid === action.payload.value.groupid) {

                        return {
                            ...x,
                            members: [...x.members, action.payload.value.name]
                        }
                    }
                    return x
                })
                //    console.log(temp, 'temps')
                return temp
            }
        default: return state
    }
}


