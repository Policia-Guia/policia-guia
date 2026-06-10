window.GUIDE_DATA = [
  {
    "titulo": "EL POLICÍA TIENE CONOCIMIENTO DE UN HECHO APARENTEMENTE DELICTIVO",
    "clave": "ROOT",
    "descripcion": "",
    "acciones": [
      {
        "descripcion": "a) El policía observa hecho en turno de vigilancia\n\nb) La parte quejosa reporta hechos o solicita apoyo\n\nc) La cabina de radio reporta el hecho criminal\n\nd) Un ciudadano, elemento de seguridad privada, militar o marino reporta al primer respondiente.",
        "clave": "INICIO",
        "icon": "police"
      },
      {
        "descripcion": "CONTINUAR",
        "clave": "ACEV01",
        "icon": "police"
      }
    ]
  },
  {
    "titulo": "PROCESO A SEGUIR",
    "descripcion": "",
    "clave": "ACEV01",
    "acciones": [
      {
        "descripcion": "Acude al lugar de los hechos o del hallazgo.\n\nConfirma la noticia criminal",
        "clave": "INFORMATIVO",
        "icon": "police"
      },
      {
        "descripcion": "CONTINUAR",
        "clave": "ACEV01X",
        "icon": "police"
      }
    ]
  },
  {
    "titulo": "¿Es un hecho aparentemente delictivo?",
    "clave": "ACEV01X",
    "descripcion": "",
    "acciones": [
      {
        "descripcion": "SI",
        "clave": "INIA01",
        "icon": "check"
      },
      {
        "descripcion": "NO",
        "clave": "FAAD01",
        "icon": "cross"
      }
    ]
  },
  {
    "titulo": "¿Que tipo de lugar es?",
    "descripcion": "",
    "clave": "INIA01",
    "acciones": [
      {
        "descripcion": "Lugar Abierto",
        "clave": "LG01A",
        "icon": "police"
      },
      {
        "descripcion": "Lugar Cerrado",
        "clave": "LG01B",
        "icon": "police"
      }
    ]
  },
  {
    "titulo": "¿Existe flagrancia?",
    "descripcion": "",
    "clave": "LG01A",
    "acciones": [
      {
        "descripcion": "SI",
        "clave": "EFLGA01",
        "icon": "check"
      },
      {
        "descripcion": "NO",
        "clave": "EFLGA02",
        "icon": "cross"
      },
      {
        "descripcion": "Consultar supuestos de flagrancia\nArtículo 146 CNPP",
        "clave": "ACCION:art146"
      }
    ]
  },
  {
    "titulo": "¿Existe flagrancia?",
    "descripcion": "",
    "clave": "LG01B",
    "acciones": [
      {
        "descripcion": "SI",
        "clave": "EFLGC01",
        "icon": "check"
      },
      {
        "descripcion": "NO",
        "clave": "ING3",
        "icon": "cross"
      },
      {
        "descripcion": "Consultar supuestos de flagrancia\nArtículo 146 CNPP",
        "clave": "ACCION:art146"
      }
    ]
  },
  {
    "titulo": "¿La persona con facultades autoriza el ingreso al lugar?",
    "descripcion": "",
    "clave": "EFLGC01",
    "acciones": [
      {
        "descripcion": "SI",
        "clave": "INGR",
        "icon": "check"
      },
      {
        "descripcion": "NO",
        "clave": "ING2",
        "icon": "cross"
      }
    ]
  },
  {
    "titulo": "¿Existe peligro real e inminente?",
    "descripcion": "",
    "clave": "ING2",
    "acciones": [
      {
        "descripcion": "SI",
        "clave": "INGR",
        "icon": "check"
      },
      {
        "descripcion": "NO",
        "clave": "ING3",
        "icon": "cross"
      }
    ]
  },
  {
    "titulo": "PROCESO A SEGUIR",
    "descripcion": "",
    "clave": "INGR",
    "acciones": [
      {
        "descripcion": "Ingresa al lugar cerrado",
        "clave": "INFORMATIVO",
        "icon": "police"
      },
      {
        "descripcion": "CONTINUAR",
        "clave": "EFLGA01LG",
        "icon": "police"
      }
    ]
  },
  {
    "titulo": "¿La persona autoriza el ingreso al lugar?",
    "descripcion": "",
    "clave": "ING3",
    "acciones": [
      {
        "descripcion": "SI",
        "clave": "INGB1",
        "icon": "check"
      },
      {
        "descripcion": "NO",
        "clave": "INGB2",
        "icon": "cross"
      }
    ]
  },
  {
    "titulo": "PROCESO A SEGUIR",
    "descripcion": "",
    "clave": "INGB1",
    "acciones": [
      {
        "descripcion": "Informa a MP para que gestione fecha de ratificación ante J.C.",
        "clave": "INFORMATIVO",
        "icon": "police"
      },
      {
        "descripcion": "CONTINUAR",
        "clave": "EFLGA02",
        "icon": "police"
      }
    ]
  },
  {
    "titulo": "PROCESO A SEGUIR",
    "descripcion": "",
    "clave": "INGB2",
    "acciones": [
      {
        "descripcion": "Realiza actas en el lugar para los datos de prueba que se requieran para que se conceda el cateo",
        "clave": "INFORMATIVO",
        "icon": "police"
      },
      {
        "descripcion": "CONTINUAR",
        "clave": "INGB1A",
        "icon": "police"
      }
    ]
  },
  {
    "titulo": "¿Existe medio de comunicación?",
    "descripcion": "",
    "clave": "INGB1A",
    "acciones": [
      {
        "descripcion": "SI",
        "clave": "INGB1A1",
        "icon": "check"
      },
      {
        "descripcion": "NO",
        "clave": "INGB1A2",
        "icon": "cross"
      }
    ]
  },
  {
    "titulo": "PROCESO A SEGUIR",
    "descripcion": "",
    "clave": "INGB1A1",
    "acciones": [
      {
        "descripcion": "Se comunica con el AMP y superior e informa necesidad de orden de cateo.\n\nMinisterio Público Realiza solicitud de audiencia para orden de cateo.\n\nDILIGENCIAS CON CONTROL JUDICIAL",
        "clave": "INFORMATIVO",
        "icon": "police"
      },
      {
        "descripcion": "CONTINUAR",
        "clave": "JDC",
        "icon": "police"
      }
    ]
  },
  {
    "titulo": "PROCESO A SEGUIR",
    "descripcion": "",
    "clave": "INGB1A2",
    "acciones": [
      {
        "descripcion": "Se repliega y busca mantener contacto con el AMP.\n\nSe comunica con el AMP y superior e informa necesidad de orden de cateo.\n\nMinisterio Público Realiza solicitud de audiencia para orden de cateo.\n\nDILIGENCIAS CON CONTROL JUDICIAL",
        "clave": "INFORMATIVO",
        "icon": "police"
      },
      {
        "descripcion": "CONTINUAR",
        "clave": "JDC",
        "icon": "police"
      }
    ]
  },
  {
    "titulo": "¿Juez concede diligencia de cateo?",
    "descripcion": "",
    "clave": "JDC",
    "acciones": [
      {
        "descripcion": "SI",
        "clave": "JDC1",
        "icon": "check"
      },
      {
        "descripcion": "NO",
        "clave": "JDC2",
        "icon": "cross"
      }
    ]
  },
  {
    "titulo": "PROCESO A SEGUIR",
    "descripcion": "",
    "clave": "JDC1",
    "acciones": [
      {
        "descripcion": "Ministerio Público Informa autorización para realizar el cateo",
        "clave": "INFORMATIVO",
        "icon": "pstation"
      },
      {
        "descripcion": "CONTINUAR",
        "clave": "EFLGA02",
        "icon": "police"
      }
    ]
  },
  {
    "titulo": "PROCESO A SEGUIR",
    "descripcion": "",
    "clave": "JDC2",
    "acciones": [
      {
        "descripcion": "Informa a policía de negativa y continúa con estrategia de investigación",
        "clave": "INFORMATIVO",
        "icon": "police"
      },
      {
        "descripcion": "TERMINAR",
        "clave": "FIN",
        "icon": "police"
      }
    ]
  },
  {
    "titulo": "PROCESO A SEGUIR",
    "descripcion": "",
    "clave": "EFLGA01",
    "acciones": [
      {
        "descripcion": "Realiza detención",
        "clave": "INFORMATIVO",
        "icon": "police"
      },
      {
        "descripcion": "CONTINUAR",
        "clave": "EFLGA01X",
        "icon": "police"
      },
      {
        "descripcion": "Consultar nivel del uso de la fuerza",
        "clave": "ACCION:usofuerza"
      }
    ]
  },
  {
    "titulo": "REALIZA DETENCIÓN.",
    "descripcion": "¿Existe medio de comunicación?",
    "clave": "EFLGA01X",
    "acciones": [
      {
        "descripcion": "SI",
        "clave": "MDC01",
        "icon": "check"
      },
      {
        "descripcion": "NO",
        "clave": "MDC02",
        "icon": "cross"
      }
    ]
  },
  {
    "titulo": "PROCESO A SEGUIR",
    "descripcion": "",
    "clave": "MDC01",
    "acciones": [
      {
        "descripcion": "Informa a AMP y mando inmediato\n\nRealiza lectura de derechos y registro de detención e informa a la persona porque es detenido",
        "clave": "INFORMATIVO",
        "icon": "police"
      },
      {
        "descripcion": "Consultar derechos del detenido",
        "clave": "ACCION:derechos"
      },
      {
        "descripcion": "CONTINUAR",
        "clave": "MDC03",
        "icon": "police"
      }
    ]
  },
  {
    "titulo": "PROCESO A SEGUIR",
    "descripcion": "",
    "clave": "MDC02",
    "acciones": [
      {
        "descripcion": "Busca medio de comunicación.\n\nInforma a AMP y mando inmediato\n\nRealiza lectura de derechos y registro de detención e informa a la persona porque es detenido.",
        "clave": "INFORMATIVO",
        "icon": "police"
      },
      {
        "descripcion": "CONTINUAR",
        "clave": "MDC03",
        "icon": "police"
      }
    ]
  },
  {
    "titulo": "¿Detenido presenta lesiones?",
    "descripcion": "",
    "clave": "MDC03",
    "acciones": [
      {
        "descripcion": "SI",
        "clave": "DPL1",
        "icon": "check"
      },
      {
        "descripcion": "NO",
        "clave": "DPL2",
        "icon": "cross"
      }
    ]
  },
  {
    "titulo": "PROCESO A SEGUIR",
    "descripcion": "",
    "clave": "DPL1",
    "acciones": [
      {
        "descripcion": "Solicita asistencia médica (ambulancia para traslado).\n\nCustodia al detenido",
        "clave": "INFORMATIVO",
        "icon": "police"
      },
      {
        "descripcion": "CONTINUAR",
        "clave": "DPL3",
        "icon": "police"
      }
    ]
  },
  {
    "titulo": "PROCESO A SEGUIR",
    "descripcion": "",
    "clave": "DPL2",
    "acciones": [
      {
        "descripcion": "Traslado del detenido para dictamen médico",
        "clave": "INFORMATIVO",
        "icon": "police"
      },
      {
        "descripcion": "CONTINUAR",
        "clave": "DPL3",
        "icon": "police"
      }
    ]
  },
  {
    "titulo": "PROCESO A SEGUIR",
    "descripcion": "",
    "clave": "DPL3",
    "acciones": [
      {
        "descripcion": "Inicia llenado de los registros ordenados por el AMP\n\nPone el detenido a disposición del AMP y entrega actas correspondientes\n\nCONTROL DE DETENCIÓN",
        "clave": "INFORMATIVO",
        "icon": "police"
      },
      {
        "descripcion": "CONTINUAR",
        "clave": "EFLGA02",
        "icon": "police"
      }
    ]
  },
  {
    "titulo": "¿Es falta administrativa?",
    "descripcion": "",
    "clave": "FAAD01",
    "acciones": [
      {
        "descripcion": "SI",
        "clave": "FAD00",
        "icon": "check"
      },
      {
        "descripcion": "NO",
        "clave": "FIN",
        "icon": "cross"
      }
    ]
  },
  {
    "titulo": "PROCESO A SEGUIR",
    "descripcion": "",
    "clave": "EFLGA02",
    "acciones": [
      {
        "descripcion": "Prevé medidas de seguridad.\n\nPresta protección y auxilio inmediato a víctimas, ofendidos y testigo.\n\nInforma de sus derechos a víctima, ofendidos y testigos, y recaba las firmas en los documentos.\n\nPreserva y fija el lugar de los hechos o hallazgos.",
        "clave": "INFORMATIVO",
        "icon": "police"
      },
      {
        "descripcion": "Llenar IPH",
        "clave": "ACCION:actas_firmas"
      },
      {
        "descripcion": "CONTINUAR",
        "clave": "EFLGA02-01",
        "icon": "police"
      }
    ]
  },
  {
    "clave": "EFLGA02-01",
    "titulo": "¿Existe riesgo de alteración, destrucción o desaparición de indicios?",
    "descripcion": "",
    "acciones": [
      {
        "descripcion": "SI",
        "clave": "INFAMP",
        "icon": "check"
      },
      {
        "descripcion": "NO",
        "clave": "EFLGA02-02",
        "icon": "cross"
      },
      {
        "descripcion": "Tomar fotografías y ubicación",
        "clave": "ACCION:media"
      }
    ]
  },
  {
    "clave": "EFLGA02-02",
    "titulo": "PROCESO A SEGUIR",
    "descripcion": "",
    "acciones": [
      {
        "descripcion": "Entrega escena a Policia Investigador",
        "clave": "INFORMATIVO",
        "icon": "police"
      },
      {
        "descripcion": "CONTINUAR",
        "clave": "EFLGA02-02X",
        "icon": "police"
      }
    ]
  },
  {
    "clave": "EFLGA02-02X",
    "titulo": "¿Requiere apoyo de Policia Especializada, IJCF o UPEC?",
    "descripcion": "",
    "acciones": [
      {
        "descripcion": "SI",
        "clave": "EFLGA02-02A",
        "icon": "check"
      },
      {
        "descripcion": "NO",
        "clave": "INFAMP",
        "icon": "cross"
      }
    ]
  },
  {
    "titulo": "PROCESO A SEGUIR",
    "descripcion": "",
    "clave": "EFLGA02-02A",
    "acciones": [
      {
        "descripcion": "Policia informa a AMP la necesidad de apoyo.\n\nPolicia/AMP coordinan el envío de apoyo especializado.\n\nPolicía Especializada / IJCF arriban al lugar de los hechos.\n\nRealiza entrega - recepción del lugar de los hechos",
        "clave": "INFORMATIVO",
        "icon": "police"
      },
      {
        "descripcion": "CONTINUAR",
        "clave": "EFLGA02-02B",
        "icon": "police"
      }
    ]
  },
  {
    "titulo": "PROCESO A SEGUIR",
    "descripcion": "",
    "clave": "EFLGA02-02B",
    "acciones": [
      {
        "descripcion": "Policia Especializada Da seguimiento al procesamiento en coordinación con el IJCF\n\nA petición de Policía Especializado o IJCF, protege el lugar mientas se realiza inspección\n\nACTUACIONES DEL IJCF",
        "clave": "INFORMATIVO",
        "icon": "police"
      },
      {
        "descripcion": "CONTINUAR",
        "clave": "CDC",
        "icon": "police"
      }
    ]
  },
  {
    "titulo": "PROCESO A SEGUIR",
    "descripcion": "",
    "clave": "INFAMP",
    "acciones": [
      {
        "descripcion": "Informa a AMP.\n\nProcesa y levanta indicios, objetos, instrumentos o productos del delito.",
        "clave": "INFORMATIVO",
        "icon": "police"
      },
      {
        "descripcion": "CONTINUAR",
        "clave": "CDC",
        "icon": "police"
      }
    ]
  },
  {
    "clave": "CDC",
    "titulo": "PROCESO A SEGUIR",
    "descripcion": "",
    "acciones": [
      {
        "descripcion": "El AMP ordena cuáles actas llenar.",
        "clave": "INFORMATIVO",
        "icon": "police"
      },
      {
        "descripcion": "Llenar IPH",
        "clave": "ACCION:actas_firmas"
      },
      {
        "descripcion": "CONTINUAR",
        "clave": "CDCX",
        "icon": "police"
      }
    ]
  },
  {
    "clave": "CDCX",
    "titulo": "¿Se requieren peritajes?",
    "descripcion": "",
    "acciones": [
      {
        "descripcion": "SI",
        "clave": "CDC1",
        "icon": "check"
      },
      {
        "descripcion": "NO",
        "clave": "CDC2",
        "icon": "cross"
      }
    ]
  },
  {
    "titulo": "PROCESO A SEGUIR",
    "descripcion": "",
    "clave": "CDC1",
    "acciones": [
      {
        "descripcion": "AMP / Policía Especializada / Policía Solicita dictámen al IJCF.\n\nAMP / Policía Especializada / Policía Traslada o entrega los indicios, objetos, instrumentos o productos del delito al IJCF.\n\nDERIVACIÓN PARA ANÁLISIS DE INDICIOS,\n\nEntrega actas al AMP",
        "clave": "INFORMATIVO",
        "icon": "police"
      },
      {
        "descripcion": "TERMINAR",
        "clave": "FIN",
        "icon": "police"
      }
    ]
  },
  {
    "titulo": "PROCESO A SEGUIR",
    "descripcion": "",
    "clave": "CDC2",
    "acciones": [
      {
        "descripcion": "AMP / Policía Especializada / Policía traslada los indicios, objetos, instrumentos o productos del delito al la Bodega de Evidencias.\n\nBIENES O INDICIOS ASEGURADOS.\n\nEntrega actas al AMP",
        "clave": "INFORMATIVO",
        "icon": "police"
      },
      {
        "descripcion": "TERMINAR",
        "clave": "FIN",
        "icon": "police"
      }
    ]
  },
  {
    "titulo": "PROCESO A SEGUIR",
    "descripcion": "",
    "clave": "FAD00",
    "acciones": [
      {
        "descripcion": "SEGUIMIENTO A FALTAS ADMINISTRATIVAS\n\nDe manera inmediata y previo a la libertad por falta administrativa, verifica existencia de orden de aprehensión.\n\nUDAI realiza búsqueda de orden de aprehensión.",
        "clave": "INFORMATIVO",
        "icon": "police"
      },
      {
        "descripcion": "CONTINUAR",
        "clave": "FAD01",
        "icon": "police"
      },
      {
        "descripcion": "Consultar artículo 141 CNPP",
        "clave": "ACCION:art141"
      }
    ]
  },
  {
    "clave": "FAD01",
    "titulo": "¿Existe orden de aprehensión?",
    "descripcion": "",
    "acciones": [
      {
        "descripcion": "SI",
        "clave": "SFA01",
        "icon": "check"
      },
      {
        "descripcion": "NO",
        "clave": "SFA02",
        "icon": "cross"
      }
    ]
  },
  {
    "titulo": "PROCESO A SEGUIR",
    "descripcion": "",
    "clave": "SFA02",
    "acciones": [
      {
        "descripcion": "SEGUIMIENTO A FALTAS ADMINISTRATIVAS",
        "clave": "FALTADMIN",
        "icon": "police"
      },
      {
        "descripcion": "Llenar IPH",
        "clave": "FIN",
        "icon": "police"
      }
    ]
  },
  {
    "clave": "SFA01",
    "titulo": "PROCESO A SEGUIR",
    "descripcion": "",
    "acciones": [
      {
        "descripcion": "Coordina la ejecución de orden de aprehensión.\n\nElabora actas correspondientes.\n\nPone persona detenida a disposición del AMP.",
        "clave": "informativo",
        "icon": "police"
      },
      {
        "descripcion": "TERMINAR",
        "clave": "FIN",
        "icon": "police"
      },
      {
        "descripcion": "Consultar artículo 145 CNPP",
        "clave": "ACCION:art145"
      }
    ]
  },
  {
    "titulo": "PROCESO A SEGUIR",
    "descripcion": "",
    "clave": "EFLGA01LG",
    "acciones": [
      {
        "descripcion": "Realiza detención",
        "clave": "INFORMATIVO",
        "icon": "police"
      },
      {
        "descripcion": "CONTINUAR",
        "clave": "EFLGA01XLG",
        "icon": "police"
      },
      {
        "descripcion": "Consultar nivel del uso de la fuerza",
        "clave": "ACCION:usofuerza"
      }
    ]
  },
  {
    "titulo": "¿Existe medio de comunicación?",
    "descripcion": "",
    "clave": "EFLGA01XLG",
    "acciones": [
      {
        "descripcion": "SI",
        "clave": "MDC01LG",
        "icon": "check"
      },
      {
        "descripcion": "NO",
        "clave": "MDC02LG",
        "icon": "cross"
      }
    ]
  },
  {
    "titulo": "PROCESO A SEGUIR",
    "descripcion": "",
    "clave": "MDC01LG",
    "acciones": [
      {
        "descripcion": "Informa a AMP y mando inmediato.\n\nRealiza lectura de derechos y registro de detención e informa a la persona porque es detenido.",
        "clave": "INFORMATIVO",
        "icon": "police"
      },
      {
        "descripcion": "CONTINUAR",
        "clave": "MDC03LG",
        "icon": "police"
      }
    ]
  },
  {
    "titulo": "PROCESO A SEGUIR",
    "descripcion": "",
    "clave": "MDC02LG",
    "acciones": [
      {
        "descripcion": "Busca medio de comunicación.\n\nInforma a AMP y mando inmediato.\n\nRealiza lectura de derechos y registro de detención e informa a la persona porque es detenido",
        "clave": "INFORMATIVO",
        "icon": "police"
      },
      {
        "descripcion": "CONTINUAR",
        "clave": "MDC03LG",
        "icon": "police"
      }
    ]
  },
  {
    "titulo": "¿Detenido presenta lesiones?",
    "descripcion": "",
    "clave": "MDC03LG",
    "acciones": [
      {
        "descripcion": "SI",
        "clave": "DPL1LG",
        "icon": "check"
      },
      {
        "descripcion": "NO",
        "clave": "DPL2LG",
        "icon": "cross"
      }
    ]
  },
  {
    "titulo": "PROCESO A SEGUIR",
    "descripcion": "",
    "clave": "DPL1LG",
    "acciones": [
      {
        "descripcion": "Solicita asistencia médica (ambulancia para traslado)\n\nCustodia al detenido",
        "clave": "INFORMATIVO",
        "icon": "police"
      },
      {
        "descripcion": "CONTINUAR",
        "clave": "DPL3LG",
        "icon": "police"
      }
    ]
  },
  {
    "titulo": "PROCESO A SEGUIR",
    "descripcion": "",
    "clave": "DPL2LG",
    "acciones": [
      {
        "descripcion": "Traslado del detenido para dictamen médico",
        "clave": "INFORMATIVO",
        "icon": "police"
      },
      {
        "descripcion": "CONTINUAR",
        "clave": "DPL3LG",
        "icon": "police"
      }
    ]
  },
  {
    "titulo": "PROCESO A SEGUIR",
    "descripcion": "",
    "clave": "DPL3LG",
    "acciones": [
      {
        "descripcion": "Inicia llenado de los registros ordenados por el AMP\n\nPone el detenido a disposición del AMP y entrega actas correspondientes",
        "clave": "INFORMATIVO",
        "icon": "police"
      },
      {
        "descripcion": "CONTINUAR",
        "clave": "ING3",
        "icon": "police"
      }
    ]
  },
  {
    "titulo": "INFRACCIONES ADMINISTRATIVAS Y JUSTICIA CÍVICA",
    "descripcion": "",
    "clave": "FALTADMIN",
    "icon": "",
    "acciones": [
      {
        "descripcion": "PRIMER RESPONDIENTE:\n\n\n- Se realiza una detención por una presunta falta administrativa\n\n- Se realiza el registro inmediato de la detención\n\n- Se traslada a la persona detenida a la autoridad administrativa\n\n- Se pone a disposición a la persona detenida ante la autoridad adminsitrativa.",
        "clave": "INFORMATIVO",
        "icon": "police"
      },
      {
        "descripcion": "CONTINUAR",
        "clave": "FALTADMIN2",
        "icon": "police"
      }
    ]
  },
  {
    "titulo": "JUEZ CÍVICO",
    "descripcion": "",
    "clave": "FALTADMIN2",
    "acciones": [
      {
        "descripcion": "- Se recibe la puesta a disposición\n\n- Se realiza la actualización del Registro\n\n- Se realiza la Audiencia Pública ante la Persona Juzgadora",
        "clave": "",
        "icon": "judge"
      },
      {
        "descripcion": "CONTINUAR",
        "clave": "FALTADMIN3",
        "icon": "police"
      }
    ]
  },
  {
    "titulo": "¿Es culpable?",
    "descripcion": "",
    "clave": "FALTADMIN3",
    "icon": "",
    "acciones": [
      {
        "descripcion": "SI",
        "clave": "FALTADMIN3SI",
        "icon": "check"
      },
      {
        "descripcion": "NO",
        "clave": "FALTADMIN5",
        "icon": "cross"
      }
    ]
  },
  {
    "titulo": "PROCESO A SEGUIR",
    "descripcion": "",
    "clave": "FALTADMIN3SI",
    "icon": "judge",
    "acciones": [
      {
        "descripcion": "- Se establece sansión.\n\n¿Cumplirá pena privativa de la libertad?",
        "clave": "",
        "icon": "judge"
      },
      {
        "descripcion": "SI",
        "clave": "FALTADMIN4SI",
        "icon": "check"
      },
      {
        "descripcion": "NO",
        "clave": "FALTADMIN4NO",
        "icon": "cross"
      }
    ]
  },
  {
    "titulo": "PROCESO A SEGUIR",
    "descripcion": "",
    "clave": "FALTADMIN4SI",
    "icon": "judge",
    "acciones": [
      {
        "descripcion": "Se ingresa al Centro de Detención Municipal (o su equivalente)",
        "clave": "",
        "icon": "judge"
      },
      {
        "descripcion": "CONTINUAR",
        "clave": "FALTADMINCENTRO",
        "icon": "check"
      }
    ]
  },
  {
    "titulo": "Se paga la infracción",
    "descripcion": "",
    "clave": "FALTADMIN4NO",
    "icon": "judge",
    "acciones": [
      {
        "descripcion": "CONTINUAR",
        "clave": "FALTADMIN5",
        "icon": "check"
      }
    ]
  },
  {
    "titulo": "PROCESO A SEGUIR",
    "descripcion": "",
    "clave": "FALTADMIN5",
    "acciones": [
      {
        "descripcion": "- Se actualiza el registro.\n\n- Se pone el libertad.",
        "clave": "",
        "icon": "judge"
      },
      {
        "descripcion": "TERMINAR",
        "clave": "FIN",
        "icon": "judge"
      }
    ]
  },
  {
    "titulo": "CENTRO DE DETENCIÓN MUNICIPAL",
    "descripcion": "",
    "clave": "FALTADMINCENTRO",
    "acciones": [
      {
        "descripcion": "- Se recibe al detenido\n\n-Se actualiza el Registro\n\n- Se verifican datos personales y motivo de la detención",
        "clave": "",
        "icon": "pstation"
      },
      {
        "descripcion": "CONTINUAR",
        "clave": "CDETENCION",
        "icon": "pstation"
      }
    ]
  },
  {
    "titulo": "¿Es menor de edad?",
    "descripcion": "",
    "clave": "CDETENCION",
    "acciones": [
      {
        "descripcion": "SI",
        "clave": "CDETENCION2SI",
        "icon": "check"
      },
      {
        "descripcion": "NO",
        "clave": "CDETENCION2NO",
        "icon": "cross"
      }
    ]
  },
  {
    "titulo": "PROCESO A SEGUIR",
    "descripcion": "",
    "clave": "CDETENCION2NO",
    "acciones": [
      {
        "descripcion": "- Se ingresa al área médica\n\n¿Se considera incapaz de declarar?",
        "clave": "CDETENCION2SI",
        "icon": "doctor"
      },
      {
        "descripcion": "SI",
        "clave": "CDETENCION4SI",
        "icon": "check"
      },
      {
        "descripcion": "NO",
        "clave": "CDETENCION3NO",
        "icon": "cross"
      }
    ]
  },
  {
    "titulo": "PROCESO A SEGUIR",
    "descripcion": "",
    "clave": "CDETENCION2SI",
    "acciones": [
      {
        "descripcion": "- Se canaliza a la Unidad Especializada de Menores Infractores\n\n- Se actualiza el registro",
        "clave": "CDETENCION2SI",
        "icon": "pstation"
      },
      {
        "descripcion": "TERMINAR",
        "clave": "FIN",
        "icon": "pstation"
      }
    ]
  },
  {
    "titulo": "PROCESO A SEGUIR",
    "descripcion": "",
    "clave": "CDETENCION3NO",
    "acciones": [
      {
        "descripcion": "- Se canaliza al área de tamizaje\n\n- Se cumplen con las horas de detención\n\n- Se actualiza el Registro\n\n- Se pone en libertad",
        "clave": "",
        "icon": "pstation"
      },
      {
        "descripcion": "TERMINAR",
        "clave": "FIN",
        "icon": "pstation"
      }
    ]
  },
  {
    "titulo": "PROCESO A SEGUIR",
    "descripcion": "",
    "clave": "CDETENCION4SI",
    "acciones": [
      {
        "descripcion": "- Se canaliza a un tratamiento terapéutico\n\n- Se actualiza el Registro\n\n- Se pone en libertad",
        "clave": "",
        "icon": "pstation"
      },
      {
        "descripcion": "TERMINAR",
        "clave": "FIN",
        "icon": "pstation"
      }
    ]
  }
];
