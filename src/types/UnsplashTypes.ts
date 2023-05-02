export interface IPhotoUrls {
  raw: string;
  full: string;
  regular: string;
  small: string;
  thumb: string;
}

export interface IUser {
  id: string;
  username: string;
  name: string;
  profile_image: {
    small: string;
    medium: string;
    large: string;
  };
}

export interface IPhoto {
  id: string;
  created_at: string;
  updated_at: string;
  width: number;
  height: number;
  color: string | null;
  likes: number;
  description: string | null;
  user: IUser;
  links: {
    download: string;
    download_location: string;
  };
  urls: IPhotoUrls;
}

export interface IPage {
  data: IPhoto[];
}
