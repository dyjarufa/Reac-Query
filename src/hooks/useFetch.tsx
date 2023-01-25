import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";

const api = axios.create({
  baseURL: "https://api.github.com",
});

export function useFetch<T = unknown>(
  url: string,
  options?: AxiosRequestConfig
) {
  // AxiosRequestConfig - permite passar um header para chamado do axios
  const [data, setData] = useState<T | null>();
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState<Error | null>(null); // Error é uma classe nativa

  // useEffect(() => {
  //   api
  //     .get(url, options)
  //     .then((response) => setData(response.data))
  //     .catch((err) => {
  //       setError(err);
  //     })
  //     .finally(() => {
  //       setIsFetching(false);
  //     });
  // }, []);

  useEffect(() => {
    const calldata = async () => {
      const { data } = await api.get(url, options);
      return setData(data);
    };

    calldata();
    return () => {
      setIsFetching(false);
    };
  }, []);

  return {
    data,
    isFetching,
    error,
  };
}
