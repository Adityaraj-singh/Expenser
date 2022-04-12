export const ShowExpense = async (data) => {
  try {
    const res = await fetch(
      "https://expenser-app-django-heroku.herokuapp.com/expense/",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `ApiKey ${data.username}:${data.token}`,
        },
      }
    );

    return res.json();
  } catch (err) {
    console.log(err);
    return err;
  }
};
