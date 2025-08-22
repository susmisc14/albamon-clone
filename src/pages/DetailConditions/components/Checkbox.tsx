import React from "react";
import styles from "./Checkbox.module.css";

type TCheckboxProps = {
  label: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
};

export function Checkbox({
  label,
  inputProps,
}: TCheckboxProps): React.JSX.Element {
  const isDisabled = inputProps?.disabled;
  const inputId = React.useId(); // 고유한 ID 생성

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>): void {
    // 기존 onChange 핸들러가 있으면 호출
    if (inputProps?.onChange) {
      inputProps.onChange(event);
    }
  }

  function handleLabelClick(event: React.MouseEvent): void {
    // input이 클릭된 경우 라벨 클릭 이벤트를 무시
    if (event.target === event.currentTarget.querySelector(`#${inputId}`)) {
      return;
    }
  }

  function handleInputClick(event: React.MouseEvent): void {
    // 이벤트 전파 중단
    event.stopPropagation();
  }

  return (
    <label
      className={`${styles.checkboxLabel} ${isDisabled ? styles.disabled : ""}`}
      htmlFor={inputId}
      onClick={handleLabelClick}
    >
      <input
        id={inputId}
        className={styles.checkboxInput}
        type="checkbox"
        onClick={handleInputClick}
        onChange={handleInputChange}
        {...inputProps}
      />
      <span className={styles.checkboxCheckmark}>
        <i className="Icon_icon__BlZpj icon-line_check"></i>
      </span>
      <span>{label}</span>
    </label>
  );
}
