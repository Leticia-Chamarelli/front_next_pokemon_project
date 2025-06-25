import "./globals.css";
import { Inter } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";
import { NavbarWrapper } from "@/components/shared/NavbarWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Pokémon App",
  description: "A simple app to manage your Pokémon collection",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <NavbarWrapper />
          <main className="max-w-5xl mx-auto px-4 py-6">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
