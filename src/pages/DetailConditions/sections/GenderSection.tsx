import React from "react";
import { Section } from "../components/Section";
import { Toggle } from "../components/Toggle";
import { Checkbox } from "../components/Checkbox";
import conditionData from "../../../../data/condition.json";

type TProps = { onCountChange?: (count: number) => void };

export function GenderSection({ onCountChange }: TProps): React.JSX.Element {
  const [selectedGender, setSelectedGender] = React.useState<string | null>(
    null
  );
  const [isExcluded, setIsExcluded] = React.useState<boolean>(false);

  function handleGenderToggle(gender: string): void {
    if (selectedGender === gender) {
      // 같은 성별을 다시 클릭하면 선택 해제
      setSelectedGender(null);
    } else {
      // 다른 성별을 클릭하면 해당 성별로 변경
      setSelectedGender(gender);
    }
  }

  function handleCheckboxChange(
    event: React.ChangeEvent<HTMLInputElement>
  ): void {
    setIsExcluded(event.target.checked);
  }

  React.useEffect(() => {
    if (onCountChange) onCountChange(selectedGender ? 1 : 0);
  }, [selectedGender, onCountChange]);

  const isCheckboxDisabled = !selectedGender;

  return (
    <Section
      title={conditionData.gender.name}
      countCurrent={selectedGender ? 1 : 0}
      countTotal={2}
    >
      <Toggle
        options={[
          {
            label: "남성",
            inputProps: {
              type: "radio",
              name: "gender",
              checked: selectedGender === "남성",
              onChange: () => handleGenderToggle("남성"),
            },
          },
          {
            label: "여성",
            inputProps: {
              type: "radio",
              name: "gender",
              checked: selectedGender === "여성",
              onChange: () => handleGenderToggle("여성"),
            },
          },
        ]}
      />
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
