import { useInfiniteQuery } from "@tanstack/react-query";
import { IPage } from "../types/UnsplashTypes";
import useApiInstance from "./useApiInstance";

const PAGE_SIZE = 20;

export default function usePhotos() {
  const apiInstance = useApiInstance();

  return useInfiniteQuery(
    ["photos"],
    ({ pageParam = 1 }) =>
      apiInstance.get("/photos", {
        params: {
          page: pageParam,
          per_page: PAGE_SIZE,
        },
      }),
    {
      keepPreviousData: true,
      getNextPageParam: (lastPage: IPage, pages) => {
        if (lastPage.data.length < PAGE_SIZE) {
          return null;
        }
        return pages.length + 1;
      },
    }
  );
}
