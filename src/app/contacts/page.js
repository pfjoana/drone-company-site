'use client'

import { useState } from 'react'

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
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Entre em Contacto
          </h1>
          <p className="text-xl text-white/80 leading-relaxed">
            Pronto para elevar o seu projeto? Vamos conversar sobre como
            podemos ajudar com captação aérea profissional.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="pb-24 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

          {/* Contact Form */}
          <div>
            <h2 className="text-3xl font-bold mb-8">Solicitar Orçamento</h2>

            {submitStatus === 'success' && (
              <div className="bg-green-500/20 border border-green-500/50 text-green-300 p-4 rounded-lg mb-6">
                Mensagem enviada com sucesso! Entraremos em contacto em breve.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="nome" className="block text-sm font-medium mb-2">
                    Nome *
                  </label>
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-white/50 focus:outline-none transition-colors"
                    placeholder="Seu nome completo"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-white/50 focus:outline-none transition-colors"
                    placeholder="seu@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="telefone" className="block text-sm font-medium mb-2">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    id="telefone"
                    name="telefone"
                    value={formData.telefone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-white/50 focus:outline-none transition-colors"
                    placeholder="+351 123 456 789"
                  />
                </div>

                <div>
                  <label htmlFor="servico" className="block text-sm font-medium mb-2">
                    Tipo de Serviço *
                  </label>
                  <select
                    id="servico"
                    name="servico"
                    value={formData.servico}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:border-white/50 focus:outline-none transition-colors"
                  >
                    <option value="" className="bg-black">Selecione um serviço</option>
                    <option value="inspecoes" className="bg-black">Inspeções Técnicas</option>
                    <option value="imobiliario" className="bg-black">Marketing Imobiliário</option>
                    <option value="eventos" className="bg-black">Eventos & Institucional</option>
                    <option value="outro" className="bg-black">Outro</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="mensagem" className="block text-sm font-medium mb-2">
                  Mensagem *
                </label>
                <textarea
                  id="mensagem"
                  name="mensagem"
                  value={formData.mensagem}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-white/50 focus:outline-none transition-colors resize-none"
                  placeholder="Conte-nos mais sobre o seu projeto, localização, prazos e qualquer informação relevante..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-white text-black px-8 py-4 rounded-lg font-semibold hover:bg-white/90 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div>
            <h2 className="text-3xl font-bold mb-8">Informações de Contacto</h2>

            <div className="space-y-8">
              {/* Email */}
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">✉</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Email</h3>
                  <p className="text-white/70">email@dronecompany.com</p>
                  <p className="text-white/70">geral@dronecompany.com</p>
                </div>
              </div>

              {/* Telefone */}
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">☎</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Telefone</h3>
                  <p className="text-white/70">+351 123 456 789</p>
                  <p className="text-white/70">+351 987 654 321</p>
                </div>
              </div>

              {/* Localização */}
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">📍</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Localização</h3>
                  <p className="text-white/70">Porto, Portugal</p>
                  <p className="text-white/70">Cobrimos todo o território nacional</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
