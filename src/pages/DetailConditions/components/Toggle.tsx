import React from "react";
import styles from "./Toggle.module.css";

type TToggleOption = {
  label: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  active?: boolean;
};

type TToggleProps = {
  options: TToggleOption[];
  height?: number;
};

export function Toggle({
  options,
  height = 44,
}: TToggleProps): React.JSX.Element {
  function handleRadioClick(
    event: React.MouseEvent<HTMLInputElement>,
    option: TToggleOption
  ): void {
    // 라디오 버튼이고 이미 선택된 상태라면 선택 해제
    if (option.inputProps?.type === "radio" && option.inputProps?.checked) {
      event.preventDefault();
      // onChange 핸들러를 직접 호출하여 선택 해제
      if (option.inputProps.onChange) {
        const syntheticEvent = {
          ...event,
          target: event.target as HTMLInputElement,
        } as React.ChangeEvent<HTMLInputElement>;
        option.inputProps.onChange(syntheticEvent);
      }
    }
  }

  return (
    <div className={styles.toggleContainer}>
      <div className={styles.toggleGroup} style={{ height }}>
        {options.map((opt, idx) => (
          <label key={`${opt.label}-${idx}`} className={styles.toggleLabel}>
            <input
              className={styles.toggleInput}
              {...opt.inputProps}
              onClick={(e) => handleRadioClick(e, opt)}
            />
            <span
              className={
                opt.inputProps?.checked
                  ? styles.toggleSpan
                  : styles.toggleSpanInactive
              }
            >
              {opt.label}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}
