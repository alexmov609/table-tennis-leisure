import React, { useEffect, useState } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import useFetch from "../../custom_hooks/useFetch";

//Component that contains week days
// Administrator can change work hours or block/unblock each of days
const DayManagmentCertainDay = () => {
  const { currentColor } = useStateContext();
  const [blockedDays, setBlockedDays] = useState([]);
  const [basicDaysSchedule, setBasicDaysSchedule] = useState([]);

  const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const [urlsArray, setUrlsArray] = useState([
    { url: process.env.REACT_APP_DELETE_ALTERED_WORK_SCHEDULE },
  ]);
  const { data, fetchErr, isLoading } = useFetch(urlsArray);
  useEffect(() => {
    setBasicDaysSchedule(data[0]);
  }, [data]);

  const handleChange = ({ target }, index) => {
    setBasicDaysSchedule((prev) =>
      prev.map((el, i) => {
        if (i === index) return { ...el, [target.name]: target.value };
        return el;
      })
    );
  };

  const handleBlockUnBlock = (i) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ day_id: i, open: "-----", close: "-----" }),
    };
    if (isDayBlocked(i) && blockedDays.length > 0) {
      fetch(
        process.env.REACT_APP_UPDATE_CERTAIN_DAY_SCHEDULE_AND_SEND_VOUCHERS,
        {
          ...requestOptions,
          body: JSON.stringify({ day_id: i, open: "08:00", close: "17:00" }),
        }
      );
      setBlockedDays((prev) => prev.filter(({ day_id }) => day_id !== i));
      setBasicDaysSchedule((prev) =>
        prev.map((el, ind) => {
          return ind === i ? { open: "08:00", close: "17:00" } : el;
        })
      );
    } else {
      fetch(
        process.env.REACT_APP_UPDATE_CERTAIN_DAY_SCHEDULE_AND_SEND_VOUCHERS,
        requestOptions
      );
      setBlockedDays((prev) => [...prev, { day_id: i }]);
      setBasicDaysSchedule((prev) =>
        prev.map((el, ind) => {
          return ind === i ? { open: "-----", close: "-----" } : el;
        })
      );
    }
  };
  const isDayBlocked = (i) => {
    return !!blockedDays.find(({ day_id }) => day_id === i);
  };

  const handleSubmit = (i) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        day_id: i,
        open: basicDaysSchedule[i].open,
        close: basicDaysSchedule[i].close,
      }),
    };
    fetch(
      process.env.REACT_APP_UPDATE_CERTAIN_DAY_SCHEDULE_AND_SEND_VOUCHERS,
      requestOptions
    );
  };

  return (
    <div className="mt-4 mb-4 flex flex-col items-center  bg-zinc-100  dark:bg-gray-800">
      {/**main box include boxes */}
      <div className="grid md:grid-cols-7 ">
        {isLoading && <p>Loading</p>}
        {fetchErr && <p>{fetchErr}</p>}
        {!isLoading &&
          basicDaysSchedule.map(({ open, close }, i) => {
            return (
              <div className="flex flex-col items-center bg-white text-slate-900 m-4 p-8 rounded-xl shadow-2xl relative">
                <p className="text-1xl font-bold py-4 flex">{weekDays[i]}</p>

                <select
                  value={basicDaysSchedule[i].open}
                  className="my-4 border-solid "
                  name="open"
                  id="open"
                  onChange={(e) => handleChange(e, i)}
                >
                  {open === "-----" ? (
                    <option value={open}>{open}</option>
                  ) : (
                    Array(24)
                      .fill(0)
                      .map((el, i) => {
                        const t = i < 10 ? `0${i}:00` : `${i}:00`;
                        return <option value={t}>{t}</option>;
                      })
                  )}
                </select>
                <select
                  className="my-4"
                  name="close"
                  id="close"
                  value={basicDaysSchedule[i].close}
                  onChange={(e) => handleChange(e, i)}
                >
                  {close === "-----" ? (
                    <option value={close}>{close}</option>
                  ) : (
                    Array(24)
                      .fill(0)
                      .map((el, i) => {
                        const t = i < 10 ? `0${i}:00` : `${i}:00`;
                        return <option value={t}>{t}</option>;
                      })
                  )}
                </select>
                <button
                  style={{ backgroundColor: currentColor }}
                  className="w-full py-4 my-4 text-white hover:scale-105 ease-in duration-300"
                  onClick={() => handleSubmit(i)}
                >
                  Submit
                </button>
                <button
                  style={{ backgroundColor: currentColor }}
                  className="w-full  py-4 my-4 text-white hover:scale-105 ease-in duration-300"
                  onClick={() => handleBlockUnBlock(i)}
                >
                  {isDayBlocked(i) ? "Unblock" : "Block"}
                </button>
              </div>
            );
          })}
        <div className="mt-4 mb-4 flex flex-col items-center  bg-zinc-100  dark:bg-gray-800">
          Tables
        </div>
      </div>
    </div>
  );
};

export default DayManagmentCertainDay;
