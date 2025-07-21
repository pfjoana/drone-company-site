'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Projetos() {
  const [hoveredProject, setHoveredProject] = useState(null)

  // Mock data - depois será do Sanity
  const projects = [
    {
      id: 1,
      title: 'Inspeção Condomínio Torres',
      category: 'Inspeção',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Inspeção técnica completa de cobertura e fachada de condomínio residencial'
    },
    {
      id: 2,
      title: 'Villa Moderna - Cascais',
      category: 'Imobiliário',
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Tour aéreo para campanha de marketing imobiliário de propriedade de luxo'
    },
    {
      id: 3,
      title: 'Evento Tech Summit 2024',
      category: 'Eventos',
      image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Cobertura aérea completa de evento corporativo com mais de 1000 participantes'
    },
    {
      id: 4,
      title: 'Complexo Industrial Porto',
      category: 'Inspeção',
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Mapeamento e inspeção detalhada de infraestrutura industrial'
    },
    {
      id: 5,
      title: 'Quinta do Lago Resort',
      category: 'Imobiliário',
      image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Vídeo promocional de resort de luxo para campanha internacional'
    },
    {
      id: 6,
      title: 'Festival de Verão Braga',
      category: 'Eventos',
      image: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Documentação aérea de festival municipal com múltiplos palcos'
    }
  ]

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Nossos Projetos
          </h1>
          <p className="text-xl text-white/80 leading-relaxed">
            Uma seleção dos nossos trabalhos mais recentes em inspeções,
            imobiliário e eventos. Cada projeto representa o nosso compromisso
            com a excelência e inovação.
          </p>
        </div>
      </section>

      {/* Projects Grid - 2 Columns */}
      <section className="pb-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {projects.map((project) => (
              <div
                key={project.id}
                className="group cursor-pointer"
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                {/* Image Container */}
                <div className="relative overflow-hidden rounded-lg mb-6 aspect-[4/3] bg-gray-900 w-full">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />

                  {/* Overlay no hover */}
                  <div className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${
                    hoveredProject === project.id ? 'opacity-100' : 'opacity-0'
                  }`}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center text-white px-6">
                        <div className="w-16 h-16 border-2 border-white rounded-full flex items-center justify-center mx-auto mb-4">
                          <span className="text-2xl">▶</span>
                        </div>
                        <p className="text-sm">Ver Projeto</p>
                      </div>
                    </div>
                  </div>

                  {/* Category badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-black/50 backdrop-blur-sm text-white text-sm px-3 py-1 rounded-full">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Project Info */}
                <div className="px-2">
                  <h3 className="text-xl lg:text-2xl font-bold mb-3 group-hover:text-white/90 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-white/70 leading-relaxed text-sm lg:text-base">
                    {project.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Pronto para o Seu Próximo Projeto?
          </h2>
          <p className="text-xl text-white/80 mb-12 leading-relaxed">
            Entre em contacto connosco e vamos discutir como podemos
            elevar o seu projeto com captação aérea profissional.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contacts"
              className="bg-white text-black px-8 py-4 rounded font-semibold hover:bg-white/90 transition-colors duration-300"
            >
              Começar Projeto
            </Link>
            <Link
              href="/#servicos"
              className="border border-white text-white px-8 py-4 rounded font-semibold hover:bg-white/10 transition-colors duration-300"
            >
              Ver Serviços
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
