'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'

// GSAP imports
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

export default function Contactos() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    servico: '',
    mensagem: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  // Refs para animações
  const headerRef = useRef(null)
  const headerParagraphRef = useRef(null)
  const formRef = useRef(null)
  const rightContentRef = useRef(null)
  const droneRef = useRef(null)

  // Register GSAP plugins
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText)
  }, [])

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {

      // 1. Header - HERO TYPE ANIMATION
      const headerSplit = new SplitText(headerRef.current, {
        type: "lines,words",
        linesClass: "overflow-hidden"
      })

      const headerParagraphSplit = new SplitText(headerParagraphRef.current, {
        type: "lines",
        linesClass: "overflow-hidden"
      })

      gsap.set(headerSplit.words, { y: 100, opacity: 0 })
      gsap.set(headerParagraphSplit.lines, { y: 50, opacity: 0 })

      ScrollTrigger.create({
        trigger: headerRef.current,
        start: "top 90%",
        onEnter: () => {
          gsap.to(headerSplit.words, {
            y: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.08,
            ease: "power4.out"
          })

          gsap.to(headerParagraphSplit.lines, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            delay: 0.8
          })
        }
      })

      // 2. Form animation
      gsap.set(formRef.current, { x: -50, opacity: 0 })

      // Desktop - elementos à direita
      if (rightContentRef.current && droneRef.current) {
        gsap.set(rightContentRef.current, { x: 50, opacity: 0 })
        gsap.set(droneRef.current, { y: 50, opacity: 0, scale: 0.9 })
      }

      ScrollTrigger.create({
        trigger: formRef.current,
        start: "top 75%",
        onEnter: () => {
          const tl = gsap.timeline()

          tl.to(formRef.current, {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out"
          })

          // Desktop elements
          if (rightContentRef.current && droneRef.current) {
            tl.to(rightContentRef.current, {
              x: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power3.out"
            }, "-=0.6")
            .to(droneRef.current, {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 1,
              ease: "power3.out"
            }, "-=0.4")
          }
        }
      })

      // 3. Parallax na imagem (só desktop)
      if (droneRef.current) {
        gsap.to(droneRef.current, {
          yPercent: -20,
          ease: "none",
          scrollTrigger: {
            trigger: droneRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1
          }
        })
      }

    })

    return () => ctx.revert()
  }, [])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitStatus('success')
      setFormData({
        nome: '',
        email: '',
        telefone: '',
        servico: '',
        mensagem: ''
      })
    }, 2000)
  }

  return (
    <div className="pt-24">

      {/* Header - GAP REDUZIDO */}
      <section className="py-12 md:py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-5xl">
            <h1
              ref={headerRef}
              className="text-4xl md:text-7xl lg:text-8xl font-bold mb-8 md:mb-10 leading-[0.9] text-black"
            >
              Entre em contacto
            </h1>
            <p
              ref={headerParagraphRef}
              className="text-xl md:text-2xl lg:text-3xl text-gray-700 leading-relaxed font-medium max-w-4xl"
            >
              Solicite o seu orçamento personalizado. Vamos conversar sobre como podemos elevar o seu projeto com captação aérea profissional.
            </p>
          </div>
        </div>
      </section>

      {/* Layout - Mobile sem sobreposição */}
      <section className="py-8 md:py-16 px-4">
        <div className="max-w-7xl mx-auto">

          {/* Mobile Layout - Stack sem sobreposição */}
          <div className="block md:hidden space-y-8">

            {/* Contactos diretos mobile - NO TOPO */}
            <div className="text-center space-y-4 text-lg text-black font-bold bg-gray-50 p-6 rounded-lg">
              <div className="hover:text-gray-600 transition-colors">
                email@allperspectives.com
              </div>
              <div className="hover:text-gray-600 transition-colors">
                +351 123 456 789
              </div>
              <div className="text-gray-700 font-semibold">
                Porto, Portugal
              </div>
              <p className="text-xl font-bold text-gray-300 italic mt-4">
                Ready for lift-off?
              </p>
            </div>

            {/* Formulário mobile - SEPARADO */}
            <div ref={formRef}>

              {/* Success message */}
              {submitStatus === 'success' && (
                <div className="bg-green-50 border border-green-200 text-green-700 p-6 rounded-lg mb-8 shadow-sm">
                  <h4 className="font-bold mb-2">Mensagem enviada com sucesso!</h4>
                  <p>Entraremos em contacto em breve. Obrigado pelo seu interesse.</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">

                {/* Nome e Email */}
                <div className="space-y-6">
                  <div>
                    <input
                      type="text"
                      id="nome"
                      name="nome"
                      value={formData.nome}
                      onChange={handleChange}
                      required
                      className="w-full px-0 py-4 bg-transparent border-0 border-b-2 border-gray-200 text-black placeholder-gray-500 focus:border-black focus:outline-none transition-all duration-300 text-lg"
                      placeholder="Nome"
                    />
                  </div>

                  <div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-0 py-4 bg-transparent border-0 border-b-2 border-gray-200 text-black placeholder-gray-500 focus:border-black focus:outline-none transition-all duration-300 text-lg"
                      placeholder="Email"
                    />
                  </div>
                </div>

                {/* Telefone e Serviço */}
                <div className="space-y-6">
                  <div>
                    <input
                      type="tel"
                      id="telefone"
                      name="telefone"
                      value={formData.telefone}
                      onChange={handleChange}
                      className="w-full px-0 py-4 bg-transparent border-0 border-b-2 border-gray-200 text-black placeholder-gray-500 focus:border-black focus:outline-none transition-all duration-300 text-lg"
                      placeholder="Telefone"
                    />
                  </div>

                  <div>
                    <select
                      id="servico"
                      name="servico"
                      value={formData.servico}
                      onChange={handleChange}
                      required
                      className="w-full px-0 py-4 bg-transparent border-0 border-b-2 border-gray-200 text-black focus:border-black focus:outline-none transition-all duration-300 text-lg"
                    >
                      <option value="" className="bg-white">Tipo de serviço</option>
                      <option value="inspecoes" className="bg-white">Inspeções Técnicas</option>
                      <option value="imobiliario" className="bg-white">Marketing Imobiliário</option>
                      <option value="eventos" className="bg-white">Eventos & Institucional</option>
                      <option value="outro" className="bg-white">Outro</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <textarea
                    id="mensagem"
                    name="mensagem"
                    value={formData.mensagem}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-0 py-4 bg-transparent border-0 border-b-2 border-gray-200 text-black placeholder-gray-500 focus:border-black focus:outline-none transition-all duration-300 resize-none text-lg"
                    placeholder="Conte-nos sobre o seu projeto..."
                  />
                </div>

                {/* Submit */}
                <div className="pt-4 text-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-black text-white px-10 py-4 rounded font-bold hover:bg-gray-800 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                  >
                    {isSubmitting ? 'Enviando...' : 'Enviar mensagem'}
                  </button>
                </div>
              </form>
            </div>

            {/* Imagem drone mobile - NO FINAL */}
            <div className="w-full max-w-sm mx-auto">
              <div className="relative w-full h-64 rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="https://images.unsplash.com/photo-1473968512647-3e447244af8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Drone profissional"
                  fill
                  className="object-cover"
                  sizes="320px"
                />
              </div>
            </div>
          </div>

          {/* Desktop Layout - Original INTACTO */}
          <div className="hidden md:block relative">

            {/* Formulário à esquerda */}
            <div ref={formRef} className="max-w-2xl">

              {submitStatus === 'success' && (
                <div className="bg-green-50 border border-green-200 text-green-700 p-6 rounded-lg mb-12 shadow-sm">
                  <h4 className="font-bold mb-2">Mensagem enviada com sucesso!</h4>
                  <p>Entraremos em contacto em breve. Obrigado pelo seu interesse.</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-10">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div>
                    <input
                      type="text"
                      id="nome"
                      name="nome"
                      value={formData.nome}
                      onChange={handleChange}
                      required
                      className="w-full px-0 py-5 bg-transparent border-0 border-b-2 border-gray-200 text-black placeholder-gray-500 focus:border-black focus:outline-none transition-all duration-300 text-xl"
                      placeholder="Nome"
                    />
                  </div>

                  <div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-0 py-5 bg-transparent border-0 border-b-2 border-gray-200 text-black placeholder-gray-500 focus:border-black focus:outline-none transition-all duration-300 text-xl"
                      placeholder="Email"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div>
                    <input
                      type="tel"
                      id="telefone"
                      name="telefone"
                      value={formData.telefone}
                      onChange={handleChange}
                      className="w-full px-0 py-5 bg-transparent border-0 border-b-2 border-gray-200 text-black placeholder-gray-500 focus:border-black focus:outline-none transition-all duration-300 text-xl"
                      placeholder="Telefone"
                    />
                  </div>

                  <div>
                    <select
                      id="servico"
                      name="servico"
                      value={formData.servico}
                      onChange={handleChange}
                      required
                      className="w-full px-0 py-5 bg-transparent border-0 border-b-2 border-gray-200 text-black focus:border-black focus:outline-none transition-all duration-300 text-xl"
                    >
                      <option value="" className="bg-white">Tipo de serviço</option>
                      <option value="inspecoes" className="bg-white">Inspeções Técnicas</option>
                      <option value="imobiliario" className="bg-white">Marketing Imobiliário</option>
                      <option value="eventos" className="bg-white">Eventos & Institucional</option>
                      <option value="outro" className="bg-white">Outro</option>
                    </select>
                  </div>
                </div>

                <div>
                  <textarea
                    id="mensagem"
                    name="mensagem"
                    value={formData.mensagem}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-0 py-5 bg-transparent border-0 border-b-2 border-gray-200 text-black placeholder-gray-500 focus:border-black focus:outline-none transition-all duration-300 resize-none text-xl"
                    placeholder="Conte-nos sobre o seu projeto..."
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-black text-white px-10 py-5 rounded font-bold hover:bg-gray-800 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-xl"
                  >
                    {isSubmitting ? 'Enviando...' : 'Enviar mensagem'}
                  </button>
                </div>
              </form>
            </div>

            {/* Conteúdo à direita - desktop */}
            <div className="absolute right-8 top-0 text-right z-10">

              {/* Contactos diretos */}
              <div
                ref={rightContentRef}
                className="space-y-6 text-xl text-black font-bold mb-12"
              >
                <div className="hover:text-gray-600 transition-colors cursor-pointer">
                  email@allperspectives.com
                </div>
                <div className="hover:text-gray-600 transition-colors cursor-pointer">
                  +351 123 456 789
                </div>
                <div className="text-gray-700 font-semibold">
                  Porto, Portugal
                </div>
              </div>

              {/* Frase decorativa */}
              <div className="mb-16">
                <p className="text-2xl md:text-3xl font-bold text-gray-300 italic">
                  Ready for lift-off?
                </p>
              </div>
            </div>

            {/* Imagem drone - desktop */}
            <div
              ref={droneRef}
              className="absolute right-0 top-64 w-[380px] h-64 lg:w-[420px] lg:h-72 xl:w-[450px] xl:h-80 z-0"
            >
              <div className="relative w-full h-full">
                <Image
                  src="https://images.unsplash.com/photo-1473968512647-3e447244af8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Drone profissional"
                  fill
                  className="object-cover rounded-lg shadow-2xl"
                  sizes="(max-width: 1024px) 420px, 450px"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="py-16"></section>

    </div>
  )
}
