import Layout from "@/Components/layout/Layout";
import styles from "../styles/error500.module.css";

function ServerConnectionError() {
  return (
    <Layout>
      <div className={styles.errordetails}>
        <img src="/image/error/Error Lamp Robot.png" />
        <div className={styles.errordetails_prograph}>
          <p>اتصال با سرور برقرار نیست!</p>
          <p>لطفا بعدا دوباره امتحان کنید.</p>
        </div>
      </div>
    </Layout>
  );
}

export default ServerConnectionError;
