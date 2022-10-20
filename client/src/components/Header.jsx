import { useStateContext } from "../contexts/ContextProvider";

//Header Template component
const Header = ({ category, title }) => {
  const { currentColor,currentMode } = useStateContext();
  return (
    <div className="mb-10">
      <p className="text-gray-400">{category}</p>
      <p className="text-4xl font-extrabold tracking-tight" style={{textColor:currentMode==="dark"?"white":"black"}}>
        {title}
      </p>
    </div>
  );
};

export default Header;
