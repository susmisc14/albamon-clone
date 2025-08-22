import React from "react";
import styles from "./Footer.module.css";

type TFooterProps = {
  label?: string;
  count?: number;
  onClick?: () => void;
};

export function Footer({
  label,
  count,
  onClick,
}: TFooterProps): React.JSX.Element {
  function handleClick(): void {
    if (onClick) onClick();
  }

  return (
    <div className={styles.fixedFooter}>
      <button className={styles.resultButton} onClick={handleClick}>
        {typeof count === "number"
          ? `${count.toLocaleString()}건의 결과보기`
          : label ?? "결과보기"}
      </button>
    </div>
  );
}
