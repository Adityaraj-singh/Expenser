
export const Signupapi = async (data) => {


    // console.log(JSON.stringify(data))
    try {
        const res = await fetch('http://192.168.1.8:8000/signup/', {
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
export const Signinapi = async (data) => {



    console.log(JSON.stringify(data))
    try {
        const res = await fetch('http://192.168.1.5:8000/signin/', {
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


