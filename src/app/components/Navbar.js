'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const mobileMenuRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      // Muda quando sai da viewport do hero (altura da tela)
      setIsScrolled(window.scrollY > window.innerHeight * 0.8)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Fechar menu ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false)
      }
    }

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('touchstart', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [isMobileMenuOpen])

  const navLinks = [
    { href: '/about', label: 'Sobre' },
    { href: '/#servicos', label: 'Serviços', isAnchor: true },
    // { href: '/projects', label: 'Projetos' },
    { href: '/contacts', label: 'Contactos' },
  ]

  const isActiveLink = (href, isAnchor = false) => {
    if (isAnchor) return false
    return pathname === href
  }

  // Determinar se estamos na homepage
  const isHomePage = pathname === '/'

  return (
    <nav
      ref={mobileMenuRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled || !isHomePage
          ? 'bg-white/95 backdrop-blur-md border-b border-black/10 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          {/* Logo - Muda de cor baseado no estado */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo_horizontal.png"
              alt="All Perspectives"
              width={240}
              height={55}
              className={`h-12 w-auto transition-all duration-500 ${
                isScrolled || !isHomePage ? 'brightness-100' : 'brightness-0 invert'
              }`}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative hover:text-gray-600 transition-all duration-500 text-base font-semibold group ${
                  isScrolled || !isHomePage
                    ? 'text-black/80'
                    : 'text-white/90 hover:text-white'
                } ${
                  isActiveLink(link.href, link.isAnchor) ?
                    (isScrolled || !isHomePage ? 'text-black' : 'text-white') : ''
                }`}
              >
                {link.label}
                {/* Hover underline - cor dinâmica */}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                  isScrolled || !isHomePage ? 'bg-black' : 'bg-white'
                }`} />
                {/* Active underline - cor dinâmica */}
                {isActiveLink(link.href, link.isAnchor) && (
                  <span className={`absolute -bottom-1 left-0 w-full h-0.5 ${
                    isScrolled || !isHomePage ? 'bg-black' : 'bg-white'
                  }`} />
                )}
              </Link>
            ))}
          </div>

          {/* Mobile menu button - cor dinâmica */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-6 h-6"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span
              className={`block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
                isScrolled || !isHomePage ? 'bg-black' : 'bg-white'
              } ${
                isMobileMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'
              }`}
            />
            <span
              className={`block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${
                isScrolled || !isHomePage ? 'bg-black' : 'bg-white'
              } ${
                isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
                isScrolled || !isHomePage ? 'bg-black' : 'bg-white'
              } ${
                isMobileMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'
              }`}
            />
          </button>
        </div>

        {/* Mobile Navigation - ESPAÇAMENTO MELHORADO */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out bg-white border-t border-gray-200 ${
            isMobileMenuOpen
              ? 'max-h-screen opacity-100 pb-6'
              : 'max-h-0 opacity-0 overflow-hidden'
          }`}
        >
          <div className="pt-6 px-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block py-3 px-2 transition-colors duration-200 font-semibold text-lg text-black/80 hover:text-black hover:bg-gray-50 rounded-md ${
                  isActiveLink(link.href, link.isAnchor) ? 'text-black bg-gray-50' : ''
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
