'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { client, urlFor } from '../../lib/sanity'

export default function Hero() {
  const videoRef = useRef(null)
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
        console.log('Hero data from Sanity:', data) // Debug
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

  // Get video URL helper
  const getVideoUrl = (videoAsset) => {
    if (!videoAsset?.asset) return null
    console.log('Video URL:', videoAsset.asset.url) // Debug
    return videoAsset.asset.url
  }

  return (
    <section className="relative h-screen w-full overflow-hidden">

      {/* Video or Image Background */}
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
        // Fallback para o placeholder do Unsplash
        <div
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1473968512647-3e447244af8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`
          }}
        />
      )}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content overlay */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-4">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white drop-shadow-lg">
          Captação Aérea
          <br />
          <span className="text-white/90">Profissional</span>
        </h1>

        <p className="text-lg md:text-xl lg:text-2xl text-white/95 mb-8 max-w-3xl drop-shadow-md">
          Serviços especializados de drone para inspeções, imobiliário e eventos.
          Qualidade cinematográfica ao seu alcance.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/projects"
            className="bg-white text-black px-8 py-3 rounded-sm font-semibold hover:bg-white/90 transition-colors duration-300"
          >
            Ver Projetos
          </Link>
          <Link
            href="/#servicos"
            className="border border-white text-white px-8 py-3 rounded-sm font-semibold hover:bg-white/10 transition-colors duration-300"
          >
            Saber Mais
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  )
}
