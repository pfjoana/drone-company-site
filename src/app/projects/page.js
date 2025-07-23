'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { client } from '../../lib/sanity'

// GSAP imports
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

export default function Projetos() {
  const [hoveredProject, setHoveredProject] = useState(null)
  const [projects, setProjects] = useState([])

  // Refs para animações
  const headerRef = useRef(null)
  const headerParagraphRef = useRef(null)
  const projectsGridRef = useRef(null)
  const ctaRef = useRef(null)
  const ctaParagraphRef = useRef(null)

  // Register GSAP plugins
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText)
  }, [])

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
        console.log('All projects:', data)
        setProjects(data)
      } catch (error) {
        console.error('Error fetching projects:', error)
      }
    }

    fetchProjects()
  }, [])

  // GSAP Animations - HERO TYPE + CONSISTENT
  useEffect(() => {
    const ctx = gsap.context(() => {

      // 1. Header - HERO TYPE ANIMATION
      if (headerRef.current && headerParagraphRef.current) {
        const headerSplit = new SplitText(headerRef.current, {
          type: "lines,words",
          linesClass: "overflow-hidden"
        })

        const headerParagraphSplit = new SplitText(headerParagraphRef.current, {
          type: "lines",
          linesClass: "overflow-hidden"
        })

        gsap.set(headerSplit.words, { y: 100, opacity: 0 })
        gsap.set(headerParagraphSplit.lines, { y: 50, opacity: 0 })

        ScrollTrigger.create({
          trigger: headerRef.current,
          start: "top 90%",
          onEnter: () => {
            gsap.to(headerSplit.words, {
              y: 0,
              opacity: 1,
              duration: 1.2,
              stagger: 0.08,
              ease: "power4.out"
            })

            gsap.to(headerParagraphSplit.lines, {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.1,
              ease: "power3.out",
              delay: 0.8
            })
          }
        })
      }

      // 2. Projects Grid - só executa se tiver projetos e ref existir
      if (projectsGridRef.current && projects.length > 0) {
        const projectItems = projectsGridRef.current.querySelectorAll('.project-item')

        if (projectItems.length > 0) {
          gsap.set(projectItems, { y: 50, opacity: 0, scale: 0.95 })

          ScrollTrigger.create({
            trigger: projectsGridRef.current,
            start: "top 75%",
            onEnter: () => {
              gsap.to(projectItems, {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.8,
                stagger: 0.15,
                ease: "power3.out"
              })
            }
          })
        }
      }

      // 3. CTA Section - HERO TYPE
      if (ctaRef.current && ctaParagraphRef.current) {
        const ctaSplit = new SplitText(ctaRef.current, {
          type: "lines,words",
          linesClass: "overflow-hidden"
        })

        const ctaParagraphSplit = new SplitText(ctaParagraphRef.current, {
          type: "lines",
          linesClass: "overflow-hidden"
        })

        gsap.set(ctaSplit.words, { y: 100, opacity: 0 })
        gsap.set(ctaParagraphSplit.lines, { y: 30, opacity: 0 })

        ScrollTrigger.create({
          trigger: ctaRef.current,
          start: "top 80%",
          onEnter: () => {
            gsap.to(ctaSplit.words, {
              y: 0,
              opacity: 1,
              duration: 1,
              stagger: 0.08,
              ease: "power4.out"
            })

            gsap.to(ctaParagraphSplit.lines, {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.1,
              ease: "power3.out",
              delay: 0.6
            })
          }
        })
      }

    })

    return () => ctx.revert()
  }, [projects])

  return (
    <div className="pt-24">

      {/* Header Section - HERO TYPE */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-5xl">
            <h1
              ref={headerRef}
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-12 leading-[0.9] text-black"
            >
              Nossos Projetos
            </h1>
            <p
              ref={headerParagraphRef}
              className="text-2xl md:text-3xl text-gray-700 leading-relaxed font-medium max-w-4xl"
            >
              Uma seleção dos nossos trabalhos mais recentes em inspeções, imobiliário e eventos. Cada projeto representa o nosso compromisso com a excelência e inovação.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Grid - Melhorado */}
      <section className="pb-24 px-4">
        <div className="max-w-6xl mx-auto">

          {/* Loading state */}
          {projects.length === 0 && (
            <div className="text-center py-20">
              <div className="animate-pulse space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="bg-gray-200 aspect-[4/3] rounded-lg"></div>
                  ))}
                </div>
              </div>
              <p className="text-gray-500 text-xl mt-8 font-medium">Carregando projetos...</p>
            </div>
          )}

          {/* Projects Grid */}
          {projects.length > 0 && (
            <div ref={projectsGridRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {projects.map((project, index) => (
                <div
                  key={project._id}
                  className="project-item group cursor-pointer"
                  onMouseEnter={() => setHoveredProject(project._id)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  {/* Image/Video Container - melhorado */}
                  <div className="relative overflow-hidden rounded-lg mb-8 aspect-[4/3] bg-gray-100 w-full shadow-lg">

                    {/* Video que reproduz no hover */}
                    {project.video?.asset?.url && (
                      <video
                        className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                        autoPlay
                        muted
                        loop
                        playsInline
                      >
                        <source src={project.video.asset.url} type="video/mp4" />
                      </video>
                    )}

                    {/* Imagem principal */}
                    {project.mainImage?.asset?.url && (
                      <Image
                        src={project.mainImage.asset.url}
                        alt={project.title || 'Projeto'}
                        fill
                        className="object-cover transition-all duration-700 group-hover:opacity-0 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    )}

                    {/* Fallback se não há mídia */}
                    {!project.mainImage?.asset?.url && !project.video?.asset?.url && (
                      <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500 text-xl font-medium">Sem mídia</span>
                      </div>
                    )}

                    {/* Category badge - melhorado */}
                    {project.category && (
                      <div className="absolute top-6 left-6">
                        <span className="bg-black/80 backdrop-blur-sm text-white text-sm px-4 py-2 rounded-full font-semibold">
                          {project.category}
                        </span>
                      </div>
                    )}

                    {/* Overlay no hover */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>

                  {/* Project Info - melhorado */}
                  <div className="px-2">
                    <h3 className="text-2xl lg:text-3xl font-bold mb-4 text-black group-hover:text-gray-700 transition-colors duration-300">
                      {project.title || 'Projeto sem título'}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-lg font-medium">
                      {project.category ?
                        `Projeto de ${project.category.toLowerCase()} com captação aérea profissional que demonstra a nossa expertise técnica e criativa.` :
                        'Projeto de captação aérea profissional que destaca a qualidade do nosso trabalho.'
                      }
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section - HERO TYPE */}
      <section className="py-32 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <div className="max-w-5xl mx-auto">
            <h2
              ref={ctaRef}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-12 text-black leading-[0.9]"
            >
              Pronto para o Seu Próximo Projeto?
            </h2>
            <p
              ref={ctaParagraphRef}
              className="text-xl md:text-2xl text-gray-700 mb-16 leading-relaxed font-medium max-w-4xl mx-auto"
            >
              Entre em contacto connosco e vamos discutir como podemos elevar o seu projeto com captação aérea profissional.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href="/contacts"
                className="bg-black text-white px-10 py-5 rounded font-bold hover:bg-gray-800 transition-colors duration-300 text-xl"
              >
                Começar Projeto
              </Link>
              <Link
                href="/#servicos"
                className="border-2 border-black text-black px-10 py-5 rounded font-bold hover:bg-black/5 transition-colors duration-300 text-xl"
              >
                Ver Serviços
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
