import { InfiniteData } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { IPhoto } from "../types/UnsplashTypes";

export default function mergePhotos(
  data: InfiniteData<AxiosResponse<any, any>> | undefined
) {
  return data?.pages
    .reduce((allPhotos, currentPage) => {
      return [...allPhotos, ...currentPage.data];
    }, [] as IPhoto[])
    .filter((photo, index, arr) => {
      return index === arr.findIndex((t) => t.id === photo.id);
    });
}
