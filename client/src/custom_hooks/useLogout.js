import { useStateContext } from "../contexts/ContextProvider";

const useLogout = () => {
  const { setAuthentication } = useStateContext();

  const logout = async () => {
    setAuthentication({});
    try {
      const response = await fetch(process.env.REACT_APP_LOGOUT);
    } catch (err) {
      console.error(err);
    }
  };

  return logout;
};

export default useLogout;
