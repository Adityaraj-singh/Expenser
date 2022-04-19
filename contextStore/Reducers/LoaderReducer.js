const data = {
  isloading: false,
  text: "",
};

export const LoaderReducer = (state = data, action) => {
  switch (action.type) {
    case "Load":
      return { isloading: action.payload.isloading, text: action.payload.text };

    default:
      return state;
  }
};
