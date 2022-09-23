import { useStateContext } from "../contexts/ContextProvider";

const useRefreshToken = () => {
  const { setAuthentication } = useStateContext();
  const refresh = async () => {
    const refreshData = await (
      await fetch(process.env.REACT_APP_REFRESH_TOKEN)
    ).json();
    if (!refreshData) throw new Error("refreshData is empty");
    const { authorities, accessToken } = refreshData;
    setAuthentication((prev) => {
      return {
        ...prev,
        authorities,
        accessToken,
      };
    });
    return accessToken;
  };
  return refresh;
};

export default useRefreshToken;
