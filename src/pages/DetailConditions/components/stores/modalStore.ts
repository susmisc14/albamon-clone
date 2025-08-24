import { create } from "zustand";
import { MODAL_CONSTANTS } from "../constants";
import type { TSelectedItems, TModalData, TSearchResult } from "../types/modal";

// 모달 스토어 상태 인터페이스
interface ModalState {
  // 기본 상태
  selectedColumns: number[];
  selectedItems: TSelectedItems;
  showSelectedContent: boolean;
  excludeBarAlba: boolean;

  // 검색 관련 상태
  searchQuery: string;
  searchResults: TSearchResult[];
  isSearching: boolean;

  // 툴팁 상태
  showTooltip: boolean;

  // 액션들
  setSelectedColumns: (columns: number[]) => void;
  setSelectedItems: (items: TSelectedItems) => void;
  setShowSelectedContent: (show: boolean) => void;
  setExcludeBarAlba: (exclude: boolean) => void;
  setSearchQuery: (query: string) => void;
  setSearchResults: (results: TSearchResult[]) => void;
  setIsSearching: (searching: boolean) => void;
  setShowTooltip: (show: boolean) => void;

  // 복합 액션들
  handleColumnSelect: (
    columnIndex: number,
    item: string,
    title: string,
    data: TModalData
  ) => void;
  handleSearchResultToggle: (
    result: TSearchResult,
    title: string,
    data: TModalData
  ) => void;
  handleSearch: (query: string, title: string, data: TModalData) => void;
  handleSearchCancel: () => void;
  resetState: () => void;
  resetSearchState: () => void;
  resetTooltipState: () => void;
}

// 검색 관련 로직
const handleSearchLogic = (
  query: string,
  title: string,
  data: TModalData,
  selectedItems: TSelectedItems
): TSearchResult[] => {
  if (!query.trim()) return [];

  const results: TSearchResult[] = [];
  const lowerQuery = query.toLowerCase();

  if (title === "지역 선택") {
    // 지역 검색: 계층적 검색 지원
    data.columns.forEach((column, columnIndex) => {
      column.data.forEach((item) => {
        if (item.toLowerCase().includes(lowerQuery)) {
          const isSelected =
            selectedItems[columnIndex] === item ||
            (Array.isArray(selectedItems[columnIndex]) &&
              selectedItems[columnIndex].includes(item));

          // 기본 아이템 추가
          results.push({
            text: item,
            fullPath: item,
            columnIndex,
            isSelected,
          });

          // 시·도를 검색했을 때, 해당 시·도의 모든 하위 지역들도 검색 결과에 추가
          if (columnIndex === 0) {
            // 시·도 검색 시 하위 시·구·군 추가
            if (data.columns[1]) {
              data.columns[1].data.forEach((district) => {
                const fullPath = `${item} ${district}`;
                const isDistrictSelected =
                  selectedItems[1] === district ||
                  (Array.isArray(selectedItems[1]) &&
                    selectedItems[1].includes(district));

                results.push({
                  text: fullPath, // "서울 강남구" 형태로 표시
                  fullPath: fullPath,
                  columnIndex: 1,
                  isSelected: isDistrictSelected,
                });
              });
            }

            // 시·도 검색 시 하위 동·읍·면도 추가 (향후 확장용)
            if (data.columns[2]) {
              data.columns[2].data.forEach((town) => {
                const fullPath = `${item} ${town}`;
                const isTownSelected =
                  selectedItems[2] === town ||
                  (Array.isArray(selectedItems[2]) &&
                    selectedItems[2].includes(town));

                results.push({
                  text: fullPath, // "서울 동이름" 형태로 표시
                  fullPath: fullPath,
                  columnIndex: 2,
                  isSelected: isTownSelected,
                });
              });
            }
          }
        }
      });
    });
  } else {
    // 업직종 검색: 기존 로직 유지
    data.columns.forEach((column, columnIndex) => {
      column.data.forEach((item) => {
        if (item.toLowerCase().includes(lowerQuery)) {
          const isSelected =
            selectedItems[columnIndex] === item ||
            (Array.isArray(selectedItems[columnIndex]) &&
              selectedItems[columnIndex].includes(item));

          results.push({
            text: item,
            fullPath: item,
            columnIndex,
            isSelected,
          });
        }
      });
    });
  }

  return results;
};

// 컬럼 선택 로직
const handleColumnSelectLogic = (
  columnIndex: number,
  item: string,
  title: string,
  selectedItems: TSelectedItems,
  selectedColumns: number[]
): { newSelectedItems: TSelectedItems; newSelectedColumns: number[] } => {
  console.log("handleColumnSelectLogic 시작:", {
    columnIndex,
    item,
    title,
    selectedItems,
    selectedColumns,
  }); // 디버깅용

  const newSelectedItems = { ...selectedItems };
  const newSelectedColumns = [...selectedColumns];

  if (title === "지역 선택") {
    // 지역 선택 로직
    if (columnIndex === 0) {
      // 시·도 선택 (반드시 1개 선택되어야 함)
      newSelectedItems[0] = item;
      if (!newSelectedColumns.includes(0)) {
        newSelectedColumns.push(0);
      }
    } else if (columnIndex === 1) {
      // 시·구·군 선택 (선택/해제 가능)
      const isCurrentlySelected = selectedItems[columnIndex] === item;

      if (isCurrentlySelected) {
        delete newSelectedItems[columnIndex];
        const index = newSelectedColumns.indexOf(columnIndex);
        if (index > -1) {
          newSelectedColumns.splice(index, 1);
        }
      } else {
        newSelectedItems[columnIndex] = item;
        if (!newSelectedColumns.includes(columnIndex)) {
          newSelectedColumns.push(columnIndex);
        }
      }
    } else if (columnIndex === 2) {
      // 동·읍·면 선택 (선택/해제 가능)
      const isCurrentlySelected = selectedItems[columnIndex] === item;

      if (isCurrentlySelected) {
        delete newSelectedItems[columnIndex];
        const index = newSelectedColumns.indexOf(columnIndex);
        if (index > -1) {
          newSelectedColumns.splice(index, 1);
        }
      } else {
        newSelectedItems[columnIndex] = item;
        if (!newSelectedColumns.includes(columnIndex)) {
          newSelectedColumns.push(columnIndex);
        }
      }
    }
  } else {
    // 업직종 선택 로직
    if (columnIndex === 0) {
      // 대분류 선택
      newSelectedItems[0] = item;
      newSelectedItems[1] = [];
      newSelectedItems[2] = [];
      if (!newSelectedColumns.includes(0)) {
        newSelectedColumns.push(0);
      }
      // 다른 컬럼 제거
      newSelectedColumns.splice(1);
    } else if (columnIndex === 1) {
      // 세부 업직종 선택
      if (!selectedItems[0]) return { newSelectedItems, newSelectedColumns };

      const currentSelected = selectedItems[1] || [];
      const newSelectedArray = Array.isArray(currentSelected)
        ? [...currentSelected]
        : [];

      // '업직종 전체' 선택 시 기존 선택된 아이템들 모두 해제
      if (item === `${selectedItems[0]} 전체`) {
        if (newSelectedArray.includes(item)) {
          // 이미 선택된 경우 선택 해제
          newSelectedArray.splice(newSelectedArray.indexOf(item), 1);
        } else {
          // '업직종 전체' 선택 시 기존 모든 선택 해제하고 '전체'만 선택
          newSelectedArray.length = 0;
          newSelectedArray.push(item);
        }
      } else {
        // 개별 업직종 선택 시
        const index = newSelectedArray.indexOf(item);
        if (index > -1) {
          // 이미 선택된 경우 선택 해제
          newSelectedArray.splice(index, 1);
        } else {
          // '업직종 전체'가 선택되어 있으면 해제하고 새 아이템 선택
          const wholeIndex = newSelectedArray.indexOf(
            `${selectedItems[0]} 전체`
          );
          if (wholeIndex > -1) {
            newSelectedArray.splice(wholeIndex, 1);
          }
          newSelectedArray.push(item);
        }
      }

      newSelectedItems[1] = newSelectedArray;
      if (newSelectedArray.length > 0 && !newSelectedColumns.includes(1)) {
        newSelectedColumns.push(1);
      } else if (newSelectedArray.length === 0) {
        const colIndex = newSelectedColumns.indexOf(1);
        if (colIndex > -1) {
          newSelectedColumns.splice(colIndex, 1);
        }
      }
    } else if (columnIndex === 2) {
      // 세부 업직종 선택
      if (!selectedItems[0]) return { newSelectedItems, newSelectedColumns };

      const currentSelected = selectedItems[2] || [];
      const newSelectedArray = Array.isArray(currentSelected)
        ? [...currentSelected]
        : [];

      const index = newSelectedArray.indexOf(item);
      if (index > -1) {
        newSelectedArray.splice(index, 1);
      } else {
        newSelectedArray.push(item);
      }

      newSelectedItems[2] = newSelectedArray;
      if (newSelectedArray.length > 0 && !newSelectedColumns.includes(2)) {
        newSelectedColumns.push(2);
      } else if (newSelectedArray.length === 0) {
        const colIndex = newSelectedColumns.indexOf(2);
        if (colIndex > -1) {
          newSelectedColumns.splice(colIndex, 1);
        }
      }
    }
  }

  console.log("handleColumnSelectLogic 결과:", {
    newSelectedItems,
    newSelectedColumns,
  }); // 디버깅용
  return { newSelectedItems, newSelectedColumns };
};

// 검색 결과 토글 로직
const handleSearchResultToggleLogic = (
  result: TSearchResult,
  title: string,
  selectedItems: TSelectedItems,
  excludeBarAlba: boolean
): { success: boolean; newSelectedItems: TSelectedItems } => {
  const newSelectedItems = { ...selectedItems };

  if (title === "지역 선택") {
    // 지역 검색 결과 토글
    const isCurrentlySelected =
      selectedItems[result.columnIndex] === result.fullPath;

    if (isCurrentlySelected) {
      delete newSelectedItems[result.columnIndex];
    } else {
      newSelectedItems[result.columnIndex] = result.fullPath;
    }

    return { success: true, newSelectedItems };
  } else {
    // 업직종 검색 결과 토글
    if (result.columnIndex === 0) {
      // 대분류 토글
      const isCurrentlySelected = selectedItems[0] === result.fullPath;

      if (isCurrentlySelected) {
        delete newSelectedItems[0];
        delete newSelectedItems[1];
        delete newSelectedItems[2];
      } else {
        newSelectedItems[0] = result.fullPath;
        newSelectedItems[1] = [];
        newSelectedItems[2] = [];
      }

      return { success: true, newSelectedItems };
    } else if (result.columnIndex === 1) {
      // 세부 업직종 토글
      if (!selectedItems[0]) return { success: false, newSelectedItems };

      const currentSelected = selectedItems[1] || [];
      const newSelectedArray = Array.isArray(currentSelected)
        ? [...currentSelected]
        : [];

      const index = newSelectedArray.indexOf(result.fullPath);
      if (index > -1) {
        newSelectedArray.splice(index, 1);
      } else {
        newSelectedArray.push(result.fullPath);
      }

      newSelectedItems[1] = newSelectedArray;
      return { success: true, newSelectedItems };
    } else if (result.columnIndex === 2) {
      // 세부 업직종 토글
      if (!selectedItems[0]) return { success: false, newSelectedItems };

      // bar 알바 제외 설정으로 인해 선택이 차단된 경우
      if (result.fullPath === "바(bar)" && excludeBarAlba) {
        return { success: false, newSelectedItems };
      }

      const currentSelected = selectedItems[2] || [];
      const newSelectedArray = Array.isArray(currentSelected)
        ? [...currentSelected]
        : [];

      const index = newSelectedArray.indexOf(result.fullPath);
      if (index > -1) {
        newSelectedArray.splice(index, 1);
      } else {
        newSelectedArray.push(result.fullPath);
      }

      newSelectedItems[2] = newSelectedArray;
      return { success: true, newSelectedItems };
    }
  }

  return { success: false, newSelectedItems };
};

// Zustand 스토어 생성
export const useModalStore = create<ModalState>((set, get) => ({
  // 초기 상태
  selectedColumns: [],
  selectedItems: {},
  showSelectedContent: false,
  excludeBarAlba: false,
  searchQuery: "",
  searchResults: [],
  isSearching: false,
  showTooltip: false,

  // 기본 액션들
  setSelectedColumns: (columns) => set({ selectedColumns: columns }),
  setSelectedItems: (items) => set({ selectedItems: items }),
  setShowSelectedContent: (show) => set({ showSelectedContent: show }),
  setExcludeBarAlba: (exclude) => set({ excludeBarAlba: exclude }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSearchResults: (results) => set({ searchResults: results }),
  setIsSearching: (searching) => set({ isSearching: searching }),
  setShowTooltip: (show) => set({ showTooltip: show }),

  // 복합 액션들
  handleColumnSelect: (columnIndex, item, title, data) => {
    const { selectedItems, selectedColumns, excludeBarAlba } = get();

    console.log("Zustand handleColumnSelect 호출:", {
      columnIndex,
      item,
      title,
      excludeBarAlba,
    }); // 디버깅용

    // Bar 제외 설정이 활성화된 상태에서 Bar를 선택하려고 할 때
    if (item === "바(bar)" && excludeBarAlba) {
      console.log("Bar 제외로 인한 선택 차단"); // 디버깅용
      // 선택을 차단하고 현재 상태 유지
      return;
    }

    // Bar 제외 설정이 활성화된 상태에서 Bar가 포함된 전체 옵션을 선택하려고 할 때
    if (excludeBarAlba && item.includes("바(bar) 전체")) {
      console.log("Bar 전체 제외로 인한 선택 차단"); // 디버깅용
      // 선택을 차단하고 현재 상태 유지
      return;
    }

    // Bar 제외 설정이 활성화된 상태에서 Bar가 포함된 업직종을 선택하려고 할 때
    if (excludeBarAlba && title !== "지역 선택" && item.includes("바(bar)")) {
      console.log("Bar 포함 업직종 제외로 인한 선택 차단"); // 디버깅용
      // 선택을 차단하고 현재 상태 유지
      return;
    }

    console.log("handleColumnSelectLogic 호출:", { columnIndex, item, title }); // 디버깅용
    const { newSelectedItems, newSelectedColumns } = handleColumnSelectLogic(
      columnIndex,
      item,
      title,
      selectedItems,
      selectedColumns
    );

    console.log("새로운 상태:", { newSelectedItems, newSelectedColumns }); // 디버깅용

    // 상태를 한 번에 업데이트
    set((state) => ({
      ...state,
      selectedItems: newSelectedItems,
      selectedColumns: newSelectedColumns,
      showSelectedContent: Object.keys(newSelectedItems).length > 0,
    }));
  },

  handleSearchResultToggle: (result, title, data) => {
    const { selectedItems, excludeBarAlba } = get();
    const { success, newSelectedItems } = handleSearchResultToggleLogic(
      result,
      title,
      selectedItems,
      excludeBarAlba
    );

    if (success) {
      set({
        selectedItems: newSelectedItems,
        showSelectedContent: Object.keys(newSelectedItems).length > 0,
      });

      // 검색 결과 선택 상태 업데이트
      const updatedResults = get().searchResults.map((r) => ({
        ...r,
        isSelected:
          newSelectedItems[r.columnIndex] === r.fullPath ||
          (Array.isArray(newSelectedItems[r.columnIndex]) &&
            newSelectedItems[r.columnIndex].includes(r.fullPath)),
      }));
      set({ searchResults: updatedResults });
    }
  },

  handleSearch: (query, title, data) => {
    const { selectedItems } = get();

    if (!query.trim()) {
      set({ isSearching: false, searchResults: [] });
      return;
    }

    set({ isSearching: true, searchQuery: query });
    const results = handleSearchLogic(query, title, data, selectedItems);
    set({ searchResults: results, isSearching: false });
  },

  handleSearchCancel: () => {
    set({ searchQuery: "", searchResults: [], isSearching: false });
  },

  // 상태 초기화 함수들 (선택된 항목들은 유지)
  resetState: () => {
    set((state) => ({
      ...state,
      showSelectedContent: false,
      excludeBarAlba: false,
      searchQuery: "",
      searchResults: [],
      isSearching: false,
      showTooltip: false,
      // selectedItems와 selectedColumns는 유지 (사용자 선택 보존)
    }));
  },

  resetSearchState: () => {
    set({
      searchQuery: "",
      searchResults: [],
      isSearching: false,
    });
  },

  resetTooltipState: () => {
    set({ showTooltip: false });
  },
}));
