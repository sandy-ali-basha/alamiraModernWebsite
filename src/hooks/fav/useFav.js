import { useQuery } from "react-query";

export const useFav = () => {
  const { data, isLoading } = useQuery(
    ["Fav"],
    () => _Fav.index().then((res) => res),
    {
      keepPreviousData: true,
    }
  );
  return {
    data,
    isLoading,
  };
};
