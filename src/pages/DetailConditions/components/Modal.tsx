import React, { useEffect } from "react";
import styles from "./Modal.module.css";
import { MODAL_CONSTANTS } from "./constants";
import { useModalStore } from "./stores/modalStore";
import {
  highlightSearchKeyword,
  validateSelection,
  shouldShowSelectedContent,
  getColumnWidth,
  getEmptyMessage,
} from "./utils/modalHelpers";
import { ModalHeader } from "./ModalHeader";
import { ModalFooter } from "./ModalFooter";
import type { TModalProps, TSelectedItems } from "./types/modal";

export function Modal({
  isOpen,
  onClose,
  title,
  data,
  onAreaSelect,
  onConfirm,
}: TModalProps): React.JSX.Element {
  const {
    selectedColumns,
    setSelectedColumns,
    selectedItems,
    setSelectedItems,
    showSelectedContent,
    setShowSelectedContent,
    excludeBarAlba,
    setExcludeBarAlba,
    searchQuery,
    setSearchQuery,
    searchResults,
    setSearchResults,
    isSearching,
    setIsSearching,
    showTooltip,
    setShowTooltip,
    handleSearch,
    handleSearchCancel,
    handleColumnSelect,
    handleSearchResultToggle,
    resetState,
    resetSearchState,
    resetTooltipState,
  } = useModalStore();

  // 모달이 열릴 때 초기 설정 (이미 선택된 항목이 있으면 기본값 설정하지 않음)
  useEffect(() => {
    if (isOpen) {
      if (title === "지역 선택") {
        // 지역 선택 모달의 경우 "서울"을 기본값으로 설정 (이미 선택된 항목이 없을 때만)
        if (!selectedItems[0]) {
          const seoulIndex = data.columns[0]?.data.findIndex(
            (item) => item === "서울"
          );
          if (seoulIndex !== -1) {
            handleColumnSelect(0, "서울", title, data);
          }
        }
      } else if (title === "업직종 선택") {
        // 업직종 선택 모달의 경우 첫 번째 업직종을 기본값으로 설정 (이미 선택된 항목이 없을 때만)
        if (!selectedItems[0] && data.columns[0]?.data.length > 0) {
          const firstJob = data.columns[0].data[0];
          handleColumnSelect(0, firstJob, title, data);
        }
      }
    }
  }, [isOpen, title, data, handleColumnSelect, selectedItems]);

  // 선택된 항목이 있을 때 selectedContentBlock 표시
  useEffect(() => {
    if (shouldShowSelectedContent(title, selectedItems)) {
      setShowSelectedContent(true);
    } else {
      setShowSelectedContent(false);
    }
  }, [selectedItems, title, setShowSelectedContent]);

  // 모달이 열릴 때 선택된 항목이 있으면 selectedContentBlock 표시
  useEffect(() => {
    if (isOpen && shouldShowSelectedContent(title, selectedItems)) {
      setShowSelectedContent(true);
    }
  }, [isOpen, title, selectedItems, setShowSelectedContent]);

  // 모달 상태 초기화 함수 (선택된 값은 유지)
  const handleModalClose = () => {
    resetState();
    resetSearchState();
    resetTooltipState();
    onClose();
  };

  /**
   * 검색 결과에서 아이템을 선택하는 핸들러
   * 지역 선택 모달과 업직종 선택 모달의 다른 로직을 처리
   */
  const handleSearchResultSelect = (item: string) => {
    if (title === "지역 선택") {
      handleRegionSearchResultSelect(item);
    } else {
      handleJobSearchResultSelect(item);
    }

    // 검색 모드 종료
    handleExitSearchMode();
  };

  /**
   * 지역 선택 모달의 검색 결과 선택 처리
   * 해당 아이템이 어느 컬럼에 속하는지 찾아서 선택
   */
  const handleRegionSearchResultSelect = (item: string) => {
    const columnIndex = handleFindColumnIndexForItem(item);
    if (columnIndex !== -1) {
      // Bar 제외 설정이 활성화된 상태에서 Bar를 선택하려고 할 때
      if (item === "바(bar)" && excludeBarAlba) {
        alert(
          "바(bar) 알바정보를 열람하려면 bar 제외 설정을 해제해야 합니다. 설정 해제는 업직종 선택 화면에서 가능합니다."
        );
        return; // 선택 차단
      }
      handleColumnSelect(columnIndex, item, title, data);
    }
  };

  /**
   * 업직종 선택 모달의 검색 결과 선택 처리
   * 대분류가 선택된 상태에서만 업직종 추가 가능
   */
  const handleJobSearchResultSelect = (item: string) => {
    if (!selectedItems[0]) return; // 대분류가 선택되지 않음

    const currentSelected = selectedItems[1];
    const newSelectedArray = handleCreateNewSelectedArray(
      currentSelected,
      item
    );

    if (newSelectedArray) {
      const newSelectedItems = {
        ...selectedItems,
        [1]: newSelectedArray,
      };
      setSelectedItems(newSelectedItems);
      setShowSelectedContent(true);
    }
  };

  /**
   * 아이템이 속한 컬럼의 인덱스를 찾는 유틸리티 함수
   */
  const handleFindColumnIndexForItem = (item: string): number => {
    let columnIndex = -1;
    data.columns.forEach((column, index) => {
      if (column.data.includes(item)) {
        columnIndex = index;
      }
    });
    return columnIndex;
  };

  /**
   * 새로운 선택 배열을 생성하는 유틸리티 함수
   * bar 알바 제외 설정과 최대 선택 개수 제한을 검증
   */
  const handleCreateNewSelectedArray = (
    currentSelected: string | string[] | undefined,
    item: string
  ): string[] | null => {
    // bar 알바 선택 시 제외 설정 체크
    if (item === "바(bar)" && excludeBarAlba) {
      alert(
        "바(bar) 알바정보를 열람하려면 bar 제외 설정을 해제해야 합니다. 설정 해제는 업직종 선택 화면에서 가능합니다."
      );
      return null;
    }

    if (Array.isArray(currentSelected)) {
      // 최대 선택 개수 제한 체크
      if (currentSelected.length >= MODAL_CONSTANTS.MAX_SELECTION_COUNT) {
        alert(
          `최대 ${MODAL_CONSTANTS.MAX_SELECTION_COUNT}개까지만 선택할 수 있습니다.`
        );
        return null;
      }
      return [...currentSelected, item];
    } else {
      return [item];
    }
  };

  /**
   * 검색 모드를 종료하고 검색 관련 상태를 초기화
   */
  const handleExitSearchMode = () => {
    setIsSearching(false);
    setSearchQuery("");
    setSearchResults([]);
  };

  /**
   * 검색 결과 체크박스 클릭 시 선택/해제를 처리하는 핸들러
   * 지역 선택 모달과 업직종 선택 모달의 다른 로직을 처리
   */
  const handleSearchResultToggleWrapper = (result: {
    text: string;
    fullPath: string;
    columnIndex: number;
    isSelected: boolean;
  }) => {
    // Bar 제외 설정이 활성화된 상태에서 Bar 관련 검색 결과를 선택하려고 할 때
    if (
      excludeBarAlba &&
      (result.text === "바(bar)" || result.text.includes("바(bar)"))
    ) {
      alert(
        "바(bar) 알바정보를 열람하려면 bar 제외 설정을 해제해야 합니다. 설정 해제는 업직종 선택 화면에서 가능합니다."
      );
      return; // 선택 차단
    }

    handleSearchResultToggle(result, title, data);
  };

  /**
   * 컬럼에서 아이템을 선택/해제하는 핸들러
   * 지역 선택 모달과 업직종 선택 모달의 다른 로직을 처리
   */
  const handleColumnSelectWrapper = (columnIndex: number, item: string) => {
    // Bar 제외 설정이 활성화된 상태에서 Bar를 선택하려고 할 때
    if (item === "바(bar)" && excludeBarAlba) {
      alert(
        "바(bar) 알바정보를 열람하려면 bar 제외 설정을 해제해야 합니다. 설정 해제는 업직종 선택 화면에서 가능합니다."
      );
      return; // 선택 차단
    }

    handleColumnSelect(columnIndex, item, title, data);
  };

  /**
   * bar 알바 제외 스위치 토글 핸들러
   * bar 제외 설정이 활성화되면 이미 선택된 bar 업직종을 자동으로 해제
   */
  const handleBarExcludeToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
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
  };

  /**
   * 업직종 컬럼 선택 배열을 생성하는 유틸리티 함수
   * '{대분류} 전체' 옵션과 일반 업직종 선택을 구분하여 처리
   */
  const handleCreateJobTypeColumnArray = (
    currentSelected: string | string[] | undefined,
    item: string
  ): string[] => {
    if (Array.isArray(currentSelected)) {
      return handleJobTypeArraySelection(currentSelected, item);
    } else {
      return handleNewJobTypeSelection(item);
    }
  };

  /**
   * 기존 업직종 배열에서 새로운 선택 처리
   */
  const handleJobTypeArraySelection = (
    currentSelected: string[],
    item: string
  ): string[] => {
    // '{대분류} 전체' 선택 시
    if (item === `${selectedItems[0]} 전체`) {
      return currentSelected.includes(item) ? [] : [item];
    }

    // 일반 업직종 선택 시
    if (currentSelected.includes(item)) {
      return currentSelected.filter((i) => i !== item);
    }

    // '{대분류} 전체'가 선택되어 있으면 해제하고 새 아이템 선택
    if (currentSelected.includes(`${selectedItems[0]} 전체`)) {
      return [item];
    }

    // bar 알바 선택 시 제외 설정 체크
    if (item === "바(bar)" && excludeBarAlba) {
      alert(
        "바(bar) 알바정보를 열람하려면 bar 제외 설정을 해제해야 합니다. 설정 해제는 업직종 선택 화면에서 가능합니다."
      );
      return currentSelected;
    }

    // 최대 선택 개수 제한 체크
    if (currentSelected.length >= MODAL_CONSTANTS.MAX_SELECTION_COUNT) {
      alert(
        `최대 ${MODAL_CONSTANTS.MAX_SELECTION_COUNT}개까지만 선택할 수 있습니다.`
      );
      return currentSelected;
    }

    return [...currentSelected, item];
  };

  /**
   * 새로운 업직종 선택 처리
   */
  const handleNewJobTypeSelection = (item: string): string[] => {
    // bar 알바 선택 시 제외 설정 체크
    if (item === "바(bar)" && excludeBarAlba) {
      alert(
        "바(bar) 알바정보를 열람하려면 bar 제외 설정을 해제해야 합니다. 설정 해제는 업직종 선택 화면에서 가능합니다."
      );
      return [];
    }
    return [item];
  };

  /**
   * 컬럼 아이템의 CSS 클래스명을 결정하는 함수
   */
  const getColumnItemClassName = (
    title: string,
    columnIndex: number,
    item: string,
    selectedItems: TSelectedItems
  ): string => {
    const baseClass = styles.areaButton;

    if (title === "지역 선택") {
      if (selectedItems[columnIndex] === item) {
        return columnIndex === 1
          ? `${baseClass} ${styles.selectedDistrict}` // 시·구·군 선택 시 특별한 스타일
          : `${baseClass} ${styles.selected}`; // 시·도 선택 시 기본 선택 스타일
      }
    } else {
      if (columnIndex === 1) {
        if (
          Array.isArray(selectedItems[columnIndex]) &&
          selectedItems[columnIndex].includes(item)
        ) {
          return `${baseClass} ${styles.selectedJob}`; // 업직종 선택 시 특별한 스타일
        }
      } else if (selectedItems[columnIndex] === item) {
        return `${baseClass} ${styles.selected}`; // 대분류 선택 시 기본 선택 스타일
      }
    }

    return baseClass;
  };

  /**
   * 선택된 컨텐츠의 개수를 계산하는 함수
   */
  const getSelectedContentCount = (
    title: string,
    selectedItems: TSelectedItems
  ): number => {
    if (title === "지역 선택") {
      return 1; // 지역 선택은 항상 1개
    }

    if (Array.isArray(selectedItems[1])) {
      return selectedItems[1].length;
    }

    return 0;
  };

  if (!isOpen) return <></>;

  return (
    <div id="root-modal">
      <div className={styles.container} role="dialog">
        <section className={styles.content}>
          {/* 헤더: 제목 (flex 1) - 닫기 아이콘 (flex auto) */}
          <ModalHeader title={title} onClose={handleModalClose} />

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
                  onChange={(e) => {
                    const query = e.target.value;
                    setSearchQuery(query);
                    if (query.trim()) {
                      handleSearch(query, title, data);
                    } else {
                      handleSearchCancel();
                    }
                  }}
                />
                <i className="Icon_icon__BlZpj icon-special_search_v2"></i>
              </div>
            </div>

            {/* bar 알바 제외 스위치 (업직종 선택 모달일 때만, 검색 모드가 아닐 때만) */}
            {title !== "지역 선택" && !isSearching && !searchQuery.trim() && (
              <div className={styles.barExcludeContainer}>
                <label className={styles.barExcludeSwitch}>
                  <input
                    type="checkbox"
                    className={styles.switchInput}
                    checked={excludeBarAlba}
                    onChange={handleBarExcludeToggle}
                  />
                  <span className={styles.switchSlider}></span>
                  <span className={styles.switchText}>bar 알바 제외</span>
                </label>
              </div>
            )}

            {/* 유사동 묶기 체크박스 (지역 선택일 때만, 검색 모드가 아닐 때만) */}
            {title === "지역 선택" && !isSearching && !searchQuery.trim() && (
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
                    type="button"
                    className={styles.tooltipButton}
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                  >
                    <i className="Icon_icon__BlZpj icon-system_tooltip1"></i>
                  </button>
                  {showTooltip && (
                    <div
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

            {/* 동적 컬럼 렌더링 또는 검색 결과 */}
            {(() => {
              // 검색 중이거나 검색어가 있을 때는 검색 결과를 표시
              if (isSearching || searchQuery.trim()) {
                return (
                  <div className={styles.searchResultsContainer}>
                    <div className={styles.searchResultsContent}>
                      {searchResults.length > 0 ? (
                        searchResults.map((result, index) => (
                          <div key={index} className={styles.searchResultItem}>
                            <div className={styles.searchResultCheckbox}>
                              <input
                                type="checkbox"
                                checked={result.isSelected}
                                onChange={() =>
                                  handleSearchResultToggleWrapper(result)
                                }
                                className={styles.checkbox}
                              />
                            </div>
                            <div
                              className={styles.searchResultText}
                              onClick={() =>
                                handleSearchResultToggleWrapper(result)
                              }
                            >
                              {(() => {
                                const parts = highlightSearchKeyword(
                                  result.text,
                                  searchQuery
                                );
                                return parts.map((part, index) =>
                                  part.toLowerCase() ===
                                  searchQuery.toLowerCase() ? (
                                    <span
                                      key={index}
                                      className={styles.highlight}
                                    >
                                      {part}
                                    </span>
                                  ) : (
                                    part
                                  )
                                );
                              })()}
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
                );
              }

              // 검색 중이 아니고 검색어가 없을 때는 컬럼 컨테이너를 표시
              return (
                <div className={styles.columnContainer}>
                  {data.columns.map((column, columnIndex) => (
                    <div
                      key={columnIndex}
                      className={styles.column}
                      style={{
                        width: getColumnWidth(title, columnIndex),
                        flex: "0 0 auto",
                      }}
                    >
                      <h2 className={styles.columnTitle}>{column.title}</h2>
                      <div className={styles.columnContent}>
                        {title !== "지역 선택" &&
                          columnIndex === 1 &&
                          selectedItems[0] && (
                            // 업직종 컬럼에 '(업직종) 전체' 옵션 추가
                            <button
                              className={`${styles.areaButton} ${
                                Array.isArray(selectedItems[columnIndex]) &&
                                selectedItems[columnIndex].length === 1 &&
                                selectedItems[columnIndex][0] ===
                                  `${selectedItems[0]} 전체`
                                  ? styles.selectedJob
                                  : ""
                              }`}
                              onClick={() => {
                                // Bar 제외 설정이 활성화된 상태에서 Bar가 포함된 전체 옵션을 선택하려고 할 때
                                if (
                                  excludeBarAlba &&
                                  selectedItems[0] === "바(bar)"
                                ) {
                                  alert(
                                    "바(bar) 알바정보를 열람하려면 bar 제외 설정을 해제해야 합니다. 설정 해제는 업직종 선택 화면에서 가능합니다."
                                  );
                                  return; // 선택 차단
                                }

                                handleColumnSelectWrapper(
                                  columnIndex,
                                  `${selectedItems[0]} 전체`
                                );
                              }}
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

                        {columnIndex === 1 &&
                          title === "지역 선택" &&
                          selectedItems[0] && (
                            // 시·구·군 컬럼에 '(시·도) 전체' 옵션 추가 (지역 선택일 때만)
                            <button
                              className={`${styles.areaButton} ${
                                selectedItems[columnIndex] ===
                                `${selectedItems[0]} 전체`
                                  ? styles.selectedDistrict
                                  : ""
                              }`}
                              onClick={() =>
                                handleColumnSelectWrapper(
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
                              className={getColumnItemClassName(
                                title,
                                columnIndex,
                                item,
                                selectedItems
                              )}
                              onClick={() =>
                                handleColumnSelectWrapper(columnIndex, item)
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
                            {getEmptyMessage(title, columnIndex)}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              );
            })()}

            {/* 선택된 내용 표시 (바디와 푸터 사이 chip 블록) */}
            {showSelectedContent &&
              shouldShowSelectedContent(title, selectedItems) && (
                <div className={styles.selectedContentBlock}>
                  <div className={styles.selectedContentHeader}>
                    <span className={styles.selectedContentCount}>
                      <span className={styles.current}>
                        {getSelectedContentCount(title, selectedItems)}
                      </span>
                      /{MODAL_CONSTANTS.MAX_SELECTION_COUNT}
                    </span>
                  </div>
                  <div className={styles.selectedContentBody}>
                    {title === "지역 선택" ? (
                      // 지역 선택 모달: (시·도 값) 전체 chip
                      <div
                        className={`${styles.selectedAreaChip} ${styles.clickableChip}`}
                        onClick={() => {
                          // chip 클릭 시 선택 해제
                          const newSelectedItems = { ...selectedItems };
                          delete newSelectedItems[1];
                          setSelectedItems(newSelectedItems);
                          setShowSelectedContent(false);
                        }}
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
                      <div className={styles.jobChipsContainer}>
                        {Array.isArray(selectedItems[1]) &&
                          selectedItems[1].map((job, index) => (
                            <div
                              key={index}
                              className={`${styles.selectedJobChip} ${styles.clickableChip}`}
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
          <ModalFooter
            title={title}
            selectedItems={selectedItems}
            onClose={handleModalClose}
            onConfirm={onConfirm || (() => {})}
          />
        </section>
      </div>
    </div>
  );
}
