import { Outlet, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../custom_hooks/useRefreshToken";
import { useStateContext } from "../contexts/ContextProvider";

//Component that is responsible for letting user to log in
const AuthenticationRequired = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { authentication } = useStateContext();

  useEffect(() => {
    //let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    !authentication?.accessToken ? verifyRefreshToken() : setIsLoading(false);

    //return () => (isMounted = false);
  }, []);

  return <>{isLoading ? <p>Loading</p> : <Outlet />}</>; //<Navigate to={"/"} replace />}
};

export default AuthenticationRequired;
