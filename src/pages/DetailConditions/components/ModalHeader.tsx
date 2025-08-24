import React from "react";
import styles from "./Modal.module.css";

type TModalHeaderProps = {
  title: string;
  onClose: () => void;
};

export function ModalHeader({
  title,
  onClose,
}: TModalHeaderProps): React.JSX.Element {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>{title}</h1>
      <button type="button" className={styles.closeButton} onClick={onClose}>
        <i className="Icon_icon__BlZpj icon-system_close"></i>
      </button>
    </header>
  );
}
