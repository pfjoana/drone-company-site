'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Hero from './components/Hero'
import CTASection from './components/CTASection'
import { client, urlFor } from '../lib/sanity'
import { SERVICES } from './constants/services'
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

  // A implementar mais tarde
  // Fetch featured projects from Sanity
  // useEffect(() => {
  //   const fetchProjects = async () => {
  //     try {
  //       const projects = await client.fetch(`
  //         *[_type == "project" && featured == true][0...6]{
  //           _id,
  //           title,
  //           category,
  //           mainImage{
  //             asset->{
  //               _id,
  //               url
  //             }
  //           },
  //           video{
  //             asset->{
  //               _id,
  //               url
  //             }
  //           }
  //         }
  //       `)
  //       setFeaturedProjects(projects)
  //     } catch (error) {
  //       console.error('Error fetching projects:', error)
  //     }
  //   }

  //   fetchProjects()
  // }, [])


  // Fetch serviços do Sanity
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

      // 1. Statement Split Text
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

      // Service cards
      const serviceCards = servicesRef.current.querySelectorAll('.service-card')
      serviceCards.forEach((card, cardIndex) => {

        gsap.set(card, { y: 50, opacity: 0, scale: 0.95 })

        // mobile - overlay com scroll
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

            // mobile, overlay após a animação do card
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

  return (
    <div>
      <Hero />

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

      {/* Serviços Section */}
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
            {SERVICES.map((service) => {
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

      <CTASection />
    </div>
  )
}
