import React from "react";
import styles from "./Toggle.module.css";

type TToggleOption = {
  label: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  active?: boolean;
};

type TToggleProps = {
  options: TToggleOption[];
  height?: number;
};

export function Toggle({
  options,
  height = 44,
}: TToggleProps): React.JSX.Element {
  return (
    <div className={styles.toggleContainer}>
      <div className={styles.toggleGroup} style={{ height }}>
        {options.map((opt, idx) => (
          <label key={`${opt.label}-${idx}`} className={styles.toggleLabel}>
            <input className={styles.toggleInput} {...opt.inputProps} />
            <span
              className={
                opt.active ? styles.toggleSpan : styles.toggleSpanInactive
              }
            >
              {opt.label}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}
