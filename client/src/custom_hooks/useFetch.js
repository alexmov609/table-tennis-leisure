import { useState, useEffect } from "react";
//from internet
const useFetch = (urlsArray) => {
  const [data, setData] = useState([]);
  const [fetchErr, setFetchErr] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    let isMounted = true;
    const executeFetch = async (urls) => {
      setIsLoading(true);
      try {
        const response = await Promise.all(
          urls.map(async ({ url, cors }) => {
            const response = await fetch(url, cors);
            return await response.json();
          })
        );
        if (isMounted) {
          setData(response);
          setFetchErr(null);
        }
      } catch ({ message }) {
        if (isMounted) {
          setFetchErr(message);
          setData([]);
        }
      } finally {
        isMounted && setIsLoading(false);
      }
    };
    executeFetch(urlsArray);

    const cleanUp = () => {
      isMounted = false;
    };
    return cleanUp;
  }, [urlsArray]);

  // console.log(data);
  return { data, fetchErr, isLoading };
};

export default useFetch;
