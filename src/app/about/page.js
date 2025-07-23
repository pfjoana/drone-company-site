'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { client, urlFor } from '../../lib/sanity'

// GSAP imports
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

export default function Sobre() {
  const [aboutData, setAboutData] = useState(null)

  // Refs para animações
  const statementRef = useRef(null)
  const decorativeRef = useRef(null)
  const imageRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const textRefs = useRef([])

  // Register GSAP plugins
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText)
  }, [])

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
        console.log('About data:', data)
        setAboutData(data)
      } catch (error) {
        console.error('Error fetching about data:', error)
      }
    }

    fetchAboutData()
  }, [])

  // GSAP Animations
  useEffect(() => {
    if (!aboutData) return // Wait for data to load

    const tl = gsap.timeline()

    // 1. Split Text no Statement
    const statementSplit = new SplitText(statementRef.current, {
      type: "lines,words",
      linesClass: "split-line"
    })

    // 2. Initial states (hidden)
    gsap.set(statementSplit.words, { y: 100, opacity: 0 })
    gsap.set(decorativeRef.current, { x: 50, opacity: 0 })
    gsap.set(imageRef.current, { x: -100, opacity: 0 })
    gsap.set(titleRef.current, { x: 50, opacity: 0 })
    gsap.set(subtitleRef.current, { x: 50, opacity: 0 })
    gsap.set(textRefs.current, { y: 30, opacity: 0 })

    // 3. Animation sequence
    tl.to(statementSplit.words, {
      y: 0,
      opacity: 1,
      duration: 1.2,
      stagger: 0.05,
      ease: "power3.out"
    })
    .to(decorativeRef.current, {
      x: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.6")
    .to(imageRef.current, {
      x: 0,
      opacity: 1,
      duration: 1,
      ease: "power3.out"
    }, "-=0.4")
    .to(titleRef.current, {
      x: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.6")
    .to(subtitleRef.current, {
      x: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.6")
    .to(textRefs.current, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out"
    }, "-=0.4")

    // Cleanup
    return () => {
      statementSplit.revert()
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [aboutData])

  // Dados estáticos
  const staticData = {
    name: "Paulo Silva",
    title: "Piloto Certificado & Editor de Vídeo",
    description: [
      "Da pilotagem à pós-produção. Especialista que combina skills técnicos de voo com storytelling visual cinematográfico.",
      "Processo completo. Da planificação do voo até ao cut final. Cada projeto é uma narrativa visual que supera expectativas."
    ]
  }

  return (
    <div className="pt-24">

      {/* Statement gigante no canto */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl">
            <h1
              ref={statementRef}
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-[0.9] text-black"
            >
              Transformamos perspectivas em experiências
            </h1>
          </div>
        </div>
      </section>

      {/* Layout orgânico rebalanceado */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto relative">

          {/* Foto grande - posição ajustada */}
          <div
            ref={imageRef}
            className="absolute left-8 top-0 w-96 h-[450px] lg:w-[450px] lg:h-[550px]"
          >
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
                  <span className="text-8xl"></span>
                </div>
              )}
            </div>
          </div>

          {/* Conteúdo agrupado à direita */}
          <div className="ml-auto max-w-2xl pl-8 pt-8 text-right">

            {/* Frase decorativa + Nome agrupados */}
            <div className="mb-12">
              <p
                ref={decorativeRef}
                className="text-xl md:text-2xl font-bold text-gray-300 italic mb-8"
              >
                Conheça o piloto, editor, storyteller
              </p>

              <h2
                ref={titleRef}
                className="text-4xl lg:text-5xl font-bold text-black mb-4"
              >
                Paulo Silva
              </h2>
              <div ref={subtitleRef}>
                <p className="text-xl text-gray-700 font-semibold">
                  Piloto Certificado & Editor de Vídeo
                </p>
                <p className="text-base text-gray-600 font-medium mt-2">
                  ANAC A1/A3
                </p>
              </div>
            </div>

            {/* Texto mais intenso e bold */}
            <div className="space-y-6 text-lg text-gray-800 leading-relaxed text-right">
              {staticData.description.map((paragraph, index) => (
                <p
                  key={index}
                  ref={el => textRefs.current[index] = el}
                  className="font-semibold"
                  dangerouslySetInnerHTML={{
                    __html: paragraph.replace(/^([^.]+\.)/, '<strong>$1</strong>')
                  }}
                />
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Espaço extra para breathing */}
      <section className="py-32"></section>

    </div>
  )
}
