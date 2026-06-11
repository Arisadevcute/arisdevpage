import Image from "next/image";
import styles from "./Profile.module.css";

interface ProfileProps {
  name: string;
  bio: string;
  avatarUrl: string;
}

export default function Profile({ name, bio, avatarUrl }: ProfileProps) {
  return (
    <section className={styles.profile}>
      <div className={styles.imageContainer}>
        <Image
          className={styles.avatar}
          src={avatarUrl}
          alt="Profile Image"
          width={200}
          height={200}
        />
      </div>
      <div className={styles.infoContainer}>
        <h1 className={styles.name}>{name}</h1>
        <h3 className={styles.bio}>{bio}</h3>
      </div>
    </section>
  );
}
