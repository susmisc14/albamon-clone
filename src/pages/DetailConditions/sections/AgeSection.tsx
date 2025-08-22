import React from "react";
import { Section } from "../components/Section";
import { Select } from "../components/Select";
import { Checkbox } from "../components/Checkbox";
import styles from "./AgeSection.module.css";

export function AgeSection(): React.JSX.Element {
  return (
    <Section
      title="연령"
      rightNode={
        <button className={styles.ageGuideButton}>
          <span>만 나이 기준 안내</span>
          <i className="Icon_icon__BlZpj icon-system_tooltip1"></i>
        </button>
      }
    >
      <Select>
        <option>연령선택</option>
        {Array.from({ length: 71 }, (_, i) => i + 10).map((age) => (
          <option key={age} value={age}>
            {age}세
          </option>
        ))}
      </Select>
      <Checkbox label="무관제외" inputProps={{ disabled: true }} />
    </Section>
  );
}
