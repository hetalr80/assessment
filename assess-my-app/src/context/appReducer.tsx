import { SELECTED_LANGUAGE, SELECTED_COUNTRY } from "./action";

export const initialState: any = {
  selectedLanguage: "ENG",
  selectedCountry: "",
};

export const AppReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SELECTED_LANGUAGE:
      return {
        ...state,
        selectedLanguage: action.payload,
      };
    case SELECTED_COUNTRY:
      return {
        ...state,
        selectedCountry: action.payload,
      };
    default:
      return initialState;
  }
};
