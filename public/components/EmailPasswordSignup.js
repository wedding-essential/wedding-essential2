import React from "react";
const formReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_FORM":
      const { name, value, hasError, error, touched, isFormValid } =
        action.payload;
      return {
        ...state,
        [name]: { ...state[name], value, hasError, error, touched },
        isFormValid,
      };
    default:
      return state;
  }
};

export default function EmailPasswordSignup() {
  const initialValues = {
    email: { value: "", touched: false, hasError: true, error: "" },
    password: { value: "", touched: false, hasError: true, error: "" },
    repeatPassword: { value: "", touched: false, hasError: true, error: "" },
    isFormValid: false,
  };

  const [state, dispatch] = React.useReducer(formReducer, initialValues);

  const handleChange = (event) => {
    const { name, value } = event.target;
    dispatch({
      type: "UPDATE_FORM",
      payload: {
        name,
        value,
        hasError: false,
        error: "",
        touched: false,
        isFormValid: true,
      },
    });
  };

  return (
    <div className="container flex flex-col px-5" title="signup-form">
      <label className="block mt-5" htmlFor="email">
        <span className="text-gray">Email</span>
        <input
          className="form-input mt-1 block w-full"
          type="email"
          name="email"
          id="email"
          value={state.email.value}
          onChange={handleChange}
        />
      </label>

      <label className="block mt-5" htmlFor="password">
        <span className="text-gray">Password</span>
        <input
          className="form-input mt-1 block w-full"
          type="password"
          name="password"
          id="password"
          value={state.password.value}
          onChange={handleChange}
        />
      </label>

      <label className="block mt-5" htmlFor="repeat-password">
        <span className="text-gray">Repeat password</span>
        <input
          className="form-input mt-1 block w-full"
          type="password"
          name="repeat-password"
          id="repeat-password"
          value={state.repeatPassword.value}
          onChange={handleChange}
        />
      </label>

      <button className=" bg-gold text-gray w-max py-3 px-5 my-4 mx-auto rounded-full justify-self-center">
        Sign up
      </button>
    </div>
  );
}