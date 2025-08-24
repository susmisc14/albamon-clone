import { MODAL_CONSTANTS } from "../constants";

/**
 * 툴팁 위치를 계산하는 유틸리티 함수
 * @param buttonRect - 툴팁 버튼의 DOMRect
 * @param tooltipRect - 툴팁 요소의 DOMRect
 * @param viewportWidth - 뷰포트 너비
 * @param viewportHeight - 뷰포트 높이
 * @returns 툴팁의 위치와 크기 정보
 */
export function calculateTooltipPosition(
  buttonRect: DOMRect,
  tooltipRect: DOMRect,
  viewportWidth: number,
  viewportHeight: number
): { x: number; y: number; width: string; height: string } {
  const { VIEWPORT_MARGIN, TOOLTIP_OFFSET } = MODAL_CONSTANTS;

  // 기본 위치: 버튼 우측 하단
  let x = buttonRect.right + TOOLTIP_OFFSET;
  let y = buttonRect.bottom + TOOLTIP_OFFSET;

  // 기본 크기: 뷰포트 - 40px (좌우 20px씩)
  let width = `calc(100vw - ${VIEWPORT_MARGIN * 2}px)`;
  let height = `calc(100vh - ${VIEWPORT_MARGIN * 2}px)`;

  // 우측 경계 체크
  if (x + tooltipRect.width > viewportWidth - VIEWPORT_MARGIN) {
    // 좌측으로 렌더링
    x = buttonRect.left - tooltipRect.width - TOOLTIP_OFFSET;
    if (x < VIEWPORT_MARGIN) {
      x = VIEWPORT_MARGIN;
    }
  }

  // 하단 경계 체크
  if (y + tooltipRect.height > viewportHeight - VIEWPORT_MARGIN) {
    // 상단으로 렌더링
    y = buttonRect.top - tooltipRect.height - TOOLTIP_OFFSET;
    if (y < VIEWPORT_MARGIN) {
      y = VIEWPORT_MARGIN;
    }
  }

  // 좌측 경계 체크
  if (x < VIEWPORT_MARGIN) {
    x = VIEWPORT_MARGIN;
  }

  // 상단 경계 체크
  if (y < VIEWPORT_MARGIN) {
    y = VIEWPORT_MARGIN;
  }

  return { x, y, width, height };
}

/**
 * 툴팁이 뷰포트 내에 완전히 들어가는지 확인하는 함수
 * @param x - 툴팁의 x 좌표
 * @param y - 툴팁의 y 좌표
 * @param width - 툴팁의 너비
 * @param height - 툴팁의 높이
 * @param viewportWidth - 뷰포트 너비
 * @param viewportHeight - 뷰포트 높이
 * @returns 뷰포트 내에 완전히 들어가는지 여부
 */
export function isTooltipInViewport(
  x: number,
  y: number,
  width: number,
  height: number,
  viewportWidth: number,
  viewportHeight: number
): boolean {
  const { VIEWPORT_MARGIN } = MODAL_CONSTANTS;

  return (
    x >= VIEWPORT_MARGIN &&
    y >= VIEWPORT_MARGIN &&
    x + width <= viewportWidth - VIEWPORT_MARGIN &&
    y + height <= viewportHeight - VIEWPORT_MARGIN
  );
}
