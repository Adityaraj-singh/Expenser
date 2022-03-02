const userdetail = {
    id: 0,
    username: '',
    email: '',

}

export default userReducer = (state = userdetail, action) => {

    switch (action.type) {
        case "Authenticate":
            return {
                id: action.payload.value.id,
                username: action.payload.value.username,
                email: action.payload.value.email,

            }

        case 'Signout': {
            return userdetail
        }
        default: return state
    }

}