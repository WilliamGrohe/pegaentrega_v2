import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthContextProvider } from "@/contexts/AuthContext";
import { DeliveriesContextProvider } from "@/contexts/DeliveriesContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PegaEntrega",
  description: "Aplicação para gerenciamento de rotas de entregas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthContextProvider>
      <DeliveriesContextProvider>
        <html lang="pt">
          <body className={`${inter.className}`}>{children}</body>
        </html>
      </DeliveriesContextProvider>
    </AuthContextProvider>
  );
}
