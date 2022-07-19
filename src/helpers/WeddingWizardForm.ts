const initialState = {
  name: "",
  story: "",
  dresscode: "",
  guests: [],
  events: [],
  witnesses: [],
  error: { hasError: false, error: "" },
};

const UPDATE_FORM = "UPDATE_FORM";
const HANDLE_ERROR = "HANDLE_ERROR";

// Actions
export const updateForm = (payload) => {
  return {
    type: UPDATE_FORM,
    payload,
  };
};
export const clearStepForm = (step) => {
  return {
    type: UPDATE_FORM,
    payload: { step: initialState[step] },
  };
};

export const handleError = (payload) => {
  return {
    type: HANDLE_ERROR,
    payload,
  };
};
export const clearError = () => {
  return {
    type: HANDLE_ERROR,
    payload: { hasError: false, error: "" },
  };
};

export const wizardReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_FORM:
      return { ...state, ...action.payload };
    case HANDLE_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
