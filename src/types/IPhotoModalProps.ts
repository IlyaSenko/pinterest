import { IPhoto } from "./UnsplashTypes";

export interface IPhotoModalProps {
  currentPhoto: IPhoto;
  handleCloseModal: () => void;
  goToPreviousImage: () => void;
  goToNextImage: () => void;
}
