import React, { ReactElement, ReactNode } from 'react';
import styles from './layout.module.css';
import { Header } from '../header';
import { Footer } from '../footer';

export interface MainLayoutProps {
  children: ReactNode | ReactElement;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <main className={styles.main}>
      <Header />
      {children}
      <Footer />
    </main>
  );
}
