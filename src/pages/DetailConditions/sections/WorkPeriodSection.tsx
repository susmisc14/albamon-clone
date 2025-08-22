import React from "react";
import { Section } from "../components/Section";
import { Chips } from "../components/Chips";

export function WorkPeriodSection(): React.JSX.Element {
  return (
    <Section title="근무기간" counterText="0/6">
      <Chips
        name="workPeriod"
        options={[
          "하루(1일)",
          "1주일이하",
          "1주일~1개월",
          "1개월~3개월",
          "3개월~6개월",
          "6개월~1년",
          "1년이상",
        ]}
      />
    </Section>
  );
}
