
import { _cart } from "api/cart/_cart";
import { useQuery } from "react-query";

export const useCart = (id) => {
    const { data, isLoading } = useQuery(
      ["cart", id],
      () => _cart.index(id).then((res) => res),
      {
        keepPreviousData: true,
        enabled: !!id, // This ensures the query runs only if id is truthy
      }
    );
    return {
      data,
      isLoading,
    };
  };
  