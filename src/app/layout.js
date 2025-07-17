// app/layout.jsx
// This is a Server Component by default, but can contain Client Components.

import './globals.css'; // Your global styles
import { Inter } from 'next/font/google'; // Example font import

import Header from './components/Header';
import Footer from './components/Footer'; // Import Footer
import LayoutWrapper from './LayoutWrapper'; // We'll create this for state management
import Sidebar from './components/Sidebar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Toilet Review System', // Moved from Head in Home
  description: 'Find and review public washrooms',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* LayoutWrapper will handle the sidebar state and pass it down */}
        <LayoutWrapper>
          {children} {/* This is where your page content will be rendered */}
        </LayoutWrapper>
      </body>
    </html>
  );
}