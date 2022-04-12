export const AddExpenseapi = async (data, amount, group, reason, payer) => {
  let params = {
    amount,
    group,
    payer,
    reason,
  };

  console.log("in api********");
  console.log(params);
  // console.log(JSON.stringify(data))
  try {
    const res = await fetch(
      "https://expenser-app-django-heroku.herokuapp.com/expense/",
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

export const AddSplittersapi = async (data, e_splitter, expense, owes) => {
  let params = {
    e_splitter,
    expense,
    owes,
  };

  console.log("-------->>>", params);
  try {
    const res = await fetch(
      "https://expenser-app-django-heroku.herokuapp.com/expense_splitter/",
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
