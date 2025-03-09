import { _orders } from "api/orders/orders";
import { useQuery } from "react-query";

export const useOrders = () => {
  const { data, isLoading } = useQuery(
    ["orders"],
    () => _orders.index().then((res) => res),
    {
      keepPreviousData: true,
    }
  );
  return {
    data,
    isLoading,
  };
};
