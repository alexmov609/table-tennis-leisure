import { useEffect, useState } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import { Table, ColorMapping, Bar, Pyramid, Doughnut } from "../Charts";
import { userGrid, ordersGrid, handleForm, corsMaker } from "../../data/dummy";
import uuid from "react-uuid";
import useFetch from "../../custom_hooks/useFetch";

//Component that helps to create different reports
const CreateReport = () => {
  const { currentColor } = useStateContext();
  const [dateRange, setDateRange] = useState({
    start_date: new Date(
      new Date().setDate(new Date().getDate() - 30)
    ).toLocaleDateString(),
    end_date: new Date().toLocaleDateString(),
  });

  const [passport, setPassport] = useState({ passport: "" });
  const [buttonsArray, setButtonsArray] = useState([
    { show: false, name: "Calculate profit" },
    { show: false, name: "Days' load" },
    { show: false, name: "Display profit gained from users" },
    { show: false, name: "Display customers' ages" },
    { show: false, name: "Display users' abonements" },
    { show: false, name: "Display users' orders by passport" },
  ]);
  const [chartsArray, setChartsArray] = useState([]);
  const [urlsArray, setUrlsArray] = useState([
    {
      url: process.env.REACT_APP_READ_PROFIT,
      cors: corsMaker({
        method: "POST",
        body: dateRange,
      }),
    },
    {
      url: process.env.REACT_APP_READ_DAYS_LOAD,
      cors: corsMaker({
        method: "POST",
        body: dateRange,
      }),
    },
    {
      url: process.env.REACT_APP_READ_USERS_DATA_BY_PAYMENT,
      cors: corsMaker({
        method: "POST",
        body: dateRange,
      }),
    },
    { url: process.env.REACT_APP_READ_CUSTOMERS_AGES, cors: null },
    { url: process.env.REACT_APP_READ_CUSTOMERS_ABONEMENTS, cors: null },
    {
      url: process.env.REACT_APP_READ_USER_ORDERS_BY_PASSPORT,
      cors: corsMaker({
        method: "POST",
        body: passport,
      }),
    },
  ]);

  const { data, fetchErr, isLoading } = useFetch(urlsArray);
  useEffect(() => {
    setButtonsArray((prev) =>
      prev.map((el, i) => {
        const { name, show } = el;
        return {
          name,
          show,
          btn: (
            <>
              <div key={uuid()}>
                <button
                  style={{ backgroundColor: currentColor }}
                  className="w-36 h-16 p-1 text-gray-100 mt-0.5 mx-1 hover:scale-105 ease-in duration-300"
                  onClick={(_) => {
                    handleShow(i);
                  }}
                >
                  {name}
                </button>
              </div>
            </>
          ),
        };
      })
    );
  }, [currentColor]);
  useEffect(() => {
    setChartsArray(
      [Bar, ColorMapping, Table, Doughnut, Doughnut, Table].map(
        (Component, i) => {
          if (i === 2)
            return (
              <>
                {buttonsArray[i].show && (
                  <Component dataToShow={data[i]} grid={userGrid} />
                )}
              </>
            );

          if (i === 5)
            return (
              <>
                {buttonsArray[i].show && (
                  <>
                    <div className="flex flex-col md:flex-row justify-center">
                      <form
                        className="flex flex-col w-30 m-2"
                        onSubmit={handleSubmit}
                      >
                        <label htmlFor="passport">Passport</label>
                        <input
                          type="number"
                          id="passport"
                          name="passport"
                          className="border  bg-gray-200 p-2"
                        />
                        <button type="submit"> Submit</button>
                      </form>
                    </div>
                    <Component
                      dataToShow={data[i]}
                      grid={ordersGrid.filter(
                        (el) => el.field !== "payment_status"
                      )}
                    />
                  </>
                )}
              </>
            );
          return (
            <>{buttonsArray[i].show && <Component dataToShow={data[i]} />}</>
          );
        }
      )
    );
  }, [buttonsArray, data]);
  useEffect(() => {
    setUrlsArray((prev) =>
      prev.map(({ url, cors }, i) => {
        return {
          url,
          cors: cors
            ? {
                ...cors,
                body: JSON.stringify(i === 5 ? passport : dateRange),
              }
            : null,
        };
      })
    );
  }, [dateRange, passport]);

  function handleSubmit(e) {
    e.preventDefault();
    const formProps = handleForm(e);
    formProps?.start_date && setDateRange(formProps);
    formProps?.passport && setPassport(formProps);
  }

  function handleShow(index) {
    setButtonsArray((prev) =>
      prev.map((el, i) => {
        return { ...el, show: index === i ? true : false };
      })
    );
  }

  return (
    <div className="flex flex-col  m-2 md:m-10 mt-24 p-2 md:p-10 bg-zinc-100 rounded-3xl">
      <div className="flex flex-col lg:flex-row items-center ">
        {/**Start-end date */}
        <form
          className="flex flex-col items-center "
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col w-29 m-2">
            <label htmlFor="start_date" style={{ textAlign: "center" }}>
              Start date
            </label>
            <input
              type="date"
              name="start_date"
              id="start_date"
              className="border bg-gray-200 p-2"
            />
          </div>
          <div className="flex flex-col  w-29 m-2">
            <label htmlFor="end_date" style={{ textAlign: "center" }}>
              End date
            </label>
            <input
              type="date"
              name="end_date"
              id="end_date"
              className="border  bg-gray-200 p-2"
            />
          </div>
          <button
            style={{
              backgroundColor: currentColor,
              color: "white",
              borderRadius: "5px",
            }}
            className={`text-xl p-1 w-36 border-lg hover:drop-shadow-xl`}
            type="submit"
          >
            Submit
          </button>
        </form>
        {isLoading && <p>Loading</p>}
        {fetchErr && <p>{fetchErr}</p>}
        {buttonsArray.map(({ btn }) => btn)}
      </div>
      {!isLoading && chartsArray}
    </div>
  );
};

export default CreateReport;
