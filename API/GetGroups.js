

export const GetGroups = async (data) => {


    try {
        const res = await fetch('https://expenser-app-django-heroku.herokuapp.com/group/', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `ApiKey ${data.username}:${data.token}`
            },

        });

        return res.json()
    }

    catch (err) {
        console.log(err)
        return err

    }


}
export const AddGroup = async (data, groupname) => {

    console.log('in addgroup api')
    const pass = { creator: data.resource_uri, name: groupname }
    try {
        const res = await fetch('https://expenser-app-django-heroku.herokuapp.com/group/', {
            method: 'Post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `ApiKey ${data.username}:${data.token}`
            },
            body: JSON.stringify(pass)

        });

        return res.json()
    }

    catch (err) {
        console.log(err)
        return err

    }


}