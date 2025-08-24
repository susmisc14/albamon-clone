import React from "react";
import { Section } from "../components/Section";
import { Modal } from "../components/Modal";
import { Chips } from "../components/Chips";
import { useModalStore } from "../components/stores/modalStore";
import jobData from "../../../../data/job.json";
import styles from "./JobTypeSection.module.css";

type TProps = { onCountChange?: (count: number) => void };

export function JobTypeSection({ onCountChange }: TProps): React.JSX.Element {
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const [selected, setSelected] = React.useState<Set<string>>(new Set());
  const [selectedCategory, setSelectedCategory] =
    React.useState<string>("외식·음료");

  // 모달 스토어에서 상태 가져오기
  const { setSelectedItems } = useModalStore();

  // jobData를 기반으로 업직종 옵션 동적 생성
  const jobTypeOptions = React.useMemo(() => {
    // jobData.name에서 카테고리명 추출
    const currentCategories = [jobData.name];

    // 현재 jobData에 있는 카테고리만 반환 (향후 확장 시 job.json에 추가)
    return currentCategories;
  }, [jobData]);

  // 선택된 카테고리에 따른 세부 업종 데이터 매핑
  const getJobsByCategory = (category: string) => {
    if (category === "외식·음료") {
      return jobData.collection; // 외식·음료 세부 업종 데이터
    }
    // 다른 카테고리는 빈 배열 반환 (향후 확장 가능)
    return [];
  };

  // 현재 선택된 카테고리의 세부 업종 데이터
  const currentJobs = getJobsByCategory(selectedCategory);

  // 모달용 컬럼 데이터 구성 (2개 컬럼)
  const modalColumns = [
    {
      title: "대분류",
      data: [jobData.name],
    },
    {
      title: "업직종",
      data: jobData.collection,
    },
  ];

  // 카테고리 선택 핸들러
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  // Modal 확인 시 선택된 업직종으로 교체하는 핸들러
  const handleModalConfirm = (selectedJobs: string[]) => {
    // 선택된 업직종들로 selected Set을 교체 (기존 선택 항목들 모두 제거 후 새로 설정)
    setSelected(new Set(selectedJobs));
  };

  function handleAddButtonClick(): void {
    setIsModalOpen(true);
  }

  function handleModalClose(): void {
    setIsModalOpen(false);
  }

  function handleToggle(label: string): void {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });
  }

  React.useEffect(() => {
    if (onCountChange) onCountChange(selected.size);
  }, [selected, onCountChange]);

  return (
    <>
      <Section title="업직종" countCurrent={selected.size} countTotal={10}>
        {selected.size > 0 && (
          <div className={styles.selectedList}>
            {Array.from(selected).map((job) => (
              <div
                key={job}
                className={styles.selectedJobChip}
                onClick={() => {
                  // chip 클릭 시 선택 해제 (섹션과 모달 상태 동시 업데이트)
                  setSelected((prev) => {
                    const next = new Set(prev);
                    next.delete(job);

                    // 모달 스토어 상태도 함께 업데이트
                    // 선택된 업직종 목록에서 해당 업직종 제거
                    const remainingJobs = Array.from(next);

                    if (remainingJobs.length > 0) {
                      // 남은 업직종이 있으면 업데이트
                      setSelectedItems({
                        0: jobData.name, // 대분류는 유지
                        1: remainingJobs, // 남은 업직종들
                      });
                    } else {
                      // 모든 업직종이 제거되면 대분류만 유지
                      setSelectedItems({
                        0: jobData.name,
                        // 1번 인덱스는 삭제하여 선택 해제 상태로 만듦
                      });
                    }

                    return next;
                  });
                }}
                style={{ cursor: "pointer" }}
              >
                <span className={styles.selectedJobText}>{job}</span>
                <span className={styles.selectedJobText}>
                  <i className="Icon_icon__BlZpj icon-line_close"></i>
                </span>
              </div>
            ))}
          </div>
        )}
        <button className={styles.addButton} onClick={handleAddButtonClick}>
          <i className="Icon_icon__BlZpj icon-line_plus"></i>
          <span>추가하기</span>
        </button>
      </Section>

      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        title="업직종 선택"
        data={{ columns: modalColumns }}
        onAreaSelect={handleCategorySelect}
        onConfirm={handleModalConfirm}
      />
    </>
  );
}
