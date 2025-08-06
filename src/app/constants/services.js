export const SERVICES = [
  {
    id: 'inspecoes-aereas',
    title: 'Inspeções Técnicas Aéreas',
    subtitle: 'Estruturas & Coberturas',
    description: 'Inspeções visuais de estruturas de difícil acesso.',
    features: ['Coberturas, caleiras, claraboias', 'Telhados industriais', 'Equipamentos AVAC e chaminés'],
    fallbackImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'acompanhamento-obras',
    title: 'Acompanhamento de Obras',
    subtitle: 'Monitorização & Progresso',
    description: 'Monitorização da evolução de obras através de fotografias aéreas periódicas.',
    features: ['Fotografias antes/depois', 'Relatórios de progresso', 'Documentação temporal'],
    fallbackImage: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'paineis-solares',
    title: 'Inspeção de Painéis Solares',
    subtitle: 'Energia & Eficiência',
    description: 'Verificação visual de instalações fotovoltaicas para máxima eficiência energética.',
    features: ['Identificação de sujidade/danos', 'Inspeção pós-limpeza', 'Verificação pós-eventos extremos'],
    fallbackImage: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'espacos-exteriores',
    title: 'Levantamento de Espaços Exteriores',
    subtitle: 'Parques & Jardins',
    description: 'Levantamentos visuais de parques de estacionamento, jardins e zonas técnicas.',
    features: ['Parques de estacionamento', 'Jardins e zonas verdes', 'Áreas técnicas'],
    fallbackImage: 'https://images.unsplash.com/photo-1518833500287-51ca0f2b1a0b?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 'seguranca-perimetros',
    title: 'Verificação de Segurança',
    subtitle: 'Perímetros & Vedações',
    description: 'Sobrevoos para verificação de cercas, vedações e áreas remotas.',
    features: ['Inspeção de cercas', 'Verificação de vedações', 'Monitorização de perímetros'],
    fallbackImage: 'https://images.unsplash.com/photo-1615743112504-59cc257c7a0f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 'conteudos-visuais',
    title: 'Conteúdos Visuais',
    subtitle: 'Vídeos & Apresentações',
    description: 'Vídeos e imagens aéreas para apresentações, relatórios e material promocional.',
    features: ['Vídeos para apresentações', 'Material para relatórios', 'Conteúdo para redes sociais'],
    fallbackImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  }
]

export const SERVICE_OPTIONS = [
  { value: '', label: 'Tipo de serviço' },
  { value: 'inspecoes', label: 'Inspeções Técnicas Aéreas' },
  { value: 'acompanhamento', label: 'Acompanhamento de Obras' },
  { value: 'paineis', label: 'Inspeção de Painéis Solares' },
  { value: 'espacos', label: 'Levantamento de Espaços Exteriores' },
  { value: 'seguranca', label: 'Verificação de Segurança' },
  { value: 'conteudos', label: 'Conteúdos Visuais' },
  { value: 'outro', label: 'Outro' }
]
