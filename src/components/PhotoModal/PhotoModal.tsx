import { Box, Modal } from "@mui/material";
import { useCallback } from "react";
import usePhotos from "../../hooks/usePhotos";
import mergePhotos from "../../utils/mergePhotos";
import crossIcon from "../../assets/img/cross.svg";
import arrowLeft from "../../assets/img/arrow-left.svg";
import arrowRight from "../../assets/img/arrow-right.svg";
import styles from "./PhotoModal.module.scss";
import classNames from "classnames";
import DownloadButton from "../DownloadButton";

export default function PhotoModal({
  openedImgId,
  setOpenedImgId,
}: {
  openedImgId: string;
  setOpenedImgId: (id: string | null) => void;
}): JSX.Element | null {
  const { data, isFetchingNextPage, fetchNextPage, hasNextPage } = usePhotos();

  const currentPhoto = data.find(({ id }) => id === openedImgId);

  const handleCloseModal = useCallback(() => {
    setOpenedImgId(null);
  }, [setOpenedImgId]);

  const goToPreviousImage = useCallback(() => {
    if (!currentPhoto) return;

    const previousPhoto = data[data.indexOf(currentPhoto) - 1];

    if (!previousPhoto) return;

    setOpenedImgId(previousPhoto.id);
  }, [currentPhoto, data, setOpenedImgId]);

  const goToNextImage = useCallback(() => {
    if (!data || !currentPhoto) return;

    const nextPhotoIndex = data.indexOf(currentPhoto) + 1;

    if (nextPhotoIndex < data.length) {
      setOpenedImgId(data[nextPhotoIndex].id);
    } else if (!isFetchingNextPage && hasNextPage) {
      fetchNextPage().then((res) => {
        const newPhotos = mergePhotos(res?.data);

        if (!newPhotos) return;

        setOpenedImgId(newPhotos[nextPhotoIndex].id);
      });
    }
  }, [
    currentPhoto,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    data,
    setOpenedImgId,
  ]);

  if (!currentPhoto) return null;

  return (
    <Modal open>
      <>
        <button
          className={classNames(styles.closeButton, styles.button)}
          type="button"
          onClick={handleCloseModal}
        >
          <img src={crossIcon} alt="close" />
        </button>
        <button
          className={classNames(styles.goToPreviousImageButton, styles.button)}
          type="button"
          onClick={goToPreviousImage}
        >
          <img src={arrowLeft} alt="go back" />
        </button>
        <button
          className={classNames(styles.goToNextImageButton, styles.button)}
          type="button"
          onClick={goToNextImage}
        >
          <img src={arrowRight} alt="go back" />
        </button>
        <Box className={styles.box}>
          <div className={styles.boxHeader}>
            <div className={styles.userBlock}>
              <img
                src={currentPhoto.user.profile_image.large}
                alt="avatar"
                className={styles.avatar}
              />
              <h2 className={styles.userName}>{currentPhoto.user.name}</h2>
            </div>
            <DownloadButton urls={currentPhoto.urls} />
          </div>
          <img
            src={currentPhoto.urls.regular}
            alt=""
            className={styles.mainPhoto}
          />
        </Box>
      </>
    </Modal>
  );
}
