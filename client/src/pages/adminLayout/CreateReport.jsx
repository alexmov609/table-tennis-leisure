import React, { useEffect, useState } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import { Table, ColorMapping, Bar, Pyramid, Doughnut } from "../Charts";
import { userGrid, ordersGrid } from "../../data/dummy";

//Component that helps to create different reports
const CreateReport = () => {
  const { currentColor } = useStateContext();
  const [dataToShow, setDataToShow] = useState([]);
  const [ButtonClicked, setButtonClicked] = useState(false);
  const [dateRange, setDateRange] = useState({
    start_date: new Date(
      new Date().setDate(new Date().getDate() - 30)
    ).toLocaleDateString(),
    end_date: new Date().toLocaleDateString(),
  });

  const [passport, setPassport] = useState("");

  const handleFetch = async ({ target }, cors = null) => {
    const data = await fetch(target.name, cors).then((data) => data.json());
    setDataToShow(data);
    setButtonClicked(target.name);
  };

  const handleDateChange = (target) => {
    setDateRange((prev) => {
      return { ...prev, [target.name]: target.value };
    });
  };

  const handlePassportChange = (target) => {
    setPassport(target.value);
  };

  return (
    <div className="flex flex-col m-2 md:m-10 mt-24 p-2 md:p-10 bg-zinc-100 rounded-3xl">
      <div className="flex flex-row">
        {/**Start-end date */}
        <div className="flex flex-row md:flex-col">
          <div className="flex flex-col w-29 m-2">
            <label htmlFor="">Start date</label>
            <input
              type="date"
              onChange={({ target }) => handleDateChange(target)}
              name="start_date"
              className="border  bg-gray-200 p-2"
            />
          </div>
          <div className="flex flex-col w-29 m-2">
            <label htmlFor="">End date</label>
            <input
              type="date"
              onChange={({ target }) => handleDateChange(target)}
              name="end_date"
              className="border  bg-gray-200 p-2"
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row ">
          <button
            style={{ backgroundColor: currentColor }}
            className="w-36 h-16 p-1 text-gray-100 mt-0.5 mx-1"
            name={process.env.REACT_APP_READ_PROFIT}
            onClick={(e) =>
              handleFetch(e, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "x-xsrf-token": localStorage.getItem("csrf"),
                },
                body: JSON.stringify(dateRange),
              })
            }
          >
            Calculate profit
          </button>
          <button
            style={{ backgroundColor: currentColor }}
            className="w-36 h-16 p-1 text-gray-100 mt-0.5 mx-1"
            name={process.env.REACT_APP_READ_DAYS_LOAD}
            onClick={(e) =>
              handleFetch(e, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "x-xsrf-token": localStorage.getItem("csrf"),
                },
                body: JSON.stringify(dateRange),
              })
            }
          >
            Days load
          </button>
          <button
            style={{ backgroundColor: currentColor }}
            className="w-36 h-16 p-1 text-gray-100 mt-0.5 mx-1"
            name={process.env.REACT_APP_READ_USERS_DATA_BY_PAYMENT}
            onClick={(e) =>
              handleFetch(e, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "x-xsrf-token": localStorage.getItem("csrf"),
                  body: JSON.stringify(dateRange),
                },
              })
            }
          >
            Display profit gained from users
          </button>
          <button
            style={{ backgroundColor: currentColor }}
            className="w-36 h-16 p-1 text-gray-100 mt-0.5 mx-1"
            name={process.env.REACT_APP_READ_CUSTOMERS_AGES}
            onClick={(e) => handleFetch(e)}
          >
            Display customers' ages
          </button>
          <button
            style={{ backgroundColor: currentColor }}
            className="w-36 h-16 p-1 text-gray-100 mt-0.5 mx-1"
            name={process.env.REACT_APP_READ_CUSTOMERS_ABONEMENTS}
            onClick={(e) => handleFetch(e)}
          >
            Display users' abonements
          </button>
          <button
            style={{ backgroundColor: currentColor }}
            className="w-36 h-16 p-1 text-gray-100 mt-0.5 mx-1"
            name={process.env.REACT_APP_READ_USER_ORDERS_BY_PASSPORT}
            onClick={(e) =>
              handleFetch(e, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "x-xsrf-token": localStorage.getItem("csrf"),
                },
                body: JSON.stringify({ passport }),
              })
            }
          >
            Display users' orders by passport
          </button>
        </div>
      </div>
      {ButtonClicked === process.env.REACT_APP_READ_CUSTOMERS_ABONEMENTS && (
        <Doughnut dataToShow={dataToShow} />
      )}
      {ButtonClicked === process.env.REACT_APP_READ_DAYS_LOAD && (
        <ColorMapping dataToShow={dataToShow} />
      )}
      {ButtonClicked === process.env.REACT_APP_READ_PROFIT && (
        <Bar dataToShow={dataToShow} />
      )}
      {ButtonClicked === process.env.REACT_APP_READ_CUSTOMERS_AGES && (
        <Pyramid dataToShow={dataToShow} />
      )}
      {ButtonClicked === process.env.REACT_APP_READ_USERS_DATA_BY_PAYMENT && (
        <Table dataToShow={dataToShow} grid={userGrid} />
      )}
      {ButtonClicked === process.env.REACT_APP_READ_USER_ORDERS_BY_PASSPORT && (
        <>
          <div className="flex flex-col md:flex-row flex justify-center">
            <div className="flex flex-col w-30 m-2">
              <label htmlFor="">Passport</label>
              <input
                type="number"
                onChange={({ target }) => handlePassportChange(target)}
                name="passport"
                className="border  bg-gray-200 p-2"
              />
            </div>
          </div>
          <Table
            dataToShow={dataToShow}
            grid={ordersGrid.filter((el) => el.field !== "payment_status")}
          />
        </>
      )}
    </div>
  );
};

export default CreateReport;
