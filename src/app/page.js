'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Hero from './components/Hero'
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
  const ctaRef = useRef(null)

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
        linesClass: "overflow-hidden"
      })

      // Parágrafo abaixo do statement
      const statementParagraph = statementRef.current.parentElement.querySelector('p')
      const paragraphSplit = new SplitText(statementParagraph, {
        type: "lines",
        linesClass: "overflow-hidden"
      })

      gsap.set(statementSplit.words, { y: 100, opacity: 0 })
      gsap.set(paragraphSplit.lines, { y: 50, opacity: 0 })

      // ScrollTrigger para o statement (pode estar muito em cima)
      ScrollTrigger.create({
        trigger: statementRef.current,
        start: "top 90%", // Mais tolerante
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

      // Service cards - TEXTO EM BLOCO (não gradual)
      const serviceCards = servicesRef.current.querySelectorAll('.service-card')
      serviceCards.forEach((card, cardIndex) => {

        // Textos do serviço (título, subtítulo, descrição)
        const serviceTexts = card.querySelectorAll('h3, p[class*="text-gray-600"], p[class*="text-gray-700"]')

        gsap.set(serviceTexts, { y: 30, opacity: 0 })
        gsap.set(card.querySelector('.relative'), { scale: 0.95, opacity: 0 })

        ScrollTrigger.create({
          trigger: card,
          start: "top 75%",
          onEnter: () => {
            // Imagem primeiro
            gsap.to(card.querySelector('.relative'), {
              scale: 1,
              opacity: 1,
              duration: 0.8,
              ease: "power3.out"
            })

            // Depois texto TODO AO MESMO TEMPO (sem stagger)
            gsap.to(serviceTexts, {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.05, // Stagger mínimo
              ease: "power3.out",
              delay: 0.2
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
              stagger: 0.05, // Stagger mínimo
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

      // Project items
      const projectItems = projectsRef.current.querySelectorAll('.project-item')
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

      // 5. CTA - HERO TYPE ANIMATION
      const ctaTitle = ctaRef.current.querySelector('.cta-title')
      const ctaTitleSplit = new SplitText(ctaTitle, {
        type: "lines,words",
        linesClass: "overflow-hidden"
      })

      const ctaParagraph = ctaRef.current.querySelector('p')
      const ctaParagraphSplit = new SplitText(ctaParagraph, {
        type: "lines",
        linesClass: "overflow-hidden"
      })

      gsap.set(ctaTitleSplit.words, { y: 100, opacity: 0 })
      gsap.set(ctaParagraphSplit.lines, { y: 30, opacity: 0 })

      ScrollTrigger.create({
        trigger: ctaRef.current,
        start: "top 80%",
        onEnter: () => {
          gsap.to(ctaTitleSplit.words, {
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

    })

    return () => ctx.revert()
  }, [featuredProjects])

  const services = [
    {
      id: 'inspecoes',
      title: 'Inspeções Técnicas',
      subtitle: 'Condomínios & Edifícios',
      description: 'Relatórios detalhados de inspeções aéreas para telhados, fachadas e estruturas. Identificação precisa de problemas e documentação completa.',
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
      description: 'Fotografia e vídeo aéreo para propriedades, criando material promocional impactante que destaca características únicas.',
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
      description: 'Cobertura aérea profissional para eventos, vídeos institucionais e projetos municipais com qualidade cinematográfica.',
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
    <div>
      {/* Hero Section */}
      <Hero />

      {/* Statement impactante - Char por char */}
      <section className="py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-5xl">
            <h2
              ref={statementRef}
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-12 leading-[0.9] text-black"
              style={{ overflow: "hidden" }}
            >
              Elevamos o seu conteúdo
            </h2>
            <p className="text-2xl md:text-3xl text-gray-700 leading-relaxed font-medium max-w-4xl">
              Combinamos tecnologia de ponta com experiência profissional para criar
              imagens e vídeos aéreos que destacam o seu projeto.
            </p>
          </div>
        </div>
      </section>

      {/* Serviços Section - Layout orgânico MELHORADO */}
      <section id="servicos" className="py-32 px-4" ref={servicesRef}>
        <div className="max-w-7xl mx-auto">

          {/* Título e subtítulo à direita */}
          <div className="flex justify-end mb-20">
            <div className="max-w-2xl text-right">
              <h2 className="services-title text-4xl md:text-5xl font-bold mb-6 text-black">
                Os Nossos Serviços
              </h2>
              <p className="services-subtitle text-xl text-gray-700 leading-relaxed font-semibold">
                Três áreas de especialização para responder a todas as suas necessidades
                de captação aérea profissional.
              </p>
            </div>
          </div>

          {/* Cards em layout assimétrico - REBALANCEADOS */}
          <div className="space-y-32">

            {/* Primeiro serviço - Grande à esquerda (MANTÉM) */}
            <div className="service-card grid grid-cols-1 lg:grid-cols-5 gap-8 items-center"
                 onMouseEnter={() => setHoveredService(services[0].id)}
                 onMouseLeave={() => setHoveredService(null)}>
              <div className="lg:col-span-3">
                <div className="relative overflow-hidden rounded-lg aspect-[4/3]">
                  <Image
                    src={services[0].image}
                    alt={services[0].title}
                    fill
                    className="object-cover transition-all duration-700 hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 60vw"
                  />

                  {/* Overlay MELHORADO */}
                  <div className={`absolute inset-0 bg-black/75 transition-all duration-500 ${
                    hoveredService === services[0].id ? 'opacity-100' : 'opacity-0'
                  }`}>
                    <div className="absolute inset-0 flex items-center justify-center p-8">
                      <div className="text-center text-white">
                        <h4 className="text-2xl font-bold mb-6">Características:</h4>
                        <ul className="space-y-3 text-lg">
                          {services[0].features.map((feature, index) => (
                            <li key={index} className="opacity-95 font-medium">• {feature}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-2 space-y-4">
                <p className="text-gray-600 text-sm font-medium">{services[0].subtitle}</p>
                <h3 className="text-3xl font-bold text-black">{services[0].title}</h3>
                <p className="text-gray-700 leading-relaxed font-medium text-lg">
                  {services[0].description}
                </p>
              </div>
            </div>

            {/* Segundo serviço - MAIOR e mais à direita */}
            <div className="service-card ml-auto lg:max-w-5xl"
                 onMouseEnter={() => setHoveredService(services[1].id)}
                 onMouseLeave={() => setHoveredService(null)}>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                <div className="lg:order-2 lg:col-span-2">
                  <div className="relative overflow-hidden rounded-lg aspect-[4/3]">
                    <Image
                      src={services[1].image}
                      alt={services[1].title}
                      fill
                      className="object-cover transition-all duration-700 hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 60vw"
                    />

                    {/* Overlay MELHORADO */}
                    <div className={`absolute inset-0 bg-black/75 transition-all duration-500 ${
                      hoveredService === services[1].id ? 'opacity-100' : 'opacity-0'
                    }`}>
                      <div className="absolute inset-0 flex items-center justify-center p-8">
                        <div className="text-center text-white">
                          <h4 className="text-2xl font-bold mb-6">Características:</h4>
                          <ul className="space-y-3 text-lg">
                            {services[1].features.map((feature, index) => (
                              <li key={index} className="opacity-95 font-medium">• {feature}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lg:order-1 lg:col-span-1 space-y-4 text-right">
                  <p className="text-gray-600 text-sm font-medium">{services[1].subtitle}</p>
                  <h3 className="text-3xl font-bold text-black">{services[1].title}</h3>
                  <p className="text-gray-700 leading-relaxed font-medium text-lg">
                    {services[1].description}
                  </p>
                </div>
              </div>
            </div>

            {/* Terceiro serviço - MAIOR e mais à esquerda */}
            <div className="service-card mr-auto lg:max-w-5xl"
                 onMouseEnter={() => setHoveredService(services[2].id)}
                 onMouseLeave={() => setHoveredService(null)}>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                <div className="lg:col-span-2">
                  <div className="relative overflow-hidden rounded-lg aspect-[4/3]">
                    <Image
                      src={services[2].image}
                      alt={services[2].title}
                      fill
                      className="object-cover transition-all duration-700 hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 60vw"
                    />

                    {/* Overlay MELHORADO */}
                    <div className={`absolute inset-0 bg-black/75 transition-all duration-500 ${
                      hoveredService === services[2].id ? 'opacity-100' : 'opacity-0'
                    }`}>
                      <div className="absolute inset-0 flex items-center justify-center p-8">
                        <div className="text-center text-white">
                          <h4 className="text-2xl font-bold mb-6">Características:</h4>
                          <ul className="space-y-3 text-lg">
                            {services[2].features.map((feature, index) => (
                              <li key={index} className="opacity-95 font-medium">• {feature}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-1 space-y-4">
                  <p className="text-gray-600 text-sm font-medium">{services[2].subtitle}</p>
                  <h3 className="text-3xl font-bold text-black">{services[2].title}</h3>
                  <p className="text-gray-700 leading-relaxed font-medium text-lg">
                    {services[2].description}
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Reviews Section - Layout orgânico */}
      <section className="py-32 px-4 bg-gray-50" ref={reviewsRef}>
        <div className="max-w-7xl mx-auto">

          {/* Título à esquerda */}
          <div className="mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-black max-w-2xl">
              O Que Dizem os Nossos Clientes
            </h2>
          </div>

          {/* Reviews em linha (como estava) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {/* Review 1 - Normal */}
            <div className="review-card bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">★</span>
                ))}
              </div>
              <p className="review-quote text-gray-700 mb-6 leading-relaxed font-medium text-lg">
                "Excelente trabalho na inspeção do nosso condomínio. Relatório muito detalhado
                e imagens de alta qualidade."
              </p>
              <div>
                <p className="font-bold text-black">Maria Santos</p>
                <p className="text-gray-500 text-sm">Administradora de Condomínio</p>
              </div>
            </div>

            {/* Review 2 - Normal */}
            <div className="review-card bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">★</span>
                ))}
              </div>
              <p className="review-quote text-gray-700 mb-6 leading-relaxed font-medium text-lg">
                "As fotografias aéreas da nossa propriedade ficaram incríveis! Vendemos a casa muito mais rápido graças ao material promocional."
              </p>
              <div>
                <p className="font-bold text-black">Carlos Oliveira</p>
                <p className="text-gray-500 text-sm">Proprietário</p>
              </div>
            </div>

            {/* Review 3 - Normal */}
            <div className="review-card bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">★</span>
                ))}
              </div>
              <p className="review-quote text-gray-700 mb-6 leading-relaxed font-medium text-lg">
                "Profissionalismo exemplar na cobertura do nosso evento corporativo. O vídeo final superou todas as expectativas!"
              </p>
              <div>
                <p className="font-bold text-black">Ana Rodrigues</p>
                <p className="text-gray-500 text-sm">Diretora de Marketing</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Featured Projects Section - Grid assimétrico */}
      <section className="py-32 px-4 bg-white" ref={projectsRef}>
        <div className="max-w-7xl mx-auto">

          {/* Título à esquerda */}
          <div className="mb-16">
            <h2 className="projects-title text-4xl md:text-5xl font-bold mb-6 text-black max-w-2xl">
              Projetos em Destaque
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl leading-relaxed font-medium">
              Uma seleção dos nossos trabalhos mais recentes que demonstram
              a qualidade e diversidade dos nossos serviços.
            </p>
          </div>

          {/* Grid 4 projetos + espaços para futuros */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">

            {/* Primeiros 4 projetos */}
            {featuredProjects.slice(0, 4).map((project, index) => (
              <div
                key={project._id}
                className={`project-item group cursor-pointer ${
                  index === 0 ? 'lg:col-span-2 lg:row-span-2' :
                  index === 3 ? 'lg:col-span-2' : ''
                }`}
              >
                <div className="relative w-full h-full aspect-square rounded-lg overflow-hidden">

                  {/* Só vídeo se existir, sem imagem de capa */}
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

          <div className="text-center">
            <Link
              href="/projects"
              className="bg-black text-white px-8 py-4 rounded font-semibold hover:bg-gray-800 transition-colors duration-300 inline-block"
            >
              Ver Todos os Projetos
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-32 px-4 bg-gray-50" ref={ctaRef}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="cta-title text-4xl md:text-5xl font-bold mb-8 text-black">
            Pronto para Elevar o Seu Projeto?
          </h2>
          <p className="text-xl text-gray-700 mb-12 leading-relaxed font-medium">
            Entre em contacto connosco hoje mesmo e descubra como podemos
            transformar a sua visão em realidade.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contacts"
              className="bg-black text-white px-8 py-4 rounded font-semibold hover:bg-gray-800 transition-colors duration-300"
            >
              Solicitar Orçamento
            </Link>
            <Link
              href="#servicos"
              className="border border-black text-black px-8 py-4 rounded font-semibold hover:bg-black/5 transition-colors duration-300"
            >
              Conhecer Serviços
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
