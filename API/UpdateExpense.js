export const UpdateExpense = async (
  data,
  amount,
  created_at,
  group,
  payer,
  reason,
  settled_by,
  expenseId
) => {
  let params = {
    amount,
    created_at,
    group,
    payer,
    reason,
    settled_by,
  };

  console.log("in api********", expenseId);
  console.log(params);
  // console.log(JSON.stringify(data))
  try {
    const res = await fetch(
      `https://expenser-app-django-heroku.herokuapp.com/expense/${expenseId}/`,
      {
        method: "PUT",
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
