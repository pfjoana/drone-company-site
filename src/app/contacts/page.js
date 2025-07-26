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
        linesClass: "overflow-visible"
      })

      const headerParagraphSplit = new SplitText(headerParagraphRef.current, {
        type: "lines",
        linesClass: "overflow-visible"
      })

      gsap.set(headerSplit.words, { y: 100, opacity: 0 })
      gsap.set(headerParagraphSplit.lines, { y: 50, opacity: 0 })

      // Remover overflow hidden das linhas
      gsap.set(headerSplit.lines, { overflow: "visible" })
      gsap.set(headerParagraphSplit.lines, { overflow: "visible" })

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

      ScrollTrigger.create({
        trigger: formRef.current,
        start: "top 75%",
        onEnter: () => {
          gsap.to(formRef.current, {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out"
          })
        }
      })

      // 3. Desktop contactos animation - SÓ SE EXISTIR
      if (rightContentRef.current) {
        const contactItems = rightContentRef.current.querySelectorAll('.contact-item')

        if (contactItems.length > 0) {
          gsap.set(contactItems, { y: 30, opacity: 0 })

          ScrollTrigger.create({
            trigger: rightContentRef.current,
            start: "top 80%",
            onEnter: () => {
              gsap.to(contactItems, {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.15,
                ease: "power3.out"
              })
            }
          })
        }
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

      {/* Header - Subtítulo atualizado */}
      <section className="py-12 md:py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-5xl">
            <h1
              ref={headerRef}
              className="text-4xl md:text-7xl lg:text-8xl font-bold mb-8 md:mb-10 leading-[1.1] text-black"
            >
              Entre em contacto
            </h1>
            <p
              ref={headerParagraphRef}
              className="text-xl md:text-2xl lg:text-3xl text-gray-700 leading-relaxed font-medium max-w-4xl"
            >
              Tem um desafio técnico por resolver? Vamos conversar sobre como
              a perspetiva aérea pode otimizar a sua operação.
            </p>
          </div>
        </div>
      </section>

      {/* Layout - Mobile melhorado */}
      <section className="py-8 md:py-16 px-4">
        <div className="max-w-7xl mx-auto">

          {/* Mobile Layout - Reorganizado */}
          <div className="block md:hidden space-y-8">

            {/* Contactos diretos mobile - NO TOPO COM INSTAGRAM */}
            <div className="text-center space-y-4 text-lg text-black font-bold bg-gray-50 p-6 rounded-lg">
              <div className="hover:text-gray-600 transition-colors">
                geral@allperspectives.pt
              </div>
              <div className="hover:text-gray-600 transition-colors">
                +351 919 490 318
              </div>
              <div className="text-gray-700 font-semibold">
                Porto, Portugal
              </div>
              <div className="border-t border-gray-200 pt-4 mt-4">
                <a
                  href="https://instagram.com/allperspectives.pt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-gray-600 hover:text-black transition-colors font-medium"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  <span>@allperspectives.pt</span>
                </a>
              </div>
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
                      <option value="inspecoes" className="bg-white">Inspeções Técnicas Aéreas</option>
                      <option value="acompanhamento" className="bg-white">Acompanhamento de Obras</option>
                      <option value="paineis" className="bg-white">Inspeção de Painéis Solares</option>
                      <option value="espacos" className="bg-white">Levantamento de Espaços Exteriores</option>
                      <option value="seguranca" className="bg-white">Verificação de Segurança</option>
                      <option value="conteudos" className="bg-white">Conteúdos Visuais</option>
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
                    placeholder="Conte-nos sobre o seu desafio técnico..."
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

            {/* Imagem drone mobile - REORGANIZADA com frase */}
            <div className="relative">
              {/* Frase "Ready for lift-off?" sobre a imagem */}
              <div className="text-center mb-4">
                <p className="text-2xl font-bold text-gray-400 italic">
                  Ready for lift-off?
                </p>
              </div>

              {/* Imagem */}
              {/* <div className="w-full max-w-sm mx-auto">
                <div className="relative w-full h-64 rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src="https://images.unsplash.com/photo-1473968512647-3e447244af8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="Drone profissional"
                    fill
                    className="object-cover"
                    sizes="320px"
                  />
                </div>
              </div> */}
            </div>
          </div>

          {/* Desktop Layout - ANIMAÇÕES CORRIGIDAS */}
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
                      <option value="inspecoes" className="bg-white">Inspeções Técnicas Aéreas</option>
                      <option value="acompanhamento" className="bg-white">Acompanhamento de Obras</option>
                      <option value="paineis" className="bg-white">Inspeção de Painéis Solares</option>
                      <option value="espacos" className="bg-white">Levantamento de Espaços Exteriores</option>
                      <option value="seguranca" className="bg-white">Verificação de Segurança</option>
                      <option value="conteudos" className="bg-white">Conteúdos Visuais</option>
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
                    placeholder="Conte-nos sobre o seu desafio técnico..."
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

            {/* Conteúdo à direita - desktop COM INSTAGRAM */}
            <div className="absolute right-8 top-0 text-right z-10">

              {/* Contactos diretos - COM CLASSES INDIVIDUAIS E INSTAGRAM */}
              <div ref={rightContentRef} className="space-y-6 text-xl text-black font-bold mb-12">
                <div className="contact-item hover:text-gray-600 transition-colors cursor-pointer">
                  geral@allperspectives.pt
                </div>
                <div className="contact-item hover:text-gray-600 transition-colors cursor-pointer">
                  +351 919 490 318
                </div>
                <div className="contact-item text-gray-700 font-semibold">
                  Porto, Portugal
                </div>
                <div className="contact-item border-t border-gray-200 pt-6">
                  <a
                    href="https://instagram.com/allperspectives.pt"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-3 text-gray-600 hover:text-black transition-colors font-medium text-lg"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                    <span>@allperspectives.pt</span>
                  </a>
                </div>
              </div>

              {/* Frase decorativa */}
              <div className="mb-16">
                <p className="text-2xl md:text-3xl font-bold text-gray-300 italic">
                  Ready for lift-off?
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="py-16"></section>

    </div>
  )
}
