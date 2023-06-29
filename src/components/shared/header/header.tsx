import React from 'react';
import styles from './header.module.css';

export interface HeaderProps {}

export function Header({}: HeaderProps) {
  return (
    <header className={styles.header}>
      <h1 className={styles.headerTitle}>
        React + TypeScript + Tailwind: Infinite Scrolling and Searchable Product List
      </h1>
    </header>
  );
}
