import Hero from './components/Hero'

export default function Home() {
  return (
    <div>
      <Hero />

      {/* Seção de introdução rápida */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-8">
            Elevamos o seu conteúdo
          </h2>
          <p className="text-lg md:text-xl text-white/80 leading-relaxed">
            Combinamos tecnologia de ponta com experiência profissional para criar
            imagens e vídeos aéreos que destacam o seu projeto, propriedade ou evento.
          </p>
        </div>
      </section>

      {/* Preview dos serviços */}
      <section className="py-20 px-4 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
            Os Nossos Serviços
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Inspeções */}
            <div className="group cursor-pointer">
              <div className="bg-white/10 rounded-lg overflow-hidden mb-6 aspect-video group-hover:bg-white/20 transition-colors duration-300">
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-6xl">🏢</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4">Inspeções</h3>
              <p className="text-white/70">
                Inspeções técnicas de telhados, edifícios e condomínios com
                relatórios detalhados e imagens de alta resolução.
              </p>
            </div>

            {/* Imobiliário */}
            <div className="group cursor-pointer">
              <div className="bg-white/10 rounded-lg overflow-hidden mb-6 aspect-video group-hover:bg-white/20 transition-colors duration-300">
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-6xl">🏡</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4">Imobiliário</h3>
              <p className="text-white/70">
                Fotografia e vídeo aéreo para propriedades, criando conteúdo
                visual impactante para vendas e marketing imobiliário.
              </p>
            </div>

            {/* Eventos */}
            <div className="group cursor-pointer">
              <div className="bg-white/10 rounded-lg overflow-hidden mb-6 aspect-video group-hover:bg-white/20 transition-colors duration-300">
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-6xl">🎬</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4">Eventos & Institucional</h3>
              <p className="text-white/70">
                Cobertura aérea de eventos, vídeos institucionais e projetos
                para câmaras municipais com qualidade cinematográfica.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
