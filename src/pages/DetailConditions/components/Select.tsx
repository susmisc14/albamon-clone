import React from "react";
import styles from "./Select.module.css";

type TSelectProps = {
  children?: React.ReactNode;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  label?: string;
  options?: Array<{ value: string; label: string }>;
};

export function Select({
  children,
  value,
  onChange,
  label,
  options,
}: TSelectProps): React.JSX.Element {
  return (
    <div className={styles.selectContainer}>
      {label && <label className={styles.selectLabel}>{label}</label>}
      <div className={styles.selectWrapper}>
        <select className={styles.select} value={value} onChange={onChange}>
          {options
            ? options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))
            : children}
        </select>
        <div className={styles.selectArrow}>
          <i className="Icon_icon__BlZpj icon-system_select_arrow_down"></i>
        </div>
      </div>
    </div>
  );
}
