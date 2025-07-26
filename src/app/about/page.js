'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { client, urlFor } from '../../lib/sanity'

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
  const valuesRef = useRef(null)
  const missionSectionRef = useRef(null) // NOVA REF PARA MISSÃO/ABORDAGEM

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

    // Aguardar um frame para garantir que as refs estão disponíveis
    requestAnimationFrame(() => {
      const ctx = gsap.context(() => {

      // 1. Statement Principal - HERO TYPE
      const statementSplit = new SplitText(statementRef.current, {
        type: "lines,words",
        linesClass: "overflow-visible"
      })

      gsap.set(statementSplit.words, { y: 100, opacity: 0 })

      // Remover overflow hidden das linhas após criar o split
      gsap.set(statementSplit.lines, { overflow: "visible" })

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

      // 5. Mission Section Animation - SIMPLIFICADA
      // Aguardar um pouco mais para garantir que o DOM está pronto
      setTimeout(() => {
        const missionSection = document.querySelector('[data-section="mission"]')
        console.log('Mission section by selector:', missionSection)

        if (missionSection) {
          const missionTitles = missionSection.querySelectorAll('h3')
          const missionParagraphs = missionSection.querySelectorAll('p')

          console.log('Mission titles found:', missionTitles.length)
          console.log('Mission paragraphs found:', missionParagraphs.length)

          if (missionTitles.length > 0 && missionParagraphs.length > 0) {
            // Set initial states
            gsap.set(missionTitles, { y: 50, opacity: 0 })
            gsap.set(missionParagraphs, { y: 30, opacity: 0 })

            ScrollTrigger.create({
              trigger: missionSection,
              start: "top 80%",
              onEnter: () => {
                console.log('Mission section animation triggered!')

                gsap.to(missionTitles, {
                  y: 0,
                  opacity: 1,
                  duration: 0.8,
                  stagger: 0.2,
                  ease: "power3.out"
                })

                gsap.to(missionParagraphs, {
                  y: 0,
                  opacity: 1,
                  duration: 0.8,
                  stagger: 0.1,
                  ease: "power3.out",
                  delay: 0.4
                })
              }
            })
          }
        }
      }, 500)

      // 6. Values Section Animation - NOVA ESTRUTURA
      if (valuesRef.current) {
        const valuesTitle = valuesRef.current.querySelector('.values-title')
        const valueCards = valuesRef.current.querySelectorAll('.value-card')

        if (valuesTitle) {
          const valuesTitleSplit = new SplitText(valuesTitle, {
            type: "lines,words",
            linesClass: "overflow-hidden"
          })

          gsap.set(valuesTitleSplit.words, { y: 100, opacity: 0 })
          gsap.set(valueCards, { y: 50, opacity: 0, scale: 0.95 })

          ScrollTrigger.create({
            trigger: valuesRef.current,
            start: "top 80%",
            onEnter: () => {
              gsap.to(valuesTitleSplit.words, {
                y: 0,
                opacity: 1,
                duration: 1,
                stagger: 0.08,
                ease: "power4.out"
              })

              gsap.to(valueCards, {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.8,
                stagger: 0.15,
                ease: "back.out(1.7)",
                delay: 0.6
              })
            }
          })
        }
        }
      })

      return () => ctx.revert()
    })
  }, [aboutData])

  const staticData = {
    name: "Paulo Silva",
    credentials: [
      "Facility Management • Porto Business School",
      "Piloto Certificado ANAC A1/A3"
    ],
    description: [
      "Formado em Facility Management e piloto certificado, Paulo combina conhecimento técnico de gestão de ativos com a capacidade de capturar dados aéreos precisos. Esta dupla competência permite identificar problemas que métodos convencionais não conseguem detetar, oferecendo soluções visuais que transformam a forma como as operações são geridas."
    ],
    skills: [
      "Gestão Técnica de Ativos",
      "Operação Profissional de Drones",
      "Monitorização de Infraestruturas",
      "Otimização de Operações"
    ]
  }

  return (
    <div className="pt-24">

      <section className="py-12 md:py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-5xl">
            <h1
              ref={statementRef}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 md:mb-8 leading-[1.2] text-black"
              style={{ paddingBottom: '0.1em' }}
            >
              Da gestão ao voo:<br />uma abordagem única
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
                  <div className="w-full h-full bg-gray-200"></div>
                )}
              </div>
            </div>

            {/* Conteúdo mobile */}
            <div className="text-center space-y-6">
              <p ref={mobileDecorativeRef} className="text-lg font-bold text-gray-300 italic">
                Conheça quem está por trás da All Perspectives
              </p>

              <div>
                <h2 ref={mobileTitleRef} className="text-3xl font-bold text-black mb-3">
                  {staticData.name}
                </h2>
                <div ref={mobileSubtitleRef} className="space-y-1">
                  {staticData.credentials.map((credential, index) => (
                    <p key={index} className="text-base text-gray-600 font-medium">
                      {credential}
                    </p>
                  ))}
                </div>
              </div>

              <div className="space-y-4 text-base text-gray-800 leading-relaxed max-w-md mx-auto">
                {staticData.description.map((paragraph, index) => (
                  <p
                    key={index}
                    ref={el => mobileTextRefs.current[index] = el}
                    className="font-medium"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Desktop Layout*/}
          <div className="hidden md:block relative">

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
                  <div className="w-full h-full bg-gray-200"></div>
                )}
              </div>
            </div>

            {/* Conteúdo à direita */}
            <div className="ml-auto max-w-2xl pl-8 pt-12 text-right">

              <div className="mb-12">
                <p ref={decorativeRef} className="text-xl md:text-2xl font-bold text-gray-300 italic mb-8">
                  Conheça quem está por trás da All Perspectives
                </p>

                <div>
                  <h2 ref={titleRef} className="text-4xl lg:text-5xl font-bold text-black mb-4">
                    {staticData.name}
                  </h2>
                  <div ref={subtitleRef} className="space-y-2">
                    {staticData.credentials.map((credential, index) => (
                      <p key={index} className="text-base text-gray-600 font-medium">
                        {credential}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6 text-lg text-gray-800 leading-relaxed text-right mb-12">
                {staticData.description.map((paragraph, index) => (
                  <p
                    key={index}
                    ref={el => textRefs.current[index] = el}
                    className="font-medium"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-16 md:py-24 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

            <div ref={skillsRef}>
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-6 md:mb-8 text-center lg:text-left">
                Áreas de Especialização
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

            <div className="text-center lg:text-right">
              <blockquote className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 leading-relaxed italic">
                "A verdadeira inovação acontece quando unimos conhecimento técnico
                com uma perspetiva diferente. É isso que fazemos todos os dias."
              </blockquote>
              <p className="text-base md:text-lg text-gray-600 mt-4 md:mt-6 font-medium">
                — A abordagem que define cada projeto da All Perspectives
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Seção adicional - Missão & Abordagem */}
      <section className="py-16 md:py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">

            {/* Abordagem */}
            <div className="text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold text-black mb-6">
                A Nossa Abordagem
              </h3>
              <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
                <p className="font-medium">
                  Cada desafio tem características únicas.
                </p>
                <p className="font-medium">
                  Não oferecemos apenas um serviço de drone - oferecemos uma
                  perspetiva estratégica que transforma dados aéreos em decisões
                  operacionais inteligentes.
                </p>
              </div>
            </div>

            {/* Missão */}
            <div className="text-center md:text-right">
              <h3 className="text-2xl md:text-3xl font-bold text-black mb-6">
                Missão & Objetivos
              </h3>
              <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
                <p className="font-medium">
                  Oferecer soluções de captação aérea que combinam precisão técnica e criatividade visual, acrescentando valor real à gestão de edifícios, infraestruturas e comunicação institucional. Ajudamos os nossos clientes a ver melhor, decidir melhor e agir com confiança.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECÇÃO DE VALORES - VERSÃO ANTERIOR COM ALINHAMENTO CENTRO */}
      <section className="py-20 md:py-32 px-4 bg-gray-50" ref={valuesRef}>
        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-16 md:mb-20">
            <h2 className="values-title text-4xl md:text-5xl lg:text-6xl font-bold text-black">
              Valores
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">

            {/* Perspetiva */}
            <div className="value-card text-center space-y-4">
              <h3 className="text-2xl md:text-3xl font-bold text-black">
                Perspetiva
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed font-medium">
                Acreditamos que ver de outro ângulo é essencial para resolver problemas,
                comunicar com impacto e antecipar decisões.
              </p>
            </div>

            {/* Confiança */}
            <div className="value-card text-center space-y-4">
              <h3 className="text-2xl md:text-3xl font-bold text-black">
                Confiança
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed font-medium">
                Construímos relações com base na transparência, fiabilidade e foco
                no que realmente importa para os nossos clientes.
              </p>
            </div>

            {/* Eficiência */}
            <div className="value-card text-center space-y-4">
              <h3 className="text-2xl md:text-3xl font-bold text-black">
                Eficiência
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed font-medium">
                Valorizamos o tempo e os recursos dos nossos clientes — entregamos
                o essencial, sem desperdício.
              </p>
            </div>

          </div>
        </div>
      </section>

      <section className="py-12 md:py-20"></section>

    </div>
  )
}
