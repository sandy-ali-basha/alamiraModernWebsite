import { _blogs } from "api/blog/blog";
import { useQuery } from "react-query";

export const useBlogs = () => {
  const { data, isLoading } = useQuery(
    ["_blogs"],
    () => _blogs.getBlogs().then((res) => res?.data),
    {
      keepPreviousData: true,
    }
  );
  return {
    data,
    isLoading,
  };
};
export const useBlog = (id) => {
  const { data, isLoading } = useQuery(
    ["_blog", id],
    () => _blogs.getBlog(id).then((res) => res?.data),
    {
      keepPreviousData: true,
    }
  );
  return {
    data,
    isLoading,
  };
};
