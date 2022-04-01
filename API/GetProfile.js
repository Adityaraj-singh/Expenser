export const GetProfile = async (data) => {
    let username = data.username
    let token = data.token
    console.log(data)
    try {
        const res = await fetch('https://expenser-app-django-heroku.herokuapp.com/profile', {
            method: 'Get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `ApiKey ${username}:${token}`
            },

        });

        return res.json()
    }

    catch (err) {

        return err

    }



}