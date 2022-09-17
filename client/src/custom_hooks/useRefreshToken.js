import { useStateContext } from "../contexts/ContextProvider";

const useRefreshToken = () => {
  const { setAuthentication } = useStateContext();
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-xsrf-token": localStorage.getItem("csrf"),
    },
  };
  const refresh = async () => {
    await fetch(process.env.REACT_APP_REFRESH_TOKEN, requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        setAuthentication((prev) => {
          return {
            ...prev,
            authorities: response.authorities,
            accessToken: response.accessToken,
          };
        });
        return response.accessToken;
      }); // дописать fetch
  };
  return refresh;
};

export default useRefreshToken;
