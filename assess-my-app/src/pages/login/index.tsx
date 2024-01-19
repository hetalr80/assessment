import React, { useCallback, useContext, useEffect } from "react";
import {
  useForm,
  SubmitHandler,
  FormProvider,
  Controller,
} from "react-hook-form";
import {
  Grid,
  FormControl,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Theme,
  Autocomplete,
  Box,
} from "@mui/material";
import styled from "styled-components";
import { makeStyles } from "@mui/styles";
import { useTranslation } from "react-i18next";
import config from "./config.json";
import countries from "./countries.json";
import { setCountry } from "../../context/action";
import { DispatchContext } from "../../context/context";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useNavigate } from "react-router-dom";

type FormValues = {
  username: string;
  password: string;
  country: string;
};

type ConfigField = {
  key: string;
  dependsOn: string;
  dependencies?: { [Key: string]: any };
  validations?: Array<FormValues>;
};

const FormWrapper = styled(Grid)`
  display: flex;
`;

const useStyle = makeStyles<any>((theme: Theme) => ({
  cardStyle: {
    [theme.breakpoints.up("md")]: {
      width: "30vw",
    },
    [theme.breakpoints.down("md")]: {
      margin: "0 24px",
    },
  },
}));

const Login = () => {
  const { cardStyle } = useStyle();
  const { t } = useTranslation();
  const appContextDispatch = useContext(DispatchContext);
  const { executeRecaptcha } = useGoogleReCaptcha();
  const navigate = useNavigate();
  const methods = useForm<FormValues>({
    mode: "all",
    shouldFocusError: true,
  });
  const {
    formState: { isValid, errors },
    handleSubmit,
    setValue,
    getValues,
    control,
    watch,
    register,
  } = methods;

  const { country } = watch();

  const handleReCaptchaVerify = useCallback(async () => {
    if (!executeRecaptcha) {
      console.log("Execute recaptcha not yet available");
      return;
    }

    const token = await executeRecaptcha("login");
    const data = getValues();
    fetch("http://localhost:3005/login", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "g-recaptcha-response": token,
      },
      method: "post",
      body: JSON.stringify({ ...data, password: btoa(data.password) }), //encrypted password
    })
      .then((response) => response.json())
      .then((res) => {
        console.log("parsed json", res); // access json.body here

        navigate("/dashboard", { state: { userId: res?.id } });
      })
      // .then((res: any) => {
      //   console.log("res", res?.body);

      //   navigate("/dashboard", { state: { userId: res?.id } });
      // })
      .catch(() => {});
  }, [executeRecaptcha]);

  const onSubmit: SubmitHandler<{ [Key: string]: any }> = async (data: {
    [Key: string]: any;
  }) => {
    console.log("data", data?.country);
    appContextDispatch(setCountry(data?.country));
    handleReCaptchaVerify();
  };

  const getFieldValidation = (field: string) => {
    let validationObj: any = null;
    const fieldObj: ConfigField | any = config.config.find(
      (f: any) => f.key === field
    );
    if (fieldObj?.dependsOn && fieldObj?.dependencies) {
      const values: any = getValues();
      validationObj =
        fieldObj?.dependencies[values?.[fieldObj?.dependsOn]]?.validations;
    } else if (fieldObj?.validations) {
      validationObj = fieldObj?.validations;
    } else {
      validationObj = [
        {
          type: "IS_REQUIRED",
          value: true,
        },
      ];
    }
    const latest = getRules(validationObj, field);
    return latest;
  };

  const getRules = (validations: any, key: string) => {
    const val: any = {
      IS_REQUIRED: "required",
      MIN_LENGTH: "minLength",
      MAX_LENGTH: "maxLength",
      REGEX_FE: "pattern",
    };

    const baseLang = `login.loginForm.form`;

    const rules: any = {};
    validations?.forEach((item: any) => {
      switch (item.type) {
        case "MIN_LENGTH":
        case "MAX_LENGTH":
          rules[val[item["type"]]] = {
            value: Number(item["value"]),
            message: t(`${baseLang}.${key}.validation.${val[item["type"]]}`, {
              length: item["value"],
            }),
          };
          break;
        case "REGEX_FE":
          rules[val[item["type"]]] = {
            value: new RegExp(item["value"]),
            message: t(`${baseLang}.${key}.validation.${val[item["type"]]}`),
          };
          break;
        default:
          rules[val[item["type"]]] = {
            value: item["value"] || true,
            message: t(`${baseLang}.${key}.validation.${val[item["type"]]}`),
          };
          break;
      }
    });

    return rules;
  };

  const handleCountryChange = (e: any, value: any) => {
    console.log("e, value", e, value);
    setValue("country", value?.code || "");
  };

  useEffect(() => {
    if (country) {
      const updatedValidation = getFieldValidation("username");
      register("username", updatedValidation);
    }
  }, [country]);

  return (
    <Grid
      container
      direction={"row"}
      justifyContent={"center"}
      alignContent={"center"}
    >
      <FormProvider {...methods}>
        <FormWrapper onSubmit={handleSubmit(onSubmit)}>
          <Grid
            item
            container
            direction={"row"}
            justifyContent={"center"}
            alignContent={"center"}
            width={"100%"}
            height={"100vh"}
          >
            <Card className={cardStyle}>
              <CardContent>
                <Grid
                  item
                  container
                  direction={"row"}
                  justifyContent={"center"}
                  alignContent={"center"}
                  spacing={2}
                >
                  <Grid
                    item
                    md={12}
                    xs={12}
                    alignSelf={"flex-start"}
                    display={"flex"}
                  >
                    <Typography component={"body"}>
                      {t(`login.loginForm.title`)}
                    </Typography>
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <FormControl component="fieldset" fullWidth>
                      <Controller
                        name={"country"}
                        control={control}
                        render={({ field }) => (
                          <Autocomplete
                            id="country"
                            // sx={{ width: 300 }}
                            options={countries.countries}
                            autoHighlight
                            getOptionLabel={(option) => option.label}
                            fullWidth
                            renderOption={(props, option) => (
                              <Box
                                component="li"
                                sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                                {...props}
                              >
                                <img
                                  loading="lazy"
                                  width="20"
                                  srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                                  src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                                  alt=""
                                />
                                {option.label}
                              </Box>
                            )}
                            onChange={handleCountryChange}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                fullWidth
                                label={t(`login.loginForm.form.country.label`)}
                                error={Boolean(errors?.country)}
                                helperText={<>{errors?.country?.message}</>}
                                inputProps={{
                                  ...params.inputProps,
                                  autoComplete: "new-password", // disable autocomplete and autofill
                                }}
                              />
                            )}
                          />
                        )}
                        rules={getFieldValidation("country")}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <FormControl component="fieldset" fullWidth>
                      <Controller
                        name={"username"}
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label={t(`login.loginForm.form.username.label`)}
                            error={Boolean(errors?.username)}
                            helperText={<>{errors?.username?.message}</>}
                            data-testId={`password`}
                          />
                        )}
                        rules={getFieldValidation("username")}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <FormControl component="fieldset" fullWidth>
                      <Controller
                        name={"password"}
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label={t(`login.loginForm.form.password.label`)}
                            error={Boolean(errors?.password)}
                            helperText={<>{errors?.password?.message}</>}
                            data-testId={`password`}
                            type="password"
                          />
                        )}
                        rules={getFieldValidation("password")}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <Button
                      onClick={handleSubmit(onSubmit)}
                      color="primary"
                      disabled={!isValid}
                      variant="contained"
                      type="submit"
                    >
                      {t(`login.loginForm.submit`)}
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </FormWrapper>
      </FormProvider>
    </Grid>
  );
};

export default Login;
