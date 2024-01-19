import React, { useContext, useEffect, useState } from "react";
import {
  Grid,
  Theme,
  MenuItem,
  TextField,
  createStyles,
  Typography,
} from "@mui/material";
import Login from "./pages/login";
import { makeStyles } from "@mui/styles";
import { DispatchContext, StateContext } from "./context/context";
import { setLanguage } from "./context/action";
import i18n from "./config/i18n";
import { useTranslation } from "react-i18next";
import AppRoutes from "./Routes";

const useStyle = makeStyles<any>((theme: Theme) =>
  createStyles({
    contentWrapper: {
      background: "#fbf9f1",
    },
    header: {
      width: "100%",
      position: "absolute",
      height: "8vh",
      borderBottom: "1px solid black",
      dispaly: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      background: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },
    footer: {
      width: "100%",
      position: "absolute",
      height: "4vh",
      borderTop: "1px solid black",
      bottom: 0,
    },
  })
);

const Layout = () => {
  const { header, footer, contentWrapper } = useStyle();
  const { t } = useTranslation();
  const appContextDispatch = useContext(DispatchContext);
  const state = useContext(StateContext);
  const [selLang, setSelLang] = useState(state.selectedLanguage);
  const langs = ["ENG", "AR"];

  useEffect(() => {
    appContextDispatch(setLanguage("ENG"));
  }, []);

  const handleLangChange = (e: any) => {
    setSelLang(e.target.value);
    appContextDispatch(setLanguage(e.target.value));
    document.dir = e.target.value === "AR" ? "rtl" : "ltr";
    i18n.changeLanguage(e.target.value === "AR" ? "ar" : "en");
  };

  return (
    <Grid className={contentWrapper}>
      <Grid container className={header}>
        <Grid
          item
          container
          display={"flex"}
          direction={"row"}
          justifyContent={"space-between"}
          md={10}
          spacing={4}
        >
          <Grid item>
            <Typography variant="h5">{t(`login.header.title`)}</Typography>
          </Grid>
          <Grid item>
            <TextField
              id="select-lang"
              select
              defaultValue={selLang}
              variant="standard"
              onChange={handleLangChange}
            >
              {langs.map((option: string) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </Grid>
      <Grid>
        <AppRoutes />

        {/* <Login /> */}
      </Grid>
      <Grid className={footer}>{"Footer"}</Grid>
    </Grid>
  );
};

export default Layout;
