import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";

export default function RootLayout({children}: {children: React.ReactNode}) {
  return <main className="min-h-screen flex items-center justify-center flex-col">{children}</main>;
}
