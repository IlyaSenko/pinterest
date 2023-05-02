import { useCallback } from "react";
import useIsMobile from "../../hooks/useIsMobile";
import usePhotos from "../../hooks/usePhotos";
import mergePhotos from "../../utils/mergePhotos";
import PhotoModalDesktop from "../PhotoModalDesktop";
import PhotoModalMobile from "../PhotoModalMobile";

export default function PhotoModal({
  openedImgId,
  setOpenedImgId,
}: {
  openedImgId: string;
  setOpenedImgId: (id: string | null) => void;
}): JSX.Element | null {
  const isMobile = useIsMobile();
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

  return isMobile ? (
    <PhotoModalMobile
      currentPhoto={currentPhoto}
      handleCloseModal={handleCloseModal}
      goToPreviousImage={goToPreviousImage}
      goToNextImage={goToNextImage}
    ></PhotoModalMobile>
  ) : (
    <PhotoModalDesktop
      currentPhoto={currentPhoto}
      handleCloseModal={handleCloseModal}
      goToPreviousImage={goToPreviousImage}
      goToNextImage={goToNextImage}
    />
  );
}
