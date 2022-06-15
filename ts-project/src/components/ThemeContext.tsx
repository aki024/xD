import React, { ReactNode, useState } from "react";

interface Props {
  children?: ReactNode;
}

export const themes = {
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
  const [darkTheme, setDarkTheme] = useState<boolean>(true);

  return (
    <ThemeContext.Provider value={themes}>{children}</ThemeContext.Provider>
  );
};
