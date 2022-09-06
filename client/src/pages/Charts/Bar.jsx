import { useEffect } from "react";
import {  Bar as BarChart } from "../../components/Charts";

//Wrapper for BarChart Component
const Bar = ({ dataToShow }) => {
  return (
    <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
      <div className="w-full">
        <BarChart data={dataToShow} />
      </div>
    </div>
  );
};

export default Bar;
