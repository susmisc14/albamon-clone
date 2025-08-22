import React from "react";
import { Section } from "../components/Section";
import { AddButton } from "../components/AddButton";

export function WorkAreaSection(): React.JSX.Element {
  return (
    <Section title="근무지역" counterText="0/10">
      <AddButton />
    </Section>
  );
}
