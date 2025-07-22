export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-6 md:space-y-0">
          {/* Logo/Nome */}
          <div>
            <h3 className="font-bold text-lg text-white mb-2">All Perspectives</h3>
            <p className="text-gray-400 text-sm max-w-md">
              Serviços profissionais de captação aérea para inspeções, imobiliário e eventos.
            </p>
          </div>

          {/* Contactos */}
          <div className="text-right">
            <h4 className="font-semibold mb-3 text-white text-sm">Contacto</h4>
            <div className="space-y-1 text-sm text-gray-400">
              <p>email@dronecompany.com</p>
              <p>+351 123 456 789</p>
              <p>Porto, Portugal</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-6 pt-6 text-center">
          <p className="text-gray-500 text-sm">
            © 2025 All Perspectives. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
