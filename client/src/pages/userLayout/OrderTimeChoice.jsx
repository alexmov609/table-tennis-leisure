import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import uuid from "react-uuid";
import PayPal from "./PayPal";
import PayPal2 from "./PayPal2";
import useFetch from "../../custom_hooks/useFetch";
import { corsMaker } from "../../data/dummy";


//Component that gives to an user an option to place an order
const OrderTimeChoice = ({ dateOfGame,abonement }) => {
  console.log(abonement);
  let today = new Date().toLocaleDateString().split(".");
  today = `${today[2]}-${today[1]}-${today[0]}`;

  const [chosenTimePeriods, setChosenTimePeriods] = useState([]);
  const [filteredtimePeriods, setFilteredtimePeriods] = useState([]);
  const { currentColor,currentMode} = useStateContext();
  

  const [urlsArray, setUrlsArray] = useState([
    {
      url: process.env.REACT_APP_READ_FILTERED_TIME_PERIODS,
      cors: corsMaker({
        method: "POST",
        body: {
          date: dateOfGame || today,
          day_id: new Date(dateOfGame || today).getDay(),
        },
      }),
    },
  ]);
  const { data, fetchErr, isLoading } = useFetch(urlsArray);
  useEffect(() => {
    const settersArray = [setFilteredtimePeriods];
    data.forEach((el, i) => settersArray[i](el));
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
          el.time_period_id === tmp ? { ...el, backgroundColor: "#021691" } : el
        );
      });
    }
  };


  const handleOrder = (chosenTimePeriods) => {
      // return fetch();
   console.log(chosenTimePeriods);
  };
 console.log(currentMode);
  return (
    <div className="min-w-full flex flex-col items-center">
      <p className="text-2xl font-bold py-4">Selected date: {dateOfGame}</p>
      {/**left part of a page */}
      <div className="w-full flex flex-col text-center">
        <p className="text-4xl font-bold py-4 text-black">Time periods</p>
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

      {abonement.name_of_abonement === "free" ? (
        <button className="pt-8">
          <PayPal2
            chosenTimePeriods={chosenTimePeriods}
            disabled={chosenTimePeriods.length > 0}
          />
        </button>
      ) : (
        <button
          className="w-64 rounded-full text-white py-4 my-4 bg-slate-500 hover:bg-slate-800 "
          onClick={handleOrder(chosenTimePeriods)}
        >
          Add order
        </button>
      )}
    </div>
  );
};

export default OrderTimeChoice;
