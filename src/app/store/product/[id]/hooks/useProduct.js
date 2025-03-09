import { useShowProduct } from "hooks/Product/useShowProduct";
import react, { useState } from "react";
import { useParams } from "react-router-dom";

export const useProduct = () => {
  const params = useParams();
  const { data, isLoading } = useShowProduct(params.id);

  return {
    data,
    isLoading,
  };
};
