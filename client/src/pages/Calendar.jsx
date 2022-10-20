import { useEffect, useState } from "react";
import {
  ScheduleComponent,
  ViewsDirective,
  ViewDirective,
  Day,
  Week,
  Month,
  Inject,
  Resize,
} from "@syncfusion/ej2-react-schedule";
import "./Calendar.css";
import { L10n } from "@syncfusion/ej2-base";

import { Header } from "../components";
import { OrderTimeChoice } from "./userLayout";
import { useStateContext } from "../contexts/ContextProvider";
import { useOutletContext } from "react-router-dom";
import useFetch from "../custom_hooks/useFetch";


L10n.load({
  "en-US": {
    schedule: {
      saveButton: "",
      cancelButton: "",
      newEvent: "",
    },
  },
});
//Components that represents Calendar which functionality depends on authorities of an user.
// Regular user and administrator will see different content in this component
const Calendar = (props) => {
  const { authentication } = useStateContext();
  const { unavailableTimePeriods, allOrderedTimePeriods,orders,userAbonement } = useOutletContext();
  const { authorities } = authentication;
  const [blockedDates, setBlockedDates] = useState([]);
  const [blockedDays, setBlockedDays] = useState([]);

  const [urlsArray, setUrlsArray] = useState([
    { url: process.env.REACT_APP_READ_ALTERED_BLOCKED_DATES },
    { url: process.env.REACT_APP_READ_BASIC_BLOCKED_DAYS },
  ]);
  const { data, fetchErr, isLoading } = useFetch(urlsArray);
  useEffect(() => {
    const settersArray = [setBlockedDates, setBlockedDays];
    data.forEach((el, i) => settersArray[i](el));
  }, [data]);

  const editorTemplate = (args) => {
    let dateOfGame;
    if (args?.StartTime) {
      const day = args.StartTime.getDate();
      const month = args.StartTime.getMonth() + 1;
      const year = args.StartTime.getYear() + 1900;
      dateOfGame = `${year}-${month}-${day}`;
    }
    return <OrderTimeChoice dateOfGame={dateOfGame} abonement={userAbonement} />;
  };
  const onPopupOpen = (args) => {
    if (authorities === 2) {
      args.scheduleObj.cancel = true;
      const day = args.scheduleObj.data.StartTime.getDate();
      const month = args.scheduleObj.data.StartTime.getMonth() + 1;
      const year = args.scheduleObj.data.StartTime.getYear() + 1900;
      props.setDateOfGame(`${year}-${month}-${day}`);
    } else {
      if (
        args.scheduleObj.data.StartTime <= new Date() ||
        !!blockedDays.find(
          ({ day_id }) => day_id === args.scheduleObj.data.StartTime.getDay()
        ) ||
        !!blockedDates.find(
          ({ date }) =>
            new Date(date).toLocaleDateString() ===
            args.scheduleObj.data.StartTime.toLocaleDateString()
        )
      ) {
        args.scheduleObj.cancel = true;
      }
    }

    // const day = args.scheduleObj.data.StartTime.getDate();
    // const month = args.scheduleObj.data.StartTime.getMonth() + 1;
    // const year = args.scheduleObj.data.StartTime.getYear() + 1900;
    // setDateOfGame(`${year}-${month}-${day}`);
  };

  const onRenderCell = (args) => {
    authorities === 1 &&
      args.scheduleObj.date < new Date() &&
      args.scheduleObj.element.classList.add("e-disableCell")
    if (
      !!args.scheduleObj.date &&
      (!!blockedDays.find(
        ({ day_id }) => day_id === args.scheduleObj.date.getDay()
      ) ||
        !!blockedDates.find(
          ({ date }) =>
            new Date(date).toLocaleDateString() ===
            args.scheduleObj.date.toLocaleDateString()
        ))
    ) {
      args.scheduleObj.element.classList.add("e-disableCell");
    }
    
    
  };

  return (
    <div className="min-w-[50%] flex flex-col items-center m-4 md:m-4  p-2 md:p-10 bg-zinc-100 rounded-3xl">
      <Header title="Calendar" />
      {isLoading && <p>Loading</p>}
      {fetchErr && <p>{fetchErr}</p>}
      {!isLoading && (
        <ScheduleComponent
          editorTemplate={editorTemplate}
          renderCell={(scheduleObj) => onRenderCell({ scheduleObj })}
          popupOpen={(scheduleObj) => onPopupOpen({ scheduleObj })}
          showQuickInfo={false}
          height="650px"
          eventSettings={{
            dataSource:
              authorities === 2
                ? (() => allOrderedTimePeriods || unavailableTimePeriods)().map(
                    ({ date_of_game, start_time, end_time }) => {
                      const date = date_of_game.split("-");
                      start_time = start_time.split(":");
                      end_time = end_time.split(":");
                      return {
                        StartTime: new Date(
                          date[0],
                          date[1] - 1,
                          date[2],
                          start_time[0],
                          start_time[1]
                        ),
                        EndTime: new Date(
                          date[0],
                          date[1] - 1,
                          date[2],
                          end_time[0],
                          end_time[1]
                        ),
                      };
                    }
                  )
                : 
                (orders.map(({ date_of_game, start_time, end_time }) => {
                      const date = date_of_game.split("-");
                      start_time = start_time.split(":");
                      end_time = end_time.split(":");
                      return {
                        StartTime: new Date(
                          date[0],
                          date[1] - 1,
                          date[2],
                          start_time[0],
                          start_time[1]
                        ),
                        EndTime: new Date(
                          date[0],
                          date[1] - 1,
                          date[2],
                          end_time[0],
                          end_time[1]
                        ),
                      };
                    })),
          }}
        >
          {/*to see custom view of calendar in header of calendar */}
          <ViewsDirective>
            {/*first option as default have week view too*/}
            {/*show week number in left of cal*/}
            <ViewDirective option="Month" showWeekNumber={true}></ViewDirective>
            <ViewDirective option="Day"></ViewDirective>
          </ViewsDirective>
          <Inject services={[Day, Week, Month, Resize]} />
        </ScheduleComponent>
      )}
    </div>
  );
};

export default Calendar;
