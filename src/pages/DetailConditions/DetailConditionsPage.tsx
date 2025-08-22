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
  return (
    <Layout>
      <Header title="검색조건설정" />
      <Description />
      <MainContent>
        <WorkAreaSection />
        <JobTypeSection />
        <WorkPeriodSection />
        <WorkDaySection />
        <WorkTimeSection />
        <GenderSection />
        <AgeSection />
        <EmploymentTypeSection />
        <KeywordSection />
      </MainContent>
      <Footer label="272,364건의 결과보기" />
    </Layout>
  );
}
