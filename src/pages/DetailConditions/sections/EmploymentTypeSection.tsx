import React from "react";
import { Section } from "../components/Section";
import { Chips } from "../components/Chips";

export function EmploymentTypeSection(): React.JSX.Element {
  return (
    <Section title="고용형태" counterText="0/7">
      <Chips
        name="employmentType"
        options={[
          "알바",
          "정규직",
          "계약직",
          "파견직",
          "청년인턴",
          "위촉직(프리랜서)",
          "연수생/교육생",
        ]}
      />
    </Section>
  );
}
