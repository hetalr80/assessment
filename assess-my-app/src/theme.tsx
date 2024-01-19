const uaeColorPalette = {
  primary: {
    light: "#f1e7b7",
    main: "#ddc965",
    dark: "#ddc965",
    contrastText: "#645757",
  },
};

const indiaColorPalette = {
  primary: {
    light: "#3f48b870",
    main: "#3f48b8cf",
    dark: "#3f48b8cf",
    contrastText: "#fff",
  },
};

export const getThemePalette = (country: string) => {
  return country === "AE" ? uaeColorPalette : indiaColorPalette;
};
