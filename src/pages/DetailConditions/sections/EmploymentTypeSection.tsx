import React from "react";
import { Section } from "../components/Section";
import { Chips } from "../components/Chips";
import conditionData from "../../../../data/condition.json";

type TProps = { onCountChange?: (count: number) => void };

export function EmploymentTypeSection({
  onCountChange,
}: TProps): React.JSX.Element {
  const options = conditionData.employmentType.collection;
  const [selected, setSelected] = React.useState<Set<string>>(new Set());

  function handleToggle(label: string): void {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });
  }

  React.useEffect(() => {
    if (onCountChange) onCountChange(selected.size);
  }, [selected, onCountChange]);

  return (
    <Section
      title={conditionData.employmentType.name}
      countCurrent={selected.size}
      countTotal={options.length}
    >
      <Chips
        name="employmentType"
        options={options}
        selected={selected}
        onToggle={handleToggle}
      />
    </Section>
  );
}
