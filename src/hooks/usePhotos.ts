import { useInfiniteQuery } from "@tanstack/react-query";
import { IPage } from "../types/UnsplashTypes";
import mergePhotos from "../utils/mergePhotos";
import useApiInstance from "./useApiInstance";

const PAGE_SIZE = 20;

export default function usePhotos() {
  const apiInstance = useApiInstance();

  const { data, ...res } = useInfiniteQuery(
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

  return { data: mergePhotos(data), ...res };
}
