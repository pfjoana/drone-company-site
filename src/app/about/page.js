export default function Sobre() {
  // Dados que depois virão do Sanity
  const aboutData = {
    name: "João Silva", // Depois virá do Sanity
    title: "Piloto Certificado & Fundador",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", // Placeholder
    description: [
      "Especialista em captação aérea com paixão por criar conteúdo visual de qualidade cinematográfica que eleva qualquer projeto.",
      "A nossa missão é combinar tecnologia de ponta com criatividade e profissionalismo, oferecendo soluções personalizadas para cada cliente.",
      "Cada projeto é tratado com dedicação e atenção ao detalhe, garantindo resultados que superam as expectativas."
    ]
  }

  return (
    <div className="pt-16">
      {/* Hero section */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Sobre Nós
          </h1>
          <p className="text-xl text-white/80 leading-relaxed">
            Especialistas em captação aérea com paixão pela excelência visual.
          </p>
        </div>
      </section>

      {/* Main content */}
      <section className="pb-24 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Foto e info pessoal */}
          <div className="order-2 lg:order-1">
            <div className="bg-white/10 rounded-lg p-8">
              <div className="w-48 h-48 rounded-full mx-auto mb-8 overflow-hidden">
                <img
                  src={aboutData.image}
                  alt={aboutData.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <h2 className="text-2xl lg:text-3xl font-bold mb-4 text-center">{aboutData.name}</h2>
              <p className="text-white/80 text-center mb-6">{aboutData.title}</p>
            </div>
          </div>

          {/* Texto principal */}
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl lg:text-4xl font-bold mb-8">
              Transformamos perspetivas em experiências
            </h2>

            <div className="space-y-6 text-lg text-white/80 leading-relaxed">
              {aboutData.description.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Valores/Missão */}
      <section className="py-24 px-4 bg-white/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-16">
            Os Nossos Valores
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-bold mb-4">Precisão</h3>
              <p className="text-white/70 leading-relaxed">
                Cada detalhe importa. Trabalhamos com precisão técnica para
                garantir resultados excepcionais.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-bold mb-4">Agilidade</h3>
              <p className="text-white/70 leading-relaxed">
                Resposta rápida e entregas dentro do prazo, sem comprometer
                a qualidade do trabalho.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-xl font-bold mb-4">Inovação</h3>
              <p className="text-white/70 leading-relaxed">
                Sempre atualizados com as mais recentes tecnologias e
                tendências do mercado.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
