import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <main className="flex h-screen flex-col min-h-screen">
      <Header />
      <div className="m-auto">{children}</div>
      <Footer />
    </main>
  );
}
