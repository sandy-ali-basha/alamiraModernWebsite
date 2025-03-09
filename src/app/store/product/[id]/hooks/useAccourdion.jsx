import { useGetAccourdion, useShowProduct } from "hooks/Product/useShowProduct";
import react, { useState } from "react";
import { useParams } from "react-router-dom";

export const useAccourdion = () => {
  const params = useParams();
  const { data, isLoading } = useGetAccourdion(params.id);

  return {
    data,
    isLoading,
  };
};
