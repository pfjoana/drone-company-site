'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { client, urlFor } from '../../lib/sanity'
import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'

export default function Hero() {
  const videoDesktopRef = useRef(null)
  const videoMobileRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
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
            backgroundVideoMobile{
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
        setHeroData(data)
      } catch (error) {
        console.error('Error fetching hero data:', error)
      }
    }

    fetchHeroData()
  }, [])

  useEffect(() => {
    // Auto-play videos when loaded
    if (videoDesktopRef.current) {
      videoDesktopRef.current.play().catch(console.error)
    }
    if (videoMobileRef.current) {
      videoMobileRef.current.play().catch(console.error)
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
    return videoAsset.asset.url
  }

  return (
    <section className="relative h-screen w-full overflow-hidden">

      {/* Desktop Video */}
      {heroData?.backgroundVideo && (
        <video
          ref={videoDesktopRef}
          className="hidden md:block absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={getVideoUrl(heroData.backgroundVideo)} type="video/mp4" />
          Este navegador não suporta vídeo.
        </video>
      )}

      {/* Mobile Video */}
      {heroData?.backgroundVideoMobile && (
        <video
          ref={videoMobileRef}
          className="md:hidden absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={getVideoUrl(heroData.backgroundVideoMobile)} type="video/mp4" />
          Este navegador não suporta vídeo.
        </video>
      )}

      {/* Fallbacks: imagem ou fundo preto, se não houver vídeo */}
      {!heroData?.backgroundVideo && !heroData?.backgroundVideoMobile && heroData?.backgroundImage && (
        <div
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('${urlFor(heroData.backgroundImage).url()}')`
          }}
        />
      )}
      {!heroData?.backgroundVideo && !heroData?.backgroundVideoMobile && !heroData?.backgroundImage && (
        <div className="absolute top-0 left-0 w-full h-full bg-black" />
      )}

      {/* Overlay de contraste */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/15 to-transparent" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-start pt-40 px-4">
        <div className="max-w-7xl mx-auto w-full">
          <div className="max-w-sm lg:max-w-md bg-black/40 backdrop-blur-sm shadow-2xl p-6 lg:p-8 text-center">
            <h1
              ref={titleRef}
              className="text-2xl md:text-3xl lg:text-4xl font-bold mb-5 leading-[0.9] text-white"
              style={{
                textShadow: '2px 2px 8px rgba(0,0,0,0.8)'
              }}
            >
              Captação Aérea
              <br />
              <span className="font-extrabold">Profissional</span>
            </h1>
            <div ref={subtitleRef} className="mb-6">
              <p
                className="text-sm md:text-base lg:text-lg text-white font-semibold"
                style={{
                  textShadow: '1px 1px 6px rgba(0,0,0,0.8)'
                }}
              >
                Imagens aéreas para gestão técnica e energética
              </p>
            </div>

            {/* Botões */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/#servicos"
                className="bg-white text-black px-6 py-3 font-bold hover:bg-white/90 transition-all duration-300 shadow-lg text-sm"
              >
                Conhecer Serviços
              </Link>
              <Link
                href="/contacts"
                className="border-2 border-white text-white px-6 py-3 font-bold hover:bg-white/20 transition-all duration-300 text-sm"
                style={{
                  textShadow: '1px 1px 4px rgba(0,0,0,0.6)'
                }}
              >
                Entre em Contacto
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
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
