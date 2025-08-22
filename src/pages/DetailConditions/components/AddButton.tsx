import React from "react";
import styles from "./AddButton.module.css";

type TAddButtonProps = {
  label?: string;
  onClick?: () => void;
};

export function AddButton({
  label = "추가하기",
  onClick,
}: TAddButtonProps): React.JSX.Element {
  function handleClick(): void {
    if (onClick) onClick();
  }

  return (
    <button className={styles.addButton} onClick={handleClick}>
      <i className="Icon_icon__BlZpj icon-line_plus"></i>
      <span>{label}</span>
    </button>
  );
}
