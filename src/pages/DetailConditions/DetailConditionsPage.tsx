import React from "react";

export function DetailConditionsPage(): React.JSX.Element {
  return (
    <div style={{ fontFamily: 'system-ui', maxWidth: '1512px', margin: '0 auto', padding: '20px' }}>
      <header style={{ padding: '20px', borderBottom: '1px solid #e8e8e8' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', color: '#6a6a6a' }}>
            ←
          </button>
          <h1 style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: '#111111' }}>검색조건설정</h1>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', color: '#ff501b', fontWeight: 500 }}>
            초기화
          </button>
        </div>
      </header>
      
      <div style={{ padding: '16px 20px', fontSize: '13px', color: '#9e9e9e', backgroundColor: '#f8f8f8', borderBottom: '1px solid #e8e8e8' }}>
        모든 채용메뉴에 공통 반영됩니다.
      </div>
      
      <main>
        <div style={{ padding: '0 20px' }}>
          {/* 근무지역 */}
          <section style={{ padding: '24px 0', borderBottom: '1px solid #e8e8e8', position: 'relative' }}>
            <h2 style={{ margin: '0 0 16px 0', fontSize: '14px', fontWeight: 600, color: '#111111' }}>근무지역</h2>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
              <input 
                type="text" 
                placeholder="근무지역을 입력하세요" 
                style={{ flex: 1, padding: '12px 16px', border: '1px solid #e8e8e8', borderRadius: '4px', fontSize: '14px' }}
              />
              <button style={{ padding: '12px 16px', border: '1px solid #ff501b', borderRadius: '4px', backgroundColor: 'white', color: '#ff501b', fontSize: '13px', fontWeight: 500, cursor: 'pointer' }}>+ 추가하기</button>
            </div>
            <div style={{ position: 'absolute', top: '24px', right: 0, fontSize: '12px', color: '#9e9e9e' }}>0/10</div>
          </section>

          {/* 업직종 */}
          <section style={{ padding: '24px 0', borderBottom: '1px solid #e8e8e8', position: 'relative' }}>
            <h2 style={{ margin: '0 0 16px 0', fontSize: '14px', fontWeight: 600, color: '#111111' }}>업직종</h2>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
              <input 
                type="text" 
                placeholder="업직종을 입력하세요" 
                style={{ flex: 1, padding: '12px 16px', border: '1px solid #e8e8e8', borderRadius: '4px', fontSize: '14px' }}
              />
              <button style={{ padding: '12px 16px', border: '1px solid #ff501b', borderRadius: '4px', backgroundColor: 'white', color: '#ff501b', fontSize: '13px', fontWeight: 500, cursor: 'pointer' }}>+ 추가하기</button>
            </div>
            <div style={{ position: 'absolute', top: '24px', right: 0, fontSize: '12px', color: '#9e9e9e' }}>0/10</div>
          </section>

          {/* 근무기간 */}
          <section style={{ padding: '24px 0', borderBottom: '1px solid #e8e8e8', position: 'relative' }}>
            <h2 style={{ margin: '0 0 16px 0', fontSize: '14px', fontWeight: 600, color: '#111111' }}>근무기간</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
              <button style={{ padding: '8px 12px', border: '1px solid #e8e8e8', borderRadius: '4px', backgroundColor: 'white', color: '#6a6a6a', fontSize: '13px', cursor: 'pointer' }}>하루(1일)</button>
              <button style={{ padding: '8px 12px', border: '1px solid #e8e8e8', borderRadius: '4px', backgroundColor: 'white', color: '#6a6a6a', fontSize: '13px', cursor: 'pointer' }}>1주일이하</button>
              <button style={{ padding: '8px 12px', border: '1px solid #e8e8e8', borderRadius: '4px', backgroundColor: 'white', color: '#6a6a6a', fontSize: '13px', cursor: 'pointer' }}>1주일~1개월</button>
              <button style={{ padding: '8px 12px', border: '1px solid #e8e8e8', borderRadius: '4px', backgroundColor: 'white', color: '#6a6a6a', fontSize: '13px', cursor: 'pointer' }}>1개월~3개월</button>
              <button style={{ padding: '8px 12px', border: '1px solid #e8e8e8', borderRadius: '4px', backgroundColor: 'white', color: '#6a6a6a', fontSize: '13px', cursor: 'pointer' }}>3개월~6개월</button>
              <button style={{ padding: '8px 12px', border: '1px solid #e8e8e8', borderRadius: '4px', backgroundColor: 'white', color: '#6a6a6a', fontSize: '13px', cursor: 'pointer' }}>6개월~1년</button>
              <button style={{ padding: '8px 12px', border: '1px solid #e8e8e8', borderRadius: '4px', backgroundColor: 'white', color: '#6a6a6a', fontSize: '13px', cursor: 'pointer' }}>1년이상</button>
            </div>
            <div style={{ position: 'absolute', top: '24px', right: 0, fontSize: '12px', color: '#9e9e9e' }}>0/6</div>
          </section>

          {/* 근무요일 */}
          <section style={{ padding: '24px 0', borderBottom: '1px solid #e8e8e8', position: 'relative' }}>
            <h2 style={{ margin: '0 0 16px 0', fontSize: '14px', fontWeight: 600, color: '#111111' }}>근무요일</h2>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
              <input 
                type="text" 
                placeholder="목록에서 선택" 
                style={{ flex: 1, padding: '12px 16px', border: '1px solid #e8e8e8', borderRadius: '4px', fontSize: '14px' }}
              />
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
              <button style={{ padding: '8px 12px', border: '1px solid #e8e8e8', borderRadius: '4px', backgroundColor: 'white', color: '#6a6a6a', fontSize: '13px', cursor: 'pointer' }}>월~일</button>
              <button style={{ padding: '8px 12px', border: '1px solid #e8e8e8', borderRadius: '4px', backgroundColor: 'white', color: '#6a6a6a', fontSize: '13px', cursor: 'pointer' }}>월~토</button>
              <button style={{ padding: '8px 12px', border: '1px solid #e8e8e8', borderRadius: '4px', backgroundColor: 'white', color: '#6a6a6a', fontSize: '13px', cursor: 'pointer' }}>월~금</button>
              <button style={{ padding: '8px 12px', border: '1px solid #e8e8e8', borderRadius: '4px', backgroundColor: 'white', color: '#6a6a6a', fontSize: '13px', cursor: 'pointer' }}>주말(토,일)</button>
              <button style={{ padding: '8px 12px', border: '1px solid #e8e8e8', borderRadius: '4px', backgroundColor: 'white', color: '#6a6a6a', fontSize: '13px', cursor: 'pointer' }}>주6일</button>
              <button style={{ padding: '8px 12px', border: '1px solid #e8e8e8', borderRadius: '4px', backgroundColor: 'white', color: '#6a6a6a', fontSize: '13px', cursor: 'pointer' }}>주5일</button>
              <button style={{ padding: '8px 12px', border: '1px solid #e8e8e8', borderRadius: '4px', backgroundColor: 'white', color: '#6a6a6a', fontSize: '13px', cursor: 'pointer' }}>주4일</button>
              <button style={{ padding: '8px 12px', border: '1px solid #e8e8e8', borderRadius: '4px', backgroundColor: 'white', color: '#6a6a6a', fontSize: '13px', cursor: 'pointer' }}>주3일</button>
              <button style={{ padding: '8px 12px', border: '1px solid #e8e8e8', borderRadius: '4px', backgroundColor: 'white', color: '#6a6a6a', fontSize: '13px', cursor: 'pointer' }}>주2일</button>
              <button style={{ padding: '8px 12px', border: '1px solid #e8e8e8', borderRadius: '4px', backgroundColor: 'white', color: '#6a6a6a', fontSize: '13px', cursor: 'pointer' }}>주1일</button>
            </div>
            <div style={{ position: 'absolute', top: '24px', right: 0, fontSize: '12px', color: '#9e9e9e' }}>0/3</div>
          </section>

          {/* 근무시간 */}
          <section style={{ padding: '24px 0', borderBottom: '1px solid #e8e8e8', position: 'relative' }}>
            <h2 style={{ margin: '0 0 16px 0', fontSize: '14px', fontWeight: 600, color: '#111111' }}>근무시간</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
              <button style={{ padding: '8px 12px', border: '1px solid #e8e8e8', borderRadius: '4px', backgroundColor: 'white', color: '#6a6a6a', fontSize: '13px', cursor: 'pointer' }}>오전 파트</button>
              <button style={{ padding: '8px 12px', border: '1px solid #e8e8e8', borderRadius: '4px', backgroundColor: 'white', color: '#6a6a6a', fontSize: '13px', cursor: 'pointer' }}>오후 파트</button>
              <button style={{ padding: '8px 12px', border: '1px solid #e8e8e8', borderRadius: '4px', backgroundColor: 'white', color: '#6a6a6a', fontSize: '13px', cursor: 'pointer' }}>저녁 파트</button>
              <button style={{ padding: '8px 12px', border: '1px solid #e8e8e8', borderRadius: '4px', backgroundColor: 'white', color: '#6a6a6a', fontSize: '13px', cursor: 'pointer' }}>새벽 파트</button>
              <button style={{ padding: '8px 12px', border: '1px solid #e8e8e8', borderRadius: '4px', backgroundColor: 'white', color: '#6a6a6a', fontSize: '13px', cursor: 'pointer' }}>오전~오후 파트</button>
              <button style={{ padding: '8px 12px', border: '1px solid #e8e8e8', borderRadius: '4px', backgroundColor: 'white', color: '#6a6a6a', fontSize: '13px', cursor: 'pointer' }}>오후~저녁 파트</button>
              <button style={{ padding: '8px 12px', border: '1px solid #e8e8e8', borderRadius: '4px', backgroundColor: 'white', color: '#6a6a6a', fontSize: '13px', cursor: 'pointer' }}>저녁~새벽 파트</button>
              <button style={{ padding: '8px 12px', border: '1px solid #e8e8e8', borderRadius: '4px', backgroundColor: 'white', color: '#6a6a6a', fontSize: '13px', cursor: 'pointer' }}>새벽~오전 파트</button>
              <button style={{ padding: '8px 12px', border: '1px solid #e8e8e8', borderRadius: '4px', backgroundColor: 'white', color: '#6a6a6a', fontSize: '13px', cursor: 'pointer' }}>풀타임(8시간 이상)</button>
            </div>
            <div style={{ position: 'absolute', top: '24px', right: 0, fontSize: '12px', color: '#9e9e9e' }}>0/3</div>
          </section>

          {/* 성별 */}
          <section style={{ padding: '24px 0', borderBottom: '1px solid #e8e8e8', position: 'relative' }}>
            <h2 style={{ margin: '0 0 16px 0', fontSize: '14px', fontWeight: 600, color: '#111111' }}>성별</h2>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <input type="radio" name="gender" style={{ marginRight: '8px', width: '16px', height: '16px' }} />
                <span style={{ fontSize: '14px', color: '#111111' }}>남자</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <input type="radio" name="gender" style={{ marginRight: '8px', width: '16px', height: '16px' }} />
                <span style={{ fontSize: '14px', color: '#111111' }}>여자</span>
              </label>
            </div>
            <div style={{ position: 'absolute', top: '24px', right: 0, fontSize: '12px', color: '#9e9e9e' }}>0/2</div>
          </section>

          {/* 연령 */}
          <section style={{ padding: '24px 0', borderBottom: '1px solid #e8e8e8', position: 'relative' }}>
            <h2 style={{ margin: '0 0 16px 0', fontSize: '14px', fontWeight: 600, color: '#111111' }}>연령</h2>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
              <select style={{ padding: '12px 16px', border: '1px solid #e8e8e8', borderRadius: '4px', fontSize: '14px' }}>
                <option>연령선택</option>
              </select>
              <div style={{ display: 'flex', alignItems: 'center', fontSize: '12px', color: '#9e9e9e' }}>
                <span style={{ marginRight: '8px' }}>i</span>
                <span>만 나이 기준 안내</span>
              </div>
            </div>
            <div style={{ position: 'absolute', top: '24px', right: 0, fontSize: '12px', color: '#9e9e9e' }}>0/7</div>
          </section>

          {/* 고용형태 */}
          <section style={{ padding: '24px 0', borderBottom: '1px solid #e8e8e8', position: 'relative' }}>
            <h2 style={{ margin: '0 0 16px 0', fontSize: '14px', fontWeight: 600, color: '#111111' }}>고용형태</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
              <button style={{ padding: '8px 12px', border: '1px solid #e8e8e8', borderRadius: '4px', backgroundColor: 'white', color: '#6a6a6a', fontSize: '13px', cursor: 'pointer' }}>알바</button>
              <button style={{ padding: '8px 12px', border: '1px solid #e8e8e8', borderRadius: '4px', backgroundColor: 'white', color: '#6a6a6a', fontSize: '13px', cursor: 'pointer' }}>정규직</button>
              <button style={{ padding: '8px 12px', border: '1px solid #e8e8e8', borderRadius: '4px', backgroundColor: 'white', color: '#6a6a6a', fontSize: '13px', cursor: 'pointer' }}>계약직</button>
              <button style={{ padding: '8px 12px', border: '1px solid #e8e8e8', borderRadius: '4px', backgroundColor: 'white', color: '#6a6a6a', fontSize: '13px', cursor: 'pointer' }}>파견직</button>
              <button style={{ padding: '8px 12px', border: '1px solid #e8e8e8', borderRadius: '4px', backgroundColor: 'white', color: '#6a6a6a', fontSize: '13px', cursor: 'pointer' }}>청년인턴</button>
              <button style={{ padding: '8px 12px', border: '1px solid #e8e8e8', borderRadius: '4px', backgroundColor: 'white', color: '#6a6a6a', fontSize: '13px', cursor: 'pointer' }}>위촉직(프리랜서)</button>
              <button style={{ padding: '8px 12px', border: '1px solid #e8e8e8', borderRadius: '4px', backgroundColor: 'white', color: '#6a6a6a', fontSize: '13px', cursor: 'pointer' }}>연수생/교육생</button>
            </div>
            <div style={{ position: 'absolute', top: '24px', right: 0, fontSize: '12px', color: '#9e9e9e' }}>0/20</div>
          </section>

          {/* 키워드 */}
          <section style={{ padding: '24px 0', borderBottom: '1px solid #e8e8e8', position: 'relative' }}>
            <h2 style={{ margin: '0 0 16px 0', fontSize: '14px', fontWeight: 600, color: '#111111' }}>키워드</h2>
            <p style={{ fontSize: '13px', color: '#9e9e9e', marginBottom: '12px' }}>
              여러 개의 키워드를 포함하거나 제외할 수 있습니다.
            </p>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: '13px', color: '#111111' }}>포함</label>
                <input 
                  type="text" 
                  placeholder="입력 단어 포함 공고만 검색합니다." 
                  style={{ width: '100%', padding: '12px 16px', border: '1px solid #e8e8e8', borderRadius: '4px', fontSize: '14px' }}
                />
                <div style={{ position: 'absolute', top: '24px', right: 0, fontSize: '12px', color: '#9e9e9e' }}>0/20</div>
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: '13px', color: '#111111' }}>제외</label>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                  <input 
                    type="text" 
                    placeholder="추가 단어 포함 공고를 제외합니다." 
                    style={{ flex: 1, padding: '12px 16px', border: '1px solid #e8e8e8', borderRadius: '4px', fontSize: '14px' }}
                  />
                  <button style={{ padding: '12px 16px', border: '1px solid #ff501b', borderRadius: '4px', backgroundColor: 'white', color: '#ff501b', fontSize: '13px', fontWeight: 500, cursor: 'pointer' }}>추가</button>
                </div>
                <div style={{ position: 'absolute', top: '24px', right: 0, fontSize: '12px', color: '#9e9e9e' }}>0/100</div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* 결과보기 버튼 */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, backgroundColor: 'white', borderTop: '1px solid #e8e8e8', padding: '16px 20px', zIndex: 100 }}>
        <button style={{ width: '100%', padding: '16px', backgroundColor: '#ff501b', color: 'white', border: 'none', borderRadius: '4px', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>
          272,364건의 결과보기
        </button>
      </div>
    </div>
  );
}
