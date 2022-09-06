import React from "react";
import { Link, NavLink } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { MdOutlineCancel } from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { links, userlinks } from "../data/dummy";
import { useStateContext } from "../contexts/ContextProvider";

// Sidebar Template Component.
const Sidebar = () => {
  {
    /*Open and close sidebar */
  }
  const {
    authentication,
    activeMenu,
    setActiveMenu,
    screenSize,
    currentColor,
  } = useStateContext();
  const { authorities } = authentication;

  {
    /**If we on mobile device after click it will close automatically */
  }
  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };
  const adminLinks = links.map((item) => (
    <div key={item.title}>
      <p className="text-gray-400 m-3 mt-4 uppercase">{item.title}</p>
      {item.links.map((link) => (
        //isActive-state  give us straight use nav link component and belongign to react router dom
        <NavLink
          to={`/${link.name}`}
          key={link.name}
          onClick={handleCloseSideBar}
          className={({ isActive }) => (isActive ? activeLink : normalLink)}
          style={({ isActive }) => ({
            backgroundColor: isActive ? currentColor : "",
          })}
        >
          {link.icon}
          <span className="capitalize">{link.namefront}</span>
        </NavLink>
      ))}
    </div>
  ));
  //
  const userLinks = userlinks.map((item) => (
    <div key={item.title}>
      <p className="text-gray-400 m-3 mt-4 uppercase">{item.title}</p>
      {item.links.map((link) => (
        //isActive-state  give us straight use nav link component and belonging to react router dom
        <NavLink
          to={`/${link.name}`}
          key={link.name}
          onClick={handleCloseSideBar}
          className={({ isActive }) => (isActive ? activeLink : normalLink)}
          style={({ isActive }) => ({
            backgroundColor: isActive ? currentColor : "",
          })}
        >
          {link.icon}
          <span className="capitalize">{link.namefront}</span>
        </NavLink>
      ))}
    </div>
  ));

  const activeLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rouded-lg text-white text-md m-2";
  const normalLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rouded-lg  text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2";

  return (
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {activeMenu && (
        <React.Fragment>
          <div className="flex justify-between items-center">
            <Link
              to={
                authorities === 2
                  ? "/AdminApp/DayManagmentCertainDate"
                  : "/UserApp/Calendar"
              }
              onClick={handleCloseSideBar}
              className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900"
            >
              <AiFillHome />
              <span>Home</span>
            </Link>
            <TooltipComponent content="Menu" position="BottomCenter">
              <button
                type="button"
                onClick={() =>
                  setActiveMenu((prevActiveMenu) => !prevActiveMenu)
                }
                className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 "
              >
                <MdOutlineCancel />
              </button>
            </TooltipComponent>
          </div>
          <div className="mt-10">
            {authorities === 2 ? adminLinks : userLinks}
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default Sidebar;
