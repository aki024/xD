import React, { Dispatch, SetStateAction } from "react";

interface Props {
  setDarkMode: Dispatch<SetStateAction<boolean>>;
}

const DarkModeButton = ({ setDarkMode }: Props) => {
  return (
    <div className="toggle-theme-wrapper">
      <span>☀️</span>
      <label className="toggle-theme" htmlFor="checkbox">
        <input
          type="checkbox"
          id="checkbox"
          onChange={() => setDarkMode((prevstate) => !prevstate)}
        />
        <div className="slider round"></div>
      </label>
      <span>🌒</span>
    </div>
  );
};

export default DarkModeButton;
