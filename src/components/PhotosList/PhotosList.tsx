import React, { useCallback, useEffect, useMemo } from "react";
import usePhotos from "../../hooks/usePhotos";
import mergePhotos from "../../utils/mergePhotos";

export default function PhotosList({
  setOpenedImgId,
}: {
  setOpenedImgId: (id: string) => void;
}): JSX.Element {
  const { data, isFetchingNextPage, fetchNextPage, hasNextPage } = usePhotos();

  const photos = useMemo(() => mergePhotos(data), [data]);

  const handleScroll = useCallback(() => {
    if (
      window.pageYOffset + window.innerHeight >=
        document.documentElement.scrollHeight &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <div>
      {photos?.map(({ urls: { small }, id }) => (
        <button type="button" onClick={() => setOpenedImgId(id)} key={id}>
          <img src={small} alt="" width="400" />
        </button>
      ))}
    </div>
  );
}
