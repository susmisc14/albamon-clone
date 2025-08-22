import React from "react";
import { Section } from "../components/Section";
import { Toggle } from "../components/Toggle";
import { Chips } from "../components/Chips";
import { Checkbox } from "../components/Checkbox";

export function WorkTimeSection(): React.JSX.Element {
  return (
    <Section title="근무시간" counterText="0/3">
      <Toggle
        options={[
          {
            label: "목록에서 선택",
            inputProps: {
              type: "radio",
              name: "workTime",
              defaultChecked: true,
            },
          },
          {
            label: "직접 선택",
            inputProps: { type: "radio", name: "workTime" },
          },
        ]}
      />
      <Chips
        name="workTime"
        options={[
          "오전 파트",
          "오후 파트",
          "저녁 파트",
          "새벽 파트",
          "오전~오후 파트",
          "오후~저녁 파트",
          "저녁~새벽 파트",
          "새벽~오전 파트",
          "풀타임(8시간 이상)",
        ]}
      />
      <Checkbox label="협의제외" inputProps={{ disabled: true }} />
    </Section>
  );
}
