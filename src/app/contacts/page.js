'use client'

import { useState } from 'react'
import Image from 'next/image'

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simular envio (depois implementar com API real)
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

      {/* Statement + texto marketing */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl">
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

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                    className="w-full px-0 py-4 bg-transparent border-0 border-b-2 border-gray-200 text-black placeholder-gray-500 focus:border-black focus:outline-none transition-colors text-lg"
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
                    className="w-full px-0 py-4 bg-transparent border-0 border-b-2 border-gray-200 text-black placeholder-gray-500 focus:border-black focus:outline-none transition-colors text-lg"
                    placeholder="Email"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <input
                    type="tel"
                    id="telefone"
                    name="telefone"
                    value={formData.telefone}
                    onChange={handleChange}
                    className="w-full px-0 py-4 bg-transparent border-0 border-b-2 border-gray-200 text-black placeholder-gray-500 focus:border-black focus:outline-none transition-colors text-lg"
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
                    className="w-full px-0 py-4 bg-transparent border-0 border-b-2 border-gray-200 text-black focus:border-black focus:outline-none transition-colors text-lg"
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
                  className="w-full px-0 py-4 bg-transparent border-0 border-b-2 border-gray-200 text-black placeholder-gray-500 focus:border-black focus:outline-none transition-colors resize-none text-lg"
                  placeholder="Conte-nos sobre o seu projeto..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-black text-white px-8 py-4 rounded font-semibold hover:bg-gray-800 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
              >
                {isSubmitting ? 'Enviando...' : 'Enviar mensagem'}
              </button>
            </form>
          </div>

          {/* Contactos visíveis - Antes da imagem */}
          <div className="absolute right-8 top-0">
            <div className="space-y-4 text-right text-lg text-black font-medium">
              <p>email@allperspectives.com</p>
              <p>+351 123 456 789</p>
              <p>Porto, Portugal</p>
            </div>
          </div>

          {/* Frase decorativa */}
          <div className="absolute right-8 top-32">
            <p className="text-xl md:text-2xl font-bold text-gray-300 italic">
              Ready for lift-off?
            </p>
          </div>

          {/* Imagem do drone - Abaixo dos contactos */}
          <div className="absolute right-0 top-48 w-[420px] h-80 lg:w-[480px] lg:h-96">
            <div className="relative w-full h-full">
              <Image
                src="https://images.unsplash.com/photo-1473968512647-3e447244af8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Drone profissional"
                fill
                className="object-cover shadow-xl"
                sizes="(max-width: 768px) 100vw, 400px"
              />
            </div>
          </div>

        </div>
      </section>

      {/* Espaço extra para breathing */}
      <section className="py-32"></section>

    </div>
  )
}
