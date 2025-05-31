import { Link } from "react-router-dom";
import styles from "./NotFound.module.css";

function NotFound() {
  return (
    <div className={styles.container}>
      <h1 className={styles.code}>404</h1>
      <h2 className={styles.title}>Page Not Found</h2>
      <p className={styles.description}>
        Sorry, the page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/register" className={styles.homeLink}>
        Go to registration
      </Link>
    </div>
  );
}

export default NotFound;
