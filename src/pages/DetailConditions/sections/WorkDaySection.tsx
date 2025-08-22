import React from "react";
import { Section } from "../components/Section";
import { Toggle } from "../components/Toggle";
import { Chips } from "../components/Chips";
import { Checkbox } from "../components/Checkbox";

export function WorkDaySection(): React.JSX.Element {
  return (
    <Section title="근무요일" counterText="0/3">
      <Toggle
        options={[
          {
            label: "목록에서 선택",
            inputProps: {
              type: "radio",
              name: "workDay",
              defaultChecked: true,
            },
          },
          {
            label: "직접 선택",
            inputProps: { type: "radio", name: "workDay" },
          },
        ]}
      />
      <Chips
        name="workDay"
        options={[
          "월~일",
          "월~토",
          "월~금",
          "주말(토,일)",
          "주6일",
          "주5일",
          "주4일",
          "주3일",
          "주2일",
          "주1일",
        ]}
      />
      <Checkbox label="협의제외" inputProps={{ disabled: true }} />
    </Section>
  );
}
