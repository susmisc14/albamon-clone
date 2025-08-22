import React from "react";
import styles from "./Layout.module.css";

type TLayoutProps = {
  children: React.ReactNode;
};

export function Layout({ children }: TLayoutProps): React.JSX.Element {
  return <div className={styles.container}>{children}</div>;
}

export function Description(): React.JSX.Element {
  return (
    <div className={styles.description}>모든 채용메뉴에 공통 반영됩니다.</div>
  );
}

export function MainContent({ children }: TLayoutProps): React.JSX.Element {
  return <div className={styles.mainContent}>{children}</div>;
}
