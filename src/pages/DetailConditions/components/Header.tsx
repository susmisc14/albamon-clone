import React from "react";
import styles from "./Header.module.css";

type THeaderProps = {
  title: string;
  onBack?: () => void;
  onReset?: () => void;
};

export function Header({
  title,
  onBack,
  onReset,
}: THeaderProps): React.JSX.Element {
  function handleBackClick(): void {
    if (onBack) onBack();
  }

  function handleResetClick(): void {
    if (onReset) onReset();
  }

  return (
    <div className={styles.headerContainer}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <button className={styles.backButton} onClick={handleBackClick}>
            <i className="Icon_icon__BlZpj icon-system_back"></i>
          </button>
          <h1 className={styles.headerTitle}>{title}</h1>
        </div>
        <button className={styles.resetButton} onClick={handleResetClick}>
          초기화
        </button>
      </div>
    </div>
  );
}
