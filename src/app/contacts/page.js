'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'

// GSAP imports
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

import { CONTACT_INFO, INITIAL_FORM_DATA } from '../constants/contact'
import { SERVICE_OPTIONS } from '../constants/services'


const InstagramIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
)

const ContactInfo = ({ isMobile = false, rightContentRef = null }) => {
  const containerClass = isMobile
    ? "text-center space-y-4 text-lg text-black font-bold bg-gray-50 p-6 rounded-lg"
    : "space-y-6 text-xl text-black font-bold mb-12"

  const itemClass = !isMobile
    ? "contact-item"
    : undefined

  const locationClass = isMobile
    ? "text-gray-700 font-semibold"
    : "contact-item text-gray-700 font-semibold"

  const instagramContainerClass = isMobile
    ? "border-t border-gray-200 pt-4 mt-4"
    : "contact-item border-t border-gray-200 pt-6"

  const instagramLinkClass = isMobile
    ? "inline-flex items-center space-x-2 text-gray-600 hover:text-black transition-colors font-medium"
    : "inline-flex items-center space-x-3 text-gray-600 hover:text-black transition-colors font-medium text-lg"

  const iconSize = isMobile ? "w-5 h-5" : "w-6 h-6"

  return (
    <div ref={rightContentRef} className={containerClass}>
      <div className={itemClass}>
        {CONTACT_INFO.email}
      </div>
      <div className={itemClass}>
        {CONTACT_INFO.phone}
      </div>
      <div className={locationClass}>
        {CONTACT_INFO.location}
      </div>
      <div className={instagramContainerClass}>
        <a
          href={CONTACT_INFO.instagram.url}
          target="_blank"
          rel="noopener noreferrer"
          className={instagramLinkClass}
        >
          <InstagramIcon className={iconSize} />
          <span>{CONTACT_INFO.instagram.handle}</span>
        </a>
      </div>
    </div>
  )
}

const StatusMessage = ({ type }) => {
  const isSuccess = type === 'success'
  const bgColor = isSuccess ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'

  return (
    <div className={`${bgColor} border p-6 rounded-lg mb-8 md:mb-12 shadow-sm`}>
      <h4 className="font-bold mb-2">
        {isSuccess ? 'Mensagem enviada com sucesso!' : 'Erro ao enviar mensagem'}
      </h4>
      <p>
        {isSuccess
          ? 'Entraremos em contacto em breve. Obrigado pelo seu interesse.'
          : 'Ocorreu um erro. Tente novamente ou contacte-nos diretamente por email.'
        }
      </p>
    </div>
  )
}

const FormField = ({ type = "text", name, value, onChange, placeholder, required = false, options = null, rows = null, isMobile = false }) => {
  const baseClassName = `w-full px-0 ${isMobile ? 'py-4' : 'py-5'} bg-transparent border-0 border-b-2 border-gray-200 text-black placeholder-gray-500 focus:border-black focus:outline-none transition-all duration-300 ${isMobile ? 'text-lg' : 'text-xl'}`

  if (type === 'select') {
    return (
      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={baseClassName}
      >
        {options.map(option => (
          <option key={option.value} value={option.value} className="bg-white">
            {option.label}
          </option>
        ))}
      </select>
    )
  }

  if (type === 'textarea') {
    return (
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        rows={rows}
        className={`${baseClassName} resize-none`}
        placeholder={placeholder}
      />
    )
  }

  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className={baseClassName}
      placeholder={placeholder}
    />
  )
}

const ContactForm = ({ formData, handleChange, handleSubmit, isSubmitting, isMobile = false }) => (
  <form onSubmit={handleSubmit} className={isMobile ? "space-y-6" : "space-y-10"}>
    <div className={isMobile ? "space-y-6" : "grid grid-cols-1 md:grid-cols-2 gap-10"}>
      <FormField
        name="nome"
        value={formData.nome}
        onChange={handleChange}
        placeholder="Nome"
        required
        isMobile={isMobile}
      />
      <FormField
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        required
        isMobile={isMobile}
      />
    </div>

    <div className={isMobile ? "space-y-6" : "grid grid-cols-1 md:grid-cols-2 gap-10"}>
      <FormField
        type="tel"
        name="telefone"
        value={formData.telefone}
        onChange={handleChange}
        placeholder="Telefone"
        isMobile={isMobile}
      />
      <FormField
        type="select"
        name="servico"
        value={formData.servico}
        onChange={handleChange}
        options={SERVICE_OPTIONS}
        required
        isMobile={isMobile}
      />
    </div>

    <FormField
      type="textarea"
      name="mensagem"
      value={formData.mensagem}
      onChange={handleChange}
      placeholder="Conte-nos sobre o seu desafio técnico..."
      rows={isMobile ? 4 : 5}
      required
      isMobile={isMobile}
    />

    <div className={`pt-4 ${isMobile ? 'text-center' : ''}`}>
      <button
        type="submit"
        disabled={isSubmitting}
        className={`bg-black text-white px-10 rounded font-bold hover:bg-gray-800 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
          isMobile ? 'py-4 text-lg' : 'py-5 text-xl'
        }`}
      >
        {isSubmitting ? 'Enviando...' : 'Enviar mensagem'}
      </button>
    </div>
  </form>
)

export default function Contactos() {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  // Refs para animações
  const headerRef = useRef(null)
  const headerParagraphRef = useRef(null)
  const formRef = useRef(null)
  const rightContentRef = useRef(null)

  // Register GSAP plugins
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText)
  }, [])

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {

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

      // 3. Desktop contactos animation
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
    setSubmitStatus(null)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.nome,
          email: formData.email,
          phone: formData.telefone,
          service: formData.servico,
          message: formData.mensagem
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitStatus('success')
        setFormData(INITIAL_FORM_DATA)
      } else {
        setSubmitStatus('error')
        console.error('Erro do servidor:', data.error)
      }
    } catch (error) {
      setSubmitStatus('error')
      console.error('Erro de rede:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="pt-24">
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

      {/* Layout - Mobile */}
      <section className="py-8 md:py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="block md:hidden space-y-8">
            <ContactInfo isMobile />

            <div ref={formRef}>
              {submitStatus && <StatusMessage type={submitStatus} />}

              <ContactForm
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                isMobile={true}
              />
            </div>

            <div className="relative">
              <div className="text-center mb-4">
                <p className="text-2xl font-bold text-gray-400 italic">
                  Ready for lift-off?
                </p>
              </div>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden md:block relative">
            <div ref={formRef} className="max-w-2xl">
              {submitStatus && <StatusMessage type={submitStatus} />}

              <ContactForm
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                isMobile={false}
              />
            </div>

            <div className="absolute right-8 top-0 text-right z-10">
              <ContactInfo rightContentRef={rightContentRef} />

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
