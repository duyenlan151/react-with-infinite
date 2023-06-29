import React from 'react';
import styles from './footer.module.css';

export interface FooterProps {}

export function Footer({}: FooterProps) {
  return (
    <footer className={styles.footer}>
      <a href="https://github.com/jvidalv" className="mt-0">
        Copy template from Josep Vidal @ {new Date().getFullYear()}
      </a>
    </footer>
  );
}
