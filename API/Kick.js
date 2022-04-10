export const Kick = async (data, userid) => {
  let username = data.username;
  let token = data.token;
  console.log(
    "in api: ",
    `https://expenser-app-django-heroku.herokuapp.com${userid}`
  );
  try {
    const res = await fetch(
      `https://expenser-app-django-heroku.herokuapp.com${userid}`,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `ApiKey ${username}:${token}`,
        },
      }
    );

    return res.text();
  } catch (err) {
    console.log(":::::::::::::::::::");
    console.log(err);
    return err;
  }
};
export default Kick;
