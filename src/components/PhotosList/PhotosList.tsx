import React, { useCallback, useEffect } from "react";
import usePhotos from "../../hooks/usePhotos";
import styles from "./PhotosList.module.scss";

export default function PhotosList({
  setOpenedImgId,
}: {
  setOpenedImgId: (id: string) => void;
}): JSX.Element {
  const { data, isFetchingNextPage, fetchNextPage, hasNextPage } = usePhotos();

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
    <div className={styles.wrapper}>
      {data?.map(({ urls: { small }, id }) => (
        <button
          type="button"
          onClick={() => setOpenedImgId(id)}
          key={id}
          className={styles.button}
        >
          <img src={small} alt="" />
        </button>
      ))}
    </div>
  );
}
