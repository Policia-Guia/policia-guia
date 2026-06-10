# PolicíaGuía

Plataforma web de consulta para personal de seguridad pública. Reúne los
procedimientos del primer respondiente, el marco normativo aplicable y los
formatos del **Informe Policial Homologado (IPH)** en una sola interfaz.

## Características

- **Guía interactiva** — árbol de decisiones de 63 pasos para la actuación policial.
- **Biblioteca legal** — 25 documentos en PDF (Constitución, CNPP, Derechos
  Humanos, Flagrancia, Protocolo Alba, perspectiva de género y más).
- **Buscador** integrado en la biblioteca.
- **Visor de PDF** en modal.
- **100 % offline** — todos los datos están embebidos, no requiere servidor.
- **Diseño responsive** con tema oscuro moderno.

## Estructura

```
.
├── index.html              Estructura del sitio
├── css/
│   └── styles.css          Estilos (dark mode azul/cian)
├── js/
│   ├── data.js             Árbol de decisiones (63 nodos)
│   └── script.js           Navegación, biblioteca, visor PDF
├── assets/
│   └── logo-tonala.jpg     Escudo de Policía Municipal Tonalá
└── pdfs/                   25 documentos legales
```

## Uso local

Abre `index.html` directamente en cualquier navegador moderno. No requiere
servidor ni instalación.

## Sitio web

Publicado vía GitHub Pages.
