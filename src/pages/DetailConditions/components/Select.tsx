import React from "react";
import styles from "./Select.module.css";

type TSelectProps = {
  children?: React.ReactNode;
};

export function Select({ children }: TSelectProps): React.JSX.Element {
  return (
    <div className={styles.selectContainer}>
      <div className={styles.selectWrapper}>
        <select className={styles.select}>{children}</select>
        <div className={styles.selectArrow}>
          <i className="Icon_icon__BlZpj icon-system_select_arrow_down"></i>
        </div>
      </div>
    </div>
  );
}
