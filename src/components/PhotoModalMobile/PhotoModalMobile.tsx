import { Box, Modal } from "@mui/material";
import crossIcon from "../../assets/img/cross.svg";
import arrowLeft from "../../assets/img/arrow-left.svg";
import arrowRight from "../../assets/img/arrow-right.svg";
import { IPhotoModalProps } from "../../types/IPhotoModalProps";
import UserBlock from "../UserBlock";
import styles from "./PhotoModalMobile.module.scss";
import DownloadButton from "../DownloadButton";

export default function PhotoModalMobile({
  currentPhoto,
  handleCloseModal,
  goToPreviousImage,
  goToNextImage,
}: IPhotoModalProps): JSX.Element {
  return (
    <Modal open>
      <>
        <Box className={styles.box}>
          <UserBlock user={currentPhoto.user} className={styles.userBlock} />
          <img
            src={currentPhoto.urls.regular}
            alt="Regular"
            className={styles.mainPhoto}
          />
          <DownloadButton urls={currentPhoto.urls} />
          <div className={styles.controls}>
            <button
              className={styles.button}
              type="button"
              onClick={goToPreviousImage}
            >
              <img src={arrowLeft} alt="go back" />
            </button>
            <button
              className={styles.button}
              type="button"
              onClick={handleCloseModal}
            >
              <img src={crossIcon} alt="close" />
            </button>
            <button
              className={styles.button}
              type="button"
              onClick={goToNextImage}
            >
              <img src={arrowRight} alt="go back" />
            </button>
          </div>
        </Box>
      </>
    </Modal>
  );
}
