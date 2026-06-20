/* ============================================================
   PolicíaGuía — Editor de DOCX en navegador
   - mammoth.js: convierte DOCX → HTML para edición
   - html-docx-js: convierte HTML editado → DOCX para descarga
   - localStorage: autoguardado mientras se escribe
   ============================================================ */

(function () {
  'use strict';

  // Catálogo de documentos editables
  const DOCS = {
    'iph': {
      file: 'docs/IPH_para_llenar.docx',
      title: 'IPH para llenar',
      desc: 'Informe Policial Homologado — formato editable. Llena los campos y guarda en tu dispositivo.',
      saveAs: 'IPH_llenado.docx',
      storageKey: 'policiaguia_doc_iph'
    },
    'cadena': {
      file: 'docs/Registro_Cadena_Custodia.docx',
      title: 'Registro de Cadena de Custodia',
      desc: 'Formato oficial editable. Llena los campos y guarda en tu dispositivo.',
      saveAs: 'Cadena_de_Custodia_llenado.docx',
      storageKey: 'policiaguia_doc_cadena'
    }
  };

  // Estado
  const params = new URLSearchParams(window.location.search);
  const docKey = params.get('doc');
  const doc = DOCS[docKey];

  // Elementos
  const titleEl = document.getElementById('doc-title');
  const descEl = document.getElementById('doc-desc');
  const loadingEl = document.getElementById('loading');
  const errorEl = document.getElementById('error');
  const errorMsgEl = document.getElementById('error-msg');
  const paperEl = document.getElementById('editor-paper');
  const contentEl = document.getElementById('editor-content');
  const statusEl = document.getElementById('autosave-status');
  const btnSave = document.getElementById('btn-save');
  const btnClear = document.getElementById('btn-clear');
  const btnDownloadOriginal = document.getElementById('btn-download-original');
  const yearEl = document.getElementById('year');

  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Validar parámetro
  if (!doc) {
    showError('Documento no encontrado. Vuelve al inicio y selecciona uno de los formatos editables.');
    return;
  }

  // Actualizar UI con info del documento
  titleEl.textContent = doc.title;
  descEl.textContent = doc.desc;
  document.title = doc.title + ' — PolicíaGuía';
  btnDownloadOriginal.href = doc.file;
  btnDownloadOriginal.setAttribute('download', doc.saveAs.replace('_llenado', ''));

  // Cargar y renderizar el DOCX
  loadDocument();

  // -------- Funciones --------

  async function loadDocument() {
    try {
      // 1. Intentar restaurar de localStorage primero
      const saved = localStorage.getItem(doc.storageKey);
      if (saved) {
        contentEl.innerHTML = saved;
        showEditor();
        setStatus('Cargado desde tu última edición', 'saved');
        attachEditHandler();
        return;
      }

      // 2. Si no hay nada guardado, cargar el DOCX original
      const response = await fetch(doc.file);
      if (!response.ok) throw new Error('No se pudo descargar el archivo (' + response.status + ')');
      const arrayBuffer = await response.arrayBuffer();

      // Convertir DOCX a HTML con mammoth
      const result = await mammoth.convertToHtml({ arrayBuffer: arrayBuffer });
      contentEl.innerHTML = result.value;

      showEditor();
      setStatus('Listo para llenar', 'saved');
      attachEditHandler();
    } catch (err) {
      console.error(err);
      showError('Error al cargar el documento: ' + err.message);
    }
  }

  function showEditor() {
    loadingEl.hidden = true;
    errorEl.hidden = true;
    paperEl.hidden = false;
  }

  function showError(msg) {
    loadingEl.hidden = true;
    paperEl.hidden = true;
    errorEl.hidden = false;
    errorMsgEl.textContent = msg;
  }

  function setStatus(text, kind) {
    statusEl.textContent = text;
    statusEl.classList.remove('saving', 'saved');
    if (kind) statusEl.classList.add(kind);
  }

  // Autoguardado en localStorage (debounced)
  let saveTimer = null;
  function attachEditHandler() {
    contentEl.addEventListener('input', () => {
      setStatus('Guardando…', 'saving');
      clearTimeout(saveTimer);
      saveTimer = setTimeout(() => {
        try {
          localStorage.setItem(doc.storageKey, contentEl.innerHTML);
          setStatus('Guardado automáticamente ✓', 'saved');
        } catch (e) {
          setStatus('No se pudo autoguardar', '');
        }
      }, 600);
    });
  }

  // Botón "Guardar como DOCX"
  btnSave.addEventListener('click', () => {
    try {
      const htmlContent = contentEl.innerHTML;
      // Envolvemos en HTML completo para que html-docx-js lo procese bien
      const fullHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><style>
  body { font-family: Calibri, Arial, sans-serif; font-size: 11pt; color: #000; }
  h1 { font-size: 16pt; text-align: center; }
  h2 { font-size: 13pt; border-bottom: 1px solid #444; padding-bottom: 3px; }
  h3 { font-size: 11pt; }
  table { border-collapse: collapse; width: 100%; }
  table td, table th { border: 1px solid #888; padding: 4px 6px; }
  p { margin: 6px 0; }
</style></head>
<body>${htmlContent}</body>
</html>`;

      const blob = window.htmlDocx.asBlob(fullHtml);
      saveBlob(blob, doc.saveAs);
      setStatus('Descargado ✓ — revisa tus Descargas', 'saved');
    } catch (e) {
      console.error(e);
      alert('No se pudo generar el DOCX: ' + e.message);
    }
  });

  // Helper para descargar el blob (compatible con todos los navegadores móviles)
  function saveBlob(blob, filename) {
    if (window.saveAs) {
      // file-saver lib
      window.saveAs(blob, filename);
      return;
    }
    // Fallback manual
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

  // Botón "Limpiar"
  btnClear.addEventListener('click', async () => {
    if (!confirm('¿Borrar todo lo que escribiste y volver al documento original en blanco?')) return;
    localStorage.removeItem(doc.storageKey);
    setStatus('Cargando…', 'saving');
    loadingEl.hidden = false;
    paperEl.hidden = true;
    try {
      const response = await fetch(doc.file);
      const arrayBuffer = await response.arrayBuffer();
      const result = await mammoth.convertToHtml({ arrayBuffer: arrayBuffer });
      contentEl.innerHTML = result.value;
      showEditor();
      setStatus('Documento reiniciado', 'saved');
    } catch (e) {
      showError('No se pudo recargar el documento.');
    }
  });

})();
