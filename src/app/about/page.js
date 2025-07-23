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
  const certificationRef = useRef(null)
  const skillsRef = useRef(null)

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

  // GSAP Animations - HERO TYPE + CONSISTENT
  useEffect(() => {
    if (!aboutData) return

    const ctx = gsap.context(() => {

      // 1. Statement Principal - HERO TYPE
      const statementSplit = new SplitText(statementRef.current, {
        type: "lines,words",
        linesClass: "overflow-hidden"
      })

      gsap.set(statementSplit.words, { y: 100, opacity: 0 })

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
        }
      })

      // 2. Layout principal - imagem + conteúdo em bloco
      gsap.set(imageRef.current, { x: -100, opacity: 0, scale: 0.9 })
      gsap.set(decorativeRef.current, { x: 50, opacity: 0 })
      gsap.set(titleRef.current, { y: 50, opacity: 0 })
      gsap.set(subtitleRef.current, { y: 30, opacity: 0 })
      gsap.set(textRefs.current, { y: 30, opacity: 0 })

      ScrollTrigger.create({
        trigger: imageRef.current,
        start: "top 80%",
        onEnter: () => {
          // Timeline para layout principal
          const tl = gsap.timeline()

          tl.to(imageRef.current, {
            x: 0,
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: "power3.out"
          })
          .to(decorativeRef.current, {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out"
          }, "-=0.8")
          .to([titleRef.current, subtitleRef.current], {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out"
          }, "-=0.6")
          .to(textRefs.current, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out"
          }, "-=0.4")
        }
      })

      // 3. Skills section - HERO TYPE
      if (skillsRef.current) {
        const skillsTitle = skillsRef.current.querySelector('h3')
        const skillsList = skillsRef.current.querySelectorAll('li')

        if (skillsTitle) {
          const skillsTitleSplit = new SplitText(skillsTitle, {
            type: "lines,words",
            linesClass: "overflow-hidden"
          })

          gsap.set(skillsTitleSplit.words, { y: 50, opacity: 0 })
          gsap.set(skillsList, { x: 30, opacity: 0 })

          ScrollTrigger.create({
            trigger: skillsRef.current,
            start: "top 80%",
            onEnter: () => {
              gsap.to(skillsTitleSplit.words, {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.08,
                ease: "power4.out"
              })

              gsap.to(skillsList, {
                x: 0,
                opacity: 1,
                duration: 0.6,
                stagger: 0.1,
                ease: "power3.out",
                delay: 0.4
              })
            }
          })
        }
      }

    })

    return () => ctx.revert()
  }, [aboutData])

  // Dados estáticos melhorados
  const staticData = {
    name: "Paulo Silva",
    title: "Piloto Certificado & Editor de Vídeo",
    certification: "ANAC A1/A3 • Operador Registado",
    description: [
      "Da pilotagem à pós-produção. Especialista que combina skills técnicos de voo com storytelling visual cinematográfico.",
      "Processo completo. Da planificação do voo até ao cut final. Cada projeto é uma narrativa visual que supera expectativas."
    ],
    skills: [
      "Pilotagem Profissional de Drones",
      "Edição de Vídeo & Pós-Produção",
      "Fotografia Aérea & Cinematografia",
      "Inspeções Técnicas Especializadas",
      "Storytelling Visual"
    ]
  }

  return (
    <div className="pt-24">

      {/* Statement gigante - HERO TYPE */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-5xl">
            <h1
              ref={statementRef}
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-12 leading-[0.9] text-black"
            >
              Transformamos perspectivas em experiências
            </h1>
          </div>
        </div>
      </section>

      {/* Layout orgânico principal */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto relative">

          {/* Foto grande - posição otimizada */}
          <div
            ref={imageRef}
            className="absolute left-8 top-0 w-80 h-96 lg:w-[400px] lg:h-[480px] xl:w-[450px] xl:h-[540px]"
          >
            <div className="relative w-full h-full overflow-hidden rounded-lg shadow-2xl">
              {aboutData?.profileImage?.asset?.url ? (
                <Image
                  src={aboutData.profileImage.asset.url}
                  alt={staticData.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 320px, (max-width: 1024px) 400px, 450px"
                />
              ) : (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                  <span className="text-8xl">👨‍✈️</span>
                </div>
              )}
            </div>
          </div>

          {/* Conteúdo à direita - rebalanceado */}
          <div className="ml-auto max-w-2xl pl-8 pt-12 text-right">

            {/* Frase decorativa */}
            <div className="mb-12">
              <p
                ref={decorativeRef}
                className="text-xl md:text-2xl font-bold text-gray-300 italic mb-8"
              >
                Conheça o piloto, editor, storyteller
              </p>

              {/* Nome e título agrupados */}
              <div>
                <h2
                  ref={titleRef}
                  className="text-4xl lg:text-5xl font-bold text-black mb-4"
                >
                  {staticData.name}
                </h2>
                <div ref={subtitleRef}>
                  <p className="text-xl text-gray-700 font-semibold mb-2">
                    {staticData.title}
                  </p>
                  <p className="text-base text-gray-600 font-medium">
                    {staticData.certification}
                  </p>
                </div>
              </div>
            </div>

            {/* Descrição principal */}
            <div className="space-y-6 text-lg text-gray-800 leading-relaxed text-right mb-12">
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

      {/* Skills Section - novo layout orgânico */}
      <section className="py-24 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* Skills à esquerda */}
            <div ref={skillsRef}>
              <h3 className="text-3xl md:text-4xl font-bold text-black mb-8">
                Especialidades & Skills
              </h3>
              <ul className="space-y-4">
                {staticData.skills.map((skill, index) => (
                  <li
                    key={index}
                    className="flex items-center text-lg text-gray-700 font-medium"
                  >
                    <span className="w-2 h-2 bg-black rounded-full mr-4 flex-shrink-0"></span>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>

            {/* Texto motivacional à direita */}
            <div className="text-right">
              <blockquote className="text-2xl md:text-3xl font-bold text-gray-800 leading-relaxed italic">
                "Cada voo é uma oportunidade de capturar algo único.
                Cada frame conta uma história."
              </blockquote>
              <p className="text-lg text-gray-600 mt-6 font-medium">
                — Filosofia de trabalho que guia cada projeto
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Espaço para breathing */}
      <section className="py-20"></section>

    </div>
  )
}
