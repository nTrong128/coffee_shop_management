export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <main className="min-h-screen flex items-center justify-center flex-col">
      {children}
    </main>
  );
}
