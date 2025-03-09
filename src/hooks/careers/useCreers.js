import { useState } from "react";
import { useQuery } from "react-query";
import { _careers } from "api/careers/careers";

export const useCareers = (id) => {
  const { data, isLoading, refetch } = useQuery(["careers"], () =>
    _careers.getCareers().then((res) => res?.data)
  );

  return {
    data,
    isLoading,
    refetch,
  };
};
export const useCareer = (id) => {
  const { data, isLoading, refetch } = useQuery(["careers"], () =>
    _careers.getCareer(id).then((res) => res?.data)
  );

  return {
    data,
    isLoading,
    refetch,
  };
};
