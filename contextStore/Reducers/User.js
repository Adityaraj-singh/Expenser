
const userdetail = {
    id: 0,
    username: '',
    resource_uri: '',

}

export default userReducer = (state = userdetail, action) => {

    switch (action.type) {
        case "Authenticate":
            return {
                token: action.payload.value.id,
                username: action.payload.value.username,
                resource_uri: action.payload.value.resource_uri
            }

        case 'Signout': {
            return userdetail
        }
        default: return state
    }

}