import React from "react";

export function DetailConditionsPage(): React.JSX.Element {
  return (
    <div style={{ fontFamily: "system-ui", maxWidth: "1512px", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ background: "#fff", borderBottom: "1px solid #e8e8e8" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px" }}>
          <button style={{ background: "none", border: "none", cursor: "pointer", fontSize: "14px", color: "#6a6a6a" }}>
            ←
          </button>
          <h1 style={{ margin: 0, fontSize: "16px", fontWeight: 600, color: "#111111" }}>검색조건설정</h1>
          <button style={{ background: "none", border: "none", cursor: "pointer", fontSize: "14px", color: "#ff501b", fontWeight: 500 }}>
            초기화
          </button>
        </div>
      </div>

      {/* Description */}
      <div style={{ padding: "16px 20px", fontSize: "13px", color: "#9e9e9e", backgroundColor: "#f8f8f8", borderBottom: "1px solid #e8e8e8" }}>
        모든 채용메뉴에 공통 반영됩니다.
      </div>

      {/* Container */}
      <div style={{ padding: "0 20px" }}>
        {/* 근무지역 */}
        <div style={{ padding: "24px 0", borderBottom: "1px solid #e8e8e8", position: "relative" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
            <h3 style={{ margin: 0, fontSize: "14px", fontWeight: 600, color: "#111111" }}>근무지역</h3>
            <div style={{ fontSize: "12px", color: "#9e9e9e" }}>0/10</div>
          </div>
          <button style={{ padding: "12px 16px", border: "1px solid #ff501b", borderRadius: "4px", backgroundColor: "white", color: "#ff501b", fontSize: "13px", fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "24px" }}>+</span>
            <span>추가하기</span>
          </button>
        </div>

        {/* 업직종 */}
        <div style={{ padding: "24px 0", borderBottom: "1px solid #e8e8e8", position: "relative" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
            <h3 style={{ margin: 0, fontSize: "14px", fontWeight: 600, color: "#111111" }}>업직종</h3>
            <div style={{ fontSize: "12px", color: "#9e9e9e" }}>0/10</div>
          </div>
          <button style={{ padding: "12px 16px", border: "1px solid #ff501b", borderRadius: "4px", backgroundColor: "white", color: "#ff501b", fontSize: "13px", fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "24px" }}>+</span>
            <span>추가하기</span>
          </button>
        </div>

        {/* 근무기간 */}
        <div style={{ padding: "24px 0", borderBottom: "1px solid #e8e8e8", position: "relative" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
            <h3 style={{ margin: 0, fontSize: "14px", fontWeight: 600, color: "#111111" }}>근무기간</h3>
            <div style={{ fontSize: "12px", color: "#9e9e9e" }}>0/6</div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            <button style={{ padding: "8px 12px", border: "1px solid #e8e8e8", borderRadius: "4px", backgroundColor: "white", color: "#6a6a6a", fontSize: "13px", cursor: "pointer" }}>하루(1일)</button>
            <button style={{ padding: "8px 12px", border: "1px solid #e8e8e8", borderRadius: "4px", backgroundColor: "white", color: "#6a6a6a", fontSize: "13px", cursor: "pointer" }}>1주일이하</button>
            <button style={{ padding: "8px 12px", border: "1px solid #e8e8e8", borderRadius: "4px", backgroundColor: "white", color: "#6a6a6a", fontSize: "13px", cursor: "pointer" }}>1주일~1개월</button>
            <button style={{ padding: "8px 12px", border: "1px solid #e8e8e8", borderRadius: "4px", backgroundColor: "white", color: "#6a6a6a", fontSize: "13px", cursor: "pointer" }}>1개월~3개월</button>
            <button style={{ padding: "8px 12px", border: "1px solid #e8e8e8", borderRadius: "4px", backgroundColor: "white", color: "#6a6a6a", fontSize: "13px", cursor: "pointer" }}>3개월~6개월</button>
            <button style={{ padding: "8px 12px", border: "1px solid #e8e8e8", borderRadius: "4px", backgroundColor: "white", color: "#6a6a6a", fontSize: "13px", cursor: "pointer" }}>6개월~1년</button>
            <button style={{ padding: "8px 12px", border: "1px solid #e8e8e8", borderRadius: "4px", backgroundColor: "white", color: "#6a6a6a", fontSize: "13px", cursor: "pointer" }}>1년이상</button>
          </div>
        </div>

        {/* 근무요일 */}
        <div style={{ padding: "24px 0", borderBottom: "1px solid #e8e8e8", position: "relative" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
            <h3 style={{ margin: 0, fontSize: "14px", fontWeight: 600, color: "#111111" }}>근무요일</h3>
            <div style={{ fontSize: "12px", color: "#9e9e9e" }}>0/3</div>
          </div>
          <div style={{ display: "flex", marginBottom: "16px" }}>
            <button style={{ padding: "8px 12px", border: "1px solid #ff501b", borderRadius: "4px 0 0 4px", backgroundColor: "#ff501b", color: "white", fontSize: "13px", cursor: "pointer" }}>목록에서 선택</button>
            <button style={{ padding: "8px 12px", border: "1px solid #e8e8e8", borderRadius: "0 4px 4px 0", backgroundColor: "white", color: "#6a6a6a", fontSize: "13px", cursor: "pointer" }}>직접 선택</button>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "16px" }}>
            <button style={{ padding: "8px 12px", border: "1px solid #e8e8e8", borderRadius: "4px", backgroundColor: "white", color: "#6a6a6a", fontSize: "13px", cursor: "pointer" }}>월~일</button>
            <button style={{ padding: "8px 12px", border: "1px solid #e8e8e8", borderRadius: "4px", backgroundColor: "white", color: "#6a6a6a", fontSize: "13px", cursor: "pointer" }}>월~토</button>
            <button style={{ padding: "8px 12px", border: "1px solid #e8e8e8", borderRadius: "4px", backgroundColor: "white", color: "#6a6a6a", fontSize: "13px", cursor: "pointer" }}>월~금</button>
            <button style={{ padding: "8px 12px", border: "1px solid #e8e8e8", borderRadius: "4px", backgroundColor: "white", color: "#6a6a6a", fontSize: "13px", cursor: "pointer" }}>주말(토,일)</button>
            <button style={{ padding: "8px 12px", border: "1px solid #e8e8e8", borderRadius: "4px", backgroundColor: "white", color: "#6a6a6a", fontSize: "13px", cursor: "pointer" }}>주6일</button>
            <button style={{ padding: "8px 12px", border: "1px solid #e8e8e8", borderRadius: "4px", backgroundColor: "white", color: "#6a6a6a", fontSize: "13px", cursor: "pointer" }}>주5일</button>
            <button style={{ padding: "8px 12px", border: "1px solid #e8e8e8", borderRadius: "4px", backgroundColor: "white", color: "#6a6a6a", fontSize: "13px", cursor: "pointer" }}>주4일</button>
            <button style={{ padding: "8px 12px", border: "1px solid #e8e8e8", borderRadius: "4px", backgroundColor: "white", color: "#6a6a6a", fontSize: "13px", cursor: "pointer" }}>주3일</button>
            <button style={{ padding: "8px 12px", border: "1px solid #e8e8e8", borderRadius: "4px", backgroundColor: "white", color: "#6a6a6a", fontSize: "13px", cursor: "pointer" }}>주2일</button>
            <button style={{ padding: "8px 12px", border: "1px solid #e8e8e8", borderRadius: "4px", backgroundColor: "white", color: "#6a6a6a", fontSize: "13px", cursor: "pointer" }}>주1일</button>
          </div>
          <label style={{ display: "flex", alignItems: "center", cursor: "pointer", fontSize: "13px", color: "#111111" }}>
            <input type="checkbox" style={{ marginRight: "8px", width: "16px", height: "16px" }} />
            <span>협의제외</span>
          </label>
        </div>

        {/* 근무시간 */}
        <div style={{ padding: "24px 0", borderBottom: "1px solid #e8e8e8", position: "relative" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
            <h3 style={{ margin: 0, fontSize: "14px", fontWeight: 600, color: "#111111" }}>근무시간</h3>
            <div style={{ fontSize: "12px", color: "#9e9e9e" }}>0/3</div>
          </div>
          <div style={{ display: "flex", marginBottom: "16px" }}>
            <button style={{ padding: "8px 12px", border: "1px solid #ff501b", borderRadius: "4px 0 0 4px", backgroundColor: "#ff501b", color: "white", fontSize: "13px", cursor: "pointer" }}>목록에서 선택</button>
            <button style={{ padding: "8px 12px", border: "1px solid #e8e8e8", borderRadius: "0 4px 4px 0", backgroundColor: "white", color: "#6a6a6a", fontSize: "13px", cursor: "pointer" }}>직접 선택</button>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "16px" }}>
            <button style={{ padding: "8px 12px", border: "1px solid #e8e8e8", borderRadius: "4px", backgroundColor: "white", color: "#6a6a6a", fontSize: "13px", cursor: "pointer" }}>오전 파트</button>
            <button style={{ padding: "8px 12px", border: "1px solid #e8e8e8", borderRadius: "4px", backgroundColor: "white", color: "#6a6a6a", fontSize: "13px", cursor: "pointer" }}>오후 파트</button>
            <button style={{ padding: "8px 12px", border: "1px solid #e8e8e8", borderRadius: "4px", backgroundColor: "white", color: "#6a6a6a", fontSize: "13px", cursor: "pointer" }}>저녁 파트</button>
            <button style={{ padding: "8px 12px", border: "1px solid #e8e8e8", borderRadius: "4px", backgroundColor: "white", color: "#6a6a6a", fontSize: "13px", cursor: "pointer" }}>새벽 파트</button>
            <button style={{ padding: "8px 12px", border: "1px solid #e8e8e8", borderRadius: "4px", backgroundColor: "white", color: "#6a6a6a", fontSize: "13px", cursor: "pointer" }}>오전~오후 파트</button>
            <button style={{ padding: "8px 12px", border: "1px solid #e8e8e8", borderRadius: "4px", backgroundColor: "white", color: "#6a6a6a", fontSize: "13px", cursor: "pointer" }}>오후~저녁 파트</button>
            <button style={{ padding: "8px 12px", border: "1px solid #e8e8e8", borderRadius: "4px", backgroundColor: "white", color: "#6a6a6a", fontSize: "13px", cursor: "pointer" }}>저녁~새벽 파트</button>
            <button style={{ padding: "8px 12px", border: "1px solid #e8e8e8", borderRadius: "4px", backgroundColor: "white", color: "#6a6a6a", fontSize: "13px", cursor: "pointer" }}>새벽~오전 파트</button>
            <button style={{ padding: "8px 12px", border: "1px solid #e8e8e8", borderRadius: "4px", backgroundColor: "white", color: "#6a6a6a", fontSize: "13px", cursor: "pointer" }}>풀타임(8시간 이상)</button>
          </div>
          <label style={{ display: "flex", alignItems: "center", cursor: "pointer", fontSize: "13px", color: "#111111" }}>
            <input type="checkbox" style={{ marginRight: "8px", width: "16px", height: "16px" }} />
            <span>협의제외</span>
          </label>
        </div>

        {/* 성별 */}
        <div style={{ padding: "24px 0", borderBottom: "1px solid #e8e8e8", position: "relative" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
            <h3 style={{ margin: 0, fontSize: "14px", fontWeight: 600, color: "#111111" }}>성별</h3>
          </div>
          <div style={{ display: "flex", marginBottom: "16px" }}>
            <button style={{ padding: "8px 12px", border: "1px solid #e8e8e8", borderRadius: "4px 0 0 4px", backgroundColor: "white", color: "#6a6a6a", fontSize: "13px", cursor: "pointer" }}>남자</button>
            <button style={{ padding: "8px 12px", border: "1px solid #e8e8e8", borderRadius: "0 4px 4px 0", backgroundColor: "white", color: "#6a6a6a", fontSize: "13px", cursor: "pointer" }}>여자</button>
          </div>
          <label style={{ display: "flex", alignItems: "center", cursor: "pointer", fontSize: "13px", color: "#111111" }}>
            <input type="checkbox" style={{ marginRight: "8px", width: "16px", height: "16px" }} />
            <span>무관제외</span>
          </label>
        </div>

        {/* 연령 */}
        <div style={{ padding: "24px 0", borderBottom: "1px solid #e8e8e8", position: "relative" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
            <h3 style={{ margin: 0, fontSize: "14px", fontWeight: 600, color: "#111111" }}>연령</h3>
            <button style={{ background: "none", border: "none", cursor: "pointer", fontSize: "12px", color: "#9e9e9e", display: "flex", alignItems: "center", gap: "4px" }}>
              <span>만 나이 기준 안내</span>
              <span style={{ fontSize: "20px", color: "#d2d2d2" }}>i</span>
            </button>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
            <select style={{ padding: "12px 16px", border: "1px solid #e8e8e8", borderRadius: "4px", fontSize: "14px", minWidth: "120px" }}>
              <option>연령선택</option>
            </select>
          </div>
          <label style={{ display: "flex", alignItems: "center", cursor: "pointer", fontSize: "13px", color: "#111111" }}>
            <input type="checkbox" style={{ marginRight: "8px", width: "16px", height: "16px" }} />
            <span>무관제외</span>
          </label>
        </div>

        {/* 고용형태 */}
        <div style={{ padding: "24px 0", borderBottom: "1px solid #e8e8e8", position: "relative" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
            <h3 style={{ margin: 0, fontSize: "14px", fontWeight: 600, color: "#111111" }}>고용형태</h3>
            <div style={{ fontSize: "12px", color: "#9e9e9e" }}>0/7</div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            <button style={{ padding: "8px 12px", border: "1px solid #e8e8e8", borderRadius: "4px", backgroundColor: "white", color: "#6a6a6a", fontSize: "13px", cursor: "pointer" }}>알바</button>
            <button style={{ padding: "8px 12px", border: "1px solid #e8e8e8", borderRadius: "4px", backgroundColor: "white", color: "#6a6a6a", fontSize: "13px", cursor: "pointer" }}>정규직</button>
            <button style={{ padding: "8px 12px", border: "1px solid #e8e8e8", borderRadius: "4px", backgroundColor: "white", color: "#6a6a6a", fontSize: "13px", cursor: "pointer" }}>계약직</button>
            <button style={{ padding: "8px 12px", border: "1px solid #e8e8e8", borderRadius: "4px", backgroundColor: "white", color: "#6a6a6a", fontSize: "13px", cursor: "pointer" }}>파견직</button>
            <button style={{ padding: "8px 12px", border: "1px solid #e8e8e8", borderRadius: "4px", backgroundColor: "white", color: "#6a6a6a", fontSize: "13px", cursor: "pointer" }}>청년인턴</button>
            <button style={{ padding: "8px 12px", border: "1px solid #e8e8e8", borderRadius: "4px", backgroundColor: "white", color: "#6a6a6a", fontSize: "13px", cursor: "pointer" }}>위촉직(프리랜서)</button>
            <button style={{ padding: "8px 12px", border: "1px solid #e8e8e8", borderRadius: "4px", backgroundColor: "white", color: "#6a6a6a", fontSize: "13px", cursor: "pointer" }}>연수생/교육생</button>
          </div>
        </div>

        {/* 키워드 */}
        <div style={{ padding: "24px 0", borderBottom: "1px solid #e8e8e8", position: "relative" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
            <h3 style={{ margin: 0, fontSize: "14px", fontWeight: 600, color: "#111111" }}>키워드</h3>
          </div>
          <p style={{ fontSize: "12px", color: "#9e9e9e", marginBottom: "16px" }}>
            여러 개의 키워드를 포함하거나 제외할 수 있습니다.
          </p>
          <div style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                <label style={{ fontSize: "13px", color: "#111111", fontWeight: 500 }}>포함</label>
                <span style={{ fontSize: "12px", color: "#9e9e9e" }}>0/20</span>
              </div>
              <input
                type="text"
                placeholder="입력 단어 포함 공고만 검색합니다."
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  border: "1px solid #e8e8e8",
                  borderRadius: "4px",
                  fontSize: "14px",
                }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                <label style={{ fontSize: "13px", color: "#111111", fontWeight: 500 }}>제외</label>
              </div>
              <div style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
                <input
                  type="text"
                  placeholder="추가 단어 포함 공고를 제외합니다."
                  style={{
                    flex: 1,
                    padding: "12px 16px",
                    border: "1px solid #e8e8e8",
                    borderRadius: "4px",
                    fontSize: "14px",
                  }}
                />
                <button style={{ padding: "12px 16px", backgroundColor: "#111111", color: "white", border: "none", borderRadius: "4px", fontSize: "13px", fontWeight: 500, cursor: "pointer" }}>
                  추가
                </button>
              </div>
              <div style={{ fontSize: "12px", color: "#9e9e9e" }}>0/100</div>
            </div>
          </div>
        </div>
      </div>

      {/* 결과보기 버튼 */}
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, backgroundColor: "white", borderTop: "1px solid #e8e8e8", padding: "16px 20px", zIndex: 100 }}>
        <button style={{ width: "100%", padding: "16px", backgroundColor: "#ff501b", color: "white", border: "none", borderRadius: "4px", fontSize: "14px", fontWeight: 600, cursor: "pointer" }}>
          272,364건의 결과보기
        </button>
      </div>
    </div>
  );
}
