import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';

const links = [
  { href: '/', label: 'Posts' },
  { href: '/sobre', label: 'Sobre mim' },
];

export function Header() {
  return (
    <header className="border-b border-gray-200 bg-white dark:bg-gray-900 dark:border-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400">
          Gustavo Mendes
        </Link>
        <nav className="flex gap-6 items-center">
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
