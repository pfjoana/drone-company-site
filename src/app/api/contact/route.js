// app/api/contact/route.js
import nodemailer from 'nodemailer'
import { NextResponse } from 'next/server'

// Configuração do transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_PORT === '465', // true para 465, false para outros
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD
    },
    tls: {
      rejectUnauthorized: false // Para alguns servidores
    }
  })
}

// Validação dos dados
const validateFormData = (data) => {
  const { nome, email, servico, mensagem } = data

  if (!nome || nome.trim().length < 2) {
    return { isValid: false, error: 'Nome é obrigatório (mínimo 2 caracteres)' }
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { isValid: false, error: 'Email inválido' }
  }

  if (!servico) {
    return { isValid: false, error: 'Tipo de serviço é obrigatório' }
  }

  if (!mensagem || mensagem.trim().length < 10) {
    return { isValid: false, error: 'Mensagem é obrigatória (mínimo 10 caracteres)' }
  }

  return { isValid: true }
}

// Template do email
const createEmailTemplate = (data) => {
  const { nome, email, telefone, servico, mensagem } = data

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Nova Mensagem - All Perspectives</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          background: #000;
          color: white;
          padding: 20px;
          text-align: center;
          margin-bottom: 30px;
        }
        .content {
          background: #f9f9f9;
          padding: 30px;
          border-radius: 8px;
        }
        .field {
          margin-bottom: 20px;
          padding-bottom: 15px;
          border-bottom: 1px solid #eee;
        }
        .field:last-child {
          border-bottom: none;
        }
        .label {
          font-weight: 600;
          color: #555;
          display: block;
          margin-bottom: 5px;
        }
        .value {
          font-size: 16px;
          color: #333;
        }
        .message-box {
          background: white;
          padding: 20px;
          border-radius: 5px;
          border-left: 4px solid #000;
        }
        .footer {
          text-align: center;
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #eee;
          color: #666;
          font-size: 14px;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>All Perspectives</h1>
        <p>Nova mensagem de contacto</p>
      </div>

      <div class="content">
        <div class="field">
          <span class="label">Nome:</span>
          <div class="value">${nome}</div>
        </div>

        <div class="field">
          <span class="label">Email:</span>
          <div class="value">${email}</div>
        </div>

        ${telefone ? `
        <div class="field">
          <span class="label">Telefone:</span>
          <div class="value">${telefone}</div>
        </div>
        ` : ''}

        <div class="field">
          <span class="label">Tipo de Serviço:</span>
          <div class="value">${getServiceName(servico)}</div>
        </div>

        <div class="field">
          <span class="label">Mensagem:</span>
          <div class="message-box">${mensagem.replace(/\n/g, '<br>')}</div>
        </div>
      </div>

      <div class="footer">
        <p>Enviado através do site All Perspectives</p>
        <p>Data: ${new Date().toLocaleString('pt-PT')}</p>
      </div>
    </body>
    </html>
  `
}

// Helper para nomes dos serviços
const getServiceName = (servico) => {
  const services = {
    'inspecoes': 'Inspeções Técnicas',
    'imobiliario': 'Marketing Imobiliário',
    'eventos': 'Eventos & Institucional',
    'outro': 'Outro'
  }
  return services[servico] || servico
}

// POST handler
export async function POST(request) {
  try {
    // Parse dos dados
    const data = await request.json()

    // Validação
    const validation = validateFormData(data)
    if (!validation.isValid) {
      return NextResponse.json(
        { success: false, error: validation.error },
        { status: 400 }
      )
    }

    // Verificar variáveis de ambiente
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
      console.error('Variáveis SMTP não configuradas')
      return NextResponse.json(
        { success: false, error: 'Configuração de email não encontrada' },
        { status: 500 }
      )
    }

    // Criar transporter
    const transporter = createTransporter()

    // Verificar conexão
    await transporter.verify()

    // Configurar email
    const mailOptions = {
      from: `"Site All Perspectives" <${process.env.SMTP_USER}>`,
      to: process.env.DESTINATION_EMAIL || process.env.SMTP_USER,
      replyTo: data.email,
      subject: `Nova mensagem de ${data.nome} - ${getServiceName(data.servico)}`,
      html: createEmailTemplate(data),
      // Versão texto para clientes que não suportam HTML
      text: `
Nova mensagem de contacto:

Nome: ${data.nome}
Email: ${data.email}
${data.telefone ? `Telefone: ${data.telefone}` : ''}
Serviço: ${getServiceName(data.servico)}

Mensagem:
${data.mensagem}

---
Enviado em: ${new Date().toLocaleString('pt-PT')}
      `.trim()
    }

    // Enviar email
    const info = await transporter.sendMail(mailOptions)

    console.log('Email enviado:', info.messageId)

    return NextResponse.json({
      success: true,
      message: 'Mensagem enviada com sucesso!',
      messageId: info.messageId
    })

  } catch (error) {
    console.error('Erro ao enviar email:', error)

    // Diferentes tipos de erro
    let errorMessage = 'Erro interno do servidor'

    if (error.code === 'EAUTH') {
      errorMessage = 'Erro de autenticação SMTP'
    } else if (error.code === 'ECONNECTION') {
      errorMessage = 'Erro de conexão com servidor de email'
    } else if (error.code === 'EMESSAGE') {
      errorMessage = 'Erro na formatação da mensagem'
    }

    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    )
  }
}

// OPTIONS handler para CORS (se necessário)
export async function OPTIONS() {
  return new NextResponse('', {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
