import React from "react";
import { Section } from "../components/Section";
import { Toggle } from "../components/Toggle";
import { Chips } from "../components/Chips";
import { Checkbox } from "../components/Checkbox";
import { Select } from "../components/Select";
import styles from "./WorkTimeSection.module.css";
import conditionData from "../../../../data/condition.json";

type TProps = { onCountChange?: (count: number) => void };

export function WorkTimeSection({ onCountChange }: TProps): React.JSX.Element {
  const [selected, setSelected] = React.useState<Set<string>>(new Set());
  const [mode, setMode] = React.useState<"list" | "direct">("list");
  const [isExcluded, setIsExcluded] = React.useState<boolean>(false);
  const chips = conditionData.workTime.collection;
  const directOptions = ["오전", "오후", "저녁", "새벽"];
  const [directSelected, setDirectSelected] = React.useState<Set<string>>(
    new Set()
  );

  // 직접 선택 모드용 시간 상태
  const [startTime, setStartTime] = React.useState<string>("");
  const [endTime, setEndTime] = React.useState<string>("");

  // 30분 단위 시간 옵션 생성 (00:00 ~ 23:30)
  const timeOptions = React.useMemo(() => {
    const options = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeString = `${hour.toString().padStart(2, "0")}:${minute
          .toString()
          .padStart(2, "0")}`;
        options.push(timeString);
      }
    }
    return options;
  }, []);

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
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });
  }

  function handleStartTimeChange(
    event: React.ChangeEvent<HTMLSelectElement>
  ): void {
    setStartTime(event.target.value);
  }

  function handleEndTimeChange(
    event: React.ChangeEvent<HTMLSelectElement>
  ): void {
    setEndTime(event.target.value);
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
    setStartTime("");
    setEndTime("");
  }

  React.useEffect(() => {
    if (onCountChange) {
      let count = 0;
      if (mode === "list") {
        count = selected.size;
      } else {
        // 직접 선택 모드에서는 시간이 설정되어 있으면 1로 카운트
        count = startTime && endTime ? 1 : 0;
      }
      onCountChange(count);
    }
  }, [mode, selected, directSelected, startTime, endTime, onCountChange]);

  const currentCount =
    mode === "list" ? selected.size : startTime && endTime ? 1 : 0;
  const isCheckboxDisabled = currentCount === 0;

  return (
    <Section
      title={conditionData.workTime.name}
      countCurrent={currentCount}
      countTotal={3}
    >
      <Toggle
        options={[
          {
            label: "목록에서 선택",
            inputProps: {
              type: "radio",
              name: "workTimeMode",
              checked: mode === "list",
              onChange: () => handleModeChange("list"),
            },
          },
          {
            label: "직접 선택",
            inputProps: {
              type: "radio",
              name: "workTimeMode",
              checked: mode === "direct",
              onChange: () => handleModeChange("direct"),
            },
          },
        ]}
      />
      {mode === "list" && (
        <Chips
          name="workTime"
          options={chips}
          selected={selected}
          onToggle={handleToggle}
        />
      )}
      {mode === "direct" && (
        <div className={styles.timeSelectionContainer}>
          <div className={styles.timeSelectionRow}>
            <div style={{ flex: 1 }}>
              <Select
                options={[
                  { value: "", label: "시작 시간" },
                  ...timeOptions.map((time) => ({ value: time, label: time })),
                ]}
                value={startTime}
                onChange={handleStartTimeChange}
              />
            </div>
            <span className={styles.timeSeparator}>~</span>
            <div style={{ flex: 1 }}>
              <Select
                options={[
                  { value: "", label: "종료 시간" },
                  ...timeOptions.map((time) => ({ value: time, label: time })),
                ]}
                value={endTime}
                onChange={handleEndTimeChange}
              />
            </div>
          </div>
        </div>
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
