'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { client } from '../../lib/sanity'
import CTASection from '../components/CTASection'

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

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {

      // 1. Header - HERO TYPE ANIMATION
      if (headerRef.current && headerParagraphRef.current) {
        const headerSplit = new SplitText(headerRef.current, {
          type: "lines,words",
          linesClass: "overflow-visible"
        })

        const headerParagraphSplit = new SplitText(headerParagraphRef.current, {
          type: "lines",
          linesClass: "overflow-visible"
        })

        gsap.set(headerSplit.words, { y: 100, opacity: 0 })
        gsap.set(headerParagraphSplit.lines, { y: 50, opacity: 0 })

        // Remover overflow hidden das linhas
        gsap.set(headerSplit.lines, { overflow: "visible" })
        gsap.set(headerParagraphSplit.lines, { overflow: "visible" })

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

      // 2. Projects Grid - animações desktop
      if (projectsGridRef.current && projects.length > 0) {
        const projectItems = projectsGridRef.current.querySelectorAll('.project-item')

        if (projectItems.length > 0) {
          gsap.set(projectItems, { scale: 0.9, opacity: 0 })

          ScrollTrigger.create({
            trigger: projectsGridRef.current,
            start: "top 70%",
            onEnter: () => {
              gsap.to(projectItems, {
                scale: 1,
                opacity: 1,
                duration: 0.8,
                stagger: 0.1,
                ease: "back.out(1.7)"
              })
            }
          })
        }
      }

    })

    return () => ctx.revert()
  }, [projects])

  return (
    <div className="pt-24">

      {/* Header Section - NOVOS TEXTOS */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-5xl">
            <h1
              ref={headerRef}
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-12 leading-[1.1] text-black"
            >
              Casos de Estudo Reais
            </h1>
            <p
              ref={headerParagraphRef}
              className="text-2xl md:text-3xl text-gray-700 leading-relaxed font-medium max-w-4xl"
            >
              Cada projeto documenta uma solução técnica específica. Desde diagnósticos
              preventivos até acompanhamentos complexos, descubra como resolvemos
              desafios reais de gestão e manutenção.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Grid - Desktop/Mobile Separado */}
      <section className="pb-24 px-4">
        <div className="max-w-7xl mx-auto">

          {/* Loading state */}
          {projects.length === 0 && (
            <div className="text-center py-20">
              <div className="animate-pulse space-y-8">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className={`bg-gray-200 rounded-lg ${
                        i === 0 ? 'lg:col-span-2 lg:row-span-2 aspect-square' :
                        i === 3 ? 'lg:col-span-2 aspect-[2/1]' : 'aspect-square'
                      }`}
                    ></div>
                  ))}
                </div>
              </div>
              <p className="text-gray-500 text-xl mt-8 font-medium">Carregando casos de estudo...</p>
            </div>
          )}

          {/* Projects Grid - Desktop/Mobile */}
          {projects.length > 0 && (
            <>
              {/* Desktop Grid - INTACTO */}
              <div ref={projectsGridRef} className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">

                {projects.map((project, index) => (
                  <div
                    key={project._id}
                    className={`project-item group ${
                      index === 0 ? 'lg:col-span-2 lg:row-span-2' :
                      index === 3 ? 'lg:col-span-2' :
                      index === 7 ? 'lg:col-span-2' : ''
                    }`}
                  >
                    <div className="image-container relative w-full h-full aspect-square rounded-lg overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow duration-300">

                      {/* Vídeo - hover desktop */}
                      {project.video?.asset?.url ? (
                        <video
                          className="project-video absolute inset-0 w-full h-full object-cover"
                          muted
                          loop
                          playsInline
                          onMouseEnter={(e) => e.target.play()}
                          onMouseLeave={(e) => e.target.pause()}
                        >
                          <source src={project.video.asset.url} type="video/mp4" />
                        </video>
                      ) : project.mainImage?.asset?.url ? (
                        <Image
                          src={project.mainImage.asset.url}
                          alt={project.title || 'Projeto'}
                          fill
                          className="project-image object-cover"
                          sizes="(max-width: 1024px) 50vw, 25vw"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-500 text-sm">Sem mídia</span>
                        </div>
                      )}

                      {/* Título hover desktop */}
                      {project.title && (
                        <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4">
                          <h3 className={`font-bold text-white leading-tight ${
                            index === 0 ? 'text-lg lg:text-xl' : 'text-sm lg:text-base'
                          }`}>
                            {project.title}
                          </h3>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

              </div>

              {/* Mobile Grid - 1 coluna, vídeos altos */}
              <div className="md:hidden space-y-4 mb-12">

                {projects.map((project, index) => (
                  <div
                    key={`mobile-${project._id}`}
                    className="project-item h-[70vh]" // 70% da altura da tela
                  >
                    <div className="image-container relative w-full h-full rounded-lg overflow-hidden shadow-lg">

                      {/* Vídeo autoplay mobile */}
                      {project.video?.asset?.url ? (
                        <video
                          className="project-video absolute inset-0 w-full h-full object-cover"
                          muted
                          loop
                          playsInline
                          autoPlay
                        >
                          <source src={project.video.asset.url} type="video/mp4" />
                        </video>
                      ) : project.mainImage?.asset?.url ? (
                        <Image
                          src={project.mainImage.asset.url}
                          alt={project.title || 'Projeto'}
                          fill
                          className="project-image object-cover"
                          sizes="100vw"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-500 text-sm">Sem mídia</span>
                        </div>
                      )}

                      {/* Título sempre visível mobile */}
                      {project.title && (
                        <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/80 to-transparent p-4">
                          <h3 className="font-bold text-white leading-tight text-lg">
                            {project.title}
                          </h3>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA Section - Usando componente reutilizável com textos padrão */}
      <CTASection />
    </div>
  )
}
