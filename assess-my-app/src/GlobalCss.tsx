import { withStyles } from "@mui/styles";
import { Theme } from "@mui/material";

const GlobalCss: any = withStyles((theme: Theme) => ({
  "@global": {
    "*, *::before, *::after": {
      margin: 0,
      padding: 0,
    },
    html: {
      fontSize: "16px",
      "@media (max-device-width: 1366px)": {
        fontSize: "14px",
      },
      "@media (max-device-width: 900px)": {
        fontSize: "12px",
      },
      "@media (max-device-width: 600px)": {
        fontSize: "11px",
      },
    },
    body: {
      backgroundColor: "#ffffff",
    },
  },
}))(() => null);

export default GlobalCss;
