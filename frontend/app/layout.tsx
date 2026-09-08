import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Mini Task Manager | Clean & Simple Task Management',
  description: 'A streamlined full-stack task manager built with Next.js, Express, TypeScript, and MySQL.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="flex flex-col min-h-full font-sans">
        {children}
      </body>
    </html>
  );
}
