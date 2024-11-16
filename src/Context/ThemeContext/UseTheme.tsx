import { useContext } from "react";
import { ThemeProviderContext } from "./ThemeProvider";

export const UseTheme = () => {
  return useContext(ThemeProviderContext);
};
