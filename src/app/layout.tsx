import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ThemeProvider } from '@/components/ThemeProvider';

export const metadata = {
  title: 'Blog Pessoal - Gustavo Mendes',
  description: 'Conteúdo pessoal sobre desenvolvimento',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-100 flex flex-col transition-colors">
        <ThemeProvider>
          <Header />
          <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
