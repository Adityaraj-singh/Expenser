
export const Signupapi = async (data) => {


    // console.log(JSON.stringify(data))
    try {
        const res = await fetch('https://expenser-app-django-heroku.herokuapp.com/signup/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        return res.json()
    }

    catch (err) {
        console.log(err)
        return err

    }



}


export const Signinapi = async (data) => {

    console.log(JSON.stringify(data))
    try {
        const res = await fetch('https://expenser-app-django-heroku.herokuapp.com/signin/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        return res.json()
    }

    catch (err) {

        return err

    }



}

export const AddProfile = async (data, userdata) => {
    console.log('in addprofile api')
    console.log(data, userdata)
    console.log(`Apikey ${userdata.username}:${userdata.token}`)
    //console.log(JSON.stringify(data))
    try {
        const res = await fetch('https://expenser-app-django-heroku.herokuapp.com/profile/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Apikey ${userdata.username}:${userdata.token}`
            },
            body: JSON.stringify(data)
        })


        return res.json
    }

    catch (err) {

        return err

    }

}


