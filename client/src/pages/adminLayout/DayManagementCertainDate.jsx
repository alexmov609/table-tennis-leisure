import { useEffect, useState, useReducer } from "react";
import uuid from "react-uuid";
import { useStateContext } from "../../contexts/ContextProvider";
import useFetch from "../../custom_hooks/useFetch";
import { corsMaker } from "../../data/dummy";
import Calendar from "../Calendar";

const DayManagementCertainDate = () => {
  const { currentColor, today } = useStateContext();

  const [dateOfGame, setDateOfGame] = useState(today);
  const [blockedDates, setBlockedDates] = useState([]);
  const [filteredTimePeriods, setFilteredTimePeriods] = useState([]);
  const [tables, setTables] = useState(0);
  const [urlState, dispatch] = useReducer(reducer, [
    {
      url: process.env.REACT_APP_READ_FILTERED_TIME_PERIODS,
      cors: corsMaker({
        method: "POST",
        body: { date: dateOfGame, day_id: new Date(dateOfGame).getDay() },
      }),
    },
    {
      url: process.env.REACT_APP_READ_ALTERED_BLOCKED_DATES,
      cors: null,
    },
    {
      url: process.env.REACT_APP_READ_TABLES,
    },
  ]);

  const { data, fetchErr, isLoading } = useFetch(urlState);
  useEffect(() => {
    const settersArray = [setFilteredTimePeriods, setBlockedDates, setTables];
    data.forEach((el, i) => settersArray[i](el));
  }, [data]);
  useEffect(() => {
    dispatch({ key: "dateOfGameUpdated", payload: { dateOfGame } });
  }, [dateOfGame]);

  function reducer(state, action) {
    const { key, payload } = action;

    switch (key) {
      case "dateOfGameUpdated":
        const { dateOfGame } = payload;
        state[0].cors["body"] = JSON.stringify({
          date: dateOfGame,
          day_id: new Date(dateOfGame).getDay(),
        });

        return [...state];

      default:
        break;
    }
  }

  const handleBlockUnBlock = () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-xsrf-token": localStorage.getItem("csrf"),
      },
      body: JSON.stringify({
        date: dateOfGame,
        open: "-----",
        close: "-----",
      }),
    };
    if (isDayBlocked() && blockedDates.length > 0) {
      fetch(
        process.env.REACT_APP_DELETE_ALTERED_WORK_SCHEDULE,
        corsMaker({
          method: "POST",
          body: { date: dateOfGame },
        })
      );
      setBlockedDates((prev) =>
        prev.filter(
          ({ date }) =>
            new Date(date).toLocaleDateString() !==
            new Date(dateOfGame).toLocaleDateString()
        )
      );
    } else {
      fetch(
        process.env.REACT_APP_CREATE_CERTAIN_DATE_SCHEDULE,
        corsMaker({
          method: "POST",
          body: { date: dateOfGame, open: "-----", close: "-----" },
        })
      );
      setBlockedDates((prev) => [...prev, { date: dateOfGame }]);
    }
  };
  const isDayBlocked = () => {
    return !!blockedDates.find(
      ({ date }) =>
        new Date(date).toLocaleDateString() ===
        new Date(dateOfGame).toLocaleDateString()
    );
  };

  return (
    <div className="flex flex-row sm:flex-col lg:flex-row">
      <Calendar
        setDateOfGame={setDateOfGame}
        setBlockedDates={setBlockedDates}
      />
      {/**Side component with info day chosen in calendar*/}
      <div className=" min-w-[40%] bg-white text-slate-900 m-4 p-8 rounded-xl shadow-2xl relative">
        <div className="flex flex-col items-center font-bold">
          <span className="uppercase px-3 py-1 bg-indigo-200 text-indigo-900 rounded-2xl text-lg">
            {dateOfGame}
          </span>
        </div>

        <div className="min-w-[50%] flex flex-row-2 ">
          <div className="flex flex-col  ml-10">
            <div className="flex flex-row space-x-4">
              <h2 className="text-2xl font-bold ">Tables</h2>
              <h2 className="text-2xl font-bold ">Time periods</h2>
            </div>
            {!isLoading &&
              filteredTimePeriods.map(({ start_time, end_time, c }) => {
                return (
                  <div key={uuid()} className="flex flex-row">
                    <p className="w-full p-1 mt-0.5 text-center text-xl font-bold">
                      {c ? c : 0}{" "}
                    </p>
                    <button
                      className="w-full p-1 bg-slate-700 hover:bg-slate-500 text-gray-100 mt-0.5"
                      style={{
                        backgroundColor:
                          c === tables[0].amount_of_tables
                            ? "Grey"
                            : currentColor,
                      }}
                    >
                      {`${start_time}-${end_time}`}
                    </button>
                  </div>
                );
              })}
          </div>
          <div className="flex flex-col mx-3">
            {new Date(dateOfGame) > new Date() && (
              <button
                onClick={() => {
                  handleBlockUnBlock();
                }}
                style={{ backgroundColor: currentColor }}
                className="w-36 mx-auto rounded-xl py-4 my-4 text-white hover:border-green-600px-4 ease-in duration-300"
              >
                {isDayBlocked() ? "Unblock day" : "Block day"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DayManagementCertainDate;
