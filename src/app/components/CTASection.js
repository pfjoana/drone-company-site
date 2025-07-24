'use client'
import { useRef, useEffect } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

export default function CTASection({
  title = "Tem um Desafio Técnico por Resolver?",
  description = "Cada estrutura, cada projeto, cada problema tem uma solução aérea. Vamos conversar sobre como podemos elevar a eficiência da sua operação.",
  primaryButton = { text: "Pedir Orçamento", href: "/contacts" },
  secondaryButton = { text: "Conhecer Serviços", href: "/#servicos" },
  background = "bg-gray-50"
}) {
  const ctaRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText)

    const ctx = gsap.context(() => {
      if (ctaRef.current) {
        const ctaTitle = ctaRef.current.querySelector('.cta-title')
        const ctaParagraph = ctaRef.current.querySelector('.cta-paragraph')
        const ctaButtons = ctaRef.current.querySelector('.cta-buttons')

        if (ctaTitle && ctaParagraph && ctaButtons) {
          const ctaTitleSplit = new SplitText(ctaTitle, {
            type: "lines,words",
            linesClass: "overflow-hidden"
          })

          const ctaParagraphSplit = new SplitText(ctaParagraph, {
            type: "lines",
            linesClass: "overflow-hidden"
          })

          gsap.set(ctaTitleSplit.words, { y: 100, opacity: 0 })
          gsap.set(ctaParagraphSplit.lines, { y: 30, opacity: 0 })
          gsap.set(ctaButtons, { y: 30, opacity: 0 })

          ScrollTrigger.create({
            trigger: ctaRef.current,
            start: "top 80%",
            onEnter: () => {
              gsap.to(ctaTitleSplit.words, {
                y: 0,
                opacity: 1,
                duration: 1,
                stagger: 0.08,
                ease: "power4.out"
              })

              gsap.to(ctaParagraphSplit.lines, {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.1,
                ease: "power3.out",
                delay: 0.6
              })

              gsap.to(ctaButtons, {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power3.out",
                delay: 0.8
              })
            }
          })
        }
      }
    }, ctaRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className={`py-32 px-4 ${background}`} ref={ctaRef}>
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="cta-title text-4xl md:text-5xl font-bold mb-8 text-black">
          {title}
        </h2>
        <p className="cta-paragraph text-xl text-gray-700 mb-12 leading-relaxed font-medium">
          {description}
        </p>
        <div className="cta-buttons flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={primaryButton.href}
            className="bg-black text-white px-8 py-4 rounded font-semibold hover:bg-gray-800 transition-colors duration-300"
          >
            {primaryButton.text}
          </Link>
          <Link
            href={secondaryButton.href}
            className="border border-black text-black px-8 py-4 rounded font-semibold hover:bg-black/5 transition-colors duration-300"
          >
            {secondaryButton.text}
          </Link>
        </div>
      </div>
    </section>
  )
}
