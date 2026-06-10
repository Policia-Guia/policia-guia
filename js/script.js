/* ============================================================
   PolicíaGuía — Lógica de la app
   - Carga datos de la guía interactiva (data.js)
   - Renderiza nodos y maneja navegación con historial
   - Renderiza biblioteca de PDFs con búsqueda
   - Visor modal para PDFs
   ============================================================ */

(function () {
  'use strict';

  // ---------- Catálogo de PDFs (corresponde a /pdfs) ----------
  const PDFS = [
    { file: 'constitucion.pdf', title: 'Constitución Política',           desc: 'Constitución Política de los Estados Unidos Mexicanos.', cat: 'Marco Legal' },
    { file: 'dh.pdf',           title: 'Derechos Humanos',                desc: 'Marco internacional y nacional de derechos humanos.',     cat: 'Derechos' },
    { file: 'penales.pdf',      title: 'Código Penal',                    desc: 'Tipos penales y sanciones.',                              cat: 'Marco Legal' },
    { file: 'civiles.pdf',      title: 'Materia Civil',                   desc: 'Asuntos civiles relacionados con la actuación policial.', cat: 'Marco Legal' },
    { file: 'rflagrancia.pdf',  title: 'Flagrancia',                      desc: 'Régimen de flagrancia (Art. 146 CNPP).',                  cat: 'Procedimientos' },
    { file: 'sinorden.pdf',     title: 'Detención sin orden',             desc: 'Supuestos de detención sin orden judicial.',              cat: 'Procedimientos' },
    { file: 'ordenes.pdf',      title: 'Órdenes judiciales',              desc: 'Tipos de órdenes de aprehensión y cateo.',                cat: 'Procedimientos' },
    { file: 'custodia.pdf',     title: 'Cadena de custodia',              desc: 'Manejo y resguardo de evidencias.',                       cat: 'Procedimientos' },
    { file: 'iph.pdf',          title: 'IPH — Formato',                   desc: 'Informe Policial Homologado.',                            cat: 'IPH' },
    { file: 'iphj.pdf',         title: 'IPH — Justicia Cívica',           desc: 'Versión de justicia cívica del IPH.',                    cat: 'IPH' },
    { file: 'IPH_ppt.pdf',      title: 'IPH — Presentación',              desc: 'Guía visual de llenado del IPH.',                         cat: 'IPH' },
    { file: 'guia.pdf',         title: 'Guía operativa',                  desc: 'Pasos del primer respondiente.',                          cat: 'Procedimientos' },
    { file: 'proto.pdf',        title: 'Protocolo Nacional',              desc: 'Protocolo nacional de actuación.',                        cat: 'Procedimientos' },
    { file: 'conducta.pdf',     title: 'Código de Conducta',              desc: 'Conducta del personal de seguridad pública.',             cat: 'Procedimientos' },
    { file: 'sistemaseg.pdf',   title: 'Sistema de Seguridad',            desc: 'Estructura del sistema nacional de seguridad.',           cat: 'Marco Legal' },
    { file: 'politica.pdf',     title: 'Uso de la Fuerza',                desc: 'Política y principios sobre uso de la fuerza.',           cat: 'Procedimientos' },
    { file: 'genero.pdf',       title: 'Perspectiva de Género',           desc: 'Protocolo con perspectiva de género.',                    cat: 'Derechos' },
    { file: 'victimas.pdf',     title: 'Atención a Víctimas',             desc: 'Ley General de Víctimas y atención inmediata.',           cat: 'Derechos' },
    { file: 'salud.pdf',        title: 'Salud Pública',                   desc: 'Faltas administrativas a la salud pública.',              cat: 'Marco Legal' },
    { file: 'alba.pdf',         title: 'Protocolo Alba',                  desc: 'Búsqueda inmediata de mujeres desaparecidas.',            cat: 'Derechos' },
    { file: 'bando.pdf',        title: 'Bando de Policía y Buen Gobierno',desc: 'Faltas administrativas locales.',                         cat: 'Marco Legal' },
    { file: 'reglamento.pdf',   title: 'Reglamento',                      desc: 'Reglamento aplicable al cuerpo policial.',                cat: 'Marco Legal' },
    { file: 'juris.pdf',        title: 'Jurisprudencia',                  desc: 'Criterios y tesis jurisprudenciales relevantes.',         cat: 'Marco Legal' },
    { file: 'gaceta.pdf',       title: 'Gaceta',                          desc: 'Publicaciones oficiales relacionadas.',                   cat: 'Marco Legal' },
    { file: 'LGSNSP.pdf',       title: 'LGSNSP',                          desc: 'Ley General del Sistema Nacional de Seguridad Pública.',  cat: 'Marco Legal' }
  ];

  // Mapeo de acciones especiales (ACCION:xxx) -> PDF de referencia
  const ACTION_TO_PDF = {
    'art141':       'sinorden.pdf',
    'art145':       'ordenes.pdf',
    'art146':       'rflagrancia.pdf',
    'derechos':     'dh.pdf',
    'usofuerza':    'politica.pdf',
    'media':        'penales.pdf',
    'actas_firmas': 'iph.pdf',
    'telefonos':    null
  };

  // ---------- Catálogo de íconos SVG ----------
  const ICONS = {
    police: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z"/><path d="M9 12l2 2 4-4"/></svg>',
    check:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5L20 7"/></svg>',
    cross:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    doctor: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v6"/><circle cx="12" cy="12" r="2"/><path d="M6 8v4a6 6 0 0012 0V8"/></svg>',
    judge:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h16"/><path d="M12 4v16"/><path d="M5 10l-2 4h6l-2-4z"/><path d="M17 6l-2 4h6l-2-4z"/></svg>',
    pstation:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18"/><path d="M5 21V9l7-5 7 5v12"/><path d="M10 21v-6h4v6"/></svg>',
    pdf:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/><path d="M9 13h6M9 17h4"/></svg>',
    info:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 8h.01M11 12h1v4h1"/></svg>',
    arrow:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>'
  };

  // ============================================================
  // ESTADO DE LA GUÍA
  // ============================================================
  const data = window.GUIDE_DATA || [];
  // Index para acceso rápido por clave
  const nodeByClave = {};
  data.forEach(n => { if (n.clave) nodeByClave[n.clave] = n; });

  let history = []; // pila de claves visitadas

  // ============================================================
  // GUÍA INTERACTIVA
  // ============================================================
  const nodeEl = document.getElementById('guide-node');
  const breadcrumbsEl = document.getElementById('breadcrumbs');
  const btnRestart = document.getElementById('btn-restart');
  const btnBack = document.getElementById('btn-back');

  function getRootClave() {
    // Buscamos el nodo raíz: el que tiene clave "ROOT" o el primero
    const root = data.find(n => n.clave === 'ROOT');
    return root ? root.clave : (data[0] && data[0].clave);
  }

  function renderNode(clave) {
    const node = nodeByClave[clave];
    if (!node) {
      nodeEl.innerHTML = `
        <h2>Fin del recorrido</h2>
        <p class="node-desc">No hay más pasos definidos para esta rama. Puedes reiniciar la guía o volver atrás.</p>
        <div class="actions">
          <button class="action-btn" onclick="window.PG.restart()">
            <span class="action-icon">${ICONS.arrow}</span>
            <span>Reiniciar guía</span>
          </button>
        </div>`;
      return;
    }

    let html = '';
    if (node.titulo) html += `<h2>${escapeHtml(node.titulo)}</h2>`;
    if (node.descripcion) html += `<p class="node-desc">${escapeHtml(node.descripcion)}</p>`;

    html += '<div class="actions">';

    (node.acciones || []).forEach((a, i) => {
      const c = a.clave || '';
      const desc = a.descripcion || '';
      const icon = a.icon || 'arrow';
      const iconSvg = ICONS[icon] || ICONS.arrow;

      // Clasificar tipo de acción
      let cls = 'action-btn';
      let handler = '';

      if (c.startsWith('ACCION:')) {
        cls += ' is-action';
        const actKey = c.split(':')[1];
        handler = `window.PG.openAction('${actKey}')`;
      } else if (c === 'INFORMATIVO') {
        cls += ' is-informativo';
        handler = '';
      } else if (icon === 'check') {
        cls += ' is-check';
        handler = `window.PG.go('${c}')`;
      } else if (icon === 'cross') {
        cls += ' is-cross';
        handler = `window.PG.go('${c}')`;
      } else {
        handler = `window.PG.go('${c}')`;
      }

      const onclickAttr = handler ? `onclick="${handler}"` : '';
      const role = handler ? '' : 'aria-disabled="true"';

      html += `
        <button class="${cls}" ${onclickAttr} ${role}>
          <span class="action-icon">${iconSvg}</span>
          <span>${escapeHtml(desc)}</span>
        </button>`;
    });

    html += '</div>';
    nodeEl.innerHTML = html;

    // Scroll suave al nodo
    nodeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function renderBreadcrumbs() {
    breadcrumbsEl.innerHTML = history.map((c, idx) => {
      const n = nodeByClave[c];
      const title = (n && n.titulo) ? n.titulo : c;
      return `<li title="${escapeHtml(title)}">${idx + 1}. ${escapeHtml(truncate(title, 50))}</li>`;
    }).join('') || '<li style="background:transparent;border-left-color:var(--border);color:var(--muted)">Sin pasos aún</li>';
  }

  function go(clave) {
    if (!clave || clave === 'INFORMATIVO') return;
    history.push(clave);
    renderNode(clave);
    renderBreadcrumbs();
  }

  function back() {
    if (history.length <= 1) return;
    history.pop();
    const prev = history[history.length - 1];
    renderNode(prev);
    renderBreadcrumbs();
  }

  function restart() {
    history = [];
    const root = getRootClave();
    if (root) {
      history.push(root);
      renderNode(root);
      renderBreadcrumbs();
    }
  }

  function openAction(actKey) {
    const pdfFile = ACTION_TO_PDF[actKey];
    if (pdfFile) {
      const meta = PDFS.find(p => p.file === pdfFile);
      openPdfModal(pdfFile, meta ? meta.title : actKey);
    } else {
      // Sin PDF asociado (ej: 'telefonos')
      alert('Esta acción no tiene un documento asociado todavía.');
    }
  }

  // ============================================================
  // BIBLIOTECA DE PDFS
  // ============================================================
  const grid = document.getElementById('pdf-grid');
  const search = document.getElementById('search-pdfs');

  function renderPdfs(list) {
    grid.innerHTML = list.map(p => `
      <article class="pdf-card" data-file="${p.file}" data-title="${escapeHtml(p.title)}">
        <div class="pdf-icon">${ICONS.pdf}</div>
        <h4>${escapeHtml(p.title)}</h4>
        <p>${escapeHtml(p.desc)}</p>
        <div class="pdf-card-foot">
          <span>${escapeHtml(p.cat)}</span>
          <span class="open-link">Abrir →</span>
        </div>
      </article>
    `).join('');

    grid.querySelectorAll('.pdf-card').forEach(card => {
      card.addEventListener('click', () => {
        openPdfModal(card.dataset.file, card.dataset.title);
      });
    });
  }

  function filterPdfs(q) {
    q = (q || '').trim().toLowerCase();
    if (!q) return renderPdfs(PDFS);
    const filtered = PDFS.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.desc.toLowerCase().includes(q) ||
      p.cat.toLowerCase().includes(q)
    );
    renderPdfs(filtered);
  }

  // ============================================================
  // MODAL VISOR PDF
  // ============================================================
  const modal = document.getElementById('pdf-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalFrame = document.getElementById('modal-frame');
  const modalOpen = document.getElementById('modal-open');

  function openPdfModal(file, title) {
    const url = 'pdfs/' + file;
    modalTitle.textContent = title || file;
    modalFrame.src = url;
    modalOpen.href = url;
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.hidden = true;
    modalFrame.src = '';
    document.body.style.overflow = '';
  }

  modal.addEventListener('click', e => {
    if (e.target.dataset.close !== undefined) closeModal();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !modal.hidden) closeModal();
  });

  // ============================================================
  // UTILIDADES
  // ============================================================
  function escapeHtml(s) {
    return String(s || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
  function truncate(s, n) {
    s = String(s || '');
    return s.length > n ? s.slice(0, n - 1) + '…' : s;
  }

  // ============================================================
  // BOOT
  // ============================================================
  // API pública para handlers inline
  window.PG = { go, back, restart, openAction };

  // Listeners
  btnRestart.addEventListener('click', restart);
  btnBack.addEventListener('click', back);
  search.addEventListener('input', e => filterPdfs(e.target.value));

  // Año en footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // Render inicial
  renderPdfs(PDFS);
  restart();
})();
