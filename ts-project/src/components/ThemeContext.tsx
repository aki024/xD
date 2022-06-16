import React, { ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

const themes = {
  dark: {
    backgroundColor: "#000000",
    color: "#eeeeee",
  },
  light: {
    backgroundColor: "#ffffff",
    color: "#222222",
  },
};

export const ThemeContext = React.createContext(themes);

export const ThemeContextProvider = ({ children }: Props) => {
  return (
    <ThemeContext.Provider value={themes}>{children}</ThemeContext.Provider>
  );
};
