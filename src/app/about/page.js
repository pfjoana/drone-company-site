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
  const mobileImageRef = useRef(null)
  const mobileDecorativeRef = useRef(null)
  const mobileTitleRef = useRef(null)
  const mobileSubtitleRef = useRef(null)
  const mobileTextRefs = useRef([])
  const desktopImageRef = useRef(null)
  const decorativeRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const textRefs = useRef([])
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

  // GSAP Animations
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

      // 2. Mobile Layout Animation
      if (mobileImageRef.current) {
        gsap.set([mobileImageRef.current, mobileDecorativeRef.current, mobileTitleRef.current, mobileSubtitleRef.current, ...mobileTextRefs.current], { y: 50, opacity: 0 })

        ScrollTrigger.create({
          trigger: mobileImageRef.current,
          start: "top 80%",
          onEnter: () => {
            const tl = gsap.timeline()

            tl.to(mobileImageRef.current, {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: "power3.out"
            })
            .to([mobileDecorativeRef.current, mobileTitleRef.current, mobileSubtitleRef.current], {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.2,
              ease: "power3.out"
            }, "-=0.6")
            .to(mobileTextRefs.current, {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.15,
              ease: "power3.out"
            }, "-=0.4")
          }
        })
      }

      // 3. Desktop Layout Animation
      if (desktopImageRef.current) {
        gsap.set(desktopImageRef.current, { x: -100, opacity: 0, scale: 0.9 })
        gsap.set([decorativeRef.current, titleRef.current, subtitleRef.current, ...textRefs.current], { x: 50, y: 30, opacity: 0 })

        ScrollTrigger.create({
          trigger: desktopImageRef.current,
          start: "top 80%",
          onEnter: () => {
            const tl = gsap.timeline()

            tl.to(desktopImageRef.current, {
              x: 0,
              opacity: 1,
              scale: 1,
              duration: 1.2,
              ease: "power3.out"
            })
            .to([decorativeRef.current, titleRef.current, subtitleRef.current, ...textRefs.current], {
              x: 0,
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.15,
              ease: "power3.out"
            }, "-=0.6")
          }
        })
      }

      // 4. Skills + Quote section
      if (skillsRef.current) {
        const skillsTitle = skillsRef.current.querySelector('h3')
        const skillsList = skillsRef.current.querySelectorAll('li')
        const quote = document.querySelector('blockquote')
        const quoteAuthor = quote?.nextElementSibling

        if (skillsTitle) {
          const skillsTitleSplit = new SplitText(skillsTitle, {
            type: "lines,words",
            linesClass: "overflow-hidden"
          })

          gsap.set(skillsTitleSplit.words, { y: 50, opacity: 0 })
          gsap.set(skillsList, { x: 30, opacity: 0 })
          gsap.set([quote, quoteAuthor], { y: 50, opacity: 0 })

          ScrollTrigger.create({
            trigger: skillsRef.current,
            start: "top 80%",
            onEnter: () => {
              const tl = gsap.timeline()

              tl.to(skillsTitleSplit.words, {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.08,
                ease: "power4.out"
              })
              .to(skillsList, {
                x: 0,
                opacity: 1,
                duration: 0.6,
                stagger: 0.1,
                ease: "power3.out"
              }, "-=0.4")
              .to([quote, quoteAuthor], {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.2,
                ease: "power3.out"
              }, "-=0.6")
            }
          })
        }
      }

    })

    return () => ctx.revert()
  }, [aboutData])

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

      {/* Statement - GAP REDUZIDO */}
      <section className="py-12 md:py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-5xl">
            <h1
              ref={statementRef}
              className="text-4xl md:text-7xl lg:text-8xl font-bold mb-6 md:mb-8 leading-[0.9] text-black"
            >
              Transformamos perspectivas em experiências
            </h1>
          </div>
        </div>
      </section>

      {/* Layout principal - MOBILE FIRST */}
      <section className="py-12 md:py-20 px-4">
        <div className="max-w-7xl mx-auto">

          {/* Mobile Layout - Stack vertical */}
          <div className="block md:hidden space-y-8">

            {/* Imagem mobile */}
            <div className="w-full max-w-sm mx-auto">
              <div ref={mobileImageRef} className="relative w-full h-80 overflow-hidden rounded-lg shadow-xl">
                {aboutData?.profileImage?.asset?.url ? (
                  <Image
                    src={aboutData.profileImage.asset.url}
                    alt={staticData.name}
                    fill
                    className="object-cover"
                    sizes="320px"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                    <span className="text-6xl">👨‍✈️</span>
                  </div>
                )}
              </div>
            </div>

            {/* Conteúdo mobile */}
            <div className="text-center space-y-6">
              <p ref={mobileDecorativeRef} className="text-lg font-bold text-gray-300 italic">
                Conheça o piloto, editor, storyteller
              </p>

              <div>
                <h2 ref={mobileTitleRef} className="text-3xl font-bold text-black mb-3">
                  {staticData.name}
                </h2>
                <div ref={mobileSubtitleRef}>
                  <p className="text-lg text-gray-700 font-semibold mb-1">
                    {staticData.title}
                  </p>
                  <p className="text-sm text-gray-600 font-medium">
                    {staticData.certification}
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-base text-gray-800 leading-relaxed max-w-md mx-auto">
                {staticData.description.map((paragraph, index) => (
                  <p
                    key={index}
                    ref={el => mobileTextRefs.current[index] = el}
                    className="font-semibold"
                    dangerouslySetInnerHTML={{
                      __html: paragraph.replace(/^([^.]+\.)/, '<strong>$1</strong>')
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Desktop Layout - Original */}
          <div className="hidden md:block relative">

            {/* Foto grande */}
            <div
              ref={desktopImageRef}
              className="absolute left-8 top-0 w-80 h-96 lg:w-[400px] lg:h-[480px] xl:w-[450px] xl:h-[540px]"
            >
              <div className="relative w-full h-full overflow-hidden rounded-lg shadow-2xl">
                {aboutData?.profileImage?.asset?.url ? (
                  <Image
                    src={aboutData.profileImage.asset.url}
                    alt={staticData.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 400px, 450px"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                    <span className="text-8xl">👨‍✈️</span>
                  </div>
                )}
              </div>
            </div>

            {/* Conteúdo à direita */}
            <div className="ml-auto max-w-2xl pl-8 pt-12 text-right">

              <div className="mb-12">
                <p ref={decorativeRef} className="text-xl md:text-2xl font-bold text-gray-300 italic mb-8">
                  Conheça o piloto, editor, storyteller
                </p>

                <div>
                  <h2 ref={titleRef} className="text-4xl lg:text-5xl font-bold text-black mb-4">
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
        </div>
      </section>

      {/* Skills Section - COM ANIMAÇÕES */}
      <section className="py-16 md:py-24 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

            {/* Skills */}
            <div ref={skillsRef}>
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-6 md:mb-8 text-center lg:text-left">
                Especialidades & Skills
              </h3>
              <ul className="space-y-3 md:space-y-4 max-w-md mx-auto lg:mx-0">
                {staticData.skills.map((skill, index) => (
                  <li
                    key={index}
                    className="flex items-center text-base md:text-lg text-gray-700 font-medium"
                  >
                    <span className="w-2 h-2 bg-black rounded-full mr-4 flex-shrink-0"></span>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>

            {/* Citação - COM ANIMAÇÃO */}
            <div className="text-center lg:text-right">
              <blockquote className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 leading-relaxed italic">
                "Cada voo é uma oportunidade de capturar algo único.
                Cada frame conta uma história."
              </blockquote>
              <p className="text-base md:text-lg text-gray-600 mt-4 md:mt-6 font-medium">
                — Filosofia de trabalho que guia cada projeto
              </p>
            </div>

          </div>
        </div>
      </section>

      <section className="py-12 md:py-20"></section>

    </div>
  )
}
