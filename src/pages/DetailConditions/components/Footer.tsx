import React from "react";
import styles from "./Footer.module.css";

type TFooterProps = {
  label: string;
  onClick?: () => void;
};

export function Footer({ label, onClick }: TFooterProps): React.JSX.Element {
  function handleClick(): void {
    if (onClick) onClick();
  }

  return (
    <div className={styles.fixedFooter}>
      <button className={styles.resultButton} onClick={handleClick}>
        {label}
      </button>
    </div>
  );
}
