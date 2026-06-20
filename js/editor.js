/* ============================================================
   PolicíaGuía — Editor DOCX en navegador (docx-preview)
   - docx-preview: renderiza DOCX con alta fidelidad (tablas, escudos, layout)
   - contenteditable: permite editar el contenido
   - html-docx-js: convierte el HTML editado de vuelta a DOCX
   - localStorage: autoguarda mientras se escribe
   ============================================================ */

(function () {
  'use strict';

  // Catálogo de documentos editables
  const DOCS = {
    'iph': {
      file: 'docs/IPH_para_llenar.docx',
      title: 'IPH para llenar',
      desc: 'Informe Policial Homologado — llena los campos en pantalla y guarda en tu dispositivo.',
      saveAs: 'IPH_llenado.docx',
      storageKey: 'policiaguia_doc_iph_v2'
    },
    'cadena': {
      file: 'docs/Registro_Cadena_Custodia.docx',
      title: 'Registro de Cadena de Custodia',
      desc: 'Formato oficial — llena los campos en pantalla y guarda en tu dispositivo.',
      saveAs: 'Cadena_de_Custodia_llenado.docx',
      storageKey: 'policiaguia_doc_cadena_v2'
    }
  };

  // Parámetro de la URL
  const params = new URLSearchParams(window.location.search);
  const docKey = params.get('doc');
  const doc = DOCS[docKey];

  // Elementos del DOM
  const titleEl = document.getElementById('doc-title');
  const descEl = document.getElementById('doc-desc');
  const loadingEl = document.getElementById('loading');
  const errorEl = document.getElementById('error');
  const errorMsgEl = document.getElementById('error-msg');
  const containerEl = document.getElementById('docx-container');
  const statusEl = document.getElementById('autosave-status');
  const btnSave = document.getElementById('btn-save');
  const btnClear = document.getElementById('btn-clear');
  const btnDownloadOriginal = document.getElementById('btn-download-original');
  const yearEl = document.getElementById('year');

  if (yearEl) yearEl.textContent = new Date().getFullYear();

  if (!doc) {
    showError('Documento no encontrado. Vuelve al inicio y elige uno de los formatos editables.');
    return;
  }

  titleEl.textContent = doc.title;
  descEl.textContent = doc.desc;
  document.title = doc.title + ' — PolicíaGuía';
  btnDownloadOriginal.href = doc.file;
  btnDownloadOriginal.setAttribute('download', doc.file.split('/').pop());

  // Cargar y renderizar
  loadDocument();

  // ============================================================
  // FUNCIONES
  // ============================================================

  async function loadDocument() {
    try {
      // 1. Restaurar de localStorage si existe
      const saved = localStorage.getItem(doc.storageKey);
      if (saved) {
        containerEl.innerHTML = saved;
        makeEditable();
        showEditor();
        setStatus('Cargado desde tu última edición ✓', 'saved');
        attachEditHandler();
        return;
      }

      // 2. Cargar el DOCX original y renderizarlo con docx-preview
      const response = await fetch(doc.file);
      if (!response.ok) throw new Error('No se pudo descargar el archivo (' + response.status + ')');
      const blob = await response.blob();

      // docx-preview renderiza directamente en el contenedor
      await window.docx.renderAsync(blob, containerEl, null, {
        className: 'docx',
        inWrapper: true,
        ignoreWidth: false,
        ignoreHeight: false,
        ignoreFonts: false,
        breakPages: false,
        ignoreLastRenderedPageBreak: true,
        experimental: true,
        trimXmlDeclaration: true,
        useBase64URL: true,
        renderHeaders: true,
        renderFooters: true,
        renderFootnotes: false,
        renderEndnotes: false,
        debug: false
      });

      makeEditable();
      showEditor();
      setStatus('Listo para llenar ✓', 'saved');
      attachEditHandler();
    } catch (err) {
      console.error(err);
      showError('Error al cargar el documento: ' + err.message);
    }
  }

  function makeEditable() {
    // Hacer todo el contenedor editable
    containerEl.setAttribute('contenteditable', 'true');
    containerEl.setAttribute('spellcheck', 'true');
  }

  function showEditor() {
    loadingEl.hidden = true;
    errorEl.hidden = true;
    containerEl.hidden = false;
  }

  function showError(msg) {
    loadingEl.hidden = true;
    containerEl.hidden = true;
    errorEl.hidden = false;
    errorMsgEl.textContent = msg;
  }

  function setStatus(text, kind) {
    statusEl.textContent = text;
    statusEl.classList.remove('saving', 'saved');
    if (kind) statusEl.classList.add(kind);
  }

  // Autoguardado debounced
  let saveTimer = null;
  function attachEditHandler() {
    containerEl.addEventListener('input', () => {
      setStatus('Guardando…', 'saving');
      clearTimeout(saveTimer);
      saveTimer = setTimeout(() => {
        try {
          localStorage.setItem(doc.storageKey, containerEl.innerHTML);
          setStatus('Guardado automáticamente ✓', 'saved');
        } catch (e) {
          setStatus('No se pudo autoguardar (¿almacenamiento lleno?)', '');
        }
      }, 700);
    });
  }

  // Botón Guardar como DOCX
  btnSave.addEventListener('click', () => {
    try {
      // Extraer el contenido renderizado (con estilos inline de docx-preview)
      const htmlContent = containerEl.innerHTML;

      // Recolectar estilos inline del documento renderizado
      const docElement = containerEl.querySelector('.docx, .docx-wrapper > section, section');
      const docStyles = docElement ? docElement.outerHTML : htmlContent;

      // Envolver en HTML completo para html-docx-js
      const fullHtml = `
<!DOCTYPE html>
<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word">
<head>
  <meta charset="utf-8">
  <title>${doc.title}</title>
  <style>
    body { font-family: Calibri, Arial, sans-serif; font-size: 11pt; color: #000; }
    h1 { font-size: 16pt; text-align: center; margin: 12pt 0; }
    h2 { font-size: 13pt; margin: 10pt 0 6pt; }
    h3 { font-size: 11pt; margin: 8pt 0 4pt; }
    p { margin: 4pt 0; }
    table { border-collapse: collapse; width: 100%; margin: 6pt 0; }
    table td, table th { border: 1px solid #888; padding: 4pt 6pt; vertical-align: top; }
    table th { background: #f0f0f0; font-weight: bold; }
    img { max-width: 100%; height: auto; }
  </style>
</head>
<body>${htmlContent}</body>
</html>`;

      const blob = window.htmlDocx.asBlob(fullHtml, {
        orientation: 'portrait',
        margins: { top: 720, right: 720, bottom: 720, left: 720 }
      });

      saveBlob(blob, doc.saveAs);
      setStatus('Descargado ✓ — busca el archivo en Descargas', 'saved');
    } catch (e) {
      console.error(e);
      alert('No se pudo generar el DOCX: ' + e.message);
    }
  });

  function saveBlob(blob, filename) {
    if (window.saveAs) {
      window.saveAs(blob, filename);
      return;
    }
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);
  }

  // Botón Limpiar
  btnClear.addEventListener('click', async () => {
    if (!confirm('¿Borrar todo lo que llenaste y volver al documento en blanco?')) return;
    localStorage.removeItem(doc.storageKey);
    containerEl.innerHTML = '';
    loadingEl.hidden = false;
    containerEl.hidden = true;
    setStatus('Recargando…', 'saving');
    try {
      const response = await fetch(doc.file);
      const blob = await response.blob();
      await window.docx.renderAsync(blob, containerEl, null, {
        className: 'docx',
        inWrapper: true,
        experimental: true,
        useBase64URL: true,
        renderHeaders: true,
        renderFooters: true,
        ignoreLastRenderedPageBreak: true,
        breakPages: false
      });
      makeEditable();
      showEditor();
      setStatus('Documento reiniciado ✓', 'saved');
    } catch (e) {
      showError('No se pudo recargar el documento.');
    }
  });

})();
