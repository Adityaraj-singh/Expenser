export const AddFriendApi = async (data, myprofileid, friendid) => {
    // console.log(data, 'data passed')


    let username = data.username
    let token = data.token
    //  console.log('inside api')
    try {
        const res = await fetch('https://expenser-app-django-heroku.herokuapp.com/profile_friend/', {
            method: 'Post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `ApiKey ${username}:${token}`
            },
            body: JSON.stringify({ p_friend: friendid, profile: myprofileid })

        });

        return res.json()
    }

    catch (err) {

        return err

    }

}

export const DeleteFriend = async (data, friendid) => {

    console.log(data, friendid)
    console.log('inside remove freinds')


    try {
        const res = await fetch('https://expenser-app-django-heroku.herokuapp.com/profile_friend/' + friendid + '/', {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `ApiKey ${data.username}:${data.token}`
            },


        });

        return res
    }

    catch (err) {

        return err

    }

}