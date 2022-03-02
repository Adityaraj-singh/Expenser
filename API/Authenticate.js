
export const Signupapi = async (data) => {


    console.log(JSON.stringify(data))
    try {
        const res = await fetch('http://127.0.0.1:8000/signup/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    }

    catch (err) {

        console.log({ err })
    }


}

