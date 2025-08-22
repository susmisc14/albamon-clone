import React from "react";
import { Header } from "./components/Header";
import { WorkAreaSection } from "./sections/WorkAreaSection";
import { JobTypeSection } from "./sections/JobTypeSection";
import { WorkPeriodSection } from "./sections/WorkPeriodSection";
import { WorkDaySection } from "./sections/WorkDaySection";
import { WorkTimeSection } from "./sections/WorkTimeSection";
import { GenderSection } from "./sections/GenderSection";
import { AgeSection } from "./sections/AgeSection";
import { KeywordSection } from "./sections/KeywordSection";
import { EmploymentTypeSection } from "./sections/EmploymentTypeSection";
import { Footer } from "./components/Footer";
import { Layout, Description, MainContent } from "./components/Layout";

export function DetailConditionsPage(): React.JSX.Element {
  const [resetTick, setResetTick] = React.useState<number>(0);
  const [score, setScore] = React.useState<number>(0);
  function addScore(delta: number): void {
    setScore((s) => s + delta);
  }
  // 간단한 가중치 모델: 선택 수와 섹션 가중치를 합산해 결과 수 추정에 사용(placeholder)
  const [wp, setWp] = React.useState(0);
  const [wd, setWd] = React.useState(0);
  const [wt, setWt] = React.useState(0);
  const [gd, setGd] = React.useState(0);
  const [kw, setKw] = React.useState(0);
  const [wa, setWa] = React.useState(0);
  const [et, setEt] = React.useState(0);
  function handleReset(): void {
    setResetTick((t) => t + 1);
  }
  // TODO: 실제 검색 조건에 따른 결과 수 연동. 현재는 선택 수에 따라 간단 계산.
  const estimatedCount = Math.max(
    0,
    Math.round(
      272364 *
        (1 -
          Math.min(
            0.8,
            wp * 0.015 + // 근무기간: 중간 영향
              wd * 0.025 + // 근무요일: 높은 영향
              wt * 0.025 + // 근무시간: 높은 영향
              gd * 0.008 + // 성별: 낮은 영향
              kw * 0.012 + // 키워드: 중간 영향
              wa * 0.03 + // 근무지역: 매우 높은 영향
              et * 0.018 // 고용형태: 중간 영향
          ))
    )
  );
  return (
    <Layout>
      <Header title="검색조건설정" onReset={handleReset} />
      <Description />
      <MainContent>
        <WorkAreaSection key={`wa-${resetTick}`} onCountChange={setWa} />
        <JobTypeSection />
        <WorkPeriodSection key={`wp-${resetTick}`} onCountChange={setWp} />
        <WorkDaySection key={`wd-${resetTick}`} onCountChange={setWd} />
        <WorkTimeSection key={`wt-${resetTick}`} onCountChange={setWt} />
        <GenderSection key={`g-${resetTick}`} onCountChange={setGd} />
        <AgeSection />
        <EmploymentTypeSection key={`et-${resetTick}`} onCountChange={setEt} />
        <KeywordSection key={`k-${resetTick}`} onCountChange={setKw} />
      </MainContent>
      <Footer count={estimatedCount} />
    </Layout>
  );
}
