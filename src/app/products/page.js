'use client'

import { useState } from 'react'

export default function Servicos() {
  const [hoveredService, setHoveredService] = useState(null)

  const services = [
    {
      id: 'inspecoes',
      title: 'Inspeções Técnicas',
      subtitle: 'Condomínios & Edifícios',
      description: 'Relatórios detalhados de inspeções aéreas para telhados, fachadas e estruturas. Identificação precisa de problemas e documentação completa para condomínios e empresas.',
      features: [
        'Inspeção de telhados e coberturas',
        'Análise de fachadas e estruturas',
        'Relatórios técnicos detalhados',
        'Documentação fotográfica HD',
        'Mapeamento de problemas estruturais'
      ],
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
    },
    {
      id: 'imobiliario',
      title: 'Marketing Imobiliário',
      subtitle: 'Vendas & Promoção',
      description: 'Fotografia e vídeo aéreo para propriedades, criando material promocional impactante que destaca as características únicas de cada imóvel.',
      features: [
        'Fotografia aérea de propriedades',
        'Vídeos promocionais dinâmicos',
        'Tours virtuais aéreos',
        'Material para redes sociais',
        'Packages completos de marketing'
      ],
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
    },
    {
      id: 'eventos',
      title: 'Eventos & Institucional',
      subtitle: 'Corporativo & Municipal',
      description: 'Cobertura aérea profissional para eventos, vídeos institucionais e projetos municipais com qualidade cinematográfica e storytelling envolvente.',
      features: [
        'Cobertura de eventos corporativos',
        'Vídeos institucionais',
        'Projetos para câmaras municipais',
        'Documentação de obras públicas',
        'Conteúdo para campanhas'
      ],
      image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
    }
  ]

  return (
    <div className="pt-16">
      {/* Hero section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-8">
            Os Nossos Serviços
          </h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto">
            Três áreas de especialização para responder a todas as suas necessidades
            de captação aérea profissional.
          </p>
        </div>
      </section>

      {/* Services grid */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className="group cursor-pointer"
                onMouseEnter={() => setHoveredService(service.id)}
                onMouseLeave={() => setHoveredService(null)}
              >
                {/* Image container with overlay effect */}
                <div className="relative overflow-hidden rounded-lg mb-6 aspect-[4/3]">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* Overlay que aparece no hover */}
                  <div className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${
                    hoveredService === service.id ? 'opacity-100' : 'opacity-0'
                  }`}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center text-white p-6">
                        <h4 className="text-lg font-bold mb-4">Características:</h4>
                        <ul className="space-y-2 text-sm">
                          {service.features.map((feature, index) => (
                            <li key={index} className="opacity-90">• {feature}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Service info */}
                <div>
                  <p className="text-white/60 text-sm mb-2">{service.subtitle}</p>
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-white/90 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-white/70 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews section */}
      <section className="py-20 px-4 bg-white/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            O Que Dizem os Nossos Clientes
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Review 1 */}
            <div className="bg-white/10 rounded-lg p-6">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">★</span>
                ))}
              </div>
              <p className="text-white/80 mb-4">
                "Excelente trabalho na inspeção do nosso condomínio. Relatório muito detalhado
                e imagens de alta qualidade que nos ajudaram a identificar todos os problemas."
              </p>
              <div>
                <p className="font-semibold">Maria Santos</p>
                <p className="text-white/60 text-sm">Administradora de Condomínio</p>
              </div>
            </div>

            {/* Review 2 */}
            <div className="bg-white/10 rounded-lg p-6">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">★</span>
                ))}
              </div>
              <p className="text-white/80 mb-4">
                "As fotografias aéreas da nossa propriedade ficaram incríveis!
                Vendemos a casa muito mais rápido graças ao material promocional."
              </p>
              <div>
                <p className="font-semibold">Carlos Oliveira</p>
                <p className="text-white/60 text-sm">Proprietário</p>
              </div>
            </div>

            {/* Review 3 */}
            <div className="bg-white/10 rounded-lg p-6">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">★</span>
                ))}
              </div>
              <p className="text-white/80 mb-4">
                "Profissionalismo exemplar na cobertura do nosso evento corporativo.
                O vídeo final superou todas as expectativas!"
              </p>
              <div>
                <p className="font-semibold">Ana Rodrigues</p>
                <p className="text-white/60 text-sm">Diretora de Marketing</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
