export const GetFriends = async (data) => {
    // console.log(data, 'data passed')


    let username = data.username
    let token = data.token
    //  console.log('inside api')
    try {
        const res = await fetch('https://expenser-app-django-heroku.herokuapp.com/profile_friend/', {
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