import { FC, InputHTMLAttributes } from "react";
import styles from "./radio.module.scss";

type RadioProps = {
  label: string;
  error?: boolean;
  errorMessage?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const Radio: FC<RadioProps> = ({
  label,
  error,
  errorMessage,
  id,
  ...props
}) => {
  return (
    <div className={styles.radio}>
      <label className={styles.radio__label} htmlFor={id}>
        <input
          type="radio"
          id={id}
          className={`${styles.radio__input} ${error ? styles.radio__input_error : ""}`}
          {...props}
        />
        {label}
      </label>
      {error && errorMessage && (
        <span className={styles.radio__error}>{errorMessage}</span>
      )}
    </div>
  );
};

export default Radio;
