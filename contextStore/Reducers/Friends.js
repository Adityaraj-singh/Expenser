const initialState = [
    {
        id: 0,
        name: 'gagan'
    },
    {
        id: 1,
        name: 'Prateek'
    },
    {
        id: 2,
        name: 'benny'
    }
]

export const FriendsReducer = (state = initialState, action) => {
    switch (action.type) {

        case 'AddFriend': {

            /*
            return {
                state,
                arr: state.push({
                    id: action.payload.value.id,
                    name: action.payload.value.name
                })
            }
            */
            return [...state, action.payload.value]
        }

        default: return state
    }

}