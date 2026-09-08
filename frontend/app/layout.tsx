import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'TaskFlow | Clean & Professional Task Management',
  description: 'A streamlined full-stack task manager built with Next.js, Express, TypeScript, and MySQL.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`h-full ${plusJakartaSans.variable}`}>
      <body className="flex flex-col min-h-full font-sans text-slate-800 bg-gradient-to-br from-teal-50/70 via-slate-50 to-emerald-50/40 antialiased">
        {children}
      </body>
    </html>
  );
}
