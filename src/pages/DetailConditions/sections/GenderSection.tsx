import React from "react";
import { Section } from "../components/Section";
import { Toggle } from "../components/Toggle";
import { Checkbox } from "../components/Checkbox";

export function GenderSection(): React.JSX.Element {
  return (
    <Section title="성별">
      <Toggle
        options={[
          { label: "남자", inputProps: { type: "checkbox" } },
          { label: "여자", inputProps: { type: "checkbox" } },
        ]}
      />
      <Checkbox label="무관제외" inputProps={{ disabled: true }} />
    </Section>
  );
}
