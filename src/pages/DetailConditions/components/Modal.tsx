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
  const [selectedColumns, setSelectedColumns] = useState<number[]>([]); // 기본 선택 없음
  const [selectedItems, setSelectedItems] = useState<{
    [key: number]: string | string[];
  }>({}); // 각 컬럼별 선택된 아이템 (업직종은 배열로 관리)
  const [showSelectedContent, setShowSelectedContent] = useState(false); // 선택된 내용 표시 여부
  const [excludeBarAlba, setExcludeBarAlba] = useState(false); // bar 알바 제외 스위치 상태
  const [searchQuery, setSearchQuery] = useState(""); // 검색어 상태
  const [searchResults, setSearchResults] = useState<
    Array<{
      text: string;
      fullPath: string;
      columnIndex: number;
      isSelected: boolean;
    }>
  >([]); // 검색 결과 (계층 구조 지원)
  const [isSearching, setIsSearching] = useState(false); // 검색 모드 상태
  const tooltipRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // 업직종 모달일 때 첫 번째 대분류 자동 선택
  useEffect(() => {
    if (
      title !== "지역 선택" &&
      data.columns &&
      data.columns[0]?.data &&
      data.columns[0].data.length > 0
    ) {
      const firstCategory = data.columns[0].data[0];
      setSelectedItems((prev) => ({ ...prev, [0]: firstCategory }));
      setSelectedColumns((prev) => [...prev, 0]);
    }
  }, [title, data.columns]);

  // 컬럼 데이터가 변경될 때 selectedItems 초기화 (지역 선택 모달일 때만)
  useEffect(() => {
    if (title === "지역 선택") {
      const currentSelectedArea = selectedItems[0];
      const availableAreas = data.columns[0]?.data || [];

      if (
        typeof currentSelectedArea === "string" &&
        availableAreas.includes(currentSelectedArea)
      ) {
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
    } else {
      // 업직종 선택 모달: 대분류 자동 선택
      const availableCategories = data.columns[0]?.data || [];
      if (availableCategories.length > 0) {
        const firstCategory = availableCategories[0];
        setSelectedItems({ 0: firstCategory });
        setSelectedColumns([0]);
      }
    }
  }, [data.columns, title]); // title 의존성 추가

  // 검색 함수
  const handleSearch = (query: string) => {
    setSearchQuery(query);

    if (!query.trim()) {
      setIsSearching(false);
      setSearchResults([]);
      return;
    }

    setIsSearching(true);

    // 계층 구조를 반영한 검색 결과 생성
    const hierarchicalResults: Array<{
      text: string;
      fullPath: string;
      columnIndex: number;
      isSelected: boolean;
    }> = [];

    if (title === "지역 선택") {
      // 지역 선택 모달: 계층 구조 검색
      data.columns.forEach((column, columnIndex) => {
        column.data.forEach((item) => {
          if (item.toLowerCase().includes(query.toLowerCase())) {
            let fullPath = item;
            let isSelected = false;

            if (columnIndex === 0) {
              // 시도 선택 시: "서울" -> "서울", "서울 전체", "서울 강남구", "서울 노원구" 등
              fullPath = item;
              isSelected = selectedItems[0] === item;

              // "전체" 옵션 추가
              hierarchicalResults.push({
                text: `${item} 전체`,
                fullPath: `${item} 전체`,
                columnIndex: 1,
                isSelected: selectedItems[1] === `${item} 전체`,
              });

              // 해당 시도의 구들 추가
              if (columnIndex === 0 && data.columns[1]) {
                data.columns[1].data.forEach((district) => {
                  hierarchicalResults.push({
                    text: `${item} ${district}`,
                    fullPath: district,
                    columnIndex: 1,
                    isSelected: selectedItems[1] === district,
                  });
                });
              }
            } else if (columnIndex === 1) {
              // 구 선택 시: "강남구" -> "서울 강남구"
              const parentArea = selectedItems[0];
              if (parentArea) {
                fullPath = `${parentArea} ${item}`;
                isSelected = selectedItems[1] === item;
              }
            }

            hierarchicalResults.push({
              text: fullPath,
              fullPath: item,
              columnIndex,
              isSelected,
            });
          }
        });
      });
    } else {
      // 업직종 선택 모달: 단순 검색
      data.columns.forEach((column, columnIndex) => {
        column.data.forEach((item) => {
          if (item.toLowerCase().includes(query.toLowerCase())) {
            let isSelected = false;

            if (columnIndex === 0) {
              isSelected = selectedItems[0] === item;
            } else if (columnIndex === 1) {
              isSelected =
                Array.isArray(selectedItems[1]) &&
                selectedItems[1].includes(item);
            }

            hierarchicalResults.push({
              text: item,
              fullPath: item,
              columnIndex,
              isSelected,
            });
          }
        });
      });
    }

    setSearchResults(hierarchicalResults);
  };

  // 검색 결과에서 아이템 선택
  const handleSearchResultSelect = (item: string) => {
    if (title === "지역 선택") {
      // 지역 선택 모달: 해당 아이템이 어느 컬럼에 속하는지 찾기
      let columnIndex = -1;
      data.columns.forEach((column, index) => {
        if (column.data.includes(item)) {
          columnIndex = index;
        }
      });

      if (columnIndex !== -1) {
        handleColumnSelect(columnIndex, item);
      }
    } else {
      // 업직종 선택 모달: 업직종 컬럼에 추가
      if (selectedItems[0]) {
        // 대분류가 선택되어 있어야 함
        const currentSelected = selectedItems[1];
        let newSelectedArray: string[];

        if (Array.isArray(currentSelected)) {
          // bar 알바 선택 시 제외 설정 체크
          if (item === "바(bar)" && excludeBarAlba) {
            alert(
              "바(bar) 알바정보를 열람하려면 bar 제외 설정을 해제해야 합니다. 설정 해제는 업직종 선택 화면에서 가능합니다."
            );
            return;
          }

          // 10개 제한 체크
          if (currentSelected.length >= 10) {
            alert("최대 10개까지만 선택할 수 있습니다.");
            return;
          }

          newSelectedArray = [...currentSelected, item];
        } else {
          newSelectedArray = [item];
        }

        const newSelectedItems = {
          ...selectedItems,
          [1]: newSelectedArray,
        };
        setSelectedItems(newSelectedItems);
        setShowSelectedContent(true);
      }
    }

    // 검색 모드 종료
    setIsSearching(false);
    setSearchQuery("");
    setSearchResults([]);
  };

  // 검색 결과 체크박스 클릭 (선택/해제)
  const handleSearchResultToggle = (result: {
    text: string;
    fullPath: string;
    columnIndex: number;
    isSelected: boolean;
  }) => {
    if (title === "지역 선택") {
      // 지역 선택 모달: 단일 선택
      if (result.isSelected) {
        // 선택 해제
        const newSelectedItems = { ...selectedItems };
        delete newSelectedItems[result.columnIndex];
        setSelectedItems(newSelectedItems);

        // 해당 컬럼이 더 이상 선택되지 않으면 selectedColumns에서도 제거
        if (Object.keys(newSelectedItems).length === 0) {
          setSelectedColumns([]);
        }
      } else {
        // 선택
        const newSelectedItems = {
          ...selectedItems,
          [result.columnIndex]: result.fullPath,
        };
        setSelectedItems(newSelectedItems);

        // 해당 컬럼을 selectedColumns에 추가
        if (!selectedColumns.includes(result.columnIndex)) {
          setSelectedColumns([...selectedColumns, result.columnIndex]);
        }
      }
    } else {
      // 업직종 선택 모달: 다중 선택
      if (result.columnIndex === 0) {
        // 대분류: 단일 선택
        const newSelectedItems = {
          ...selectedItems,
          [result.columnIndex]: result.fullPath,
        };
        setSelectedItems(newSelectedItems);

        if (!selectedColumns.includes(result.columnIndex)) {
          setSelectedColumns([...selectedColumns, result.columnIndex]);
        }
      } else if (result.columnIndex === 1) {
        // 업직종: 다중 선택
        if (!selectedItems[0]) return; // 대분류가 선택되지 않았으면 선택 불가

        const currentSelected = selectedItems[1];
        let newSelectedArray: string[];

        if (Array.isArray(currentSelected)) {
          if (currentSelected.includes(result.fullPath)) {
            // 이미 선택된 경우 선택 해제
            newSelectedArray = currentSelected.filter(
              (i) => i !== result.fullPath
            );
          } else {
            // bar 알바 선택 시 제외 설정 체크
            if (result.fullPath === "바(bar)" && excludeBarAlba) {
              alert(
                "바(bar) 알바정보를 열람하려면 bar 제외 설정을 해제해야 합니다. 설정 해제는 업직종 선택 화면에서 가능합니다."
              );
              return; // 선택하지 않음
            }

            // 10개 제한 체크
            if (currentSelected.length >= 10) {
              alert("최대 10개까지만 선택할 수 있습니다.");
              return;
            }

            newSelectedArray = [...currentSelected, result.fullPath];
          }
        } else {
          // bar 알바 선택 시 제외 설정 체크
          if (result.fullPath === "바(bar)" && excludeBarAlba) {
            alert(
              "바(bar) 알바정보를 열람하려면 bar 제외 설정을 해제해야 합니다. 설정 해제는 업직종 선택 화면에서 가능합니다."
            );
            return; // 선택하지 않음
          }

          newSelectedArray = [result.fullPath];
        }

        const newSelectedItems = {
          ...selectedItems,
          [1]: newSelectedArray,
        };
        setSelectedItems(newSelectedItems);

        if (newSelectedArray.length > 0) {
          setShowSelectedContent(true);
        } else {
          setShowSelectedContent(false);
        }
      }
    }

    // 검색 결과의 선택 상태 업데이트
    setSearchResults((prev) =>
      prev.map((item) =>
        item.text === result.text
          ? { ...item, isSelected: !item.isSelected }
          : item
      )
    );
  };

  // 검색 모드 종료
  const handleSearchCancel = () => {
    setIsSearching(false);
    setSearchQuery("");
    setSearchResults([]);
  };

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
    if (title === "지역 선택") {
      // 지역 선택 모달: 기존 로직 유지
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
        if (
          columnIndex === 1 &&
          typeof item === "string" &&
          item.includes("전체")
        ) {
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
      }
    } else {
      // 업직종 선택 모달: 다중 선택 로직
      if (columnIndex === 0) {
        // 대분류: 단일 선택
        const newSelectedItems = { ...selectedItems, [columnIndex]: item };
        setSelectedItems(newSelectedItems);

        if (!selectedColumns.includes(columnIndex)) {
          setSelectedColumns([...selectedColumns, columnIndex]);
        }
      } else if (columnIndex === 1) {
        // 업직종: 다중 선택
        const currentSelected = selectedItems[columnIndex];
        let newSelectedArray: string[];

        // 대분류가 선택되지 않았으면 선택 불가
        if (!selectedItems[0]) {
          return;
        }

        if (Array.isArray(currentSelected)) {
          // '{대분류} 전체' 선택 시
          if (item === `${selectedItems[0]} 전체`) {
            if (currentSelected.includes(item)) {
              // 이미 선택된 경우 선택 해제
              newSelectedArray = [];
            } else {
              // '{대분류} 전체' 선택 시 기존 모든 선택 해제
              newSelectedArray = [item];
            }
          } else {
            // 일반 업직종 선택 시
            if (currentSelected.includes(item)) {
              // 이미 선택된 아이템이면 선택 해제
              newSelectedArray = currentSelected.filter((i) => i !== item);
            } else {
              // '{대분류} 전체'가 선택되어 있으면 해제하고 새 아이템 선택
              if (currentSelected.includes(`${selectedItems[0]} 전체`)) {
                newSelectedArray = [item];
              } else {
                // bar 알바 선택 시 제외 설정 체크
                if (item === "바(bar)" && excludeBarAlba) {
                  alert(
                    "바(bar) 알바정보를 열람하려면 bar 제외 설정을 해제해야 합니다. 설정 해제는 업직종 선택 화면에서 가능합니다."
                  );
                  return; // 선택하지 않음
                }

                // 10개 제한 체크
                if (currentSelected.length >= 10) {
                  alert("최대 10개까지만 선택할 수 있습니다.");
                  return; // 선택하지 않음
                }
                newSelectedArray = [...currentSelected, item];
              }
            }
          }
        } else {
          // 배열이 없으면 새로 생성
          // bar 알바 선택 시 제외 설정 체크
          if (item === "바(bar)" && excludeBarAlba) {
            alert(
              "바(bar) 알바정보를 열람하려면 bar 제외 설정을 해제해야 합니다. 설정 해제는 업직종 선택 화면에서 가능합니다."
            );
            return; // 선택하지 않음
          }
          newSelectedArray = [item];
        }

        const newSelectedItems = {
          ...selectedItems,
          [columnIndex]: newSelectedArray,
        };
        setSelectedItems(newSelectedItems);

        if (newSelectedArray.length > 0) {
          setShowSelectedContent(true);
        } else {
          setShowSelectedContent(false);
        }
      }
    }
  };

  // 검색어 하이라이트 함수
  const highlightSearchKeyword = (text: string, keyword: string) => {
    if (!keyword) return text;

    const parts = text.split(new RegExp(`(${keyword})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === keyword.toLowerCase() ? (
        <span key={index} className={styles.highlight}>
          {part}
        </span>
      ) : (
        part
      )
    );
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
                <input
                  type="text"
                  placeholder={
                    title === "지역 선택"
                      ? "지역명을 검색하세요."
                      : "업직종을 검색하세요."
                  }
                  className={styles.searchField}
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                />
                <i className="Icon_icon__BlZpj icon-special_search_v2"></i>
              </div>
            </div>

            {/* bar 알바 제외 스위치 (업직종 선택 모달일 때만, 검색 모드가 아닐 때만) */}
            {title !== "지역 선택" && !isSearching && (
              <div className={styles.barExcludeContainer}>
                <label className={styles.barExcludeSwitch}>
                  <input
                    type="checkbox"
                    className={styles.switchInput}
                    checked={excludeBarAlba}
                    onChange={(e) => {
                      const newExcludeBarAlba = e.target.checked;
                      setExcludeBarAlba(newExcludeBarAlba);

                      // bar 제외 설정이 활성화되면 이미 선택된 bar 업직종 해제
                      if (newExcludeBarAlba && selectedItems[1]) {
                        const currentSelected = selectedItems[1];
                        if (
                          Array.isArray(currentSelected) &&
                          currentSelected.includes("바(bar)")
                        ) {
                          const newSelectedArray = currentSelected.filter(
                            (item) => item !== "바(bar)"
                          );
                          const newSelectedItems = {
                            ...selectedItems,
                            [1]: newSelectedArray,
                          };
                          setSelectedItems(newSelectedItems);

                          // bar 업직종이 해제되면 선택된 내용 표시 여부 업데이트
                          if (newSelectedArray.length === 0) {
                            setShowSelectedContent(false);
                          }
                        }
                      }
                    }}
                  />
                  <span className={styles.switchSlider}></span>
                  <span className={styles.switchText}>bar 알바 제외</span>
                </label>
              </div>
            )}

            {/* 유사동 묶기 체크박스 (지역 선택일 때만, 검색 모드가 아닐 때만) */}
            {title === "지역 선택" && !isSearching && (
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
            {!isSearching ? (
              <div className={styles.columnContainer}>
                {data.columns.map((column, columnIndex) => (
                  <div
                    key={columnIndex}
                    className={styles.column}
                    style={{
                      width:
                        title === "지역 선택"
                          ? columnIndex === 0
                            ? "20%"
                            : "40%"
                          : "50%", // 업직종 선택 모달은 2개 컬럼을 50%씩
                      flex: "0 0 auto",
                    }}
                  >
                    <h2 className={styles.columnTitle}>{column.title}</h2>
                    <div className={styles.columnContent}>
                      {title !== "지역 선택" && columnIndex === 1 && (
                        // 업직종 컬럼에 '(대분류 값) 전체' 옵션 추가
                        <button
                          className={`${styles.areaButton} ${
                            Array.isArray(selectedItems[columnIndex]) &&
                            selectedItems[columnIndex].length === 1 &&
                            selectedItems[columnIndex][0] ===
                              `${selectedItems[0]} 전체`
                              ? styles.selectedJob
                              : ""
                          }`}
                          onClick={() =>
                            handleColumnSelect(
                              columnIndex,
                              `${selectedItems[0]} 전체`
                            )
                          }
                        >
                          <span>{selectedItems[0]} 전체</span>
                          {Array.isArray(selectedItems[columnIndex]) &&
                            selectedItems[columnIndex].length === 1 &&
                            selectedItems[columnIndex][0] ===
                              `${selectedItems[0]} 전체` && (
                              <i className="Icon_icon__BlZpj icon-line_check"></i>
                            )}
                        </button>
                      )}

                      {columnIndex === 1 && title === "지역 선택" && (
                        // 시·구·군 컬럼에 '(시·도 값) 전체' 옵션 추가 (지역 선택일 때만)
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
                              title === "지역 선택"
                                ? selectedItems[columnIndex] === item
                                  ? columnIndex === 1
                                    ? styles.selectedDistrict // 시·구·군 선택 시 특별한 스타일
                                    : styles.selected // 시·도 선택 시 기본 선택 스타일
                                  : ""
                                : columnIndex === 1
                                ? Array.isArray(selectedItems[columnIndex]) &&
                                  selectedItems[columnIndex].includes(item)
                                  ? styles.selectedJob // 업직종 선택 시 특별한 스타일
                                  : ""
                                : selectedItems[columnIndex] === item
                                ? styles.selected // 대분류 선택 시 기본 선택 스타일
                                : ""
                            }`}
                            onClick={() =>
                              handleColumnSelect(columnIndex, item)
                            }
                          >
                            <span>{item}</span>
                            {title !== "지역 선택" &&
                              columnIndex === 1 &&
                              Array.isArray(selectedItems[columnIndex]) &&
                              selectedItems[columnIndex].includes(item) && (
                                <i className="Icon_icon__BlZpj icon-line_check"></i>
                              )}
                          </button>
                        ))
                      ) : (
                        <p className={styles.emptyMessage}>
                          {title === "지역 선택"
                            ? columnIndex === 0
                              ? "시·도를 선택해주세요"
                              : columnIndex === 1
                              ? "시·군·구를 선택해주세요"
                              : "동·읍·면을 선택해주세요"
                            : columnIndex === 0
                            ? "대분류를 선택해주세요"
                            : "업직종을 선택해주세요"}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // 검색 결과 영역
              <div className={styles.searchResultsContainer}>
                <div className={styles.searchResultsContent}>
                  {searchResults.length > 0 ? (
                    searchResults.map((result, index) => (
                      <div key={index} className={styles.searchResultItem}>
                        <div className={styles.searchResultCheckbox}>
                          <input
                            type="checkbox"
                            checked={result.isSelected}
                            onChange={() => handleSearchResultToggle(result)}
                            className={styles.checkbox}
                          />
                        </div>
                        <div
                          className={styles.searchResultText}
                          onClick={() => handleSearchResultToggle(result)}
                        >
                          {highlightSearchKeyword(result.text, searchQuery)}
                        </div>
                        <i className="Icon_icon__BlZpj icon-line_arrow_right"></i>
                      </div>
                    ))
                  ) : (
                    <div className={styles.noSearchResults}>
                      <p>검색 결과가 없습니다.</p>
                      <p>다른 검색어를 입력해보세요.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 선택된 내용 표시 (바디와 푸터 사이 chip 블록) */}
            {showSelectedContent && (
              <div className={styles.selectedContentBlock}>
                <div className={styles.selectedContentHeader}>
                  <span className={styles.selectedContentCount}>
                    <span className={styles.current}>
                      {title === "지역 선택"
                        ? 1
                        : Array.isArray(selectedItems[1])
                        ? selectedItems[1].length
                        : 0}
                    </span>
                    /10
                  </span>
                </div>
                <div className={styles.selectedContentBody}>
                  {title === "지역 선택" ? (
                    // 지역 선택 모달: (시·도 값) 전체 chip
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
                  ) : (
                    // 업직종 선택 모달: 선택된 업직종 chip들
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "nowrap",
                        gap: "8px",
                        overflow: "hidden",
                        justifyContent: "flex-end",
                      }}
                    >
                      {Array.isArray(selectedItems[1]) &&
                        selectedItems[1].map((job, index) => (
                          <div
                            key={index}
                            className={styles.selectedJobChip}
                            onClick={() => {
                              // chip 클릭 시 해당 업직종만 선택 해제
                              const newSelectedItems = { ...selectedItems };
                              const selectedJobsData = selectedItems[1];
                              if (Array.isArray(selectedJobsData)) {
                                const remainingJobs = selectedJobsData.filter(
                                  (_, i) => i !== index
                                );
                                if (remainingJobs.length > 0) {
                                  newSelectedItems[1] = remainingJobs;
                                } else {
                                  delete newSelectedItems[1];
                                  setShowSelectedContent(false);
                                }
                              }
                              setSelectedItems(newSelectedItems);
                            }}
                            style={{ cursor: "pointer", flexShrink: 0 }}
                          >
                            <span className={styles.selectedJobText}>
                              {job}
                            </span>
                            <span className={styles.selectedJobText}>
                              <i className="Icon_icon__BlZpj icon-line_close"></i>
                            </span>
                          </div>
                        ))}
                    </div>
                  )}
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
                if (title === "지역 선택") {
                  // 지역 선택 모달: 선택된 지역들을 배열로 수집
                  const selectedAreas: string[] = [];

                  // 시도는 카운트하지 않음 (시구군과 동읍면만 카운트)
                  // 시구군 선택이 있는 경우
                  if (
                    selectedItems[1] &&
                    typeof selectedItems[1] === "string"
                  ) {
                    selectedAreas.push(selectedItems[1]);
                  }

                  // 동읍면 선택이 있는 경우 (향후 확장 시)
                  if (
                    selectedItems[2] &&
                    typeof selectedItems[2] === "string"
                  ) {
                    selectedAreas.push(selectedItems[2]);
                  }

                  // 부모 컴포넌트에 선택된 지역들 전달
                  if (onConfirm && selectedAreas.length > 0) {
                    onConfirm(selectedAreas);
                  }
                } else {
                  // 업직종 선택 모달: 선택된 업직종들을 배열로 수집
                  const selectedJobs: string[] = [];

                  // 대분류는 카운트하지 않음 (업직종만 카운트)
                  const selectedJobsData = selectedItems[1];
                  if (Array.isArray(selectedJobsData)) {
                    selectedJobs.push(...selectedJobsData);
                  }

                  // 부모 컴포넌트에 선택된 업직종들 전달
                  if (onConfirm && selectedJobs.length > 0) {
                    onConfirm(selectedJobs);
                  }
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
