import {  Table as TableChart } from "../../components/Charts";

//Wrapper for Table Component
const Table = ({ dataToShow, grid }) => (
  <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
    <div className="w-full">
      <TableChart data={dataToShow} grid={grid} />
    </div>
  </div>
);

export default Table;
