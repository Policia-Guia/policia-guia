/* ============================================================
   PolicíaGuía — Lógica de la app
   - Carga datos de la guía interactiva (data.js)
   - Renderiza nodos y maneja navegación con historial
   - Renderiza biblioteca de PDFs con búsqueda
   - Visor modal para PDFs
   ============================================================ */

(function () {
  'use strict';

  // ---------- Catálogo de PDFs locales (solo los que NO se duplican con enlaces oficiales) ----------
  const PDFS = [
    { file: 'civiles.pdf',      title: 'Materia Civil',                   desc: 'Asuntos civiles relacionados con la actuación policial.', cat: 'Marco Legal' },
    { file: 'rflagrancia.pdf',  title: 'Flagrancia',                      desc: 'Régimen de flagrancia (Art. 146 CNPP).',                  cat: 'Procedimientos' },
    { file: 'sinorden.pdf',     title: 'Detención sin orden',             desc: 'Supuestos de detención sin orden judicial.',              cat: 'Procedimientos' },
    { file: 'ordenes.pdf',      title: 'Órdenes judiciales',              desc: 'Tipos de órdenes de aprehensión y cateo.',                cat: 'Procedimientos' },
    { file: 'sistemaseg.pdf',   title: 'Sistema de Seguridad',            desc: 'Estructura del sistema nacional de seguridad.',           cat: 'Marco Legal' },
    { file: 'genero.pdf',       title: 'Perspectiva de Género',           desc: 'Protocolo con perspectiva de género.',                    cat: 'Derechos' },
    { file: 'salud.pdf',        title: 'Salud Pública',                   desc: 'Faltas administrativas a la salud pública.',              cat: 'Marco Legal' },
    { file: 'alba.pdf',         title: 'Protocolo Alba',                  desc: 'Búsqueda inmediata de mujeres desaparecidas.',            cat: 'Derechos' },
    { file: 'bando.pdf',        title: 'Bando de Policía y Buen Gobierno',desc: 'Faltas administrativas locales.',                         cat: 'Marco Legal' },
    { file: 'juris.pdf',        title: 'Jurisprudencia',                  desc: 'Criterios y tesis jurisprudenciales relevantes.',         cat: 'Marco Legal' },
    { file: 'gaceta.pdf',       title: 'Gaceta',                          desc: 'Publicaciones oficiales relacionadas.',                   cat: 'Marco Legal' }
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
    arrow:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    external:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 4h6v6"/><path d="M20 4L10 14"/><path d="M19 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6"/></svg>',
    download:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4v12"/><path d="M7 11l5 5 5-5"/><path d="M4 20h16"/></svg>',
    database:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5"/><path d="M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/></svg>',
    clipboard:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="4" width="12" height="17" rx="2"/><path d="M9 4V3a1 1 0 011-1h4a1 1 0 011 1v1"/><path d="M9 11h6M9 15h6"/></svg>',
    book:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h12a4 4 0 014 4v12H8a4 4 0 01-4-4z"/><path d="M4 16a4 4 0 014-4h12"/></svg>',
    lightbulb:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21h6"/><path d="M10 17h4"/><path d="M12 3a6 6 0 00-4 10c1 1 1.5 2 2 4h4c.5-2 1-3 2-4a6 6 0 00-4-10z"/></svg>',
    scale:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v18"/><path d="M5 21h14"/><path d="M5 9l-2 5a3 3 0 006 0L7 9z"/><path d="M19 9l-2 5a3 3 0 006 0l-2-5z"/><path d="M5 6h14"/></svg>',
    globe:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a14 14 0 010 18a14 14 0 010-18z"/></svg>',
    pin:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-7-7-7-12a7 7 0 0114 0c0 5-7 12-7 12z"/><circle cx="12" cy="9" r="2.5"/></svg>',
    shield:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z"/></svg>',
    pencil:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 4l6 6-12 12H2v-6z"/><path d="M14 4l3-3 6 6-3 3"/></svg>'
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
  // RECURSOS OFICIALES (8 secciones del docx)
  // ============================================================
  const recursosGrid = document.getElementById('recursos-grid');
  const RECURSOS = window.RECURSOS || [];

  function thumbFor(file) {
    return 'assets/thumbs/' + file.replace(/\.pdf$/i, '.jpg');
  }

  function renderItem(it) {
    const noteHtml = it.note ? `<small class="rec-item-note">${escapeHtml(it.note)}</small>` : '';

    if (it.kind === 'external') {
      return `
        <div class="rec-item">
          <a href="${it.href}" target="_blank" rel="noopener" class="rec-item-main">
            <span class="rec-item-icon">${ICONS.external}</span>
            <span class="rec-item-text">
              <strong>${escapeHtml(it.title)}</strong>
              ${noteHtml}
            </span>
            <span class="rec-item-go">${ICONS.arrow}</span>
          </a>
        </div>`;
    } else if (it.kind === 'download') {
      return `
        <div class="rec-item">
          <a href="${it.file}" download="${it.filename || ''}" class="rec-item-main rec-item-editor">
            <span class="rec-item-icon">${ICONS.download}</span>
            <span class="rec-item-text">
              <strong>${escapeHtml(it.title)}</strong>
              ${noteHtml}
            </span>
            <span class="rec-item-go">${ICONS.arrow}</span>
          </a>
        </div>`;
    } else {
      return `
        <div class="rec-item">
          <button class="rec-item-main" data-pdf="${it.file}">
            <span class="rec-item-icon">${ICONS.pdf}</span>
            <span class="rec-item-text">
              <strong>${escapeHtml(it.title)}</strong>
              ${noteHtml}
            </span>
            <span class="rec-item-go">${ICONS.arrow}</span>
          </button>
        </div>`;
    }
  }

  function renderSections(sections) {
    // Renderiza badges de secciones/anexos para los IPH
    return `
      <div class="rec-sections">
        ${sections.map(s => `
          <span class="rec-chip rec-chip-${s.kind}" ${s.note ? `title="${escapeHtml(s.note)}"` : ''}>
            ${escapeHtml(s.label)}
          </span>
        `).join('')}
      </div>
      <div class="rec-sections-legend">
        <span><i class="dot dot-obligatoria"></i> Información obligatoria</span>
        <span><i class="dot dot-adicional"></i> Información adicional</span>
        <span><i class="dot dot-mp"></i> Que pide MP</span>
        <span><i class="dot dot-juez"></i> Si lo requiere juez cívico</span>
      </div>`;
  }

  function renderRecursos() {
    if (!recursosGrid) return;
    recursosGrid.innerHTML = RECURSOS.map(r => {
      const headerIcon = ICONS[r.icon] || ICONS.shield;
      let body = '';
      if (r.subgroups) {
        body = r.subgroups.map(g => `
          <div class="rec-subgroup">
            <h4>${escapeHtml(g.title)}</h4>
            <div class="rec-items">${(g.items || []).map(renderItem).join('')}</div>
            ${g.sections ? renderSections(g.sections) : ''}
          </div>
        `).join('');
      } else {
        body = `<div class="rec-items">${(r.items || []).map(renderItem).join('')}</div>`;
      }

      return `
        <article class="rec-card" id="rec-${r.id}">
          <header class="rec-card-head">
            <span class="rec-num">${r.num}</span>
            <span class="rec-card-icon">${headerIcon}</span>
            <div class="rec-card-title">
              <h3>${escapeHtml(r.title)}</h3>
              <p>${r.desc}</p>
            </div>
          </header>
          <div class="rec-card-body">${body}</div>
        </article>`;
    }).join('');

    // Delegación de clicks para abrir PDFs locales
    recursosGrid.querySelectorAll('[data-pdf]').forEach(el => {
      el.addEventListener('click', e => {
        e.preventDefault();
        const file = el.dataset.pdf;
        const meta = PDFS.find(p => p.file === file);
        openPdfModal(file, meta ? meta.title : file);
      });
    });
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

  // Menú hamburguesa (móvil/tablet)
  const navToggle = document.getElementById('nav-toggle');
  const mainNav = document.getElementById('main-nav');
  const navOverlay = document.getElementById('nav-overlay');
  if (navToggle && mainNav) {
    const closeNav = () => {
      mainNav.classList.remove('is-open');
      navToggle.classList.remove('is-open');
      if (navOverlay) navOverlay.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
      document.documentElement.classList.remove('nav-open');
    };
    const toggleNav = () => {
      const open = !mainNav.classList.contains('is-open');
      mainNav.classList.toggle('is-open', open);
      navToggle.classList.toggle('is-open', open);
      if (navOverlay) navOverlay.classList.toggle('is-open', open);
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.documentElement.classList.toggle('nav-open', open);
    };
    navToggle.addEventListener('click', toggleNav);
    if (navOverlay) navOverlay.addEventListener('click', closeNav);
    mainNav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeNav));
    window.addEventListener('resize', () => {
      if (window.innerWidth > 1024) closeNav();
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && mainNav.classList.contains('is-open')) closeNav();
    });
  }


  // Año en footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // Render inicial
  renderRecursos();
  renderPdfs(PDFS);
  restart();
})();
