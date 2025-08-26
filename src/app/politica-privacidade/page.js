'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

export default function PoliticaPrivacidade() {
  const headerRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText)

    const ctx = gsap.context(() => {
      // Header animation
      const headerSplit = new SplitText(headerRef.current, {
        type: "lines,words",
        linesClass: "overflow-visible"
      })

      gsap.set(headerSplit.words, { y: 100, opacity: 0 })

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
        }
      })

      // Content animation
      gsap.set(contentRef.current, { y: 50, opacity: 0 })

      ScrollTrigger.create({
        trigger: contentRef.current,
        start: "top 80%",
        onEnter: () => {
          gsap.to(contentRef.current, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out"
          })
        }
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="pt-24">
      <section className="py-12 md:py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h1
            ref={headerRef}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 md:mb-16 leading-[1.1] text-black"
          >
            Política de Privacidade
          </h1>

          <div ref={contentRef} className="prose prose-lg max-w-none">
            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <p className="text-sm text-gray-600 mb-2">
                <strong>Última atualização:</strong> {new Date().toLocaleDateString('pt-PT')}
              </p>
              <p className="text-gray-700">
                A All Perspectives está comprometida com a proteção da sua privacidade e dos seus dados pessoais,
                em conformidade com o Regulamento Geral sobre a Proteção de Dados (RGPD).
              </p>
            </div>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-black">1. Responsável pelo Tratamento</h2>
              <div className="bg-white border-l-4 border-gray-300 pl-6">
                <p><strong>All Perspectives</strong></p>
                <p>Email: geral@allperspectives.pt</p>
                <p>Telefone: +351 919 490 318</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-black">2. Dados Pessoais Recolhidos</h2>
              <p className="mb-4">
                Através do formulário de contacto no nosso website, recolhemos os seguintes dados pessoais:
              </p>
              <div className="bg-gray-50 p-4 rounded">
                <ul className="space-y-2">
                  <li><strong>Nome:</strong> Para personalização da comunicação</li>
                  <li><strong>Email:</strong> Para resposta ao seu pedido de contacto</li>
                  <li><strong>Telefone:</strong> Para contacto direto (facultativo)</li>
                  <li><strong>Serviço de interesse:</strong> Para direcionamento adequado</li>
                  <li><strong>Mensagem:</strong> Para compreensão das suas necessidades</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-black">3. Finalidade e Base Legal</h2>
              <div className="space-y-4">
                <div className="border-l-4 border-gray-300 pl-6">
                  <p><strong>Finalidade:</strong> Resposta a pedidos de contacto e prestação de informações sobre os nossos serviços.</p>
                  <p><strong>Base legal:</strong> Consentimento expresso - artigo 6.º, n.º 1, alínea a) do RGPD.</p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-black">4. Prazo de Conservação</h2>
              <p>
                Os seus dados pessoais serão conservados pelo período necessário para dar resposta ao seu pedido de contacto,
                e por um período adicional de 1 ano para fins de arquivo e possível contacto futuro,
                salvo se solicitar a sua eliminação.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-black">5. Partilha de Dados</h2>
              <p>
                Os seus dados pessoais <strong>não são partilhados</strong> com terceiros, exceto quando necessário
                para o cumprimento de obrigações legais ou mediante o seu consentimento expresso.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-black">6. Os Seus Direitos</h2>
              <p className="mb-4">Tem o direito de:</p>
              <div className="bg-gray-50 p-4 rounded space-y-2">
                <p>• <strong>Acesso:</strong> Solicitar informações sobre os dados que temos sobre si</p>
                <p>• <strong>Retificação:</strong> Corrigir dados incorretos ou desatualizados</p>
                <p>• <strong>Eliminação:</strong> Solicitar a eliminação dos seus dados</p>
                <p>• <strong>Portabilidade:</strong> Receber os seus dados em formato estruturado</p>
                <p>• <strong>Oposição:</strong> Opor-se ao tratamento dos seus dados</p>
                <p>• <strong>Retirar consentimento:</strong> A qualquer momento</p>
              </div>
              <p className="mt-4">
                Para exercer os seus direitos, contacte-nos através de: <strong>geral@allperspectives.pt</strong>
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-black">7. Cookies</h2>
              <p className="mb-4">
                O nosso website utiliza cookies técnicos essenciais para o funcionamento adequado da plataforma.
                Estes cookies incluem:
              </p>

              <div className="bg-gray-50 p-4 rounded mb-4">
                <h4 className="font-bold mb-2">Cookies Técnicos:</h4>
                <ul className="space-y-1 text-gray-700">
                  <li>• Cookies de sessão para manter a funcionalidade do website</li>
                  <li>• Cookies de preferências técnicas</li>
                  <li>• Cookies necessários para o funcionamento de formulários</li>
                </ul>
              </div>

              <div className="bg-white border-l-4 border-gray-300 pl-4 mb-4">
                <h4 className="font-bold mb-2">Não utilizamos:</h4>
                <ul className="space-y-1 text-gray-700">
                  <li>• Cookies de marketing ou publicidade</li>
                  <li>• Cookies de análise de terceiros</li>
                  <li>• Cookies de redes sociais para tracking</li>
                </ul>
              </div>

              <p className="mb-4">
                <strong>Gestão de Cookies:</strong> Os cookies técnicos são essenciais para o funcionamento do website
                e não podem ser desativados. Pode gerir as definições de cookies através das configurações do seu navegador,
                embora isso possa afetar a funcionalidade do site.
              </p>

              <p>
                <strong>Duração:</strong> A maioria dos cookies são de sessão e são eliminados quando fecha o navegador.
                Alguns cookies técnicos podem permanecer por períodos mais longos para manter preferências básicas.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-black">8. Segurança</h2>
              <p>
                Implementamos medidas técnicas e organizacionais adequadas para proteger os seus dados pessoais
                contra acesso não autorizado, alteração, divulgação ou destruição.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-black">9. Reclamações</h2>
              <p>
                Tem o direito de apresentar reclamação à Comissão Nacional de Proteção de Dados (CNPD)
                em caso de violação dos seus direitos de proteção de dados.
              </p>
              <div className="bg-gray-50 p-4 rounded mt-4">
                <p><strong>CNPD:</strong> www.cnpd.pt | geral@cnpd.pt</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-black">10. Alterações</h2>
              <p>
                Esta política de privacidade pode ser atualizada periodicamente.
                A data da última atualização encontra-se no início deste documento.
              </p>
            </section>

            <div className="bg-black text-white p-6 rounded-lg mt-8">
              <h3 className="text-xl font-bold mb-2">Dúvidas?</h3>
              <p>
                Para qualquer questão sobre esta política de privacidade ou sobre o tratamento dos seus dados,
                contacte-nos através de <strong>geral@allperspectives.pt</strong>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
