import { MODAL_CONSTANTS } from "../constants";
import type { TSelectedItems, TValidationResult } from "../types/modal";

// 검색어 하이라이트 함수
export function highlightSearchKeyword(
  text: string,
  keyword: string
): string[] {
  if (!keyword) return [text];

  const parts = text.split(new RegExp(`(${keyword})`, "gi"));
  return parts.map((part) => part);
}

// 선택된 아이템 검증 함수
export function validateSelection(
  item: string,
  excludeBarAlba: boolean,
  currentSelected: string[],
  maxCount: number = MODAL_CONSTANTS.MAX_SELECTION_COUNT
): TValidationResult {
  // bar 알바 선택 시 제외 설정 체크
  if (item === "바(bar)" && excludeBarAlba) {
    alert(
      "바(bar) 알바정보를 열람하려면 bar 제외 설정을 해제해야 합니다. 설정 해제는 업직종 선택 화면에서 가능합니다."
    );
    return {
      isValid: false,
      message: "bar 제외 설정으로 인해 선택할 수 없습니다.",
    };
  }

  // 최대 선택 개수 제한 체크
  if (currentSelected.length >= maxCount) {
    alert(`최대 ${maxCount}개까지만 선택할 수 있습니다.`);
    return {
      isValid: false,
      message: `최대 ${maxCount}개까지만 선택할 수 있습니다.`,
    };
  }

  return { isValid: true, message: "" };
}

// 선택된 컨텐츠 표시 여부 결정 함수
export function shouldShowSelectedContent(
  title: string,
  selectedItems: TSelectedItems
) {
  if (title === "지역 선택") {
    // 지역 선택 모달: 시구군이 선택된 경우 ('전체' 포함)
    return selectedItems[1] && typeof selectedItems[1] === "string";
  } else {
    // 업직종 선택 모달: 업직종이 선택된 경우
    return (
      selectedItems[1] &&
      Array.isArray(selectedItems[1]) &&
      selectedItems[1].length > 0
    );
  }
}

// 컬럼 너비 계산 함수
export function getColumnWidth(title: string, columnIndex: number) {
  if (title === "지역 선택") {
    return columnIndex === 0
      ? MODAL_CONSTANTS.COLUMN_WIDTHS.REGION.PROVINCE
      : MODAL_CONSTANTS.COLUMN_WIDTHS.REGION.DISTRICT;
  } else {
    return MODAL_CONSTANTS.COLUMN_WIDTHS.JOB.CATEGORY;
  }
}

// 빈 메시지 텍스트 생성 함수
export function getEmptyMessage(title: string, columnIndex: number) {
  if (title === "지역 선택") {
    switch (columnIndex) {
      case 0:
        return "시·도를 선택해주세요";
      case 1:
        return "시·군·구를 선택해주세요";
      default:
        return "동·읍·면을 선택해주세요";
    }
  } else {
    switch (columnIndex) {
      case 0:
        return "대분류를 선택해주세요";
      default:
        return "업직종을 선택해주세요";
    }
  }
}
