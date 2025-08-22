import React from "react";
import styles from "./Section.module.css";

type TSectionProps = {
  title: string;
  counterText?: string;
  rightNode?: React.ReactNode;
  children?: React.ReactNode;
};

export function Section({
  title,
  counterText,
  rightNode,
  children,
}: TSectionProps): React.JSX.Element {
  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <h3 className={styles.sectionTitle}>{title}</h3>
        {rightNode ??
          (counterText ? (
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
