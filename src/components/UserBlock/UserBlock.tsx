import classNames from "classnames";
import { IUser } from "../../types/UnsplashTypes";
import styles from "./UserBlock.module.scss";

export default function UserBlock({
  user,
  className,
}: {
  user: IUser;
  className?: string;
}): JSX.Element {
  return (
    <div className={classNames(styles.userBlock, className)}>
      <img
        src={user.profile_image.large}
        alt="avatar"
        className={styles.avatar}
      />
      <h2 className={styles.userName}>{user.name}</h2>
    </div>
  );
}
