import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

import { Navbar, Footer, ThemeSettings, Sidebar } from "../../components";
import { useStateContext } from "../../contexts/ContextProvider";
import useFetch from "../../custom_hooks/useFetch";

//Main component that includes user interface components
const UserApp = () => {
  // const [orderToUpdate, setOrderToUpdate] = useState(null);
  // const [freeTime, setFreeTime] = useState(null);

  const {
    activeMenu,
    themeSettings,
    setThemeSettings,
    currentColor,
    currentMode,
  } = useStateContext();

  const [urlsArray, setUrlsArray] = useState([
    { url: process.env.REACT_APP_READ_USER },
    { url: process.env.REACT_APP_READ_ABONEMENT },
    { url: process.env.REACT_APP_READ_ORDERS },
    { url: process.env.REACT_APP_READ_PERSON },
    { url: process.env.REACT_APP_READ_ALL_ABONEMENTS },
    { url: process.env.REACT_APP_READ_UNAVAILABLE_TIME_PERIODS },
  ]);
  const [
    {
      user,
      userAbonement,
      orders,
      person,
      abonementsToChoose,
      unavailableTimePeriods,
    },
    setUserAppFetchResults,
  ] = useState({
    user: [],
    userAbonement: [],
    orders: [],
    person: [],
    abonementsToChoose: [],
    unavailableTimePeriods: [],
  });
  const { data, fetchErr, isLoading } = useFetch(urlsArray);
  useEffect(() => {
    setUserAppFetchResults((prev) => {
      const keys = Object.keys(prev);
      data.forEach((el, index) => (prev[keys[index]] = el));
      return prev;
    });
  }, [data]);
  return (
    <div className={currentMode}>
      <div className="flex relative dark:bg-main-dark-bg">
        <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
          <TooltipComponent content="Settings" position="Top">
            <button
              type="button"
              className="text-3xl white p-3 hover:drop-shadow-xl hover:bg-light-gray"
              style={{ background: currentColor, borderRadius: "50%" }}
              onClick={() => setThemeSettings(true)}
            >
              <FiSettings />
            </button>
          </TooltipComponent>
        </div>
        {activeMenu ? (
          <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white">
            <Sidebar />
          </div>
        ) : (
          <div className="w-0 dark:bg-secondary-dark-bg">
            <Sidebar />
          </div>
        )}
        <div
          className={
            //when it open or closed
            //we reduce a repeatetive code
            `dark:bg-main-dark-bg bg-main-bg min-h-screen w-full ${
              activeMenu ? "md:ml-72" : "flex-2"
            }`
          }
        >
          {/*problem with rar */}
          <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full">
            <Navbar />
          </div>

          <div>
            {themeSettings && <ThemeSettings />}
            {isLoading && <p>Loading</p>}
            {fetchErr && <p>{fetchErr}</p>}
            {!isLoading &&
              (orders.length ? (
                <Outlet
                  context={{
                    user,
                    orders,
                    userAbonement,
                    abonementsToChoose,
                    person,
                    unavailableTimePeriods,
                  }}
                />
              ) : (
                <p>Smth</p>
              ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserApp;
