import Link from "next/link";
import styles from "./layout.module.css";
function layout({ children }) {
  return (
    <div className={styles.layout}>
      <header className={`${styles.header_layout} ${styles.container}`}>
        <Link href={"/"}>
          <img src="/icon/Group 46.png" alt="menu" />
        </Link>
        <Link href={"/"}>
          <img src="/icon/sign in buttom.png" />
        </Link>
      </header>
      <main className={`${styles.container} ${styles.main}`}>{children}</main>
      <footer className={`${styles.foot_layout} ${styles.container}`}>
        <div className={styles.divider}></div>
        <div className={styles.footer_links}>
          <div className={styles.torino_info}>
            <h1>تورینو</h1>
            <Link href={"/"}>درباره ما</Link>
            <Link href={"/"}>تماس با ما</Link>
            <Link href={"/"}>چرا تورینو</Link>
            <Link href={"/"}>بیمه مسافرتی</Link>
          </div>
          <div className={styles.torino_info}>
            <h1>خدمات مشتریان</h1>
            <Link href={"/"}>پشتیبانی آنلاین</Link>
            <Link href={"/"}>راهنمای خرید</Link>
            <Link href={"/"}>راهنمای استرداد</Link>
            <Link href={"/"}>پرسش و پاسخ</Link>
          </div>
        </div>
        <div className={styles.footer_icons}>
          <div className={styles.footer_icons_img}>
            <div className={styles.images}>
              <img src="/image/ecunion-35c3c933.png" />
              <img src="/image/samandehi-6e2b448a.png" />
              <img src="/image/aira-682b7c43.png" />
            </div>
            <div className={`${styles.images} ${styles.center}`}>
              <img src="/image/state-airline-f45c55b2 1.png" />
              <img src="/image/passenger-rights-48368f81 1.png" />
            </div>
          </div>
          <div className={styles.footer_icons_logo}>
            <img src="/image/Torino (4) 1.png" />
            <p>تلفن پشتیبانی:021-8574</p>
          </div>
        </div>
        <div className={styles.divider_two}></div>
        <p className={styles.paragraph}>
          کلیه حقوق این وب سایت متعلق به تورینو میباشد.
        </p>
      </footer>
    </div>
  );
}

export default layout;
