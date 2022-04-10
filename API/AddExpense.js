export const AddExpense = async (data, friend_profile_id, group) => {
  let params = {};
  // console.log(JSON.stringify(data))
  try {
    const res = await fetch(
      "https://expenser-app-django-heroku.herokuapp.com/group_friend/",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `ApiKey ${data.username}:${data.token}`,
        },
        body: JSON.stringify(params),
      }
    );

    return res.json();
  } catch (err) {
    console.log(err);
    return err;
  }
};
