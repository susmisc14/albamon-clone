import React from "react";
import { Section } from "../components/Section";
import styles from "./KeywordSection.module.css";

type TProps = { onCountChange?: (count: number) => void };

export function KeywordSection({ onCountChange }: TProps): React.JSX.Element {
  const [include, setInclude] = React.useState<string>("");
  const [excludes, setExcludes] = React.useState<string[]>([]);
  const [excludeInput, setExcludeInput] = React.useState<string>("");
  const [includeFocused, setIncludeFocused] = React.useState<boolean>(false);
  const [excludeFocused, setExcludeFocused] = React.useState<boolean>(false);

  function handleAddExclude(): void {
    const v = excludeInput.trim();
    if (!v) return;
    setExcludes((prev) => [...prev, v]);
    setExcludeInput("");
  }

  function handleRemoveExclude(index: number): void {
    setExcludes((prev) => prev.filter((_, i) => i !== index));
  }

  function handleClearInclude(): void {
    setInclude("");
  }

  function handleClearExclude(): void {
    setExcludeInput("");
  }

  React.useEffect(() => {
    if (onCountChange) onCountChange((include ? 1 : 0) + excludes.length);
  }, [include, excludes, onCountChange]);

  return (
    <Section title="키워드">
      <p className={styles.keywordDescription}>
        여러 개의 키워드를 포함하거나 제외할 수 있습니다.
      </p>
      <div className={styles.keywordInputs}>
        <div className={styles.keywordField}>
          <div className={styles.keywordLabel}>
            <label className={styles.keywordLabelText}>포함</label>
            <span className={styles.keywordCounter}>
              <em className={styles.counterHighlight}>{include ? 1 : 0}</em>
              /20
            </span>
          </div>
          <div className={styles.inputWrapper}>
            <input
              type="text"
              placeholder="입력 단어 포함 공고만 검색합니다."
              className={styles.keywordInput}
              value={include}
              onChange={(e) => setInclude(e.target.value)}
              onFocus={() => setIncludeFocused(true)}
              onBlur={() => setIncludeFocused(false)}
            />
            {includeFocused && include && (
              <button
                className={styles.clearButton}
                onClick={handleClearInclude}
                onMouseDown={(e) => e.preventDefault()}
                type="button"
              >
                <i className="Icon_icon__BlZpj icon-line_close"></i>
              </button>
            )}
          </div>
        </div>
        <div className={styles.keywordField}>
          <div className={styles.keywordLabel}>
            <label className={styles.keywordLabelText}>제외</label>
            <span className={styles.keywordCounter}>
              <em className={styles.counterHighlight}>{excludes.length}</em>
              /100
            </span>
          </div>
          <div className={styles.keywordInputRow}>
            <div className={styles.inputWrapper}>
              <input
                type="text"
                placeholder="추가 단어 포함 공고를 제외합니다."
                className={styles.keywordInput}
                value={excludeInput}
                onChange={(e) => setExcludeInput(e.target.value)}
                onFocus={() => setExcludeFocused(true)}
                onBlur={() => setExcludeFocused(false)}
              />
              {excludeFocused && excludeInput && (
                <button
                  className={styles.clearButton}
                  onClick={handleClearExclude}
                  onMouseDown={(e) => e.preventDefault()}
                  type="button"
                >
                  <i className="Icon_icon__BlZpj icon-line_close"></i>
                </button>
              )}
            </div>
            <button
              className={styles.keywordAddButton}
              onClick={handleAddExclude}
            >
              추가
            </button>
          </div>
          {excludes.length > 0 && (
            <div className={styles.excludeList}>
              {excludes.map((ex, idx) => (
                <span key={`${ex}-${idx}`} className={styles.excludeChip}>
                  {ex}
                  <button
                    className={styles.excludeRemove}
                    onClick={() => handleRemoveExclude(idx)}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}
