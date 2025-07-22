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
    <div className="pt-24">

      {/* Statement gigante no canto */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-[0.9] text-black">
              Transformamos perspectivas em experiências
            </h1>
          </div>
        </div>
      </section>

      {/* Layout orgânico rebalanceado */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto relative">

          {/* Foto grande - posição ajustada */}
          <div className="absolute left-8 top-0 w-96 h-[450px] lg:w-[450px] lg:h-[550px]">
            <div className="relative w-full h-full overflow-hidden shadow-xl">
              {aboutData?.profileImage?.asset?.url ? (
                <Image
                  src={aboutData.profileImage.asset.url}
                  alt={staticData.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 450px"
                />
              ) : (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                  <span className="text-8xl">👨‍💼</span>
                </div>
              )}
            </div>
          </div>

          {/* Conteúdo agrupado à direita */}
          <div className="ml-auto max-w-2xl pl-8 pt-8 text-right">

            {/* Frase decorativa + Nome agrupados */}
            <div className="mb-12">
              <p className="text-xl md:text-2xl font-bold text-gray-300 italic mb-8">
                Conheça o piloto, editor, storyteller
              </p>

              <h2 className="text-4xl lg:text-5xl font-bold text-black mb-4">
                Paulo Silva
              </h2>
              <p className="text-xl text-gray-700 font-semibold">
                Piloto Certificado & Editor de Vídeo
              </p>
              <p className="text-base text-gray-600 font-medium mt-2">
                ANAC A1/A3
              </p>
            </div>

            {/* Texto mais intenso e bold */}
            <div className="space-y-6 text-lg text-gray-800 leading-relaxed text-right">
              <p className="font-semibold">
                <strong>Da pilotagem à pós-produção.</strong> Especialista que combina skills técnicos de voo com storytelling visual cinematográfico.
              </p>

              <p className="font-semibold">
                <strong>Processo completo.</strong> Da planificação do voo até ao cut final. Cada projeto é uma narrativa visual que supera expectativas.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Espaço extra para breathing */}
      <section className="py-32"></section>

    </div>
  )
}
