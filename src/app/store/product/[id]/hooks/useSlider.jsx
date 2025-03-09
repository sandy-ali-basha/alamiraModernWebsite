import { useGetSlider } from "hooks/Product/useShowProduct";
import { useParams } from "react-router-dom";

export const useSlider = () => {
  const params = useParams();
  const { data, isLoading } = useGetSlider(params.id);

  return {
    data,
    isLoading,
  };
};
