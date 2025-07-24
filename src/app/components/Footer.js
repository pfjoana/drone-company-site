export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Mobile: Centrado */}
        <div className="md:hidden text-center space-y-8">
          <div>
            <h3 className="font-bold text-xl text-white mb-4">All Perspectives</h3>
            <p className="text-gray-400 text-base max-w-lg mx-auto leading-relaxed">
              Soluções técnicas especializadas com perspetiva aérea.
              Combinamos conhecimento de gestão de ativos com dados aéreos precisos
              para otimizar operações.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white">Contacto</h4>
            <div className="space-y-2 text-gray-400">
              <p className="hover:text-white transition-colors cursor-pointer">
                email@allperspectives.com
              </p>
              <p className="hover:text-white transition-colors cursor-pointer">
                +351 123 456 789
              </p>
              <p className="text-gray-300 font-medium">
                Porto, Portugal
              </p>
            </div>
          </div>
        </div>

        {/* Desktop: Extremos */}
        <div className="hidden md:flex justify-between items-start">
          <div className="max-w-md">
            <h3 className="font-bold text-xl text-white mb-4">All Perspectives</h3>
            <p className="text-gray-400 text-base leading-relaxed">
              Soluções técnicas especializadas com perspetiva aérea.
              Combinamos conhecimento de gestão de ativos com dados aéreos precisos
              para otimizar operações.
            </p>
          </div>

          <div className="text-right">
            <h4 className="font-semibold mb-4 text-white">Contacto</h4>
            <div className="space-y-2 text-gray-400">
              <p className="hover:text-white transition-colors cursor-pointer">
                email@allperspectives.com
              </p>
              <p className="hover:text-white transition-colors cursor-pointer">
                +351 123 456 789
              </p>
              <p className="text-gray-300 font-medium">
                Porto, Portugal
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-center">
          <p className="text-gray-500 text-sm">
            © 2025 All Perspectives. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
