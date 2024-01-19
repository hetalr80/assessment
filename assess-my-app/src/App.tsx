import React, { useReducer } from "react";
import { ThemeProvider, createTheme, useTheme } from "@mui/material";
import "./App.css";
import Layout from "./Layout";
import { AppReducer, initialState } from "./context/appReducer";
import { DispatchContext, StateContext } from "./context/context";
import RTL from "./config/RTL";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import i18n from "./config/i18n";
import { I18nextProvider } from "react-i18next";
import GlobalCss from "./GlobalCss";
import { getThemePalette } from "./theme";
import { BrowserRouter } from "react-router-dom";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

const emptyCache = createCache({
  key: "meaningless-key",
});

function App() {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  const theme = useTheme();

  const getTheme = () => {
    return createTheme({
      palette: {
        ...theme?.palette,
        ...getThemePalette(state?.selectedCountry),
      },
      direction: state?.selectedLanguage === "AR" ? "rtl" : "ltr",
    });
  };

  return (
    <div className="App">
      <GoogleReCaptchaProvider
        reCaptchaKey={
          // @ts-ignore
          window?.__config?.CAPTCHA_KEY ||
          "6Lf3Wk4pAAAAAHL_gs54G8lr9q9lhc9zvThW7VHv"
        }
        useRecaptchaNet
        useEnterprise
      >
        <DispatchContext.Provider value={dispatch}>
          <StateContext.Provider value={state}>
            <CacheProvider
              value={state?.selectedLanguage === "AR" ? cacheRtl : emptyCache}
            >
              <ThemeProvider theme={getTheme()}>
                <GlobalCss />
                <RTL>
                  <I18nextProvider i18n={i18n}>
                    <BrowserRouter>
                      <Layout />
                    </BrowserRouter>
                  </I18nextProvider>
                </RTL>
              </ThemeProvider>
            </CacheProvider>
          </StateContext.Provider>
        </DispatchContext.Provider>
      </GoogleReCaptchaProvider>
    </div>
  );
}

export default App;
