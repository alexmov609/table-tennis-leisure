import { Doughnut as DougnutChart } from "../../components/Charts";

//Wrapper for Doughnut Component
const Doughnut = ({ dataToShow }) => (
  <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
    <div className="w-full">
      <DougnutChart data={dataToShow} />
    </div>
  </div>
);

export default Doughnut;
