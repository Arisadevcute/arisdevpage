import styles from "./Footer.module.css";

interface NavItem {
  key: string;
  label: string;
  id?: string;
  reversed?: boolean;
}

interface FooterProps {
  navItems: NavItem[];
  onNavClick: (id: string) => void;
}

export default function Footer({ navItems, onNavClick }: FooterProps) {
  // Split items into rows (5 items per row)
  const row1 = navItems.slice(0, 5);
  const row2 = navItems.slice(5, 10);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id?: string) => {
    e.preventDefault();
    if (id) {
      onNavClick(id);
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>
        <div className={styles.row}>
          {row1.map((item) => (
            <div key={item.key} className={styles.col}>
              <a href="#" onClick={(e) => handleClick(e, item.id)}>
                <span className={item.reversed ? styles.keyReverse : styles.key}>
                  {item.key}
                </span>
                {item.label}
              </a>
            </div>
          ))}
        </div>
        {row2.length > 0 && (
          <div className={styles.row}>
            {row2.map((item) => (
              <div key={item.key} className={styles.col}>
                <a href="#" onClick={(e) => handleClick(e, item.id)}>
                  <span className={item.reversed ? styles.keyReverse : styles.key}>
                    {item.key}
                  </span>
                  {item.label}
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </footer>
  );
}
