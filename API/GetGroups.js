

export const GetGroups = async (data) => {


    try {
        const res = await fetch('http://192.168.1.4:8000/group/', {
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