import { useStateContext } from "../contexts/ContextProvider";

const useLogout = () => {
  const { setAuthentication } = useStateContext();

  const logout = async () => {
    try {
      await fetch(process.env.REACT_APP_LOGOUT);
      setAuthentication({});
    } catch (err) {
      console.error(err);
    }
  };

  return logout;
};

export default useLogout;
