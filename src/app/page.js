'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Hero from './components/Hero'
import CTASection from './components/CTASection'
import { client, urlFor } from '../lib/sanity'

// GSAP imports
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

export default function Home() {
  const [hoveredService, setHoveredService] = useState(null)
  const [featuredProjects, setFeaturedProjects] = useState([])

  // Refs para animações
  const statementRef = useRef(null)
  const servicesRef = useRef(null)
  const reviewsRef = useRef(null)
  const projectsRef = useRef(null)

  // Register GSAP plugins
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText)
  }, [])

  // Fetch featured projects from Sanity
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projects = await client.fetch(`
          *[_type == "project" && featured == true][0...6]{
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
        console.log('Featured projects:', projects)
        setFeaturedProjects(projects)
      } catch (error) {
        console.error('Error fetching projects:', error)
      }
    }

    fetchProjects()
  }, [])

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {

      // 1. Statement Split Text + Paragraph abaixo (HERO TYPE ANIMATION)
      const statementSplit = new SplitText(statementRef.current, {
        type: "lines,words",
        linesClass: "overflow-visible"
      })

      // Parágrafo abaixo do statement
      const statementParagraph = statementRef.current.parentElement.querySelector('p')
      const paragraphSplit = new SplitText(statementParagraph, {
        type: "lines",
        linesClass: "overflow-visible"
      })

      gsap.set(statementSplit.words, { y: 100, opacity: 0 })
      gsap.set(paragraphSplit.lines, { y: 50, opacity: 0 })

      // Remover overflow hidden das linhas
      gsap.set(statementSplit.lines, { overflow: "visible" })
      gsap.set(paragraphSplit.lines, { overflow: "visible" })

      // ScrollTrigger para o statement
      ScrollTrigger.create({
        trigger: statementRef.current,
        start: "top 90%",
        onEnter: () => {
          gsap.to(statementSplit.words, {
            y: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.08,
            ease: "power4.out"
          })

          gsap.to(paragraphSplit.lines, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            delay: 0.8
          })
        }
      })

      // 2. Services Section - TÍTULOS + SUBTÍTULO + TEXTO EM BLOCO
      const serviceTitle = servicesRef.current.querySelector('.services-title')
      const serviceSubtitle = servicesRef.current.querySelector('.services-subtitle')

      const serviceTitleSplit = new SplitText(serviceTitle, {
        type: "lines,words",
        linesClass: "overflow-hidden"
      })

      const serviceSubtitleSplit = new SplitText(serviceSubtitle, {
        type: "lines",
        linesClass: "overflow-hidden"
      })

      gsap.set(serviceTitleSplit.words, { y: 100, opacity: 0 })
      gsap.set(serviceSubtitleSplit.lines, { y: 30, opacity: 0 })

      ScrollTrigger.create({
        trigger: servicesRef.current,
        start: "top 80%",
        onEnter: () => {
          gsap.to(serviceTitleSplit.words, {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.08,
            ease: "power4.out"
          })

          gsap.to(serviceSubtitleSplit.lines, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            delay: 0.6
          })
        }
      })

      // Service cards - GRID DE 6 CARDS
      const serviceCards = servicesRef.current.querySelectorAll('.service-card')
      serviceCards.forEach((card, cardIndex) => {

        gsap.set(card, { y: 50, opacity: 0, scale: 0.95 })

        ScrollTrigger.create({
          trigger: card,
          start: "top 80%",
          onEnter: () => {
            gsap.to(card, {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.8,
              ease: "back.out(1.7)",
              delay: cardIndex * 0.1
            })
          }
        })
      })

      // 3. Reviews Section - QUOTES EM BLOCO
      const reviewQuotes = reviewsRef.current.querySelectorAll('.review-quote')
      reviewQuotes.forEach((quote, index) => {
        const quoteSplit = new SplitText(quote, {
          type: "lines",
          linesClass: "overflow-hidden"
        })

        gsap.set(quoteSplit.lines, { y: 30, opacity: 0 })

        ScrollTrigger.create({
          trigger: quote,
          start: "top 85%",
          onEnter: () => {
            gsap.to(quoteSplit.lines, {
              y: 0,
              opacity: 1,
              duration: 0.6,
              stagger: 0.05,
              ease: "power2.out"
            })
          }
        })
      })

      // 4. Projects Section - HERO TYPE ANIMATION
      const projectTitle = projectsRef.current.querySelector('.projects-title')
      const projectTitleSplit = new SplitText(projectTitle, {
        type: "lines,words",
        linesClass: "overflow-hidden"
      })

      const projectParagraph = projectsRef.current.querySelector('p')
      const projectParagraphSplit = new SplitText(projectParagraph, {
        type: "lines",
        linesClass: "overflow-hidden"
      })

      gsap.set(projectTitleSplit.words, { y: 100, opacity: 0 })
      gsap.set(projectParagraphSplit.lines, { y: 30, opacity: 0 })

      ScrollTrigger.create({
        trigger: projectsRef.current,
        start: "top 80%",
        onEnter: () => {
          gsap.to(projectTitleSplit.words, {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.08,
            ease: "power4.out"
          })

          gsap.to(projectParagraphSplit.lines, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            delay: 0.6
          })
        }
      })

      // Project items - DESKTOP ONLY
      const projectItems = projectsRef.current.querySelectorAll('.project-item-desktop')
      if (projectItems.length > 0) {
        gsap.set(projectItems, { scale: 0.9, opacity: 0 })

        gsap.to(projectItems, {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: projectItems[0],
            start: "top 70%",
            toggleActions: "play none none reverse"
          }
        })
      }

      // Project items - MOBILE ONLY
      const projectItemsMobile = projectsRef.current.querySelectorAll('.project-item-mobile')
      if (projectItemsMobile.length > 0) {
        gsap.set(projectItemsMobile, { y: 50, opacity: 0 })

        ScrollTrigger.create({
          trigger: projectItemsMobile[0],
          start: "top 80%",
          onEnter: () => {
            gsap.to(projectItemsMobile, {
              y: 0,
              opacity: 1,
              duration: 0.6,
              stagger: 0.1,
              ease: "power3.out"
            })
          }
        })
      }

    })

    return () => ctx.revert()
  }, [featuredProjects])

  const services = [
    {
      id: 'inspecoes-aereas',
      title: 'Inspeções Técnicas Aéreas',
      subtitle: 'Estruturas & Coberturas',
      description: 'Inspeções visuais de estruturas de difícil acesso com relatório técnico ilustrado.',
      features: ['Coberturas, caleiras, claraboias', 'Telhados industriais', 'Equipamentos AVAC e chaminés'],
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 'acompanhamento-obras',
      title: 'Acompanhamento de Obras',
      subtitle: 'Monitorização & Progresso',
      description: 'Monitorização da evolução de obras através de fotografias aéreas periódicas.',
      features: ['Fotografias antes/depois', 'Relatórios de progresso', 'Documentação temporal'],
      image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 'paineis-solares',
      title: 'Inspeção de Painéis Solares',
      subtitle: 'Energia & Eficiência',
      description: 'Verificação visual de instalações fotovoltaicas para máxima eficiência energética.',
      features: ['Identificação de sujidade/danos', 'Inspeção pós-limpeza', 'Verificação pós-eventos extremos'],
      image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 'espacos-exteriores',
      title: 'Levantamento de Espaços Exteriores',
      subtitle: 'Parques & Jardins',
      description: 'Levantamentos visuais de parques de estacionamento, jardins e zonas técnicas.',
      features: ['Parques de estacionamento', 'Jardins e zonas verdes', 'Áreas técnicas'],
      image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 'seguranca-perimetros',
      title: 'Verificação de Segurança',
      subtitle: 'Perímetros & Vedações',
      description: 'Sobrevoos para verificação de cercas, vedações e áreas remotas.',
      features: ['Inspeção de cercas', 'Verificação de vedações', 'Monitorização de perímetros'],
      image: 'https://images.unsplash.com/photo-1569163139394-de44cb984263?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 'conteudos-visuais',
      title: 'Conteúdos Visuais',
      subtitle: 'Vídeos & Apresentações',
      description: 'Vídeos e imagens aéreas para apresentações, relatórios e material promocional.',
      features: ['Vídeos para apresentações', 'Material para relatórios', 'Conteúdo para redes sociais'],
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    }
  ]

  return (
    <div>
      {/* Hero Section */}
      <Hero />

      {/* Statement impactante - NOVO TEXTO ORIGINAL */}
      <section className="py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-5xl">
            <h2
              ref={statementRef}
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-12 leading-[1.1] text-black"
            >
              Soluções técnicas com precisão aérea
            </h2>
            <p className="text-2xl md:text-3xl text-gray-700 leading-relaxed font-medium max-w-4xl">
              Onde os métodos tradicionais encontram limitações, a nossa tecnologia aérea
              revela problemas, documenta progressos e otimiza operações com uma perspetiva
              que transforma a gestão de ativos.
            </p>
          </div>
        </div>
      </section>

      {/* Serviços Section - OPÇÃO 2: 6 CARDS INDIVIDUAIS */}
      <section id="servicos" className="py-32 px-4" ref={servicesRef}>
        <div className="max-w-7xl mx-auto">

          <div className="flex justify-end mb-20">
            <div className="max-w-2xl text-right">
              <h2 className="services-title text-4xl md:text-5xl font-bold mb-6 text-black">
                Expertise Técnico Especializado
              </h2>
              <p className="services-subtitle text-xl text-gray-700 leading-relaxed font-semibold">
                Da inspeção à documentação, cada serviço é concebido para resolver
                desafios específicos da gestão moderna de infraestruturas.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={service.id}
                className="service-card group cursor-pointer"
                onMouseEnter={() => setHoveredService(service.id)}
                onMouseLeave={() => setHoveredService(null)}
              >
                <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden h-full">

                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover transition-all duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />

                    <div className={`absolute inset-0 bg-black/75 transition-all duration-500 ${
                      hoveredService === service.id ? 'opacity-100' : 'opacity-0'
                    }`}>
                      <div className="absolute inset-0 flex items-center justify-center p-4">
                        <div className="text-center text-white">
                          <h4 className="text-lg font-bold mb-4">Características:</h4>
                          <ul className="space-y-2 text-sm">
                            {service.features.map((feature, fIndex) => (
                              <li key={fIndex} className="opacity-95 font-medium">• {feature}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <p className="text-gray-600 text-sm font-medium">{service.subtitle}</p>
                    <h3 className="text-xl font-bold text-black">{service.title}</h3>
                    <p className="text-gray-700 leading-relaxed font-medium">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section - NOVOS TEXTOS ORIGINAIS */}
      <section className="py-32 px-4 bg-gray-50" ref={reviewsRef}>
        <div className="max-w-7xl mx-auto">

          {/* Título à esquerda */}
          <div className="mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-black max-w-2xl">
              Resultados que Falam por Si
            </h2>
          </div>

          {/* Reviews com novos textos originais */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {/* Review 1 - Facility Manager */}
            <div className="review-card bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">★</span>
                ))}
              </div>
              <p className="review-quote text-gray-700 mb-6 leading-relaxed font-medium text-lg">
                "Descobriram infiltrações no telhado que passavam despercebidas há meses. O relatório técnico foi fundamental para priorizar as reparações."
              </p>
              <div>
                <p className="font-bold text-black">Ricardo Silva</p>
                <p className="text-gray-500 text-sm">Facility Manager</p>
              </div>
            </div>

            {/* Review 2 - Administradora */}
            <div className="review-card bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">★</span>
                ))}
              </div>
              <p className="review-quote text-gray-700 mb-6 leading-relaxed font-medium text-lg">
                "O acompanhamento fotográfico da requalificação do edifício permitiu-nos documentar cada etapa e justificar o investimento aos condóminos."
              </p>
              <div>
                <p className="font-bold text-black">Marina Oliveira</p>
                <p className="text-gray-500 text-sm">Administradora Predial</p>
              </div>
            </div>

            {/* Review 3 - Gestor de Energia */}
            <div className="review-card bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">★</span>
                ))}
              </div>
              <p className="review-quote text-gray-700 mb-6 leading-relaxed font-medium text-lg">
                "A análise aérea dos painéis solares identificou 12% de perda de eficiência que não era visível do solo. ROI imediato na correção."
              </p>
              <div>
                <p className="font-bold text-black">João Pereira</p>
                <p className="text-gray-500 text-sm">Gestor de Manutenção</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Featured Projects Section - NOVOS TEXTOS */}
      <section className="py-32 px-4 bg-white" ref={projectsRef}>
        <div className="max-w-7xl mx-auto">

          {/* Título à esquerda */}
          <div className="mb-16">
            <h2 className="projects-title text-4xl md:text-5xl font-bold mb-6 text-black max-w-2xl">
              Casos de Estudo Reais
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl leading-relaxed font-medium">
              Cada projeto resolve um desafio específico. Desde diagnósticos preventivos
              a acompanhamentos de obra, descubra como a perspetiva aérea otimiza operações.
            </p>
          </div>

          {/* Desktop Grid - MANTÉM ORIGINAL */}
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">

            {featuredProjects.slice(0, 4).map((project, index) => (
              <div
                key={project._id}
                className={`project-item-desktop group cursor-pointer ${
                  index === 0 ? 'lg:col-span-2 lg:row-span-2' :
                  index === 3 ? 'lg:col-span-2' : ''
                }`}
              >
                <div className="relative w-full h-full aspect-square rounded-lg overflow-hidden">

                  {project.video?.asset ? (
                    <video
                      className="absolute inset-0 w-full h-full object-cover"
                      muted
                      loop
                      playsInline
                      onMouseEnter={(e) => e.target.play()}
                      onMouseLeave={(e) => e.target.pause()}
                    >
                      <source src={project.video.asset.url} type="video/mp4" />
                    </video>
                  ) : project.mainImage ? (
                    <Image
                      src={project.mainImage.asset.url}
                      alt={project.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 20vw"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500 text-sm">Sem mídia</span>
                    </div>
                  )}

                  <div className="absolute top-2 left-2">
                    <span className="bg-black/60 text-white text-xs px-2 py-1 rounded">
                      {project.category}
                    </span>
                  </div>
                </div>
              </div>
            ))}

          </div>

          {/* Mobile Grid - NOVO COMPORTAMENTO IGUAL À PÁGINA DE PROJETOS */}
          <div className="md:hidden space-y-4 mb-12">

            {featuredProjects.map((project, index) => (
              <div
                key={`mobile-${project._id}`}
                className="project-item-mobile h-[70vh]"
              >
                <div className="relative w-full h-full rounded-lg overflow-hidden shadow-lg">

                  {project.video?.asset ? (
                    <video
                      className="absolute inset-0 w-full h-full object-cover"
                      muted
                      loop
                      playsInline
                      autoPlay
                    >
                      <source src={project.video.asset.url} type="video/mp4" />
                    </video>
                  ) : project.mainImage ? (
                    <Image
                      src={project.mainImage.asset.url}
                      alt={project.title}
                      fill
                      className="object-cover"
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
                      {project.category && (
                        <span className="text-white/90 text-sm font-medium">
                          {project.category}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}

          </div>

          <div className="text-center">
            <Link
              href="/projects"
              className="bg-black text-white px-8 py-4 rounded font-semibold hover:bg-gray-800 transition-colors duration-300 inline-block"
            >
              Explorar Todos os Casos
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Final - Usando componente */}
      <CTASection />
    </div>
  )
}
