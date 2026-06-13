/* ============================================================
   PolicíaGuía — Recursos Oficiales
   Estructura tomada del documento "pag wb caro.docx"
   Prioriza archivos locales sobre enlaces externos.
   ============================================================ */

window.RECURSOS = [

  /* ----------- 1. RND ----------- */
  {
    id: 'rnd',
    num: 1,
    title: 'RND — Registro Nacional de Detenciones',
    desc: 'Plataforma oficial para el registro de detenidos por falta administrativa o delito. <strong>Llenado obligatorio</strong> ante cualquier detención.',
    icon: 'database',
    items: [
      { title: 'Registro Nacional de Detenciones', kind: 'external',
        href: 'https://detenciones.sspc.gob.mx/' }
    ]
  },

  /* ----------- 2. IPH ----------- */
  {
    id: 'iph',
    num: 2,
    title: 'IPH — Informe Policial Homologado',
    desc: 'Formatos del IPH para hecho probablemente delictivo y para justicia cívica. Descarga el PDF y ábrelo en Adobe Reader para escribir y guardar.',
    icon: 'clipboard',
    subgroups: [
      {
        title: 'IPH — Hecho probablemente delictivo',
        items: [
          { title: 'Informe Policial Homologado para hecho probablemente delictivo', kind: 'pdf', file: 'iph.pdf' },
          { title: 'Presentación del IPH', kind: 'pdf', file: 'IPH_ppt.pdf' }
        ],
        sections: [
          { label: 'Sección 1', kind: 'obligatoria' },
          { label: 'Sección 2', kind: 'obligatoria' },
          { label: 'Sección 3', kind: 'obligatoria' },
          { label: 'Sección 4', kind: 'obligatoria' },
          { label: 'Sección 5', kind: 'obligatoria' },
          { label: 'Anexo A', kind: 'adicional' },
          { label: 'Anexo B', kind: 'adicional' },
          { label: 'Anexo C', kind: 'adicional' },
          { label: 'Anexo D', kind: 'adicional' },
          { label: 'Anexo E', kind: 'adicional' },
          { label: 'Anexo F', kind: 'mp', note: 'que pide MP' },
          { label: 'Anexo G', kind: 'mp' },
          { label: 'Cadena de Custodia', kind: 'adicional' }
        ]
      },
      {
        title: 'IPH — Justicia Cívica',
        items: [
          { title: 'Informe Policial Homologado para justicia cívica', kind: 'pdf', file: 'iphj.pdf' }
        ],
        sections: [
          { label: 'Sección 1', kind: 'obligatoria' },
          { label: 'Sección 2', kind: 'obligatoria' },
          { label: 'Sección 3', kind: 'obligatoria' },
          { label: 'Sección 4', kind: 'obligatoria' },
          { label: 'Anexo A', kind: 'juez' },
          { label: 'Anexo B', kind: 'juez', note: 'solo si el juez cívico lo requiere' }
        ]
      }
    ]
  },

  /* ----------- 3. Protocolo Nacional Primer Respondiente ----------- */
  {
    id: 'protocolo-pr',
    num: 3,
    title: 'Protocolo Nacional de Actuación — Primer Respondiente',
    desc: 'Documento de consulta. Solo lectura.',
    icon: 'book',
    items: [
      { title: 'Protocolo Nacional de Actuación del Primer Respondiente', kind: 'pdf', file: 'proto.pdf' }
    ]
  },

  /* ----------- 4. Guía de llenado del IPH ----------- */
  {
    id: 'guia-iph',
    num: 4,
    title: 'Guía de llenado del IPH',
    desc: 'Guía para el llenado del Informe Policial Homologado en hecho probablemente delictivo. Solo lectura.',
    icon: 'lightbulb',
    items: [
      { title: 'Guía del IPH para hecho probablemente delictivo', kind: 'pdf', file: 'guia.pdf' }
    ]
  },

  /* ----------- 5. Ordenamientos Legales Nacionales ----------- */
  {
    id: 'ordenamientos',
    num: 5,
    title: 'Ordenamientos Legales Nacionales',
    desc: 'Marco normativo nacional aplicable a la actuación policial.',
    icon: 'scale',
    items: [
      { title: 'Constitución Política de los Estados Unidos Mexicanos', kind: 'pdf', file: 'constitucion.pdf' },
      { title: 'Ley Orgánica de la Administración Pública Federal', kind: 'external',
        href: 'https://www.diputados.gob.mx/LeyesBiblio/pdf/LOAPF.pdf' },
      { title: 'Ley Orgánica de la Fiscalía General de la República', kind: 'external',
        href: 'https://www.diputados.gob.mx/LeyesBiblio/pdf/LOFGR.pdf' },
      { title: 'Ley General de los Derechos de Niñas, Niños y Adolescentes', kind: 'external',
        href: 'https://www.diputados.gob.mx/LeyesBiblio/pdf/LGDNNA.pdf' },
      { title: 'Ley General del Sistema Nacional de Seguridad Pública', kind: 'pdf', file: 'LGSNSP.pdf' },
      { title: 'Ley General de Víctimas', kind: 'pdf', file: 'victimas.pdf' },
      { title: 'Ley Nacional del Uso de la Fuerza', kind: 'pdf', file: 'politica.pdf' },
      { title: 'Ley General para Prevenir, Investigar y Sancionar la Tortura y otros Tratos o Penas Crueles, Inhumanos o Degradantes', kind: 'external',
        href: 'https://www.diputados.gob.mx/LeyesBiblio/pdf/LGPIST.pdf' },
      { title: 'Ley General de Responsabilidades Administrativas', kind: 'external',
        href: 'https://www.diputados.gob.mx/LeyesBiblio/pdf/LGRA.pdf' },
      { title: 'Ley Nacional del Sistema Integral de Justicia Penal para Adolescentes', kind: 'external',
        href: 'https://www.diputados.gob.mx/LeyesBiblio/pdf/LNSIJPA.pdf' },
      { title: 'Código Nacional de Procedimientos Penales', kind: 'pdf', file: 'penales.pdf' },
      { title: 'Código Penal Federal', kind: 'external',
        href: 'https://www.diputados.gob.mx/LeyesBiblio/pdf/CPF.pdf' }
    ]
  },

  /* ----------- 6. Instrumentos Internacionales ----------- */
  {
    id: 'internacionales',
    num: 6,
    title: 'Instrumentos Internacionales',
    desc: 'Tratados, convenciones y declaraciones internacionales aplicables.',
    icon: 'globe',
    items: [
      { title: 'Declaración Universal de los Derechos Humanos', kind: 'pdf', file: 'dh.pdf' },
      { title: 'Pacto Internacional de Derechos Civiles y Políticos', kind: 'external',
        href: 'https://www.ohchr.org/es/instruments-mechanisms/instruments/international-covenant-civil-and-political-rights' },
      { title: 'Declaración Americana de los Derechos y Deberes del Hombre', kind: 'external',
        href: 'https://www.oas.org/es/cidh/mandato/Basicos/declaracion.asp' },
      { title: 'Convención sobre los Derechos del Niño', kind: 'external',
        href: 'https://www.ohchr.org/es/instruments-mechanisms/instruments/convention-rights-child' },
      { title: 'Convención Americana sobre Derechos Humanos', kind: 'external',
        href: 'https://www.oas.org/dil/esp/tratados_b-32_convencion_americana_sobre_derechos_humanos.htm' },
      { title: 'Código de Conducta para Funcionarios Encargados de Hacer Cumplir la Ley', kind: 'pdf', file: 'conducta.pdf' },
      { title: 'Principios Básicos sobre el Empleo de la Fuerza y Armas de Fuego', kind: 'external',
        href: 'https://www.ohchr.org/es/instruments-mechanisms/instruments/basic-principles-use-force-and-firearms-law' }
    ]
  },

  /* ----------- 7. Leyes Locales (Jalisco / Tonalá) ----------- */
  {
    id: 'locales',
    num: 7,
    title: 'Leyes Locales — Jalisco / Tonalá',
    desc: 'Marco normativo estatal y municipal aplicable.',
    icon: 'pin',
    items: [
      { title: 'Constitución Política del Estado de Jalisco', kind: 'external',
        href: 'https://transparencia.info.jalisco.gob.mx/sites/default/files/Constitucion%20Politica%20del%20Estado%20de%20Jalisco.pdf' },
      { title: 'Ley de Seguridad Pública para el Estado de Jalisco', kind: 'external',
        href: 'https://transparencia.info.jalisco.gob.mx/sites/default/files/Ley%20del%20Sistema%20de%20Seguridad%20Publica%20para%20el%20Estado%20de%20Jalisco.pdf' },
      { title: 'Ley Orgánica de la Fiscalía del Estado de Jalisco', kind: 'external',
        href: 'https://transparencia.info.jalisco.gob.mx/sites/default/files/Ley%20Organica%20de%20la%20Fiscalia%20del%20Estado%20de%20Jalisco.pdf' },
      { title: 'Código Penal del Estado de Jalisco', kind: 'external',
        href: 'https://transparencia.info.jalisco.gob.mx/sites/default/files/Codigo%20Penal%20para%20el%20Estado%20Libre%20y%20Soberano%20de%20Jalisco.pdf' },
      { title: 'Reglamento de Policía y Buen Gobierno del municipio de Tonalá, Jalisco', kind: 'pdf', file: 'reglamento.pdf' }
    ]
  },

  /* ----------- 8. Protocolos Nacionales ----------- */
  {
    id: 'protocolos',
    num: 8,
    title: 'Protocolos Nacionales',
    desc: 'Protocolos de actuación y guías nacionales de procedimiento.',
    icon: 'shield',
    items: [
      { title: 'Protocolo Nacional de Actuación — Traslado', kind: 'external',
        href: 'https://www.gob.mx/sspc/documentos/protocolos-nacionales-de-actuacion' },
      { title: 'Protocolo Nacional de Actuación — Policía con Capacidades para Procesar Lugar de la Intervención', kind: 'external',
        href: 'https://www.gob.mx/sspc/documentos/protocolos-nacionales-de-actuacion' },
      { title: 'Guía Nacional de Cadena de Custodia', kind: 'pdf', file: 'custodia.pdf' }
    ]
  }
];
