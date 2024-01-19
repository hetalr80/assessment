import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardHeader,
  Avatar,
  useTheme,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

const Dashboard = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const { state } = useLocation();
  const [userDetail, setUserDetail] = useState<any>();

  const getDetails = () => {
    fetch(`http://localhost:3005/user/${state.userId}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "get",
    })
      .then((response) => response.json())
      .then((res: any) => {
        console.log("res", res);
        setUserDetail(res?.data);
      })
      .catch(() => {});
  };

  useEffect(() => {
    if (state.userId) {
      getDetails();
    }
  }, []);

  return (
    <Grid
      container
      direction={"row"}
      justifyContent={"center"}
      alignContent={"flex-start"}
      paddingTop={"12vh"}
      paddingBottom={"5vh"}
      height={"100vh"}
    >
      <Grid item container display={"flex"} md={10} spacing={4}>
        <Grid item>
          <Card sx={{ maxWidth: "45vw" }}>
            <CardHeader
              avatar={
                <Avatar
                  sx={{ bgcolor: theme.palette.primary.light }}
                  aria-label="recipe"
                >
                  {userDetail?.name?.charAt(0)?.toUpperCase()}
                </Avatar>
              }
              title={userDetail?.name}
              subheader={userDetail?.position}
            />
            <CardContent>
              <Grid container display={"flex"} direction={"column"} spacing={2}>
                <Grid
                  item
                  container
                  display={"flex"}
                  direction="column"
                  alignItems={"flex-start"}
                >
                  <Grid item>
                    <Typography variant="body2">{"Email"}</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1">
                      {userDetail?.email}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid
                  item
                  container
                  display={"flex"}
                  direction="column"
                  alignItems={"flex-start"}
                >
                  <Grid item>
                    <Typography variant="body2">{"Joining Date"}</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1">
                      {userDetail?.joiningDate}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid
                  item
                  container
                  display={"flex"}
                  direction="column"
                  alignItems={"flex-start"}
                >
                  <Grid item>
                    <Typography variant="body2">{"Squad"}</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1">
                      {userDetail?.squad}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
