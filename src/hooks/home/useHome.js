import { _Home } from "api/Home/home";
import { useQuery } from "react-query";

export const useHome = () => {
  const { data, isLoading } = useQuery(
    ["home"],
    () => _Home.all().then((res) => res?.data),
    {
      keepPreviousData: true,
    }
  );
  return {
    data,
    isLoading,
  };
};
