export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo/Nome */}
          <div>
            <h3 className="font-bold text-lg mb-4">All Perspectives</h3>
            <p className="text-white/70 text-sm">
              Serviços profissionais de captação aérea para inspeções,
              imobiliário e eventos.
            </p>
          </div>

          {/* Links */}
          {/* <div>
            <h4 className="font-semibold mb-4">Links</h4>
            <div className="space-y-2">
              <a href="/sobre" className="block text-white/70 hover:text-white text-sm transition-colors">
                Sobre
              </a>
              <a href="/servicos" className="block text-white/70 hover:text-white text-sm transition-colors">
                Serviços
              </a>
              <a href="/projetos" className="block text-white/70 hover:text-white text-sm transition-colors">
                Projetos
              </a>
              <a href="/contactos" className="block text-white/70 hover:text-white text-sm transition-colors">
                Contactos
              </a>
            </div>
          </div> */}

          {/* Contactos */}
          <div>
            <h4 className="font-semibold mb-4">Contacto</h4>
            <div className="space-y-2 text-sm text-white/70">
              <p>email@dronecompany.com</p>
              <p>+351 123 456 789</p>
              <p>Porto, Portugal</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center">
          <p className="text-white/70 text-sm">
            © 2025 All Perspectives. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
