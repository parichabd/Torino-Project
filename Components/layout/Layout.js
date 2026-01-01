import { useState } from "react";
import styles from "./layout.module.css";
import Link from "next/link";

import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineAirplaneTicket } from "react-icons/md";
import { PiUserSoundDuotone } from "react-icons/pi";
import { MdOutlinePermPhoneMsg } from "react-icons/md";

function layout({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuHandler = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  return (
    <div className={styles.layout}>
      <header className={`${styles.header_layout} ${styles.container}`}>
        <div>
          <div className={styles.desktop_menu}>
            <img src="/image/Torino (4) 1.png" />
            <Link href={"/"}>صفحه اصلی</Link>
            <Link href={"/"}>خدمات گردشگری</Link>
            <Link href={"/"}>درباره ما</Link>
            <Link href={"/"}>تماس با ما</Link>
          </div>
          <div className={styles.mobile_menu}>
            <button
              className={`${styles.button} ${styles.overlay}`}
              onClick={menuHandler}
            >
              <img src="/icon/Group 46.png" alt="menu" />
            </button>
          </div>
        </div>
        <div>
          <div className={styles.desktop_menu}>
            <div className={styles.login_desktop}>
              <div className={styles.login_icon}>
                <img src="/icon/profile.png" />
                <span>ورود </span>
                <span>|</span>
              </div>
              <span className={styles.signup}>ثبت نام</span>
            </div>
          </div>
          <div className={styles.mobile_menu}>
            <Link href={"/"}>
              <img src="/icon/sign in buttom.png" />
            </Link>
          </div>
        </div>
      </header>
      {/* Overlay */}
      {isOpen && (
        <div
          className={styles.mobile_overlay}
          onClick={menuHandler}
        />
      )}

      {/* Mobile Drawer */}
      <nav className={`${styles.mobile_drawer} ${isOpen ? styles.open : ""}`}>
        <Link href="/" onClick={menuHandler}>
         <IoHomeOutline /> صفحه اصلی 
        </Link>
        <Link href="/" onClick={menuHandler}>
         <MdOutlineAirplaneTicket /> خدمات گردشگری
        </Link>
        <Link href="/" onClick={menuHandler}>
         <PiUserSoundDuotone /> درباره ما
        </Link>
        <Link href="/" onClick={menuHandler}>
         <MdOutlinePermPhoneMsg /> تماس با ما
        </Link>
      </nav>
      <div className={styles.dividerer_menu}></div>
      <main className={`${styles.container} ${styles.main}`}>{children}</main>
      <footer className={`${styles.foot_layout} ${styles.container}`}>
        <div className={styles.divider}></div>
        <div className={styles.footer_desktop}>
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
            <div
              className={`${styles.footer_icons_img} ${styles.footer_icons_img}`}
            >
              <div className={styles.images}>
                <img src="/image/ecunion-35c3c933.svg" />
                <img src="/image/samandehi-6e2b448a.svg" />
                <img src="/image/aira-682b7c43.svg" />
              </div>
              <div className={`${styles.images} ${styles.center}`}>
                <img src="/image/state-airline-f45c55b2 1.svg" />
                <img src="/image/passenger-rights-48368f81 1.svg" />
              </div>
            </div>
            <div className={styles.footer_icons_logo}>
              <img src="/image/Torino (4) 1.png" />
              <p>تلفن پشتیبانی:۸۵۷۴-۰۲۱ </p>
            </div>
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
