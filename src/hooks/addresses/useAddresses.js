import { _addresses } from "api/addresses/addresses";
import { useQuery } from "react-query";

export const useAddresses = () => {
  const { data, isLoading } = useQuery(
    ["addresses"],
    () => _addresses.index().then((res) => res?.data),
    {
      keepPreviousData: true,
    }
  );
  return {
    data,
    isLoading,
  };
};
