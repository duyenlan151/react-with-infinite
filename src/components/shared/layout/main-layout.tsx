import { ReactElement, ReactNode } from 'react';
import { Footer } from '../footer';
import { Header } from '../header';

export interface MainLayoutProps {
  children: ReactNode | ReactElement;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
