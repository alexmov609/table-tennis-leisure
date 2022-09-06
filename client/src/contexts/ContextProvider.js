import React, { createContext, useContext, useEffect, useState } from "react";
import useFetch from "../custom_hooks/useFetch";

const StateContext = createContext();

const initialState = {
  userProfile: false,
};

//react arrow function component
//context provider has too have value property
//every value passed throw here they all be passed throw al of the components inside of our app.
//you always return children-its every context you wrap here will be return the actual page.it return underline component below that context.
export const ContextProvider = ({ children }) => {
  let today = new Date().toLocaleDateString().split(".");
  today = `${today[2]}-${today[1]}-${today[0]}`;
  const [activeMenu, setActiveMenu] = useState(true);

  const [isClicked, setIsClicked] = useState(initialState);
  const [screenSize, setScreenSize] = useState();

  const [currentColor, setCurrentColor] = useState("#03C9D7");
  const [currentMode, setCurrentMode] = useState("Light");
  const [themeSettings, setThemeSettings] = useState(false);
  const [authentication, setAuthentication] = useState({});

  const [dateOfGame, setDateOfGame] = useState(today);

  const setMode = (e) => {
    setCurrentMode(e.target.value);
    fetch("/updateUserTheme", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ theme: e.target.value === "dark" ? 2 : 1 }),
    });
    setThemeSettings(false);
  };

  const setColor = (color) => {
    setCurrentColor(color);

    setThemeSettings(false);
  };
  const handleClick = (clicked) => {
    setIsClicked({ ...initialState, [clicked]: true });
  };
  return (
    <StateContext.Provider
      value={{
        activeMenu,
        setActiveMenu,
        isClicked,
        setIsClicked,
        handleClick,
        screenSize,
        setScreenSize,
        currentColor,
        currentMode,
        setCurrentMode,
        themeSettings,
        setThemeSettings,
        setMode,
        setColor,
        dateOfGame,
        setDateOfGame,
        authentication,
        setAuthentication,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

//can have multiple context providers
export const useStateContext = () => useContext(StateContext);
