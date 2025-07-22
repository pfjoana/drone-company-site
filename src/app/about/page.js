'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { client, urlFor } from '../../lib/sanity'

export default function Sobre() {
  const [aboutData, setAboutData] = useState(null)

  // Fetch about data from Sanity
  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const data = await client.fetch(`
          *[_type == "about"][0]{
            profileImage{
              asset->{
                _id,
                url
              }
            }
          }
        `)
        console.log('About data:', data) // Debug
        setAboutData(data)
      } catch (error) {
        console.error('Error fetching about data:', error)
      }
    }

    fetchAboutData()
  }, [])

  // Dados estáticos que permanecem no código
  const staticData = {
    name: "Paulo Silva",
    title: "Piloto Certificado & Editor de Vídeo",
    description: [
      "Especialista em captação e pós-produção de conteúdo aéreo, combinando skills técnicos de pilotagem com expertise em edição e storytelling visual.",
      "Da planificação do voo até à entrega final, asseguro todo o processo criativo - desde a captação cinematográfica até à edição profissional que dá vida às imagens.",
      "Cada projeto é tratado com dedicação total, garantindo não só imagens de qualidade, mas também uma narrativa visual que supera expectativas."
    ]
  }

  return (
    <div className="pt-16">
      {/* Hero section */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Sobre
          </h1>
          <p className="text-xl text-white/80 leading-relaxed">
            Especialista em captação aérea com paixão pela excelência visual.
          </p>
        </div>
      </section>

      {/* Main content */}
      <section className="pb-24 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">

          {/* Foto menor para equilibrar */}
          <div className="order-2 lg:order-1">
            <div className="w-full max-w-sm mx-auto lg:mx-0">
              <div className="aspect-[4/5] rounded-lg overflow-hidden relative">
                {aboutData?.profileImage?.asset?.url ? (
                  <Image
                    src={aboutData.profileImage.asset.url}
                    alt={staticData.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                ) : (
                  <div className="w-full h-full bg-white/20 flex items-center justify-center">
                    <span className="text-8xl">👨‍💼</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Info pessoal + texto */}
          <div className="order-1 lg:order-2">
            {/* Info pessoal */}
            <div className="mb-8">
              <h2 className="text-3xl lg:text-4xl font-bold mb-3">{staticData.name}</h2>
              <p className="text-xl text-white/80 mb-4">{staticData.title}</p>

              {/* Só certificações */}
              <div className="text-sm text-white/70">
                <span>Certificações: </span>
                <span className="text-white">ANAC A1/A3</span>
              </div>
            </div>

            {/* Texto principal */}
            <div className="space-y-6 text-lg text-white/80 leading-relaxed">
              {staticData.description.map((paragraph, index) => (
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
