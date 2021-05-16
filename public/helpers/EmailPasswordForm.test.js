import { validateInput, validateAndUpdate } from "./EmailPasswordForm";

describe("email validation", () => {
  test("should not return error when email is valid", () => {
    const { hasError, error } = validateInput("email", "hello@world.com");
    expect(hasError).toBeFalsy();
    expect(error).toBe("");
  });

  test("should return error when input is not an email", () => {
    const { hasError, error } = validateInput("email", "helloworld.com");
    expect(hasError).toBeTruthy();
    expect(error.length).toBeGreaterThan(0);
  });

  test("should return error when input contains forbidden characters", () => {
    const { hasError, error } = validateInput("email", "<hello>@world.com");
    expect(hasError).toBeTruthy();
    expect(error.length).toBeGreaterThan(0);
  });

  test("should return error when input is an empty string", () => {
    const { hasError, error } = validateInput("email", "");
    expect(hasError).toBeTruthy();
    expect(error.length).toBeGreaterThan(0);
  });
});

describe("password validation", () => {
  test("should not return an error if password is valid", () => {
    const { hasError, error } = validateInput("password", "123Gh@jeproFt");
    expect(hasError).toBeFalsy();
    expect(error).toBe("");
  });

  test("should return an error if password does not contain numbers", () => {
    const { hasError, error } = validateInput("password", "123");
    expect(hasError).toBeTruthy();
    expect(error).toMatch(/8/);
  });

  test("should return an error if password does not contain at least 3 lowercase letters", () => {
    const { hasError, error } = validateInput("password", "123Gh@JEPROFT");
    expect(hasError).toBeTruthy();
    expect(error).toMatch(/lowercase/);
  });

  test("should return an error if password does not contain at least 2 uppercase letters", () => {
    const { hasError, error } = validateInput("password", "123Gh@jeproft");
    expect(hasError).toBeTruthy();
    expect(error).toMatch(/uppercase/);
  });

  test("should return an error if password does not contain at least 2 numbers", () => {
    const { hasError, error } = validateInput("password", "3Gh@jeproFt");
    expect(hasError).toBeTruthy();
    expect(error).toMatch(/number/);
  });

  test("should not return an error if password and repeat password are the same", () => {
    const { hasError, error } = validateInput("repeatPassword", "3Gh@jeproFt", {
      password: { value: "3Gh@jeproFt" },
    });
    expect(hasError).toBeFalsy();
    expect(error.length).toBe(0);
  });
  test("should return an error if password and repeat password are different", () => {
    const { hasError, error } = validateInput("repeatPassword", "3Gh@jeproFt", {
      password: { value: "3Gh@jeproFt8" },
    });
    expect(hasError).toBeTruthy();
    expect(error).toMatch(/different/);
  });
});

describe("form validation", () => {
  test("should set isFormValid to true when all fields are valid", () => {
    const validFormState = {
      email: { value: "", touched: false, hasError: false, error: "" },
      password: { value: "", touched: false, hasError: false, error: "" },
      repeatPassword: { value: "", touched: false, hasError: false, error: "" },
      isFormValid: false,
    };
    const mockDispatch = jest.fn();

    validateAndUpdate(
      "password",
      "123Gh@jeproFt",
      mockDispatch,
      validFormState,
      false
    );

    expect(mockDispatch).toHaveBeenCalledWith({
      payload: {
        error: "",
        hasError: false,
        isFormValid: true,
        name: "password",
        touched: false,
        value: "123Gh@jeproFt",
      },
      type: "UPDATE_FORM",
    });
  });

  test("should dispatch isFormValid: false when the currently used field is not valid", () => {
    const validFormState = {
      email: { value: "", touched: false, hasError: false, error: "" },
      password: { value: "", touched: false, hasError: false, error: "" },
      repeatPassword: { value: "", touched: false, hasError: false, error: "" },
      isFormValid: false,
    };

    const mockDispatch = jest.fn();

    validateAndUpdate(
      "password",
      "Gh@jeproFt",
      mockDispatch,
      validFormState,
      true
    );

    expect(mockDispatch).toHaveBeenCalledWith({
      payload: {
        error: "Password is too weak. Use at least two numbers.",
        hasError: true,
        isFormValid: false,
        name: "password",
        touched: true,
        value: "Gh@jeproFt",
      },
      type: "UPDATE_FORM",
    });
  });

  test('"should dispatch isFormValid: false when any field is not valid"', () => {
    const invalidFormState = {
      email: { value: "", touched: false, hasError: false, error: "" },
      password: {
        value: "Gh@jeproFt",
        touched: false,
        hasError: true,
        error: "Password is too weak. Use at least two numbers.",
      },
      repeatPassword: { value: "", touched: false, hasError: false, error: "" },
      isFormValid: false,
    };
    const mockDispatch = jest.fn();
    validateAndUpdate(
      "email",
      "hello@gmail.com",
      mockDispatch,
      invalidFormState,
      true
    );

    expect(mockDispatch).toHaveBeenCalledWith({
      payload: {
        error: "",
        hasError: false,
        isFormValid: false,
        name: "email",
        touched: true,
        value: "hello@gmail.com",
      },
      type: "UPDATE_FORM",
    });
  });
});
