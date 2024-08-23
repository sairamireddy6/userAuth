"use client"
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const queryClient = new QueryClient({});
  return (
    <html lang="en">
      <body className={inter.className}>
      <script src="https://cdn.jsdelivr.net/npm/flowbite@2.5.1/dist/flowbite.min.js"></script>
        <QueryClientProvider client={queryClient}>
          <ToastContainer />
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}
