import { useTranslation } from "react-i18next";

const useValidation = (
  input: { [Key: string]: any },
  customValidation?: any
) => {
  const { t } = useTranslation();
  const { key, validations } = input;
  const val: any = {
    IS_REQUIRED: "required",
    MIN_LENGTH: "minLength",
    MAX_LENGTH: "maxLength",
    REGEX_FE: "pattern",
  };

  const baseLang = `preLogin.signup.form`;

  const validatefield = (value: string) => {
    if (typeof customValidation === "function") {
      return customValidation(value);
    }
  };

  const rules: any = {};
  validations.forEach((item: any) => {
    switch (item.type) {
      case "MIN_LENGTH":
      case "MAX_LENGTH":
        rules[val[item["type"]]] = {
          value: Number(item["value"]),
          message: t(`${baseLang}.${key}.validation.${val[item["type"]]}`),
        };
        break;
      case "REGEX_FE":
        rules[val[item["type"]]] = {
          value: new RegExp(item["value"]),
          message: t(`${baseLang}.${key}.validation.${val[item["type"]]}`),
        };
        break;
      case "CUSTOM_VALIDATION":
        rules["validate"] = {
          validateFormate: (val: string) => {
            return val && validatefield(val);
          },
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

export default useValidation;
