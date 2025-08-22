import React from "react";
import { Section } from "../components/Section";
import styles from "./KeywordSection.module.css";

export function KeywordSection(): React.JSX.Element {
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
              <em className={styles.counterHighlight}>0</em>
              /20
            </span>
          </div>
          <input
            type="text"
            placeholder="입력 단어 포함 공고만 검색합니다."
            className={styles.keywordInput}
          />
        </div>
        <div className={styles.keywordField}>
          <div className={styles.keywordLabel}>
            <label className={styles.keywordLabelText}>제외</label>
            <span className={styles.keywordCounter}>
              <em className={styles.counterHighlight}>0</em>
              /100
            </span>
          </div>
          <div className={styles.keywordInputRow}>
            <input
              type="text"
              placeholder="추가 단어 포함 공고를 제외합니다."
              className={styles.keywordInput}
            />
            <button className={styles.keywordAddButton}>추가</button>
          </div>
        </div>
      </div>
    </Section>
  );
}
