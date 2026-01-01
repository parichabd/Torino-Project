import Layout from "@/Components/layout/Layout";
import styles from "./PageNotfoundError.module.css";

function PageNotFound() {
  return (
    <Layout>
      <div className={styles.errordetails}>
        <img src="/image/error/Error TV.svg" />
        <div className={styles.errordetails_prograph}>
          <p className={styles.footer_text}>صفحه مورد نظر یافت نشد!</p>
          <button className={styles.footer_button}>بازگشت به صفحه اصلی</button>
        </div>
      </div>
    </Layout>
  );
}

export default PageNotFound;
