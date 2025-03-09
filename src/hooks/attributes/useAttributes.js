
import { _Attributes } from "api/attributes/attributes";
import { useQuery } from "react-query";

export const useAttributes = () => {
  const { data, isLoading } = useQuery(
    ["_Attributes"],
    () => _Attributes.getAttributes().then((res) => res?.data),
    {
      keepPreviousData: true,
    }
  );
  return {
    data,
    isLoading,
  };
};
