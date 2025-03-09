import { useGetFeatures } from "hooks/Product/useShowProduct";
import { useParams } from "react-router-dom";

export const useFeatures = () => {
  const params = useParams();
  const { data, isLoading } = useGetFeatures(params.id);

  return {
    data,
    isLoading,
  };
};
