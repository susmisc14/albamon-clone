import React from "react";
import { Section } from "../components/Section";
import { Toggle } from "../components/Toggle";
import { Chips } from "../components/Chips";
import { Checkbox } from "../components/Checkbox";
import conditionData from "../../../../data/condition.json";

type TProps = { onCountChange?: (count: number) => void };

export function WorkDaySection({ onCountChange }: TProps): React.JSX.Element {
  const [selected, setSelected] = React.useState<Set<string>>(new Set());
  const [mode, setMode] = React.useState<"list" | "direct">("list");
  const [isExcluded, setIsExcluded] = React.useState<boolean>(false);
  const chips = conditionData.workDays.collection;
  const directOptions = ["월", "화", "수", "목", "금", "토", "일"];
  const [directSelected, setDirectSelected] = React.useState<Set<string>>(
    new Set()
  );

  function handleToggle(label: string): void {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });
  }

  function handleDirectToggle(label: string): void {
    setDirectSelected((prev) => {
      const next = new Set(prev);
      if (next.has(label)) {
        next.delete(label);
        return next;
      }
      // 최대 3개 제한(원본 UX에 맞춘 상한)
      if (next.size >= 3) return next;
      next.add(label);
      return next;
    });
  }

  function handleCheckboxChange(
    event: React.ChangeEvent<HTMLInputElement>
  ): void {
    setIsExcluded(event.target.checked);
  }

  function handleModeChange(newMode: "list" | "direct"): void {
    setMode(newMode);
    // 탭 변경 시 이전 선택 값들 초기화
    setSelected(new Set());
    setDirectSelected(new Set());
  }

  React.useEffect(() => {
    if (onCountChange) {
      const count = mode === "list" ? selected.size : directSelected.size;
      onCountChange(count);
    }
  }, [selected, directSelected, mode, onCountChange]);

  const currentCount = mode === "list" ? selected.size : directSelected.size;
  const isCheckboxDisabled = currentCount === 0;

  return (
    <Section
      title={conditionData.workDays.name}
      countCurrent={currentCount}
      countTotal={3}
    >
      <Toggle
        options={[
          {
            label: "목록에서 선택",
            inputProps: {
              type: "radio",
              name: "workDayMode",
              checked: mode === "list",
              onChange: () => handleModeChange("list"),
            },
          },
          {
            label: "직접 선택",
            inputProps: {
              type: "radio",
              name: "workDayMode",
              checked: mode === "direct",
              onChange: () => handleModeChange("direct"),
            },
          },
        ]}
      />
      {mode === "list" && (
        <Chips
          name="workDay"
          options={chips}
          selected={selected}
          onToggle={handleToggle}
        />
      )}
      {mode === "direct" && (
        <Chips
          name="workDayDirect"
          options={directOptions}
          selected={directSelected}
          onToggle={handleDirectToggle}
        />
      )}
      <Checkbox
        label="협의제외"
        inputProps={{
          disabled: isCheckboxDisabled,
          checked: isExcluded,
          onChange: handleCheckboxChange,
        }}
      />
    </Section>
  );
}
