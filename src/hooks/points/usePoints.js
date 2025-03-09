import { _points } from "api/points/points";
import { useQuery } from "react-query";

export const usePoints = () => {
  const { data, isLoading } = useQuery(
    ["_points"],
    () => _points.get().then((res) => res?.data),
    {
      keepPreviousData: true,
    }
  );
  return {
    data,
    isLoading,
  };
};
