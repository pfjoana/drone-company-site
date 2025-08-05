import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const { name, email, phone, message, service } = await request.json();

    if (!name || !email || !message) {
      return Response.json(
        { error: 'Nome, email e mensagem são obrigatórios' },
        { status: 400 }
      );
    }

    const serviceLabels = {
      'inspecoes': 'Inspeções Técnicas Aéreas',
      'acompanhamento': 'Acompanhamento de Obras',
      'paineis': 'Inspeção de Painéis Solares',
      'espacos': 'Levantamento de Espaços Exteriores',
      'seguranca': 'Verificação de Segurança',
      'conteudos': 'Conteúdos Visuais',
      'outro': 'Outro'
    };

    const serviceLabel = serviceLabels[service] || service || 'Não especificado';

    // Configuração simples do Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailToOwner = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_DESTINATION,
      subject: `Novo Contacto - All Perspectives | ${serviceLabel}`,
      html: `
        <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #1f2937 0%, #374151 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0;">
            <h2 style="margin: 0; display: flex; align-items: center; gap: 10px;">
              All Perspectives - Novo Contacto
            </h2>
          </div>

          <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px;">
            <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #374151;">Nome:</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #374151;">Email:</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280;">${email}</td>
                </tr>
                ${phone ? `
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #374151;">Telefone:</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280;">${phone}</td>
                </tr>
                ` : ''}
                ${service ? `
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #374151;">Serviço:</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280;">${serviceLabel}</td>
                </tr>
                ` : ''}
                <tr>
                  <td style="padding: 10px 0; font-weight: 600; color: #374151; vertical-align: top;">Mensagem:</td>
                  <td style="padding: 10px 0; color: #6b7280; line-height: 1.6;">${message.replace(/\n/g, '<br>')}</td>
                </tr>
              </table>
            </div>

            <div style="margin-top: 20px; padding: 15px; background: #dbeafe; border-radius: 8px; border-left: 4px solid #3b82f6;">
              <p style="margin: 0; color: #1e40af; font-size: 14px;">
                Responde a este email através de: ${email}
              </p>
            </div>
          </div>
        </div>
      `,
    };

    // Email de confirmação para o cliente
    const mailToClient = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Mensagem Recebida - All Perspectives',
      html: `
        <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #1f2937 0%, #374151 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0;">
            <h2 style="margin: 0;">All Perspectives</h2>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Serviços Profissionais de Drone</p>
          </div>

          <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px;">
            <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <h3 style="color: #374151; margin-top: 0;">Olá ${name}!</h3>

              <p style="color: #6b7280; line-height: 1.6;">
                Obrigado pelo seu contacto. Recebemos a sua mensagem e vamos responder o mais breve possível.
              </p>

              <div style="background: #f3f4f6; padding: 15px; border-radius: 6px; margin: 20px 0;">
                <p style="margin: 0; color: #374151; font-size: 14px;">
                  <strong>A sua mensagem:</strong><br>
                  "${message}"
                </p>
              </div>

              <p style="color: #6b7280; line-height: 1.6;">
                Normalmente respondemos dentro de 24 horas. Se for urgente, pode contactar-nos diretamente.
              </p>
            </div>

            <div style="margin-top: 20px; text-align: center; color: #9ca3af; font-size: 12px;">
              <p>All Perspectives - Captação Aérea Profissional</p>
            </div>
          </div>
        </div>
      `,
    };

    // Enviar ambos os emails
    await transporter.sendMail(mailToOwner);
    await transporter.sendMail(mailToClient);

    return Response.json(
      { message: 'Email enviado com sucesso!' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Erro no envio do email:', error);
    return Response.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
