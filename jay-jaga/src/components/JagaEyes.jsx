import styles from "../styles/JagaEyes.module.css";

export default function JagaEyes() {
  return (
    <div className={styles.jagannathWrapper}>
      <img src="/jaga.jpg" alt="Jagannath" className={styles.jagannathImg} />
      <div className={`${styles.eyelid} ${styles.left}`}></div>
      <div className={`${styles.eyelid} ${styles.right}`}></div>
    </div>
  );
}
