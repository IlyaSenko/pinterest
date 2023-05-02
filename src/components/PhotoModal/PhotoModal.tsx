import { Box, Modal } from "@mui/material";
import { useCallback, useMemo } from "react";
import usePhotos from "../../hooks/usePhotos";
import mergePhotos from "../../utils/mergePhotos";
import crossIcon from "../../assets/img/cross.svg";
import arrowLeft from "../../assets/img/arrow-left.svg";
import arrowRight from "../../assets/img/arrow-right.svg";
import styles from "./PhotoModal.module.scss";

export default function PhotoModal({
  openedImgId,
  setOpenedImgId,
}: {
  openedImgId: string;
  setOpenedImgId: (id: string | null) => void;
}): JSX.Element | null {
  const { data, isFetchingNextPage, fetchNextPage, hasNextPage } = usePhotos();

  const photos = useMemo(() => mergePhotos(data), [data]);

  const currentPhoto = photos?.find(({ id }) => id === openedImgId);

  const handleCloseModal = useCallback(() => {
    setOpenedImgId(null);
  }, [setOpenedImgId]);

  const goToPreviousImage = useCallback(() => {
    if (!photos || !currentPhoto) return;

    setOpenedImgId(photos[photos?.indexOf(currentPhoto) - 1].id);
  }, [currentPhoto, photos, setOpenedImgId]);

  const goToNextImage = useCallback(() => {
    if (!photos || !currentPhoto) return;

    const nextPhotoIndex = photos?.indexOf(currentPhoto) + 1;

    if (nextPhotoIndex < photos.length) {
      setOpenedImgId(photos[nextPhotoIndex].id);
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
    photos,
    setOpenedImgId,
  ]);

  if (!currentPhoto) return null;

  return (
    <Modal open>
      <>
        <button
          className={styles.closeButton}
          type="button"
          onClick={handleCloseModal}
        >
          <img src={crossIcon} alt="close" />
        </button>
        <button
          className={styles.goToPreviousImageButton}
          type="button"
          onClick={goToPreviousImage}
        >
          <img src={arrowLeft} alt="go back" />
        </button>
        <button
          className={styles.goToNextImageButton}
          type="button"
          onClick={goToNextImage}
        >
          <img src={arrowRight} alt="go back" />
        </button>
        <Box className={styles.box}>
          <img src={currentPhoto.urls.small} alt="" />
          {photos?.indexOf(currentPhoto)}
        </Box>
      </>
    </Modal>
  );
}
