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
  const rightContentRef = useRef(null)
  const droneRef = useRef(null)

  // Register GSAP plugins
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText)
  }, [])

  // GSAP Animations - Simplificadas
  useEffect(() => {
    const ctx = gsap.context(() => {

      // 1. Split Text no header por LINHAS
      const headerSplit = new SplitText(headerRef.current, {
        type: "lines",
        linesClass: "split-line"
      })

      gsap.set(headerSplit.lines, { y: 100, opacity: 0 })

      gsap.to(headerSplit.lines, {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out",
        delay: 0.5
      })

      // 2. Split Text no conteúdo direito (contactos + frase)
      const rightSplit = new SplitText(rightContentRef.current, {
        type: "lines",
        linesClass: "contact-line"
      })

      gsap.set(rightSplit.lines, { x: 50, opacity: 0 })

      ScrollTrigger.create({
        trigger: rightContentRef.current,
        start: "top 80%",
        onEnter: () => {
          gsap.to(rightSplit.lines, {
            x: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out"
          })
        }
      })

      // 3. Parallax subtil na imagem
      gsap.to(droneRef.current, {
        yPercent: -30,
        ease: "none",
        scrollTrigger: {
          trigger: droneRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      })

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

      {/* Header com Split Text */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl" ref={headerRef}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-[0.9] text-black">
              Entre em contacto
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-medium">
              Solicite o seu orçamento personalizado. Vamos conversar sobre como podemos elevar o seu projeto com captação aérea profissional.
            </p>
          </div>
        </div>
      </section>

      {/* Layout orgânico - Form + Imagem + Contactos */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto relative">

          {/* Formulário à esquerda */}
          <div className="max-w-xl">
            {submitStatus === 'success' && (
              <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg mb-8">
                Mensagem enviada com sucesso! Entraremos em contacto em breve.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-black text-white px-8 py-4 rounded font-semibold hover:bg-gray-800 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar mensagem'}
                </button>
              </div>
            </form>
          </div>

          {/* Contactos + frase decorativa - ACIMA da imagem */}
          <div
            ref={rightContentRef}
            className="absolute right-8 top-0 text-right z-10"
          >
            <div className="space-y-4 text-lg text-black font-semibold">
              <div>email@allperspectives.com</div>
              <div>+351 123 456 789</div>
              <div>Porto, Portugal</div>
            </div>

            {/* Frase decorativa */}
            <div className="mt-8">
              <p className="text-xl md:text-2xl font-bold text-gray-300 italic">
                Ready for lift-off?
              </p>
            </div>
          </div>

          {/* Imagem do drone - ABAIXO dos contactos */}
          <div
            ref={droneRef}
            className="absolute right-0 top-40 w-[400px] h-72 lg:w-[450px] lg:h-80 z-0"
          >
            <div className="relative w-full h-full">
              <Image
                src="https://images.unsplash.com/photo-1473968512647-3e447244af8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Drone profissional"
                fill
                className="object-cover shadow-xl"
                sizes="(max-width: 768px) 100vw, 450px"
              />
            </div>
          </div>

        </div>
      </section>

      {/* Espaço extra */}
      <section className="py-32"></section>

    </div>
  )
}
