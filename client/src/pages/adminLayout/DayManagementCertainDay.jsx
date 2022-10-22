import React, { useEffect, useState } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import useFetch from "../../custom_hooks/useFetch";
import { corsMaker } from "../../data/dummy";
import { useForm } from "react-hook-form";
import { useOutletContext } from "react-router-dom";

//Component that contains week days
// Administrator can change work hours or block/unblock each of days
const DayManagmentCertainDay = () => {
  const { currentColor,tables,setTables } = useStateContext();
  const [basicDaysSchedule, setBasicDaysSchedule] = useState([]);
  const { setRenderUserApp} = useOutletContext();
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
    {
      url: process.env.REACT_APP_DELETE_ALTERED_WORK_SCHEDULE,
    },
    {
      url: process.env.REACT_APP_READ_TABLES,
    },
  ]);


 const {
   register,
   handleSubmit,
   formState: { errors },setValue
 } = useForm({
   defaultValues: {
     amount:tables?.[0].amount_of_tables
   },
 });

  const { data, fetchErr, isLoading } = useFetch(urlsArray);
  useEffect(() => {
    const settersArray = [
      setBasicDaysSchedule,
      setValue,
    ];
    data.forEach((el, i) => {
      if(i===1){
        settersArray[i]("amount",`${el[0].amount_of_tables}`)
      }else{
    settersArray[i](el);
      }
  });
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
    if (isDayBlocked(i)) {
      fetch(
        process.env.REACT_APP_UPDATE_CERTAIN_DAY_SCHEDULE_AND_SEND_VOUCHERS,
        corsMaker({
          method: "POST",
          body: { day_id: i, open: "08:00", close: "17:00" },
        })
      );
      
      setBasicDaysSchedule((prev) =>
        prev.map((el, ind) => {
          return ind === i ? { open: "08:00", close: "17:00" } : el;
        })
      );
    } else {
      fetch(
        process.env.REACT_APP_UPDATE_CERTAIN_DAY_SCHEDULE_AND_SEND_VOUCHERS,
        corsMaker({
          method: "POST",
          body: { day_id: i, open: "-----", close: "-----" },
        })
      );
      setBasicDaysSchedule((prev) =>
        prev.map((el, ind) => {
          return ind === i ? { open: "-----", close: "-----" } : el;
        })
      );
    }
  };
  const isDayBlocked = (i) => {
    return basicDaysSchedule[i].close==='-----';
  };

  const handleSubmitt = (i) => {
    fetch(
      process.env.REACT_APP_UPDATE_CERTAIN_DAY_SCHEDULE_AND_SEND_VOUCHERS,
      corsMaker({
        method: "POST",
        body: {
          day_id: i,
          open: basicDaysSchedule[i].open,
          close: basicDaysSchedule[i].close,
        },
      })
    );
  };

  const onSubmit = async (data) => {
    await fetch(process.env.REACT_APP_UPDATE_TABLES,
      corsMaker({
         method: "POST",
         body: {
           amount:data.amount
         },
       })).then((response) => {
      if (response.ok) {
        console.log("Updated Successfully");
      }
    });
    setValue("amount",data.amount)
    console.log(data);
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
                  onClick={() => handleSubmitt(i)}
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
      </div>
      <div className=" w-1/3 items-center  hover:w-1/2  hover:scale-105 ease-in duration-300  bg-white text-slate-900 m-4 p-8 rounded-xl shadow-2xl relative">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-row "
          action=""
          method="POST"
        >
          <p className="text-1xl font-bold py-4 mr-8 ">Amount of tables</p>
          <input
            className=" w-24 border-2 rounded-lg p-3  flex border-gray-300"
            type="number"
            name="amount"
            {...register("amount", { min: 1 })}
          />
          <button
            style={{ backgroundColor: currentColor }}
            className="w-24 ml-2 rounded-full "
          >
            Update Tables
          </button>
        </form>
      </div>
    </div>
  );
};

export default DayManagmentCertainDay;
