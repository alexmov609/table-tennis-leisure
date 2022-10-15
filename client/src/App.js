import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useStateContext } from "./contexts/ContextProvider";
import "./App.css";

import { Calendar, LogIn, SignUp, RestorePassword } from "./pages";
import PermissionRequired from "./components/PermissionRequreid";
import AuthenticationRequired from "./components/AuthenticationRequired";
import {
  ChooseAbonement,
  ContactUs,
  MyOrders,
  OrderTimeChoice,
  Payment,
  PersonalData,
  UserApp,
} from "./pages/userLayout";

import {
  AddAbonement,
  AdminApp,
  CreateReport,
  DayManagementCertainDay,
  DayManagementCertainDate,
} from "./pages/adminLayout";

import PayPal from "./pages/userLayout/PayPal";

const App = () => {
  const { authentication } = useStateContext();
  const { authorities } = authentication;

  {
    /**Here we will put our Context */
  }

  // <div className={currentMode === "Dark" ? "dark" : ""}>
  // </div>
  return (
    <Routes>
      <Route path="/" element={<LogIn />} />
      <Route path="/SignUp" element={<SignUp />} />
      <Route path="/RestorePassword" element={<RestorePassword />} />

      <Route element={<AuthenticationRequired />}>
        <Route
          element={<PermissionRequired hasPermission={authorities === 1} />}
        >
          <Route path="/UserApp" element={<UserApp />}>
            <Route path="/UserApp/Calendar" element={<Calendar />} />
    
            <Route path="/UserApp/myOrders" element={<MyOrders />} />
            <Route path="/UserApp/payment" element={<Payment />} />
            <Route
              path="/UserApp/ChooseAbonement"
              element={<ChooseAbonement />}
            />
            <Route path="/UserApp/personalData" element={<PersonalData />} />
            <Route path="/UserApp/contactUs" element={<ContactUs />} />
            <Route path="/UserApp/PayPal" element={<PayPal />} />
          </Route>
        </Route>

        <Route
          element={<PermissionRequired hasPermission={authorities === 2} />}
        >
          <Route path="/AdminApp" element={<AdminApp />}>
            {" "}
            <Route path="/AdminApp/AddAbonement" element={<AddAbonement />} />
            <Route path="/AdminApp/CreateReport" element={<CreateReport />} />
            <Route
              path="/AdminApp/DayManagmentCertainDay"
              element={<DayManagementCertainDay />}
            />
            <Route
              path="/AdminApp/DayManagmentCertainDate"
              element={<DayManagementCertainDate />}
            />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
