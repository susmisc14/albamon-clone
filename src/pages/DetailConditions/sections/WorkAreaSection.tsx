import React from "react";
import { Section } from "../components/Section";
import { Modal } from "../components/Modal";
import { Chips } from "../components/Chips";
import areaData from "../../../../data/area.json";
import styles from "./WorkAreaSection.module.css";

type TProps = { onCountChange?: (count: number) => void };

export function WorkAreaSection({ onCountChange }: TProps): React.JSX.Element {
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const [selected, setSelected] = React.useState<Set<string>>(new Set());
  const [selectedArea, setSelectedArea] = React.useState<string>("서울");

  // areaData를 기반으로 시도 옵션 동적 생성
  const areaOptions = React.useMemo(() => {
    // areaData.name에서 "특별시", "광역시", "도" 등을 추출하여 시도명 생성
    const currentAreas = [
      areaData.name
        .replace("특별시", "")
        .replace("광역시", "")
        .replace("도", ""),
    ];

    // 현재 areaData에 있는 지역만 반환 (향후 확장 시 area.json에 추가)
    return currentAreas;
  }, [areaData]);

  // 선택된 시도에 따른 구 데이터 매핑
  const getDistrictsByArea = (area: string) => {
    if (area === "서울") {
      return areaData.collection; // 서울 구 데이터
    }
    // 다른 시도는 빈 배열 반환 (향후 확장 가능)
    return [];
  };

  // 현재 선택된 시도의 구 데이터
  const currentDistricts = getDistrictsByArea(selectedArea);

  // Modal에 전달할 컬럼 데이터
  const modalColumns = [
    {
      title: "시 · 도",
      data: areaOptions,
    },
    {
      title: "시 · 구 · 군",
      data: currentDistricts,
    },
    {
      title: "동 · 읍 · 면",
      data: [],
    },
  ];

  // 시도 선택 핸들러
  const handleAreaSelect = (area: string) => {
    setSelectedArea(area);
  };

  // Modal 확인 시 선택된 지역을 추가하는 핸들러
  const handleModalConfirm = (selectedAreas: string[]) => {
    // 선택된 지역들을 selected Set에 추가
    setSelected((prev) => {
      const next = new Set(prev);
      selectedAreas.forEach((area) => next.add(area));
      return next;
    });
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
      <Section title="근무지역" countCurrent={selected.size} countTotal={10}>
        {selected.size > 0 && (
          <div className={styles.selectedList}>
            {Array.from(selected).map((area) => (
              <div
                key={area}
                className={styles.selectedAreaChip}
                onClick={() => {
                  // chip 클릭 시 선택 해제
                  setSelected((prev) => {
                    const next = new Set(prev);
                    next.delete(area);
                    return next;
                  });
                }}
                style={{ cursor: "pointer" }}
              >
                <span className={styles.selectedAreaText}>{area}</span>
                <span className={styles.selectedAreaText}>
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
        title="지역 선택"
        data={{ columns: modalColumns }}
        onAreaSelect={handleAreaSelect}
        onConfirm={handleModalConfirm}
      />
    </>
  );
}
