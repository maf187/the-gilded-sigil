(() => {
  'use strict';
  document.querySelectorAll('.grimoire-page').forEach(root => {
    const filters = root.querySelector('.filters');
    if (filters) {
      const buttons = [...filters.querySelectorAll('[data-grimoire-filter]')];
      const entries = [...root.querySelectorAll('.entry')].map(element => {
        let categories = [];
        try { categories = JSON.parse(element.dataset.categories || '[]'); } catch (_) { /* Keep a malformed entry in All writings. */ }
        return { element, categories: Array.isArray(categories) ? categories : [] };
      });
      buttons.forEach(button => button.addEventListener('click', () => {
        const mode = button.dataset.grimoireFilter;
        let count = 0;
        entries.forEach(({ element, categories }) => {
          const show = mode === 'all' || (mode === 'uncategorized' ? categories.length === 0 : categories.includes(button.dataset.category));
          element.hidden = !show;
          if (show) count++;
        });
        buttons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
        const label = button.cloneNode(true);
        label.querySelectorAll('span').forEach(span => span.remove());
        root.querySelector('.results').textContent = `Showing ${count} ${count === 1 ? 'writing' : 'writings'}${mode === 'all' ? '' : ' · ' + label.textContent.trim()}`;
      }));
      filters.hidden = false;
    }
    const body = root.querySelector('.article-body');
    const contents = root.querySelector('.contents');
    if (!body || !contents) return;
    // Retain the existing article checklists' behavior without changing their prose.
    body.querySelectorAll('input[type="checkbox"]').forEach(box => {
      box.removeAttribute('disabled');
      box.style.cursor = 'pointer';
    });
    const headings = [...body.querySelectorAll('h2, h3')];
    if (headings.length < 2) return;
    const used = new Set([...document.querySelectorAll('[id]')].map(node => node.id));
    const firstById = new Map();
    document.querySelectorAll('[id]').forEach(node => { if (!firstById.has(node.id)) firstById.set(node.id, node); });
    headings.forEach((heading, index) => {
      const duplicate = heading.id && firstById.get(heading.id) !== heading;
      if (!heading.id || duplicate) {
        const base = 'grimoire-section-' + (index + 1);
        let id = base, suffix = 2;
        while (used.has(id)) id = base + '-' + suffix++;
        heading.id = id;
      }
      used.add(heading.id);
      firstById.set(heading.id, heading);
      const li = document.createElement('li');
      li.className = 'toc-' + heading.tagName.toLowerCase();
      const link = document.createElement('a');
      link.href = '#' + encodeURIComponent(heading.id);
      link.textContent = heading.textContent;
      link.addEventListener('click', () => {
        // Native anchor navigation remains intact; give keyboard readers a meaningful destination.
        heading.setAttribute('tabindex', '-1');
        heading.focus({ preventScroll: true });
      });
      li.appendChild(link);
      contents.querySelector('ul').appendChild(li);
    });
    contents.hidden = false;
    root.querySelector('.reader-grid').classList.add('has-contents');
  });
})();
