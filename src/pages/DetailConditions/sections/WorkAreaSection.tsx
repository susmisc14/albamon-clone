import React from "react";
import { Section } from "../components/Section";
import { AddButton } from "../components/AddButton";

type TProps = { onCountChange?: (count: number) => void };

export function WorkAreaSection({ onCountChange }: TProps): React.JSX.Element {
  const [count, setCount] = React.useState<number>(0);
  React.useEffect(() => {
    if (onCountChange) onCountChange(count);
  }, [count, onCountChange]);
  return (
    <Section title="근무지역" countCurrent={count} countTotal={10}>
      <AddButton onClick={() => setCount((c) => Math.min(10, c + 1))} />
    </Section>
  );
}
