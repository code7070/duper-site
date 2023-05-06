import { swrFetcher } from "@/utils/helpers";
import useSWRImmutable from "swr/immutable";

export default function useGetSiteList() {
  const { isLoading, isValidating, data, error } = useSWRImmutable(
    "/api/get-site-list",
    swrFetcher,
    {
      revalidateOnFocus: false,
    }
  );

  return { data, isLoading, isValidating, error };
}
