export const Getuser = async (data) => {
    // console.log(data, 'data passed')


    let username = data.username
    let token = data.token
    //  console.log('inside api')
    try {
        const res = await fetch('https://expenser-app-django-heroku.herokuapp.com/user/', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `ApiKey ${username}:${token}`
            },

        });

        return res.json()
    }

    catch (err) {
        console.log(err)
        return err

    }

}


export const SingleUser = async (data, credential) => {
    // console.log(data, 'data passed')


    let username = data.username
    let token = data.token
    //  console.log('inside api')
    try {
        const res = await fetch('https://expenser-app-django-heroku.herokuapp.com/user/', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `ApiKey ${username}:${token}`
            },

        });

        return res.json()
    }

    catch (err) {
        console.log(err)
        return err

    }

}

export const UserDetail = async (data, friend_uri) => {

    const p = await SingleUser(data)

    let temp = p.objects.filter(item => item.resource_uri == friend_uri)

    return temp

}
