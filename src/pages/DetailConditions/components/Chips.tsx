import React from "react";
import styles from "./Chips.module.css";

type TChipsProps = {
  options: string[];
  name: string;
  selected?: Set<string>;
  onToggle?: (label: string) => void;
};

export function Chips({
  options,
  name,
  selected,
  onToggle,
}: TChipsProps): React.JSX.Element {
  return (
    <div className={styles.chipContainer}>
      {options.map((text) => {
        const isActive = selected ? selected.has(text) : false;
        return (
          <label key={`${name}-${text}`} className={styles.chip}>
            <input
              type="checkbox"
              className={styles.chipInput}
              checked={isActive}
              onChange={() => onToggle && onToggle(text)}
            />
            <span
              className={
                isActive
                  ? `${styles.chipSpan} ${styles.chipActive}`
                  : styles.chipSpan
              }
            >
              {text}
            </span>
          </label>
        );
      })}
    </div>
  );
}
