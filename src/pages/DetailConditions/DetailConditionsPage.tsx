import React from "react";

export function DetailConditionsPage(): React.JSX.Element {
  return (
    <div
      style={{ fontFamily: "system-ui", maxWidth: "1512px", margin: "0 auto" }}
    >
      {/* Header */}
      <div style={{ background: "#fff", borderBottom: "1px solid #e8e8e8" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "20px",
          }}
        >
          <button
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "14px",
              color: "#6a6a6a",
              padding: "8px",
              borderRadius: "4px",
            }}
          >
            ←
          </button>
          <h1
            style={{
              margin: 0,
              fontSize: "16px",
              fontWeight: 600,
              color: "#111111",
            }}
          >
            검색조건설정
          </h1>
          <button
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "14px",
              color: "#ff501b",
              fontWeight: 500,
              padding: "8px",
              borderRadius: "4px",
            }}
          >
            초기화
          </button>
        </div>
      </div>

      {/* Description */}
      <div
        style={{
          padding: "16px 20px",
          fontSize: "13px",
          color: "#9e9e9e",
          backgroundColor: "#f8f8f8",
          lineHeight: "1.4",
          letterSpacing: "-0.75px",
        }}
      >
        모든 채용메뉴에 공통 반영됩니다.
      </div>

      <div style={{ padding: "0 20px" }}>
        {/* 근무지역 */}
        <div
          style={{
            padding: "24px 0",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: "16px",
            }}
          >
            <h3
              style={{
                margin: 0,
                fontSize: "18px",
                fontWeight: 600,
                color: "#111111",
              }}
            >
              근무지역
            </h3>
            <div style={{ fontSize: "12px", color: "#9e9e9e" }}>0/10</div>
          </div>
          <button
            style={{
              padding: "12px 16px",
              border: "1px solid #ff501b",
              borderRadius: "4px",
              backgroundColor: "white",
              color: "#ff501b",
              fontSize: "13px",
              fontWeight: 500,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              width: "100%",
              justifyContent: "center",
            }}
          >
            <span style={{ fontSize: "24px" }}>+</span>
            <span>추가하기</span>
          </button>
        </div>

        {/* 업직종 */}
        <div
          style={{
            padding: "24px 0",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: "16px",
            }}
          >
            <h3
              style={{
                margin: 0,
                fontSize: "18px",
                fontWeight: 600,
                color: "#111111",
              }}
            >
              업직종
            </h3>
            <div style={{ fontSize: "12px", color: "#9e9e9e" }}>0/10</div>
          </div>
          <button
            style={{
              padding: "12px 16px",
              border: "1px solid #ff501b",
              borderRadius: "4px",
              backgroundColor: "white",
              color: "#ff501b",
              fontSize: "13px",
              fontWeight: 500,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              width: "100%",
              justifyContent: "center",
            }}
          >
            <span style={{ fontSize: "24px" }}>+</span>
            <span>추가하기</span>
          </button>
        </div>

        {/* 근무기간 */}
        <div
          style={{
            padding: "24px 0",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: "16px",
            }}
          >
            <h3
              style={{
                margin: 0,
                fontSize: "18px",
                fontWeight: 600,
                color: "#111111",
              }}
            >
              근무기간
            </h3>
            <div style={{ fontSize: "12px", color: "#9e9e9e" }}>0/6</div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {[
              "하루(1일)",
              "1주일이하",
              "1주일~1개월",
              "1개월~3개월",
              "3개월~6개월",
              "6개월~1년",
              "1년이상",
            ].map((text) => (
              <label
                key={text}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  cursor: "pointer",
                  position: "relative",
                  height: "34px",
                }}
              >
                <input
                  type="checkbox"
                  style={{
                    position: "absolute",
                    opacity: 0,
                    width: 0,
                    height: 0,
                  }}
                />
                <span
                  style={{
                    padding: "8px 12px",
                    border: "1px solid #f8f8f8",
                    borderRadius: "30px",
                    backgroundColor: "#f8f8f8",
                    color: "#6a6a6a",
                    fontSize: "13px",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {text}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* 근무요일 */}
        <div
          style={{
            padding: "24px 0",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: "16px",
            }}
          >
            <h3
              style={{
                margin: 0,
                fontSize: "18px",
                fontWeight: 600,
                color: "#111111",
              }}
            >
              근무요일
            </h3>
            <div style={{ fontSize: "12px", color: "#9e9e9e" }}>0/3</div>
          </div>
          <div style={{ marginBottom: "16px" }}>
            <div
              style={{
                display: "flex",
                borderRadius: "8px",
                overflow: "hidden",
                border: "1px solid #e8e8e8",
                height: "44px",
              }}
            >
              <label
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  cursor: "pointer",
                  position: "relative",
                  flex: 1,
                  height: "100%",
                }}
              >
                <input
                  type="radio"
                  name="workDay"
                  defaultChecked
                  style={{
                    position: "absolute",
                    opacity: 0,
                    width: 0,
                    height: 0,
                  }}
                />
                <span
                  style={{
                    padding: "8px 12px",
                    border: "1px solid #ff501b",
                    borderRadius: "8px 0 0 8px",
                    backgroundColor: "white",
                    color: "#ff501b",
                    fontSize: "13px",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    width: "100%",
                    height: "100%",
                    textAlign: "center",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  목록에서 선택
                </span>
              </label>
              <label
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  cursor: "pointer",
                  position: "relative",
                  flex: 1,
                  height: "100%",
                }}
              >
                <input
                  type="radio"
                  name="workDay"
                  style={{
                    position: "absolute",
                    opacity: 0,
                    width: 0,
                    height: 0,
                  }}
                />
                <span
                  style={{
                    padding: "8px 12px",
                    border: "1px solid #e8e8e8",
                    borderRadius: "0 8px 8px 0",
                    backgroundColor: "transparent",
                    color: "#6a6a6a",
                    fontSize: "13px",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    width: "100%",
                    height: "100%",
                    textAlign: "center",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  직접 선택
                </span>
              </label>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
              marginBottom: "16px",
            }}
          >
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
              <label
                key={text}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  cursor: "pointer",
                  position: "relative",
                  height: "34px",
                }}
              >
                <input
                  type="checkbox"
                  style={{
                    position: "absolute",
                    opacity: 0,
                    width: 0,
                    height: 0,
                  }}
                />
                <span
                  style={{
                    padding: "8px 12px",
                    border: "1px solid #f8f8f8",
                    borderRadius: "30px",
                    backgroundColor: "#f8f8f8",
                    color: "#6a6a6a",
                    fontSize: "13px",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {text}
                </span>
              </label>
            ))}
          </div>
          <label
            style={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              fontSize: "13px",
              color: "#111111",
            }}
          >
            <input
              type="checkbox"
              disabled
              style={{
                marginRight: "8px",
                width: "16px",
                height: "16px",
                accentColor: "#ff501b",
              }}
            />
            <span>협의제외</span>
          </label>
        </div>

        {/* 근무시간 */}
        <div
          style={{
            padding: "24px 0",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: "16px",
            }}
          >
            <h3
              style={{
                margin: 0,
                fontSize: "18px",
                fontWeight: 600,
                color: "#111111",
              }}
            >
              근무시간
            </h3>
            <div style={{ fontSize: "12px", color: "#9e9e9e" }}>0/3</div>
          </div>
          <div style={{ marginBottom: "16px" }}>
            <div
              style={{
                display: "flex",
                borderRadius: "8px",
                overflow: "hidden",
                border: "1px solid #e8e8e8",
                height: "44px",
              }}
            >
              <label
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  cursor: "pointer",
                  position: "relative",
                  flex: 1,
                  height: "100%",
                }}
              >
                <input
                  type="radio"
                  name="workTime"
                  defaultChecked
                  style={{
                    position: "absolute",
                    opacity: 0,
                    width: 0,
                    height: 0,
                  }}
                />
                <span
                  style={{
                    padding: "8px 12px",
                    border: "1px solid #ff501b",
                    borderRadius: "8px 0 0 8px",
                    backgroundColor: "white",
                    color: "#ff501b",
                    fontSize: "13px",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    width: "100%",
                    height: "100%",
                    textAlign: "center",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  목록에서 선택
                </span>
              </label>
              <label
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  cursor: "pointer",
                  position: "relative",
                  flex: 1,
                  height: "100%",
                }}
              >
                <input
                  type="radio"
                  name="workTime"
                  style={{
                    position: "absolute",
                    opacity: 0,
                    width: 0,
                    height: 0,
                  }}
                />
                <span
                  style={{
                    padding: "8px 12px",
                    border: "1px solid #e8e8e8",
                    borderRadius: "0 8px 8px 0",
                    backgroundColor: "transparent",
                    color: "#6a6a6a",
                    fontSize: "13px",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    width: "100%",
                    height: "100%",
                    textAlign: "center",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  직접 선택
                </span>
              </label>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
              marginBottom: "16px",
            }}
          >
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
              <label
                key={text}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  cursor: "pointer",
                  position: "relative",
                  height: "34px",
                }}
              >
                <input
                  type="checkbox"
                  style={{
                    position: "absolute",
                    opacity: 0,
                    width: 0,
                    height: 0,
                  }}
                />
                <span
                  style={{
                    padding: "8px 12px",
                    border: "1px solid #f8f8f8",
                    borderRadius: "30px",
                    backgroundColor: "#f8f8f8",
                    color: "#6a6a6a",
                    fontSize: "13px",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {text}
                </span>
              </label>
            ))}
          </div>
          <label
            style={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              fontSize: "13px",
              color: "#111111",
            }}
          >
            <input
              type="checkbox"
              disabled
              style={{
                marginRight: "8px",
                width: "16px",
                height: "16px",
                accentColor: "#ff501b",
              }}
            />
            <span>협의제외</span>
          </label>
        </div>

        {/* 성별 */}
        <div
          style={{
            padding: "24px 0",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: "16px",
            }}
          >
            <h3
              style={{
                margin: 0,
                fontSize: "18px",
                fontWeight: 600,
                color: "#111111",
              }}
            >
              성별
            </h3>
          </div>
          <div style={{ marginBottom: "16px" }}>
            <div
              style={{
                display: "flex",
                borderRadius: "8px",
                overflow: "hidden",
                border: "1px solid #e8e8e8",
                height: "44px",
              }}
            >
              <label
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  cursor: "pointer",
                  position: "relative",
                  flex: 1,
                  height: "100%",
                }}
              >
                <input
                  type="checkbox"
                  style={{
                    position: "absolute",
                    opacity: 0,
                    width: 0,
                    height: 0,
                  }}
                />
                <span
                  style={{
                    padding: "8px 12px",
                    border: "1px solid #e8e8e8",
                    borderRadius: "8px 0 0 8px",
                    backgroundColor: "transparent",
                    color: "#6a6a6a",
                    fontSize: "13px",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    width: "100%",
                    height: "100%",
                    textAlign: "center",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  남자
                </span>
              </label>
              <label
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  cursor: "pointer",
                  position: "relative",
                  flex: 1,
                  height: "100%",
                }}
              >
                <input
                  type="checkbox"
                  style={{
                    position: "absolute",
                    opacity: 0,
                    width: 0,
                    height: 0,
                  }}
                />
                <span
                  style={{
                    padding: "8px 12px",
                    border: "1px solid #e8e8e8",
                    borderRadius: "0 8px 8px 0",
                    backgroundColor: "transparent",
                    color: "#6a6a6a",
                    fontSize: "13px",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    width: "100%",
                    height: "100%",
                    textAlign: "center",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  여자
                </span>
              </label>
            </div>
          </div>
          <label
            style={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              fontSize: "13px",
              color: "#111111",
            }}
          >
            <input
              type="checkbox"
              disabled
              style={{
                marginRight: "8px",
                width: "16px",
                height: "16px",
                accentColor: "#ff501b",
              }}
            />
            <span>무관제외</span>
          </label>
        </div>

        {/* 연령 */}
        <div
          style={{
            padding: "24px 0",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: "16px",
            }}
          >
            <h3
              style={{
                margin: 0,
                fontSize: "18px",
                fontWeight: 600,
                color: "#111111",
              }}
            >
              연령
            </h3>
            <button
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "12px",
                color: "#9e9e9e",
                display: "flex",
                alignItems: "center",
                gap: "4px",
                padding: "4px",
                borderRadius: "4px",
              }}
            >
              <span>만 나이 기준 안내</span>
              <span style={{ fontSize: "20px", color: "#d2d2d2" }}>i</span>
            </button>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "16px",
            }}
          >
            <div style={{ position: "relative", flex: 1 }}>
              <select
                style={{
                  padding: "12px 16px",
                  border: "1px solid #e8e8e8",
                  borderRadius: "4px",
                  fontSize: "14px",
                  width: "100%",
                  backgroundColor: "white",
                  color: "#111111",
                  appearance: "none",
                  cursor: "pointer",
                }}
              >
                <option>연령선택</option>
                {Array.from({ length: 71 }, (_, i) => i + 10).map((age) => (
                  <option key={age} value={age}>
                    {age}세
                  </option>
                ))}
              </select>
              <div
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  pointerEvents: "none",
                  fontSize: "24px",
                  color: "#d2d2d2",
                }}
              >
                ▼
              </div>
            </div>
          </div>
          <label
            style={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              fontSize: "13px",
              color: "#111111",
            }}
          >
            <input
              type="checkbox"
              disabled
              style={{
                marginRight: "8px",
                width: "16px",
                height: "16px",
                accentColor: "#ff501b",
              }}
            />
            <span>무관제외</span>
          </label>
        </div>

        {/* 고용형태 */}
        <div
          style={{
            padding: "24px 0",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: "16px",
            }}
          >
            <h3
              style={{
                margin: 0,
                fontSize: "18px",
                fontWeight: 600,
                color: "#111111",
              }}
            >
              고용형태
            </h3>
            <div style={{ fontSize: "12px", color: "#9e9e9e" }}>0/7</div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {[
              "알바",
              "정규직",
              "계약직",
              "파견직",
              "청년인턴",
              "위촉직(프리랜서)",
              "연수생/교육생",
            ].map((text) => (
              <label
                key={text}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  cursor: "pointer",
                  position: "relative",
                  height: "34px",
                }}
              >
                <input
                  type="checkbox"
                  style={{
                    position: "absolute",
                    opacity: 0,
                    width: 0,
                    height: 0,
                  }}
                />
                <span
                  style={{
                    padding: "8px 12px",
                    border: "1px solid #f8f8f8",
                    borderRadius: "30px",
                    backgroundColor: "#f8f8f8",
                    color: "#6a6a6a",
                    fontSize: "13px",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {text}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* 키워드 */}
        <div
          style={{
            padding: "24px 0",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: "16px",
            }}
          >
            <h3
              style={{
                margin: 0,
                fontSize: "18px",
                fontWeight: 600,
                color: "#111111",
              }}
            >
              키워드
            </h3>
          </div>
          <p
            style={{ fontSize: "12px", color: "#9e9e9e", marginBottom: "16px" }}
          >
            여러 개의 키워드를 포함하거나 제외할 수 있습니다.
          </p>
          <div style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "8px",
                }}
              >
                <label
                  style={{
                    fontSize: "13px",
                    color: "#111111",
                    fontWeight: 500,
                  }}
                >
                  포함
                </label>
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
                  backgroundColor: "white",
                  color: "#111111",
                  boxSizing: "border-box",
                }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "8px",
                }}
              >
                <label
                  style={{
                    fontSize: "13px",
                    color: "#111111",
                    fontWeight: 500,
                  }}
                >
                  제외
                </label>
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
                    backgroundColor: "white",
                    color: "#111111",
                    boxSizing: "border-box",
                  }}
                />
                <button
                  style={{
                    padding: "12px 16px",
                    backgroundColor: "#111111",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    fontSize: "13px",
                    fontWeight: 500,
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                  }}
                >
                  추가
                </button>
              </div>
              <div
                style={{
                  fontSize: "12px",
                  color: "#9e9e9e",
                  textAlign: "right",
                }}
              >
                0/100
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 결과보기 버튼 */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "white",
          borderTop: "1px solid #e8e8e8",
          padding: "16px 20px",
          zIndex: 100,
        }}
      >
        <button
          style={{
            width: "100%",
            padding: "16px",
            backgroundColor: "#ff501b",
            color: "white",
            border: "none",
            borderRadius: "4px",
            fontSize: "14px",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          272,364건의 결과보기
        </button>
      </div>
    </div>
  );
}
