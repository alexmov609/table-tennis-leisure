import { useStateContext } from "../contexts/ContextProvider";

const useLogout = () => {
  const { setAuthentication } = useStateContext();

  const logout = async () => {
    setAuthentication({});
    try {
      const response = await fetch("/logout");
    } catch (err) {
      console.error(err);
    }
  };

  return logout;
};

export default useLogout;
