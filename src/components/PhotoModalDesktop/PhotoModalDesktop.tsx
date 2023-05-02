import { Box, Modal } from "@mui/material";
import crossIcon from "../../assets/img/cross.svg";
import arrowLeft from "../../assets/img/arrow-left.svg";
import arrowRight from "../../assets/img/arrow-right.svg";
import styles from "./PhotoModalDesktop.module.scss";
import classNames from "classnames";
import DownloadButton from "../DownloadButton";
import { IPhotoModalProps } from "../../types/IPhotoModalProps";
import UserBlock from "../UserBlock";

export default function PhotoModalDesktop({
  currentPhoto,
  handleCloseModal,
  goToPreviousImage,
  goToNextImage,
}: IPhotoModalProps): JSX.Element {
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
            <UserBlock user={currentPhoto.user} />
            <DownloadButton urls={currentPhoto.urls} />
          </div>
          <img
            src={currentPhoto.urls.regular}
            alt="Regular"
            className={styles.mainPhoto}
          />
        </Box>
      </>
    </Modal>
  );
}
