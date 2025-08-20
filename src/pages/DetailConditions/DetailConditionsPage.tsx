import React, { useState } from "react";
import styles from "./DetailConditionsPage.module.css";

export function DetailConditionsPage(): React.JSX.Element {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <button className={styles.backButton} aria-label="뒤로가기">
            ←
          </button>
          <h1 className={styles.title}>검색조건설정</h1>
          <button className={styles.resetButton} aria-label="초기화">
            초기화
          </button>
        </div>
      </header>
      
      <div className={styles.description}>
        모든 채용메뉴에 공통 반영됩니다.
      </div>
      
      <main className={styles.main}>
        <div className={styles.sections}>
          {/* 근무지역 */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>근무지역</h2>
            <div className={styles.sectionContent}>
              <input 
                type="text" 
                placeholder="근무지역을 입력하세요" 
                className={styles.textInput}
              />
              <button className={styles.addButton}>+ 추가하기</button>
            </div>
            <div className={styles.counter}>0/10</div>
          </section>

          {/* 업직종 */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>업직종</h2>
            <div className={styles.sectionContent}>
              <input 
                type="text" 
                placeholder="업직종을 입력하세요" 
                className={styles.textInput}
              />
              <button className={styles.addButton}>+ 추가하기</button>
            </div>
            <div className={styles.counter}>0/10</div>
          </section>

          {/* 근무기간 */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>근무기간</h2>
            <div className={styles.optionButtons}>
              <button className={styles.optionButton}>하루(1일)</button>
              <button className={styles.optionButton}>1주일이하</button>
              <button className={styles.optionButton}>1주일~1개월</button>
              <button className={styles.optionButton}>1개월~3개월</button>
              <button className={styles.optionButton}>3개월~6개월</button>
              <button className={styles.optionButton}>6개월~1년</button>
              <button className={styles.optionButton}>1년이상</button>
            </div>
            <div className={styles.counter}>0/6</div>
          </section>

          {/* 근무요일 */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>근무요일</h2>
            <div className={styles.sectionContent}>
              <input 
                type="text" 
                placeholder="목록에서 선택" 
                className={styles.textInput}
              />
            </div>
            <div className={styles.optionButtons}>
              <button className={styles.optionButton}>월~일</button>
              <button className={styles.optionButton}>월~토</button>
              <button className={styles.optionButton}>월~금</button>
              <button className={styles.optionButton}>주말(토,일)</button>
              <button className={styles.optionButton}>주6일</button>
              <button className={styles.optionButton}>주5일</button>
              <button className={styles.optionButton}>주4일</button>
              <button className={styles.optionButton}>주3일</button>
              <button className={styles.optionButton}>주2일</button>
              <button className={styles.optionButton}>주1일</button>
            </div>
            <div className={styles.checkboxRow}>
              <label className={styles.checkbox}>
                <input type="checkbox" />
                <span>협의제외</span>
              </label>
            </div>
            <div className={styles.counter}>0/3</div>
          </section>

          {/* 근무시간 */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>근무시간</h2>
            <div className={styles.sectionContent}>
              <input 
                type="text" 
                placeholder="목록에서 선택" 
                className={styles.textInput}
              />
            </div>
            <div className={styles.optionButtons}>
              <button className={styles.optionButton}>오전 파트</button>
              <button className={styles.optionButton}>오후 파트</button>
              <button className={styles.optionButton}>저녁 파트</button>
              <button className={styles.optionButton}>새벽 파트</button>
              <button className={styles.optionButton}>오전~오후 파트</button>
              <button className={styles.optionButton}>오후~저녁 파트</button>
              <button className={styles.optionButton}>저녁~새벽 파트</button>
              <button className={styles.optionButton}>새벽~오전 파트</button>
              <button className={styles.optionButton}>풀타임(8시간 이상)</button>
            </div>
            <div className={styles.counter}>0/3</div>
          </section>

          {/* 성별 */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>성별</h2>
            <div className={styles.radioButtons}>
              <label className={styles.radio}>
                <input type="radio" name="gender" />
                <span>남자</span>
              </label>
              <label className={styles.radio}>
                <input type="radio" name="gender" />
                <span>여자</span>
              </label>
            </div>
            <div className={styles.checkboxRow}>
              <label className={styles.checkbox}>
                <input type="checkbox" />
                <span>무관제외</span>
              </label>
            </div>
          </section>

          {/* 연령 */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>연령</h2>
            <div className={styles.ageSection}>
              <select className={styles.select}>
                <option>연령선택</option>
              </select>
              <div className={styles.ageInfo}>
                <span className={styles.infoIcon}>i</span>
                <span>만 나이 기준 안내</span>
              </div>
            </div>
            <div className={styles.checkboxRow}>
              <label className={styles.checkbox}>
                <input type="checkbox" />
                <span>무관제외</span>
              </label>
            </div>
            <div className={styles.counter}>0/7</div>
          </section>

          {/* 고용형태 */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>고용형태</h2>
            <div className={styles.optionButtons}>
              <button className={styles.optionButton}>알바</button>
              <button className={styles.optionButton}>정규직</button>
              <button className={styles.optionButton}>계약직</button>
              <button className={styles.optionButton}>파견직</button>
              <button className={styles.optionButton}>청년인턴</button>
              <button className={styles.optionButton}>위촉직(프리랜서)</button>
              <button className={styles.optionButton}>연수생/교육생</button>
            </div>
            <div className={styles.counter}>0/20</div>
          </section>

          {/* 키워드 */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>키워드</h2>
            <p className={styles.keywordDescription}>
              여러 개의 키워드를 포함하거나 제외할 수 있습니다.
            </p>
            <div className={styles.keywordSection}>
              <div className={styles.keywordInput}>
                <label>포함</label>
                <input 
                  type="text" 
                  placeholder="입력 단어 포함 공고만 검색합니다." 
                  className={styles.textInput}
                />
                <div className={styles.counter}>0/20</div>
              </div>
              <div className={styles.keywordInput}>
                <label>제외</label>
                <div className={styles.excludeRow}>
                  <input 
                    type="text" 
                    placeholder="추가 단어 포함 공고를 제외합니다." 
                    className={styles.textInput}
                  />
                  <button className={styles.addButton}>추가</button>
                </div>
                <div className={styles.counter}>0/100</div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <div className={styles.resultButton}>
        <button className={styles.viewResultsButton}>
          272,364건의 결과보기
        </button>
      </div>
    </div>
  );
}
