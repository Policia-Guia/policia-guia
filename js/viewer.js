/* ============================================================
   PolicíaGuía — Visor de DOCX con navegación a secciones
   ============================================================ */

(function () {
  'use strict';

  // Catálogo de documentos
  const DOCS = {
    'iph': {
      file: 'docs/IPH_para_llenar.docx',
      title: 'Archivo IPH',
      downloadName: 'IPH_para_llenar.docx',
      // Patrones para identificar secciones en el documento
      anchors: [
        { id: 'seccion-1',    label: 'Sección 1',    pattern: /^SECCI[ÓO]N\s*1\b/i },
        { id: 'seccion-2',    label: 'Sección 2',    pattern: /^SECCI[ÓO]N\s*2\b/i },
        { id: 'seccion-3',    label: 'Sección 3',    pattern: /^SECCI[ÓO]N\s*3\b/i },
        { id: 'seccion-4',    label: 'Sección 4',    pattern: /^SECCI[ÓO]N\s*4\b/i },
        { id: 'seccion-5',    label: 'Sección 5',    pattern: /^SECCI[ÓO]N\s*5\b/i },
        { id: 'anexo-a',      label: 'Anexo A',      pattern: /^ANEXO\s*A\b/i },
        { id: 'anexo-b',      label: 'Anexo B',      pattern: /^ANEXO\s*B\b/i },
        { id: 'anexo-c',      label: 'Anexo C',      pattern: /^ANEXO\s*C\b/i },
        { id: 'anexo-d',      label: 'Anexo D',      pattern: /^ANEXO\s*D\b/i },
        { id: 'anexo-e',      label: 'Anexo E',      pattern: /^ANEXO\s*E\b/i },
        { id: 'anexo-f',      label: 'Anexo F',      pattern: /^ANEXO\s*F\b/i },
        { id: 'anexo-g',      label: 'Anexo G',      pattern: /^ANEXO\s*G\b/i },
        { id: 'cadena',       label: 'Cadena de Custodia', pattern: /CADENA\s+DE\s+CUSTODIA/i }
      ]
    },
    'iph-civica': {
      file: 'docs/IPH_para_llenar.docx',
      title: 'IPH — Justicia Cívica',
      downloadName: 'IPH_para_llenar.docx',
      anchors: [
        { id: 'seccion-1', label: 'Sección 1', pattern: /^SECCI[ÓO]N\s*1\b/i },
        { id: 'seccion-2', label: 'Sección 2', pattern: /^SECCI[ÓO]N\s*2\b/i },
        { id: 'seccion-3', label: 'Sección 3', pattern: /^SECCI[ÓO]N\s*3\b/i },
        { id: 'seccion-4', label: 'Sección 4', pattern: /^SECCI[ÓO]N\s*4\b/i },
        { id: 'anexo-a',   label: 'Anexo A',   pattern: /^ANEXO\s*A\b/i },
        { id: 'anexo-b',   label: 'Anexo B',   pattern: /^ANEXO\s*B\b/i }
      ]
    },
    'cadena': {
      file: 'docs/Registro_Cadena_Custodia.docx',
      title: 'Registro de Cadena de Custodia',
      downloadName: 'Registro_Cadena_Custodia.docx',
      anchors: []
    }
  };

  // Parámetro de la URL
  const params = new URLSearchParams(window.location.search);
  const docKey = params.get('doc');
  const hash = window.location.hash.replace('#', '');
  const doc = DOCS[docKey];

  // Elementos DOM
  const titleEl = document.getElementById('doc-title');
  const sectionEl = document.getElementById('doc-section');
  const loadingEl = document.getElementById('loading');
  const errorEl = document.getElementById('error');
  const errorMsgEl = document.getElementById('error-msg');
  const containerEl = document.getElementById('docx-container');
  const statusEl = document.getElementById('status');
  const btnDownload = document.getElementById('btn-download');
  const tocEl = document.getElementById('quick-toc');
  const tocListEl = document.getElementById('toc-list');
  const yearEl = document.getElementById('year');

  if (yearEl) yearEl.textContent = new Date().getFullYear();

  if (!doc) {
    showError('Documento no encontrado. Vuelve al inicio y elige uno disponible.');
    return;
  }

  titleEl.textContent = doc.title;
  document.title = doc.title + ' — PolicíaGuía';
  btnDownload.href = doc.file;
  btnDownload.setAttribute('download', doc.downloadName);
  sectionEl.textContent = hash
    ? 'Navegando a: ' + (getAnchorLabel(hash) || hash)
    : 'Documento completo. Toca las secciones para navegar.';

  loadDocument();

  // ============================================================
  // FUNCIONES
  // ============================================================
  async function loadDocument() {
    try {
      const response = await fetch(doc.file);
      if (!response.ok) throw new Error('No se pudo descargar el archivo (' + response.status + ')');
      const blob = await response.blob();

      await window.docx.renderAsync(blob, containerEl, null, {
        className: 'docx',
        inWrapper: true,
        experimental: true,
        useBase64URL: true,
        renderHeaders: true,
        renderFooters: true,
        ignoreLastRenderedPageBreak: true,
        breakPages: false,
        renderFootnotes: false,
        renderEndnotes: false
      });

      // Asignar IDs a las secciones encontradas
      assignAnchorIds();

      // Construir el índice rápido con los anchors encontrados
      buildToc();

      showViewer();
      setStatus('Documento cargado ✓', 'ok');

      // Si vino con hash, scrollear ahí
      if (hash) {
        setTimeout(() => scrollToAnchor(hash), 200);
      }
    } catch (err) {
      console.error(err);
      showError('Error al cargar el documento: ' + err.message);
    }
  }

  function assignAnchorIds() {
    if (!doc.anchors || !doc.anchors.length) return;
    // Buscar elementos de texto en el documento renderizado
    const candidates = containerEl.querySelectorAll('p, h1, h2, h3, h4, h5, h6, td, th, div');
    const found = {};
    candidates.forEach(el => {
      const text = (el.textContent || '').trim();
      if (!text || text.length > 200) return; // Solo títulos cortos
      for (const a of doc.anchors) {
        if (found[a.id]) continue; // Solo primera ocurrencia
        if (a.pattern.test(text)) {
          el.id = a.id;
          el.setAttribute('data-anchor', a.id);
          found[a.id] = true;
          break;
        }
      }
    });
  }

  function buildToc() {
    if (!doc.anchors || !doc.anchors.length) return;
    const available = doc.anchors.filter(a => document.getElementById(a.id));
    if (!available.length) return;
    tocListEl.innerHTML = available.map(a =>
      `<a href="#${a.id}" class="toc-link" data-anchor="${a.id}">${a.label}</a>`
    ).join('');
    tocEl.hidden = false;

    tocListEl.querySelectorAll('.toc-link').forEach(a => {
      a.addEventListener('click', (e) => {
        e.preventDefault();
        const id = a.dataset.anchor;
        scrollToAnchor(id);
        history.replaceState(null, '', '#' + id);
        markActive(id);
      });
    });

    // Marcar inicial si hay hash
    if (hash) markActive(hash);
  }

  function scrollToAnchor(id) {
    const target = document.getElementById(id);
    if (!target) return;
    const offset = 130; // espacio para el toolbar sticky
    const rect = target.getBoundingClientRect();
    const top = rect.top + window.pageYOffset - offset;
    window.scrollTo({ top, behavior: 'smooth' });
    // Flash effect
    target.classList.add('highlight');
    setTimeout(() => target.classList.remove('highlight'), 2000);
    sectionEl.textContent = 'Sección: ' + (getAnchorLabel(id) || id);
  }

  function markActive(id) {
    tocListEl.querySelectorAll('.toc-link').forEach(a => {
      a.classList.toggle('active', a.dataset.anchor === id);
    });
  }

  function getAnchorLabel(id) {
    if (!doc.anchors) return null;
    const a = doc.anchors.find(x => x.id === id);
    return a ? a.label : null;
  }

  function showViewer() {
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
    statusEl.classList.remove('ok', 'err');
    if (kind) statusEl.classList.add(kind);
  }

})();
