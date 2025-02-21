import { ReactNode } from 'react';
import { Header } from './Header';

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen bg-[#0f1421] text-white">
      <Header />
      <main className="max-w-6xl mx-auto p-4">
        {children}
      </main>
    </div>
  );
};