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
    desc: 'Descarga el formato original DOCX y ábrelo con <strong>Microsoft Word</strong>, <strong>Google Docs</strong> o <strong>WPS Office</strong> en tu celular para llenarlo y guardarlo con el formato exacto del documento oficial.',
    icon: 'clipboard',
    subgroups: [
      {
        title: 'IPH — Hecho probablemente delictivo',
        items: [
          { title: 'Archivo IPH', kind: 'download', file: 'docs/IPH_delitos_blanco.docx', filename: 'IPH_delitos_blanco.docx' },
          { title: 'Registro de Cadena de Custodia', kind: 'download', file: 'docs/CADENA_DE_CUSTODIA_blanco.docx', filename: 'CADENA_DE_CUSTODIA_blanco.docx' },
          { title: 'Vista previa de Cadena de Custodia', kind: 'viewer', viewerDoc: 'cadena-blanco' },
          { title: 'Presentación del IPH', kind: 'pdf', file: 'IPH_ppt.pdf' }
        ],
        sections: [
          { label: 'Sección 1', kind: 'obligatoria', doc: 'iph', anchor: 'seccion-1' },
          { label: 'Sección 2', kind: 'obligatoria', doc: 'iph', anchor: 'seccion-2' },
          { label: 'Sección 3', kind: 'obligatoria', doc: 'iph', anchor: 'seccion-3' },
          { label: 'Sección 4', kind: 'obligatoria', doc: 'iph', anchor: 'seccion-4' },
          { label: 'Sección 5', kind: 'obligatoria', doc: 'iph', anchor: 'seccion-5' },
          { label: 'Anexo A', kind: 'adicional', doc: 'iph', anchor: 'anexo-a' },
          { label: 'Anexo B', kind: 'adicional', doc: 'iph', anchor: 'anexo-b' },
          { label: 'Anexo C', kind: 'adicional', doc: 'iph', anchor: 'anexo-c' },
          { label: 'Anexo D', kind: 'adicional', doc: 'iph', anchor: 'anexo-d' },
          { label: 'Anexo E', kind: 'adicional', doc: 'iph', anchor: 'anexo-e' },
          { label: 'Anexo F', kind: 'mp', note: 'que pide MP', doc: 'iph', anchor: 'anexo-f' },
          { label: 'Anexo G', kind: 'mp', doc: 'iph', anchor: 'anexo-g' }
        ]
      },
      {
        title: 'IPH — Justicia Cívica',
        items: [
          { title: 'Archivo IPH Justicia Cívica', kind: 'download', file: 'docs/IPH_Justicia_Civica_blanco.docx', filename: 'IPH_Justicia_Civica_blanco.docx' }
        ],
        sections: [
          { label: 'Sección 1', kind: 'obligatoria', doc: 'iph-civica', anchor: 'seccion-1' },
          { label: 'Sección 2', kind: 'obligatoria', doc: 'iph-civica', anchor: 'seccion-2' },
          { label: 'Sección 3', kind: 'obligatoria', doc: 'iph-civica', anchor: 'seccion-3' },
          { label: 'Sección 4', kind: 'obligatoria', doc: 'iph-civica', anchor: 'seccion-4' },
          { label: 'Anexo A', kind: 'juez', doc: 'iph-civica', anchor: 'anexo-a' },
          { label: 'Anexo B', kind: 'juez', note: 'solo si el juez cívico lo requiere', doc: 'iph-civica', anchor: 'anexo-b' }
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

  /* ----------- 4. Guía de Bolsillo ----------- */
  {
    id: 'guia-iph',
    num: 4,
    title: 'Guía de Bolsillo Para el Policía en el Sistema Penal Acusatorio',
    desc: 'Guía de consulta rápida para el policía en el Sistema Penal Acusatorio. Solo lectura.',
    icon: 'lightbulb',
    items: [
      { title: 'Guía de Bolsillo Para el Policía en el Sistema Penal Acusatorio', kind: 'pdf', file: 'guia.pdf' },
      { title: 'Guía de Llenado del Informe Policial Homologado', kind: 'external',
        href: 'https://www.gob.mx/cms/uploads/attachment/file/394021/Gu_a_IPH_Hecho_Probablemente_Delictivo.pdf' }
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
  }
];
