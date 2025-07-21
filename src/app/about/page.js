export default function Sobre() {
  return (
    <div className="pt-16">
      {/* Hero section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-8 text-center">
            Sobre Nós
          </h1>
          <p className="text-xl md:text-2xl text-white/80 text-center max-w-4xl mx-auto">
            Especialistas em captação aérea com anos de experiência e paixão pela excelência visual.
          </p>
        </div>
      </section>

      {/* Main content */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Foto e info pessoal */}
          <div className="order-2 lg:order-1">
            <div className="bg-white/10 rounded-lg p-8">
              <div className="w-48 h-48 bg-white/20 rounded-full mx-auto mb-8 flex items-center justify-center">
                {/* Placeholder para foto - depois substituir por imagem real */}
                <span className="text-6xl">👨‍💼</span>
              </div>

              <h2 className="text-3xl font-bold mb-4 text-center">Paulo Silva</h2>
              <p className="text-white/80 text-center mb-6">Piloto Certificado & Fundador</p>

              <div className="space-y-4 text-sm text-white/70">
                <div className="flex items-center justify-between">
                  <span>Experiência:</span>
                  <span className="text-white">5+ anos</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Certificações:</span>
                  <span className="text-white">ANAC A1/A3</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Projetos realizados:</span>
                  <span className="text-white">200+</span>
                </div>
              </div>
            </div>
          </div>

          {/* Texto principal */}
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              Transformamos perspetivas em experiências
            </h2>

            <div className="space-y-6 text-lg text-white/80">
              <p>
                Com mais de 5 anos de experiência na captação aérea, especializamo-nos
                em criar conteúdo visual de qualidade cinematográfica que eleva qualquer projeto.
              </p>

              <p>
                A nossa missão é combinar tecnologia de ponta com criatividade e
                profissionalismo, oferecendo soluções personalizadas para cada cliente.
              </p>

              <p>
                Desde inspeções técnicas precisas até campanhas de marketing imobiliário
                impactantes, cada projeto é tratado com o mesmo nível de dedicação e
                atenção ao detalhe.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-4">Equipamento</h3>
                <ul className="space-y-2 text-white/70">
                  <li>• DJI Mavic 3 Pro</li>
                  <li>• DJI Air 2S</li>
                  <li>• Câmaras 4K/6K</li>
                  <li>• Estabilizadores gimbal</li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4">Especializações</h3>
                <ul className="space-y-2 text-white/70">
                  <li>• Inspeções técnicas</li>
                  <li>• Marketing imobiliário</li>
                  <li>• Eventos corporativos</li>
                  <li>• Vídeo institucional</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Valores/Missão */}
      <section className="py-20 px-4 bg-white/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Os Nossos Valores
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-bold mb-4">Precisão</h3>
              <p className="text-white/70">
                Cada detalhe importa. Trabalhamos com precisão técnica para
                garantir resultados excepcionais.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-bold mb-4">Agilidade</h3>
              <p className="text-white/70">
                Resposta rápida e entregas dentro do prazo, sem comprometer
                a qualidade do trabalho.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-xl font-bold mb-4">Inovação</h3>
              <p className="text-white/70">
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
