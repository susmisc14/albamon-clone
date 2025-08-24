import React from "react";
import styles from "./Modal.module.css";

type TModalFooterProps = {
  title: string;
  selectedItems: { [key: number]: string | string[] };
  onClose: () => void;
  onConfirm: (selectedItems: string[]) => void;
};

export function ModalFooter({
  title,
  selectedItems,
  onClose,
  onConfirm,
}: TModalFooterProps): React.JSX.Element {
  const handleConfirm = () => {
    if (title === "지역 선택") {
      // 지역 선택 모달: 시·도가 반드시 선택되어 있어야 함
      if (!selectedItems[0]) {
        alert("시·도를 선택해주세요.");
        return;
      }

      // 지역 선택 모달: 선택된 지역들을 배열로 수집
      const selectedAreas: string[] = [];

      // 시도는 카운트하지 않음 (시구군과 동읍면만 카운트)
      // 시구군 선택이 있는 경우
      if (selectedItems[1] && typeof selectedItems[1] === "string") {
        selectedAreas.push(selectedItems[1]);
      }

      // 동읍면 선택이 있는 경우 (향후 확장 시)
      if (selectedItems[2] && typeof selectedItems[2] === "string") {
        selectedAreas.push(selectedItems[2]);
      }

      // 부모 컴포넌트에 선택된 지역들 전달 (시·도가 선택되어 있으면 항상 전달)
      onConfirm(selectedAreas);
    } else {
      // 업직종 선택 모달: 선택된 업직종들을 배열로 수집
      const selectedJobs: string[] = [];

      // 대분류는 카운트하지 않음 (업직종만 카운트)
      const selectedJobsData = selectedItems[1];
      if (Array.isArray(selectedJobsData)) {
        selectedJobs.push(...selectedJobsData);
      }

      // 부모 컴포넌트에 선택된 업직종들 전달
      if (selectedJobs.length > 0) {
        onConfirm(selectedJobs);
      }
    }

    onClose();
  };

  return (
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
        onClick={handleConfirm}
      >
        <span className="button-inner">확인</span>
      </button>
    </footer>
  );
}
