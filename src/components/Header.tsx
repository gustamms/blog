import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';

const links = [
  { href: '/', label: 'Posts' },
  { href: '/sobre', label: 'Sobre mim' },
];

export function Header() {
  return (
    <header className="border-b border-gray-200 bg-white dark:bg-gray-900 dark:border-gray-800">
      <div className="max-w-4xl mx-auto px-4 py-3 sm:py-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
        <Link href="/" className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 whitespace-nowrap">
          Gustavo Mendes
        </Link>
        <nav className="flex items-center gap-4 sm:gap-6 text-sm sm:text-base">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
