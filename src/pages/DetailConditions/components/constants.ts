export const MODAL_CONSTANTS = {
  // 선택 제한
  MAX_SELECTION_COUNT: 10,

  // 뷰포트 여백
  VIEWPORT_MARGIN: 20,
  TOOLTIP_OFFSET: 60,

  // 컬럼 너비
  COLUMN_WIDTHS: {
    REGION: {
      PROVINCE: "20%",
      DISTRICT: "40%",
    },
    JOB: {
      CATEGORY: "50%",
      JOB_TYPE: "50%",
    },
  },

  // 체크박스 크기
  CHECKBOX_SIZE: 20,

  // 툴팁 크기
  TOOLTIP_BUTTON_SIZE: 20,

  // 검색 결과 체크박스 마진
  SEARCH_RESULT_CHECKBOX_MARGIN: 12,

  // 선택된 컨텐츠 패딩
  SELECTED_CONTENT_PADDING: 20,
  SELECTED_CONTENT_HEADER_PADDING: 12,

  // 칩 간격
  CHIP_GAP: 8,
  CHIP_PADDING: "8px 12px",

  // 스위치 크기
  SWITCH_WIDTH: 44,
  SWITCH_HEIGHT: 24,
  SWITCH_SLIDER_SIZE: 20,
  SWITCH_SLIDER_OFFSET: 2,
  SWITCH_SLIDER_TRANSLATE: 20,

  // 검색 결과 패딩
  SEARCH_RESULTS_PADDING: 20,
  SEARCH_RESULTS_HEADER_PADDING: "20px 20px 16px 20px",
  SEARCH_RESULTS_ITEM_PADDING: 16,

  // 빈 결과 메시지 패딩
  NO_SEARCH_RESULTS_PADDING: 40,

  // 폰트 크기
  FONT_SIZES: {
    SMALL: 12,
    MEDIUM: 14,
    LARGE: 16,
  },

  // 색상
  COLORS: {
    PRIMARY: "rgb(255, 80, 27)",
    PRIMARY_LIGHT: "rgb(255, 240, 235)",
    TEXT_PRIMARY: "rgb(23, 23, 23)",
    TEXT_SECONDARY: "rgb(106, 106, 106)",
    TEXT_DISABLED: "rgb(153, 153, 153)",
    BORDER: "rgb(230, 230, 230)",
    BORDER_LIGHT: "rgb(232, 232, 232)",
    BACKGROUND: "white",
    BACKGROUND_HOVER: "rgb(248, 248, 248)",
    BACKGROUND_LIGHT: "rgb(240, 240, 240)",
  },
} as const;
