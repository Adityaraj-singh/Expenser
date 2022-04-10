export const ShowExpense = async (data) => {
  let username = data.username;
  let token = data.token;
  // console.log(data);
  try {
    const res = await fetch(
      "https://expenser-app-django-heroku.herokuapp.com/expense/",
      {
        method: "Get",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `ApiKey ${username}:${token}`,
        },
      }
    );

    return res.json();
  } catch (err) {
    return err;
  }
};

export const AddExpense = async (data, body) => {
  let username = data.username;
  let token = data.token;
  // console.log(data);
  try {
    const res = await fetch(
      "https://expenser-app-django-heroku.herokuapp.com/expense/",
      {
        method: "Post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `ApiKey ${username}:${token}`,
        },
      }
    );

    return res.json();
  } catch (err) {
    return err;
  }
};
