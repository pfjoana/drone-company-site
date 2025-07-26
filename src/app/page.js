'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Hero from './components/Hero'
import CTASection from './components/CTASection'
import { client, urlFor } from '../lib/sanity'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

export default function Home() {
  const [hoveredService, setHoveredService] = useState(null)
  const [featuredProjects, setFeaturedProjects] = useState([])
  const [serviceImages, setServiceImages] = useState({})

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

  // Fetch APENAS IMAGENS dos serviços do Sanity
  useEffect(() => {
    const fetchServiceImages = async () => {
      try {
        const images = await client.fetch(`
          *[_type == "service"]{
            id,
            image{
              asset->{
                _id,
                url
              }
            }
          }
        `)
        console.log('Service images from Sanity:', images)

        // Converter para objeto com ID como chave
        const imageMap = {}
        images.forEach(service => {
          if (service.id && service.image) {
            imageMap[service.id] = service.image
          }
        })
        setServiceImages(imageMap)
      } catch (error) {
        console.error('Error fetching service images:', error)
      }
    }

    fetchServiceImages()
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

      // 2. Services Section
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

        // Para mobile - mostrar overlay com scroll
        const overlay = card.querySelector('.service-overlay')
        if (overlay) {
          gsap.set(overlay, { opacity: 0 })
        }

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

            // Em mobile, mostrar overlay após a animação do card
            if (overlay && window.innerWidth < 768) {
              gsap.to(overlay, {
                opacity: 1,
                duration: 0.6,
                delay: cardIndex * 0.1 + 0.5
              })
            }
          }
        })
      })

    })

    return () => ctx.revert()
  }, [featuredProjects])

  // Helper para obter URL da imagem (Sanity ou fallback)
  const getServiceImage = (serviceId, fallbackUrl) => {
    const sanityImage = serviceImages[serviceId]
    if (sanityImage?.asset?.url) {
      return urlFor(sanityImage).url()
    }
    return fallbackUrl
  }

  // Serviços com texto hardcoded (só imagens do Sanity)
  const services = [
    {
      id: 'inspecoes-aereas',
      title: 'Inspeções Técnicas Aéreas',
      subtitle: 'Estruturas & Coberturas',
      description: 'Inspeções visuais de estruturas de difícil acesso.',
      features: ['Coberturas, caleiras, claraboias', 'Telhados industriais', 'Equipamentos AVAC e chaminés'],
      fallbackImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 'acompanhamento-obras',
      title: 'Acompanhamento de Obras',
      subtitle: 'Monitorização & Progresso',
      description: 'Monitorização da evolução de obras através de fotografias aéreas periódicas.',
      features: ['Fotografias antes/depois', 'Relatórios de progresso', 'Documentação temporal'],
      fallbackImage: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 'paineis-solares',
      title: 'Inspeção de Painéis Solares',
      subtitle: 'Energia & Eficiência',
      description: 'Verificação visual de instalações fotovoltaicas para máxima eficiência energética.',
      features: ['Identificação de sujidade/danos', 'Inspeção pós-limpeza', 'Verificação pós-eventos extremos'],
      fallbackImage: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 'espacos-exteriores',
      title: 'Levantamento de Espaços Exteriores',
      subtitle: 'Parques & Jardins',
      description: 'Levantamentos visuais de parques de estacionamento, jardins e zonas técnicas.',
      features: ['Parques de estacionamento', 'Jardins e zonas verdes', 'Áreas técnicas'],
      fallbackImage: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 'seguranca-perimetros',
      title: 'Verificação de Segurança',
      subtitle: 'Perímetros & Vedações',
      description: 'Sobrevoos para verificação de cercas, vedações e áreas remotas.',
      features: ['Inspeção de cercas', 'Verificação de vedações', 'Monitorização de perímetros'],
      fallbackImage: 'https://images.unsplash.com/photo-1569163139394-de44cb984263?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 'conteudos-visuais',
      title: 'Conteúdos Visuais',
      subtitle: 'Vídeos & Apresentações',
      description: 'Vídeos e imagens aéreas para apresentações, relatórios e material promocional.',
      features: ['Vídeos para apresentações', 'Material para relatórios', 'Conteúdo para redes sociais'],
      fallbackImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
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

      {/* Serviços Section - TEXTO HARDCODED + IMAGENS DO SANITY */}
      <section id="servicos" className="py-32 px-4" ref={servicesRef}>
        <div className="max-w-7xl mx-auto">

          <div className="flex justify-end mb-20">
            <div className="max-w-2xl text-right">
              <h2 className="services-title text-4xl md:text-5xl font-bold mb-6 text-black">
                Especialização técnica ao serviço da gestão
              </h2>
              <p className="services-subtitle text-xl text-gray-700 leading-relaxed font-semibold">
                Cada serviço é concebido para resolver desafios específicos da gestão moderna de infraestruturas.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const isHovered = hoveredService === service.id

              return (
                <div
                  key={service.id}
                  className="service-card group cursor-pointer"
                  onMouseEnter={() => setHoveredService(service.id)}
                  onMouseLeave={() => setHoveredService(null)}
                >
                  <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden h-full">

                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={getServiceImage(service.id, service.fallbackImage)}
                        alt={service.title}
                        fill
                        className="object-cover transition-all duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />

                      <div
                        className="service-overlay absolute inset-0 bg-black transition-all duration-500"
                        style={{
                          backgroundColor: 'rgba(0,0,0,0.8)',
                          opacity: isHovered ? 1 : 0
                        }}
                      >
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
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Final - Usando componente */}
      <CTASection />
    </div>
  )
}
