import { createContext, useContext } from "react";

export const ThemeContext = createContext({
  backgroundColor: "bg-secondary-subtle",
  textColor: "text-dark",
});

export const useTheme = () => useContext(ThemeContext);
