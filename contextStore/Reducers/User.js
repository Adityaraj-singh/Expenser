
const userdetail = {
    token: 0,
    username: '',
    resource_uri: '',
    profile_id: ''
}

export default userReducer = (state = userdetail, action) => {

    switch (action.type) {
        case "Authenticate":
            return {
                profile_id: action.payload.value.profile_id,
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