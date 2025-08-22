import React from "react";
import styles from "./Chips.module.css";

type TChipsProps = {
  options: string[];
  name: string;
};

export function Chips({ options, name }: TChipsProps): React.JSX.Element {
  return (
    <div className={styles.chipContainer}>
      {options.map((text) => (
        <label key={`${name}-${text}`} className={styles.chip}>
          <input type="checkbox" className={styles.chipInput} />
          <span className={styles.chipSpan}>{text}</span>
        </label>
      ))}
    </div>
  );
}
