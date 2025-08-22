import React from "react";
import { Section } from "../components/Section";
import { AddButton } from "../components/AddButton";

export function JobTypeSection(): React.JSX.Element {
  return (
    <Section title="업직종" counterText="0/10">
      <AddButton />
    </Section>
  );
}
