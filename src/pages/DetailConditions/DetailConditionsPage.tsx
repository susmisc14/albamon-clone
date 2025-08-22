import React from "react";
import styles from "./DetailConditionsPage.module.css";

export function DetailConditionsPage(): React.JSX.Element {
  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.headerContainer}>
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <button className={styles.backButton}>
              <i className="Icon_icon__BlZpj icon-system_back"></i>
            </button>
            <h1 className={styles.headerTitle}>검색조건설정</h1>
          </div>
          <button className={styles.resetButton}>초기화</button>
        </div>
      </div>

      {/* Description */}
      <div className={styles.description}>모든 채용메뉴에 공통 반영됩니다.</div>

      <div className={styles.mainContent}>
        {/* 근무지역 */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>근무지역</h3>
            <div className={styles.sectionCounter}>
              <em className={styles.counterHighlight}>0</em>/10
            </div>
          </div>
          <button className={styles.addButton}>
            <i className="Icon_icon__BlZpj icon-line_plus"></i>
            <span>추가하기</span>
          </button>
        </div>

        {/* 업직종 */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>업직종</h3>
            <div className={styles.sectionCounter}>
              <em className={styles.counterHighlight}>0</em>/10
            </div>
          </div>
          <button className={styles.addButton}>
            <i className="Icon_icon__BlZpj icon-line_plus"></i>
            <span>추가하기</span>
          </button>
        </div>

        {/* 근무기간 */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>근무기간</h3>
            <div className={styles.sectionCounter}>
              <em className={styles.counterHighlight}>0</em>/6
            </div>
          </div>
          <div className={styles.chipContainer}>
            {[
              "하루(1일)",
              "1주일이하",
              "1주일~1개월",
              "1개월~3개월",
              "3개월~6개월",
              "6개월~1년",
              "1년이상",
            ].map((text) => (
              <label key={text} className={styles.chip}>
                <input type="checkbox" className={styles.chipInput} />
                <span className={styles.chipSpan}>{text}</span>
              </label>
            ))}
          </div>
        </div>

        {/* 근무요일 */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>근무요일</h3>
            <div className={styles.sectionCounter}>
              <em className={styles.counterHighlight}>0</em>/3
            </div>
          </div>
          <div className={styles.toggleContainer}>
            <div className={styles.toggleGroup}>
              <label className={styles.toggleLabel}>
                <input
                  type="radio"
                  name="workDay"
                  defaultChecked
                  className={styles.toggleInput}
                />
                <span className={styles.toggleSpan}>목록에서 선택</span>
              </label>
              <label className={styles.toggleLabel}>
                <input
                  type="radio"
                  name="workDay"
                  className={styles.toggleInput}
                />
                <span className={styles.toggleSpanInactive}>직접 선택</span>
              </label>
            </div>
          </div>
          <div className={styles.chipContainer}>
            {[
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
            ].map((text) => (
              <label key={text} className={styles.chip}>
                <input type="checkbox" className={styles.chipInput} />
                <span className={styles.chipSpan}>{text}</span>
              </label>
            ))}
          </div>
          <label className={styles.checkboxLabel}>
            <span className={styles.checkboxCheckmark}>
              <i className="Icon_icon__BlZpj icon-line_check"></i>
            </span>
            <span>협의제외</span>
            <input type="checkbox" disabled className={styles.checkboxInput} />
          </label>
        </div>

        {/* 근무시간 */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>근무시간</h3>
            <div className={styles.sectionCounter}>
              <em className={styles.counterHighlight}>0</em>/3
            </div>
          </div>
          <div className={styles.toggleContainer}>
            <div className={styles.toggleGroup}>
              <label className={styles.toggleLabel}>
                <input
                  type="radio"
                  name="workTime"
                  defaultChecked
                  className={styles.toggleInput}
                />
                <span className={styles.toggleSpan}>목록에서 선택</span>
              </label>
              <label className={styles.toggleLabel}>
                <input
                  type="radio"
                  name="workTime"
                  className={styles.toggleInput}
                />
                <span className={styles.toggleSpanInactive}>직접 선택</span>
              </label>
            </div>
          </div>
          <div className={styles.chipContainer}>
            {[
              "오전 파트",
              "오후 파트",
              "저녁 파트",
              "새벽 파트",
              "오전~오후 파트",
              "오후~저녁 파트",
              "저녁~새벽 파트",
              "새벽~오전 파트",
              "풀타임(8시간 이상)",
            ].map((text) => (
              <label key={text} className={styles.chip}>
                <input type="checkbox" className={styles.chipInput} />
                <span className={styles.chipSpan}>{text}</span>
              </label>
            ))}
          </div>
          <label className={styles.checkboxLabel}>
            <span className={styles.checkboxCheckmark}>
              <i className="Icon_icon__BlZpj icon-line_check"></i>
            </span>
            <span>협의제외</span>
            <input type="checkbox" disabled className={styles.checkboxInput} />
          </label>
        </div>

        {/* 성별 */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>성별</h3>
          </div>
          <div className={styles.toggleContainer}>
            <div className={styles.toggleGroup}>
              <label className={styles.toggleLabel}>
                <input type="checkbox" className={styles.toggleInput} />
                <span className={styles.toggleSpanInactive}>남자</span>
              </label>
              <label className={styles.toggleLabel}>
                <input type="checkbox" className={styles.toggleInput} />
                <span className={styles.toggleSpanInactive}>여자</span>
              </label>
            </div>
          </div>
          <label className={styles.checkboxLabel}>
            <span className={styles.checkboxCheckmark}>
              <i className="Icon_icon__BlZpj icon-line_check"></i>
            </span>
            <span>무관제외</span>
            <input type="checkbox" disabled className={styles.checkboxInput} />
          </label>
        </div>

        {/* 연령 */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>연령</h3>
            <button className={styles.ageGuideButton}>
              <span>만 나이 기준 안내</span>
              <i className="Icon_icon__BlZpj icon-system_tooltip1"></i>
            </button>
          </div>
          <div className={styles.selectContainer}>
            <div className={styles.selectWrapper}>
              <select className={styles.select}>
                <option>연령선택</option>
                {Array.from({ length: 71 }, (_, i) => i + 10).map((age) => (
                  <option key={age} value={age}>
                    {age}세
                  </option>
                ))}
              </select>
              <div className={styles.selectArrow}>
                <i className="Icon_icon__BlZpj icon-system_select_arrow_down"></i>
              </div>
            </div>
          </div>
          <label className={styles.checkboxLabel}>
            <span className={styles.checkboxCheckmark}>
              <i className="Icon_icon__BlZpj icon-line_check"></i>
            </span>
            <span>무관제외</span>
            <input type="checkbox" disabled className={styles.checkboxInput} />
          </label>
        </div>

        {/* 고용형태 */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>고용형태</h3>
            <div className={styles.sectionCounter}>
              <em className={styles.counterHighlight}>0</em>/7
            </div>
          </div>
          <div className={styles.chipContainer}>
            {[
              "알바",
              "정규직",
              "계약직",
              "파견직",
              "청년인턴",
              "위촉직(프리랜서)",
              "연수생/교육생",
            ].map((text) => (
              <label key={text} className={styles.chip}>
                <input type="checkbox" className={styles.chipInput} />
                <span className={styles.chipSpan}>{text}</span>
              </label>
            ))}
          </div>
        </div>

        {/* 키워드 */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>키워드</h3>
          </div>
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
        </div>
      </div>

      {/* 결과보기 버튼 */}
      <div className={styles.fixedFooter}>
        <button className={styles.resultButton}>272,364건의 결과보기</button>
      </div>
    </div>
  );
}
