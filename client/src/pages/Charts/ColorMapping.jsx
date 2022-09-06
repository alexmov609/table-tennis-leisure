import {
  ColorMapping as ColorMappingChart,
} from "../../components/Charts";

//Wrapper for ColorMapping Component
const ColorMapping = ({ dataToShow }) => (
  <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
    <div className="w-full">
      <ColorMappingChart data={dataToShow} />
    </div>
  </div>
);

export default ColorMapping;
