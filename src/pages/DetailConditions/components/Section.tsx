import React from "react";
import styles from "./Section.module.css";

type TSectionProps = {
  title: string;
  counterText?: string;
  countCurrent?: number;
  countTotal?: number;
  rightNode?: React.ReactNode;
  children?: React.ReactNode;
};

export function Section({
  title,
  counterText,
  countCurrent,
  countTotal,
  rightNode,
  children,
}: TSectionProps): React.JSX.Element {
  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <h3 className={styles.sectionTitle}>{title}</h3>
        {rightNode ??
          (typeof countCurrent === "number" &&
          typeof countTotal === "number" ? (
            <div className={styles.sectionCounter}>
              <em className={styles.counterHighlight}>{countCurrent}</em>/
              {countTotal}
            </div>
          ) : counterText ? (
            <div className={styles.sectionCounter}>
              <em className={styles.counterHighlight}>
                {counterText.split("/")[0]}
              </em>
              /{counterText.split("/")[1]}
            </div>
          ) : null)}
      </div>
      {children}
    </div>
  );
}
