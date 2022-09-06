import {  Pyramid as PyramidChart } from "../../components/Charts";

//Wrapper for Pyramid Component
const Pyramid = ({ dataToShow }) => (
  <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
    <div className="w-full">
      <PyramidChart data={dataToShow} />
    </div>
  </div>
);

export default Pyramid;
