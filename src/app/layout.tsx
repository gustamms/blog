import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ThemeProvider } from '@/components/ThemeProvider';

export const metadata = {
  title: 'Blog Pessoal - Gustavo Mendes',
  description: 'Conteúdo pessoal sobre desenvolvimento',
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
          <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
