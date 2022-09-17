import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import uuid from "react-uuid";
import PayPal from "./PayPal";
import PayPal2 from "./PayPal2";
import useFetch from "../../custom_hooks/useFetch";

//Component that gives to an user an option to place an order
const OrderTimeChoice = ({ dateOfGame }) => {
  let today = new Date().toLocaleDateString().split(".");
  today = `${today[2]}-${today[1]}-${today[0]}`;

  const [chosenTimePeriods, setChosenTimePeriods] = useState([]);
  const [filteredtimePeriods, setFilteredtimePeriods] = useState([]);
  const { currentColor } = useStateContext();
  const [urlsArray, setUrlsArray] = useState([
    {
      url: process.env.REACT_APP_READ_FILTERED_TIME_PERIODS,
      cors: {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // "x-xsrf-token": csrfToken,
        },
        body: JSON.stringify({
          date: dateOfGame || today,
          day_id: new Date(dateOfGame || today).getDay(),
        }),
      },
    },
  ]);
  const { data, fetchErr, isLoading } = useFetch(urlsArray);
  useEffect(() => {
    setFilteredtimePeriods(data[0]);
  }, [data]);

  const handleClick = (e, tmp) => {
    const name = e.target.name;

    if (chosenTimePeriods.find((elem) => name === elem)) {
      setChosenTimePeriods(chosenTimePeriods.filter((elem) => elem !== name));

      setFilteredtimePeriods((prev) => {
        return prev.map((el) =>
          el.time_period_id === tmp
            ? { ...el, backgroundColor: currentColor }
            : el
        );
      });
    } else {
      setChosenTimePeriods([...chosenTimePeriods, name]);
      setFilteredtimePeriods((prev) => {
        return prev.map((el) =>
          el.time_period_id === tmp ? { ...el, backgroundColor: "black" } : el
        );
      });
    }
  };
  return (
    <div className="min-w-full flex sm:flex-row  flex-col ">
      {/**left part of a page */}
      <div className="w-full flex flex-col pl-16 lg:w-2/5 text-center">
        <p className="text-4xl font-bold py-4 dark:text-white">Time periods</p>
        {isLoading && <p>Loading</p>}
        {fetchErr && <p>{fetchErr}</p>}
        {!isLoading &&
          filteredtimePeriods.map(
            ({ start_time, end_time, c, time_period_id, backgroundColor }) => {
              return (
                <button
                  style={{
                    backgroundColor:
                      c === 5 ? "Grey" : backgroundColor || currentColor,
                  }}
                  name={time_period_id}
                  key={uuid()}
                  disabled={c === 5 ? true : false}
                  className="w-full shadow-xl shadow-gray-400 p-4 bg-slate-700 text-gray-100 mt-4 hover:scale-105 ease-in duration-300 "
                  onClick={(e) => handleClick(e, time_period_id)}
                >
                  {`${start_time}-${end_time}`}
                </button>
              );
            }
          )}
      </div>

      {/**right part */}
      <div className=" flex flex-col items-center w-full min-h-[50%] lg:w-3/5  ml-3 shadow-gray-400">
        <p className="text-4xl font-bold py-4 dark:text-white text-center">
          Order info
        </p>

        <div className=" w-full  lg:w-3/5  ml-3 shadow-xl shadow-gray-400 rounded-xl p-4 mt-10">
          <div>
            <span className="uppercase px-3 py-1 bg-indigo-200 text-indigo-900 rounded-2xl text-sm">
              {dateOfGame}
            </span>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-white dark:bg- text-slate-900  min-h-[50%] w-full  m-4 p-8 rounded-xl shadow-2xl relative hover:scale-105 ease-in duration-300">
              data about
            </div>
            <button
              style={{ backgroundColor: currentColor }}
              className="w-full p-4 bg-slate-700 text-gray-100 mt-4 hover:bg-slate-500  rounded-full"
              // onClick={handleClickToPayment}
            >
              Place order
            </button>
          </div>
        </div>
        <PayPal2 chosenTimePeriods={chosenTimePeriods} />
      </div>
    </div>
  );
};

export default OrderTimeChoice;
