import { _addresses } from "api/addresses/addresses";
import { useQueryClient, useMutation } from "react-query";

export const useDeleteAddress = () => {
  const queryClient = useQueryClient();
  return useMutation((id) => _addresses.delete(id), {
    onMutate: async (id) => {
      await queryClient.cancelQueries(["addresses"]);
      const previousData = queryClient.getQueriesData(["addresses"]);
      queryClient.setQueryData(["addresses"], (oldQueryData) => {
        const oldQueryDataCopy = oldQueryData?.addresses?.filter(
          (old) => +old.id !== +id
        );
        return oldQueryDataCopy;
      });
      return {
        previousData,
      };
    },
    onSuccess: () => {
      return queryClient.invalidateQueries(["addresses"]);
    },
    onError: (_error, _hero, context) => {
      queryClient.setQueryData(["addresses"], context.prevuiosQuery);
    },
  });
};
