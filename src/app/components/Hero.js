'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { client, urlFor } from '../../lib/sanity'
import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'

export default function Hero() {
  const videoRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const buttonsRef = useRef(null)
  const scrollIndicatorRef = useRef(null)
  const [heroData, setHeroData] = useState(null)

  useEffect(() => {
    // Fetch hero data from Sanity
    const fetchHeroData = async () => {
      try {
        const data = await client.fetch(`
          *[_type == "hero"][0]{
            backgroundVideo{
              asset->{
                _id,
                url
              }
            },
            backgroundImage{
              asset->{
                _id,
                url
              }
            }
          }
        `)
        console.log('Hero data from Sanity:', data)
        setHeroData(data)
      } catch (error) {
        console.error('Error fetching hero data:', error)
      }
    }

    fetchHeroData()
  }, [])

  useEffect(() => {
    // Auto-play video when loaded
    if (videoRef.current) {
      videoRef.current.play().catch(console.error)
    }
  }, [heroData])

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {

      // Split text animations
      const titleSplit = new SplitText(titleRef.current, {
        type: "lines,words",
        linesClass: "overflow-hidden"
      })

      const subtitleSplit = new SplitText(subtitleRef.current, {
        type: "lines",
        linesClass: "overflow-hidden"
      })

      // Set initial states
      gsap.set(titleSplit.words, { y: 100, opacity: 0 })
      gsap.set(subtitleSplit.lines, { y: 50, opacity: 0 })
      gsap.set(buttonsRef.current, { y: 30, opacity: 0 })
      gsap.set(scrollIndicatorRef.current, { opacity: 0 })

      // Animation timeline
      const tl = gsap.timeline({ delay: 0.5 })

      tl.to(titleSplit.words, {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.08,
        ease: "power4.out"
      })
      .to(subtitleSplit.lines, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out"
      }, "-=0.6")
      .to(buttonsRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.4")
      .to(scrollIndicatorRef.current, {
        opacity: 1,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.2")

    })

    return () => ctx.revert()
  }, [heroData])

  // Get video URL helper
  const getVideoUrl = (videoAsset) => {
    if (!videoAsset?.asset) return null
    console.log('Video URL:', videoAsset.asset.url)
    return videoAsset.asset.url
  }

  return (
    <section className="relative h-screen w-full overflow-hidden">

      {/* Video or Image Background - CENTRO LIVRE PARA LOGO */}
      {heroData?.backgroundVideo ? (
        <video
          ref={videoRef}
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={getVideoUrl(heroData.backgroundVideo)} type="video/mp4" />
          O seu browser não suporta vídeos HTML5.
        </video>
      ) : heroData?.backgroundImage ? (
        <div
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('${urlFor(heroData.backgroundImage).url()}')`
          }}
        />
      ) : (
        // Fallback
        <div
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1473968512647-3e447244af8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`
          }}
        />
      )}

      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/30" />

      {/* Content - MAIS À ESQUERDA para deixar centro livre */}
      <div className="relative z-10 h-full flex flex-col justify-center px-4">
        <div className="max-w-7xl mx-auto w-full">
          {/* Contentor mais pequeno e mais à esquerda */}
          <div className="max-w-xl lg:max-w-2xl">

            {/* Título forte e impactante */}
            <h1
              ref={titleRef}
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-8 leading-[0.9] text-white drop-shadow-2xl"
            >
              Captação Aérea
              <br />
              <span className="text-white/90 font-extrabold">Profissional</span>
            </h1>

            {/* Subtítulo mais descritivo */}
            <div ref={subtitleRef} className="space-y-4 mb-12">
              <p className="text-lg md:text-xl lg:text-2xl text-white/95 drop-shadow-lg font-semibold">
                Transformamos perspectivas em experiências cinematográficas
              </p>
              <p className="text-base md:text-lg lg:text-xl text-white/85 drop-shadow-lg font-medium">
                Serviços especializados para inspeções, imobiliário e eventos
              </p>
            </div>

            {/* Botões */}
            <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/projects"
                className="bg-white text-black px-8 py-4 rounded-sm font-bold hover:bg-white/90 transition-all duration-300 shadow-xl text-lg"
              >
                Ver Projetos
              </Link>
              <Link
                href="/#servicos"
                className="border-2 border-white text-white px-8 py-4 rounded-sm font-bold hover:bg-white/10 transition-all duration-300 backdrop-blur-sm text-lg"
              >
                Nossos Serviços
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator melhorado */}
      <div ref={scrollIndicatorRef} className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex flex-col items-center space-y-2">
          <div className="w-6 h-10 border-2 border-white/80 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/90 rounded-full mt-2 animate-bounce" />
          </div>
          <span className="text-white/70 text-sm font-medium">Scroll</span>
        </div>
      </div>

    </section>
  )
}
