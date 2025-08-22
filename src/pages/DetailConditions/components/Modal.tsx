import React, { useState, useRef, useEffect } from "react";
import styles from "./Modal.module.css";

type TModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  data: {
    columns: Array<{
      title: string;
      data: string[];
    }>;
  };
  onAreaSelect?: (area: string) => void;
  onConfirm?: (selectedAreas: string[]) => void;
};

export function Modal({
  isOpen,
  onClose,
  title,
  data,
  onAreaSelect,
  onConfirm,
}: TModalProps): React.JSX.Element {
  const [showTooltip, setShowTooltip] = useState(false);
  const [selectedColumns, setSelectedColumns] = useState<number[]>([0]); // 서울이 기본 선택되므로 0번 컬럼 선택
  const [selectedItems, setSelectedItems] = useState<{ [key: number]: string }>(
    { 0: "서울" } // 서울을 기본 선택값으로 설정
  ); // 각 컬럼별 선택된 아이템
  const [showSelectedContent, setShowSelectedContent] = useState(false); // 선택된 내용 표시 여부
  const tooltipRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // data prop이 변경될 때 selectedItems 초기화 (시·도 변경 시 시·구·군 선택 초기화)
  useEffect(() => {
    const currentSelectedArea = selectedItems[0];
    const availableAreas = data.columns[0]?.data || [];

    if (availableAreas.includes(currentSelectedArea)) {
      // 현재 선택된 시도가 여전히 유효하면 유지
      // 아무것도 하지 않음 (상태 변경 없음)
    } else {
      // 현재 선택된 시도가 유효하지 않으면 첫 번째 시도 선택
      const firstArea = availableAreas[0];
      if (firstArea) {
        setSelectedItems({ 0: firstArea });
        setSelectedColumns([0]);
      }
    }
  }, [data.columns]); // selectedItems 의존성 제거

  // 툴팁 위치 계산 함수 (Floating UI 개념 적용)
  const calculateTooltipPosition = () => {
    if (!buttonRef.current || !tooltipRef.current) return;

    const button = buttonRef.current;
    const tooltip = tooltipRef.current;

    // 버튼의 위치 정보 (뷰포트 기준)
    const buttonRect = button.getBoundingClientRect();

    // 툴팁 위치 계산 - 우측 하단에서 시작
    let x, y;

    // 기본 위치: 타겟 우측 하단 (툴팁 좌측 상단 모서리 === 타겟 우측 하단 모서리)
    x = buttonRect.right;
    y = buttonRect.bottom;

    // 위치 적용 (fixed positioning이므로 뷰포트 기준)
    tooltip.style.left = `${x}px`;
    tooltip.style.top = `${y}px`;
  };

  // 툴팁이 표시될 때 위치 계산
  useEffect(() => {
    if (showTooltip) {
      // 최초 렌더링 직후 위치 계산
      calculateTooltipPosition();

      // DOM 업데이트 후 실제 크기로 위치 재조정
      setTimeout(() => {
        if (tooltipRef.current) {
          const tooltipRect = tooltipRef.current.getBoundingClientRect();

          // 실제 크기로 다시 계산
          let currentX = parseInt(tooltipRef.current.style.left);
          let currentY = parseInt(tooltipRef.current.style.top);

          // 툴팁이 여백을 포함한 뷰포트에서 벗어나면 반대 방향으로 크기 조정
          const buttonRect = buttonRef.current?.getBoundingClientRect();
          if (buttonRect) {
            // 우측으로 나가면 좌측으로 확장 (시작점을 우측 끝으로 변경)
            if (currentX + tooltipRect.width > window.innerWidth - 60) {
              const newLeft = window.innerWidth - 60 - tooltipRect.width;
              tooltipRef.current.style.left = `${Math.max(20, newLeft)}px`;
            }

            // 하단으로 나가면 상단으로 확장 (시작점을 하단 끝으로 변경)
            if (currentY + tooltipRect.height > window.innerHeight - 60) {
              const newTop = window.innerHeight - 60 - tooltipRect.height;
              tooltipRef.current.style.top = `${Math.max(20, newTop)}px`;
            }
          }
        }
      }, 0);

      // 윈도우 리사이즈 시 위치 재계산
      const handleResize = () => {
        if (showTooltip) {
          calculateTooltipPosition();
        }
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [showTooltip]);

  // 컬럼 선택 핸들러
  const handleColumnSelect = (columnIndex: number, item: string) => {
    // 현재 컬럼의 선택 상태 토글
    const isCurrentlySelected = selectedItems[columnIndex] === item;

    if (isCurrentlySelected) {
      // 이미 선택된 아이템이면 선택 해제
      const newSelectedItems = { ...selectedItems };
      delete newSelectedItems[columnIndex];
      setSelectedItems(newSelectedItems);

      // 해당 컬럼이 더 이상 선택되지 않으면 selectedColumns에서도 제거
      if (Object.keys(newSelectedItems).length === 0) {
        setSelectedColumns([]);
      }

      // '전체' 옵션이 해제되면 선택된 내용 숨김
      if (columnIndex === 1 && item.includes("전체")) {
        setShowSelectedContent(false);
      }
    } else {
      // 새로운 아이템 선택
      const newSelectedItems = { ...selectedItems, [columnIndex]: item };
      setSelectedItems(newSelectedItems);

      // 해당 컬럼을 selectedColumns에 추가 (중복 방지)
      if (!selectedColumns.includes(columnIndex)) {
        setSelectedColumns([...selectedColumns, columnIndex]);
      }

      // '전체' 옵션이 선택되면 선택된 내용 표시
      if (columnIndex === 1 && item.includes("전체")) {
        setShowSelectedContent(true);
      }
    }

    // 첫 번째 컬럼(시도)에서 선택된 경우에만 onAreaSelect 호출
    if (columnIndex === 0 && onAreaSelect) {
      onAreaSelect(item);
    } else if (columnIndex === 1) {
    }
  };

  if (!isOpen) return <></>;

  return (
    <div id="root-modal">
      <div className={styles.container} role="dialog">
        <section className={styles.content}>
          {/* 헤더: 제목 (flex 1) - 닫기 아이콘 (flex auto) */}
          <header className={styles.header}>
            <h1 className={styles.title}>{title}</h1>
            <button
              type="button"
              className={styles.closeButton}
              onClick={onClose}
            >
              <i className="Icon_icon__BlZpj icon-system_close"></i>
            </button>
          </header>

          {/* 바디: 검색, 체크박스, 3개 컬럼 */}
          <main className={styles.main}>
            {/* 검색 인풋 */}
            <div className={styles.searchContainer}>
              <div className={styles.searchInput}>
                <i className="Icon_icon__BlZpj icon-system_search"></i>
                <input
                  type="text"
                  placeholder={
                    title === "지역 선택"
                      ? "지역명을 검색하세요."
                      : "업직종을 검색하세요."
                  }
                  className={styles.searchField}
                />
              </div>
            </div>

            {/* 유사동 묶기 체크박스 (지역 선택일 때만) */}
            {title === "지역 선택" && (
              <div className={styles.similarAreaContainer}>
                <label className={styles.similarAreaCheckbox}>
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    disabled={
                      !selectedItems[1] ||
                      selectedItems[1] === `${selectedItems[0]} 전체`
                    }
                  />
                  <span className={styles.checkboxText}>유사동 묶기</span>
                  <button
                    ref={buttonRef}
                    type="button"
                    className={styles.tooltipButton}
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                  >
                    <i className="Icon_icon__BlZpj icon-system_tooltip1"></i>
                  </button>
                  {showTooltip && (
                    <div
                      ref={tooltipRef}
                      className={styles.tooltip}
                      role="tooltip"
                      aria-expanded="true"
                    >
                      <div className={styles.tooltipInner}>
                        <div className={styles.tooltipBox}>
                          <div className={styles.tooltipContent}>
                            <p className={styles.tooltipText}>
                              우리동네 유사동을 대표동으로 한 번에 선택할 수
                              있어요.
                            </p>
                            <p className={styles.tooltipExample}>
                              예) 도곡1동, 도곡2동 → 도곡동
                            </p>
                          </div>
                          <button
                            type="button"
                            className={styles.tooltipCloseButton}
                            onClick={() => setShowTooltip(false)}
                          >
                            <i className="Icon_icon__BlZpj icon-system_close"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </label>
              </div>
            )}

            {/* 동적 컬럼 렌더링 */}
            <div className={styles.columnContainer}>
              {data.columns.map((column, columnIndex) => (
                <div
                  key={columnIndex}
                  className={styles.column}
                  style={{
                    width: columnIndex === 0 ? "20%" : "40%",
                    flex: "0 0 auto",
                  }}
                >
                  <h2 className={styles.columnTitle}>{column.title}</h2>
                  <div className={styles.columnContent}>
                    {columnIndex === 1 && (
                      // 시·구·군 컬럼에 '(시·도 값) 전체' 옵션 추가
                      <button
                        className={`${styles.areaButton} ${
                          selectedItems[columnIndex] ===
                          `${selectedItems[0]} 전체`
                            ? styles.selectedDistrict
                            : ""
                        }`}
                        onClick={() =>
                          handleColumnSelect(
                            columnIndex,
                            `${selectedItems[0]} 전체`
                          )
                        }
                      >
                        {selectedItems[0]} 전체
                      </button>
                    )}

                    {column.data.length > 0 ? (
                      column.data.map((item, itemIndex) => (
                        <button
                          key={itemIndex}
                          className={`${styles.areaButton} ${
                            selectedItems[columnIndex] === item
                              ? columnIndex === 1
                                ? styles.selectedDistrict // 시·구·군 선택 시 특별한 스타일
                                : styles.selected // 시·도 선택 시 기본 선택 스타일
                              : ""
                          }`}
                          onClick={() => handleColumnSelect(columnIndex, item)}
                        >
                          {item}
                        </button>
                      ))
                    ) : (
                      <p className={styles.emptyMessage}>
                        {columnIndex === 0
                          ? "시·도를 선택해주세요"
                          : columnIndex === 1
                          ? "시·군·구를 선택해주세요"
                          : "동·읍·면을 선택해주세요"}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* 선택된 내용 표시 (바디와 푸터 사이 chip 블록) */}
            {showSelectedContent && (
              <div className={styles.selectedContentBlock}>
                <div className={styles.selectedContentHeader}>
                  <span className={styles.selectedContentCount}>
                    <span className={styles.current}>1</span>/10
                  </span>
                </div>
                <div className={styles.selectedContentBody}>
                  <div
                    className={styles.selectedAreaChip}
                    onClick={() => {
                      // chip 클릭 시 선택 해제
                      const newSelectedItems = { ...selectedItems };
                      delete newSelectedItems[1];
                      setSelectedItems(newSelectedItems);
                      setShowSelectedContent(false);
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <span className={styles.selectedAreaText}>
                      {selectedItems[0]} 전체
                    </span>
                    <span className={styles.selectedAreaText}>
                      <i className="Icon_icon__BlZpj icon-line_close"></i>
                    </span>
                  </div>
                </div>
              </div>
            )}
          </main>

          {/* 푸터: 취소 버튼 (flex 1) / 확인 버튼 (flex 1) */}
          <footer className={styles.footer}>
            <button
              type="button"
              className={`${styles.footerButton} ${styles.secondaryButton}`}
              onClick={onClose}
            >
              <span className="button-inner">취소</span>
            </button>
            <button
              type="button"
              className={`${styles.footerButton} ${styles.primaryButton}`}
              onClick={() => {
                // 선택된 지역들을 배열로 수집
                const selectedAreas: string[] = [];

                // 시도는 카운트하지 않음 (시구군과 동읍면만 카운트)
                // 시구군 선택이 있는 경우
                if (selectedItems[1]) {
                  selectedAreas.push(selectedItems[1]);
                }

                // 동읍면 선택이 있는 경우 (향후 확장 시)
                if (selectedItems[2]) {
                  selectedAreas.push(selectedItems[2]);
                }

                // 부모 컴포넌트에 선택된 지역들 전달
                if (onConfirm && selectedAreas.length > 0) {
                  onConfirm(selectedAreas);
                }

                onClose();
              }}
            >
              <span className="button-inner">확인</span>
            </button>
          </footer>
        </section>
      </div>
    </div>
  );
}
