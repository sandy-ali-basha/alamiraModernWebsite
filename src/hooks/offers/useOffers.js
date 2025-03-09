import { _offers } from "api/offers/_offers";
import { useQuery } from "react-query";

export const useOffers = (id) => {
  const { data, isLoading } = useQuery(
    [`offers`],
    () => _offers.index(id).then((res) => res),
    {
      keepPreviousData: true,
    }
  );
  return {
    data,
    isLoading,
  };
};