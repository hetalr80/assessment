
export const SELECTED_LANGUAGE = "SELECTED_LANGUAGE";
export const SELECTED_COUNTRY = "SELECTED_COUNTRY";


export const setLanguage = (payload: any) => ({
  type: SELECTED_LANGUAGE,
  payload,
});

export const setCountry = (payload: any) => ({
  type: SELECTED_COUNTRY,
  payload,
});

