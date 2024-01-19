import React from "react";
import { create } from "jss";
import rtl from "jss-rtl";
import { StylesProvider, jssPreset } from "@mui/styles";

// Configure JSS
const jss: any = create({ plugins: [...jssPreset().plugins, rtl()] } as any);

const RTL = (props: any) => {
  return <StylesProvider jss={jss}>{props.children}</StylesProvider>;
};

export default RTL;
