import styles from "../styles/ChakraSpinner.module.css";

export default function ChakraSpinner() {
  return (
    <div className={styles["chakra-spinner"]}>
      <img
        src="/chakra1.png"
        alt="Chakra Spinner"
        className={styles["chakra-img"]}
      />
    </div>
  );
}
