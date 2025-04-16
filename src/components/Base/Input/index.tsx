import { FC, InputHTMLAttributes } from "react";
import styles from "./input.module.scss";
import clsx from "clsx";

type InputProps = {
  label?: string;
  error?: boolean;
  errorMessage?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const Input: FC<InputProps> = ({label, error, errorMessage, id, ...props}) => {
  return (
    <div className={ styles.input }>
      { label && (
        <label htmlFor={ id } className={ styles.input__label }>
          { label }
        </label>
      ) }
      <input
        className={ clsx(
          styles.input__field,
          error && styles.input__field_error
        ) }
        id={ id }
        { ...props }
      />
      { error && errorMessage && (
        <span className={ styles.input__errorMessage }>{ errorMessage }</span>
      ) }
    </div>
  );
};

export default Input;
