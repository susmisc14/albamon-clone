import React from "react";
import { Section } from "../components/Section";
import { Select } from "../components/Select";
import { Checkbox } from "../components/Checkbox";
import styles from "./AgeSection.module.css";

export function AgeSection(): React.JSX.Element {
  const [selectedAge, setSelectedAge] = React.useState<string>("");
  const [isExcluded, setIsExcluded] = React.useState<boolean>(false);

  function handleAgeChange(event: React.ChangeEvent<HTMLSelectElement>): void {
    setSelectedAge(event.target.value);
  }

  function handleCheckboxChange(
    event: React.ChangeEvent<HTMLInputElement>
  ): void {
    setIsExcluded(event.target.checked);
  }

  const isCheckboxDisabled = !selectedAge;

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
      <Select value={selectedAge} onChange={handleAgeChange}>
        <option value="">연령선택</option>
        {Array.from({ length: 71 }, (_, i) => i + 10).map((age) => (
          <option key={age} value={age}>
            {age}세
          </option>
        ))}
      </Select>
      <Checkbox
        label="무관제외"
        inputProps={{
          disabled: isCheckboxDisabled,
          checked: isExcluded,
          onChange: handleCheckboxChange,
        }}
      />
    </Section>
  );
}
