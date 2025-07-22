'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { client } from '../../lib/sanity'

export default function Projetos() {
  const [hoveredProject, setHoveredProject] = useState(null)
  const [projects, setProjects] = useState([])

  // Fetch all projects from Sanity
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await client.fetch(`
          *[_type == "project"] | order(_createdAt desc){
            _id,
            title,
            category,
            mainImage{
              asset->{
                _id,
                url
              }
            },
            video{
              asset->{
                _id,
                url
              }
            }
          }
        `)
        console.log('All projects:', data) // Debug
        setProjects(data)
      } catch (error) {
        console.error('Error fetching projects:', error)
      }
    }

    fetchProjects()
  }, [])

  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-black">
            Nossos Projetos
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Uma seleção dos nossos trabalhos mais recentes em inspeções,
            imobiliário e eventos. Cada projeto representa o nosso compromisso
            com a excelência e inovação.
          </p>
        </div>
      </section>

      {/* Projects Grid - 2 Columns */}
      <section className="pb-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projects.map((project) => (
              <div
                key={project._id}
                className="group cursor-pointer"
                onMouseEnter={() => setHoveredProject(project._id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                {/* Image/Video Container */}
                <div className="relative overflow-hidden rounded-lg mb-6 aspect-[4/3] bg-gray-100 w-full">
                  {/* Video que reproduz no hover */}
                  {project.video?.asset?.url && (
                    <video
                      className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      autoPlay
                      muted
                      loop
                      playsInline
                    >
                      <source src={project.video.asset.url} type="video/mp4" />
                    </video>
                  )}

                  {/* Imagem principal se existir */}
                  {project.mainImage?.asset?.url && (
                    <Image
                      src={project.mainImage.asset.url}
                      alt={project.title || 'Projeto'}
                      fill
                      className="object-cover transition-opacity duration-500 group-hover:opacity-0"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  )}

                  {/* Fallback se não há imagem nem vídeo */}
                  {!project.mainImage?.asset?.url && !project.video?.asset?.url && (
                    <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500 text-lg">Sem mídia</span>
                    </div>
                  )}

                  {/* Category badge */}
                  {project.category && (
                    <div className="absolute top-4 left-4">
                      <span className="bg-black/70 backdrop-blur-sm text-white text-sm px-3 py-1 rounded-full">
                        {project.category}
                      </span>
                    </div>
                  )}
                </div>

                {/* Project Info */}
                <div className="px-2">
                  <h3 className="text-xl lg:text-2xl font-bold mb-3 text-black group-hover:text-gray-600 transition-colors">
                    {project.title || 'Projeto sem título'}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
                    {project.category ?
                      `Projeto de ${project.category.toLowerCase()} com captação aérea profissional.` :
                      'Projeto de captação aérea profissional.'
                    }
                  </p>
                </div>
              </div>
            ))}

            {/* Loading state */}
            {projects.length === 0 && (
              <div className="col-span-2 text-center py-20">
                <p className="text-gray-500 text-lg">Carregando projetos...</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-black">
            Pronto para o Seu Próximo Projeto?
          </h2>
          <p className="text-xl text-gray-600 mb-12 leading-relaxed">
            Entre em contacto connosco e vamos discutir como podemos
            elevar o seu projeto com captação aérea profissional.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contacts"
              className="bg-black text-white px-8 py-4 rounded font-semibold hover:bg-gray-800 transition-colors duration-300"
            >
              Começar Projeto
            </Link>
            <Link
              href="/#servicos"
              className="border border-black text-black px-8 py-4 rounded font-semibold hover:bg-black/5 transition-colors duration-300"
            >
              Ver Serviços
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
