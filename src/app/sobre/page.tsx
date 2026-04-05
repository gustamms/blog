export default function SobrePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Sobre mim</h1>

      <div className="prose prose-gray max-w-none">
        <p className="text-lg text-gray-600 mb-6">
          Olá! Eu sou Gustavo Mendes. Esta é a minha página pessoal onde compartilho conteúdos sobre desenvolvimento.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">Experiência Profissional</h2>
        <p className="text-gray-600">
          Adicione aqui suas experiências profissionais, projetos e habilidades.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">Habilidades</h2>
        <p className="text-gray-600">
          Liste suas principais habilidades técnicas e soft skills.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">Currículo</h2>
        <p className="text-gray-600">
          <a
            href="/curriculo.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline hover:text-blue-700"
          >
            Abrir meu currículo →
          </a>
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">Contato</h2>
        <p className="text-gray-600">
          Adicione seus links de contato (GitHub, LinkedIn, email, etc.)
        </p>
      </div>
    </div>
  );
}
