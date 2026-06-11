import styles from "./Header.module.css";

export default function Header() {
  return (
    <header>
      <div className={styles.header}>
        <div className={styles.title}>GNU nano 9.0</div>
        <div className={styles.buffer}>index.html</div>
      </div>
    </header>
  );
}
