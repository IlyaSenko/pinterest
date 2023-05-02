import React from "react";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import { IPhotoUrls } from "../../types/UnsplashTypes";
import styles from "./DownloadButton.module.scss";

const DownloadButton = ({ urls }: { urls: IPhotoUrls }) => {
  return (
    <PopupState variant="popover" popupId="download-popover">
      {(popupState) => (
        <div>
          <Button
            variant="contained"
            className={styles.button}
            {...bindTrigger(popupState)}
            endIcon={
              <div className={styles.endIcon}>
                <div className={styles.separator}></div>
                <svg
                  width="12"
                  height="8"
                  viewBox="0 0 12 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.59 0.294922L6 4.87492L1.41 0.294922L0 1.70492L6 7.70492L12 1.70492L10.59 0.294922Z"
                    fill="white"
                  />
                </svg>
              </div>
            }
          >
            Download Free
          </Button>
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <div className={styles.popoverInner}>
              <a href={urls.small} download className={styles.downloadLink}>
                Small (640 x 960)
              </a>
              <a href={urls.regular} download className={styles.downloadLink}>
                Medium (1920 x 2880)
              </a>
              <a href={urls.raw} download className={styles.downloadLink}>
                Large (2400 x 3600)
              </a>
              <div className={styles.popoverSeparator}></div>
              <a href={urls.full} download className={styles.downloadLink}>
                Original (4000 x 6000)
              </a>
            </div>
          </Popover>
        </div>
      )}
    </PopupState>
  );
};

export default DownloadButton;
