// src/app/api/send-email/route.js
import { google } from 'googleapis'
import nodemailer from 'nodemailer'
import { NextResponse } from 'next/server'

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

// Helper para nomes dos serviços
const getServiceName = (servico) => {
  const services = {
    'inspecoes': 'Inspeções Técnicas Aéreas',
    'acompanhamento': 'Acompanhamento de Obras',
    'paineis': 'Inspeção de Painéis Solares',
    'espacos': 'Levantamento de Espaços Exteriores',
    'seguranca': 'Verificação de Segurança',
    'conteudos': 'Conteúdos Visuais',
    'outro': 'Outro'
  }
  return services[servico] || servico
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
          padding: 25px;
          text-align: center;
          margin-bottom: 30px;
          border-radius: 8px;
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
          margin-top: 10px;
        }
        .footer {
          text-align: center;
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #eee;
          color: #666;
          font-size: 14px;
        }
        .highlight {
          background: #e3f2fd;
          padding: 15px;
          border-radius: 6px;
          margin: 20px 0;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>🚁 All Perspectives</h1>
        <p>Nova mensagem de contacto recebida</p>
      </div>

      <div class="content">
        <div class="highlight">
          <strong>💡 Resposta rápida:</strong> Podes responder diretamente a este email para contactar ${nome}.
        </div>

        <div class="field">
          <span class="label">👤 Nome:</span>
          <div class="value">${nome}</div>
        </div>

        <div class="field">
          <span class="label">📧 Email:</span>
          <div class="value"><a href="mailto:${email}">${email}</a></div>
        </div>

        ${telefone ? `
        <div class="field">
          <span class="label">📞 Telefone:</span>
          <div class="value">${telefone}</div>
        </div>
        ` : ''}

        <div class="field">
          <span class="label">🛠️ Tipo de Serviço:</span>
          <div class="value">${getServiceName(servico)}</div>
        </div>

        <div class="field">
          <span class="label">💬 Mensagem:</span>
          <div class="message-box">${mensagem.replace(/\n/g, '<br>')}</div>
        </div>
      </div>

      <div class="footer">
        <p>📅 Enviado em: ${new Date().toLocaleString('pt-PT')}</p>
        <p>🌐 Via website All Perspectives</p>
      </div>
    </body>
    </html>
  `
}

export async function POST(request) {
  try {
    const data = await request.json()

    // Validação
    const validation = validateFormData(data)
    if (!validation.isValid) {
      return NextResponse.json(
        { success: false, error: validation.error },
        { status: 400 }
      )
    }

    // Verificar variáveis de ambiente OAuth
    if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET || !process.env.GOOGLE_REFRESH_TOKEN) {
      console.error('Variáveis OAuth não configuradas')
      return NextResponse.json(
        { success: false, error: 'Configuração OAuth não encontrada' },
        { status: 500 }
      )
    }

    // Configurar OAuth2
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      'https://developers.google.com/oauthplayground' // redirect URI padrão
    )

    oauth2Client.setCredentials({
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN
    })

    // Obter access token
    const accessToken = await oauth2Client.getAccessToken()

    if (!accessToken.token) {
      throw new Error('Falha ao obter access token')
    }

    // Configurar transporter
    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.FROM_EMAIL,
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
        accessToken: accessToken.token,
      },
    })

    // Configurar email
    const mailOptions = {
      from: `"${data.nome} via All Perspectives" <${process.env.FROM_EMAIL}>`,
      to: process.env.DESTINATION_EMAIL,
      replyTo: data.email,
      subject: `🚁 Nova mensagem: ${getServiceName(data.servico)} - ${data.nome}`,
      html: createEmailTemplate(data),
      // Versão texto para clientes que não suportam HTML
      text: `
Nova mensagem de contacto - All Perspectives

Nome: ${data.nome}
Email: ${data.email}
${data.telefone ? `Telefone: ${data.telefone}` : ''}
Serviço: ${getServiceName(data.servico)}

Mensagem:
${data.mensagem}

---
Enviado em: ${new Date().toLocaleString('pt-PT')}
Via website All Perspectives
      `.trim()
    }

    // Enviar email
    const info = await transporter.sendMail(mailOptions)

    console.log('✅ Email enviado com sucesso:', info.messageId)

    return NextResponse.json({
      success: true,
      message: 'Email enviado com sucesso!',
      messageId: info.messageId
    })

  } catch (error) {
    console.error('❌ Erro ao enviar email:', error)

    // Diferentes tipos de erro OAuth
    let errorMessage = 'Erro interno do servidor'

    if (error.message?.includes('invalid_grant')) {
      errorMessage = 'Token OAuth expirado - refresh necessário'
    } else if (error.message?.includes('unauthorized_client')) {
      errorMessage = 'Cliente OAuth não autorizado'
    } else if (error.message?.includes('access_denied')) {
      errorMessage = 'Acesso OAuth negado'
    } else if (error.code === 'EAUTH') {
      errorMessage = 'Erro de autenticação OAuth'
    }

    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    )
  }
}

// OPTIONS handler para CORS
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
