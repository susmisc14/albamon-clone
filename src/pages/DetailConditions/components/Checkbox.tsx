import React from "react";
import styles from "./Checkbox.module.css";

type TCheckboxProps = {
  label: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
};

export function Checkbox({
  label,
  inputProps,
}: TCheckboxProps): React.JSX.Element {
  return (
    <label className={styles.checkboxLabel}>
      <span className={styles.checkboxCheckmark}>
        <i className="Icon_icon__BlZpj icon-line_check"></i>
      </span>
      <span>{label}</span>
      <input className={styles.checkboxInput} type="checkbox" {...inputProps} />
    </label>
  );
}
