export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white dark:bg-gray-900 dark:border-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center text-sm text-gray-500 dark:text-gray-500">
        &copy; {new Date().getFullYear()} Gustavo Mendes. Todos os direitos reservados.
      </div>
    </footer>
  );
}
