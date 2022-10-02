import { useStateContext } from "../contexts/ContextProvider";

const useRefreshToken = () => {
  const { setAuthentication, setCurrentMode } = useStateContext();
  const refresh = async () => {
    const refreshData = await (
      await fetch(process.env.REACT_APP_REFRESH_TOKEN)
    ).json();
    if (!refreshData) throw new Error("refreshData is empty");
    const { authorities, accessToken, theme } = refreshData;
    setAuthentication((prev) => {
      return {
        ...prev,
        authorities,
        accessToken,
      };
    });
    setCurrentMode(theme === 1 ? "light" : "dark");
    return accessToken;
  };
  return refresh;
};

export default useRefreshToken;
