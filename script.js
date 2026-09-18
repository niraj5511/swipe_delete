const items = [
  { title: 'Buy groceries',        subtitle: 'Personal · Today',   priority: '#fbbf24' },
  { title: 'Team meeting at 10',   subtitle: 'Work · In 2 hours',  priority: '#818cf8' },
  { title: 'Pay electricity bill', subtitle: 'Finance · Due soon', priority: '#38bdf8' },
  { title: 'Go for a run',         subtitle: 'Health · Evening',   priority: '#22c55e' },
//   { title: 'Call mom',             subtitle: 'Personal · Anytime', priority: '#f472b6' }
];

const list = document.getElementById('list');

const trashSVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
  <polyline points="3 6 5 6 21 6"></polyline>
  <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"></path>
  <path d="M10 11v6"></path>
  <path d="M14 11v6"></path>
  <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"></path>
</svg>`;

const checkSVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
  <polyline points="20 6 9 17 4 12"></polyline>
</svg>`;

function makeItem(data) {
  const item = document.createElement('div');
  item.className = 'item';
  item.innerHTML = `
    <div class="item-bg"><div class="icon-badge">${trashSVG}</div></div>
    <div class="item-fg">
      <div class="checkbox">${checkSVG}</div>
      <div class="priority" style="background:${data.priority}"></div>
      <div class="text-wrap">
        <div class="title">${data.title}</div>
        <div class="subtitle">${data.subtitle}</div>
      </div>
    </div>
  `;

  const fg = item.querySelector('.item-fg');
  const badge = item.querySelector('.icon-badge');
  const checkbox = item.querySelector('.checkbox');
  const title = item.querySelector('.title');
  let startX = 0, dx = 0, dragging = false;
  const threshold = 100;

  checkbox.addEventListener('click', (e) => {
    e.stopPropagation();
    checkbox.classList.toggle('done');
    title.classList.toggle('done');
  });

  function down(x) {
    dragging = true;
    startX = x;
    fg.style.transition = 'none';
  }

  function move(x) {
    if (!dragging) return;
    dx = Math.min(0, x - startX);
    fg.style.transform = `translateX(${dx}px)`;
    const progress = Math.min(1, Math.abs(dx) / threshold);
    badge.style.transform = `scale(${0.3 + progress * 0.9})`;
    badge.style.opacity = progress;
  }

  function up() {
    if (!dragging) return;
    dragging = false;
    fg.style.transition = 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.25s ease, border-color 0.2s ease, box-shadow 0.2s ease';

    if (dx < -threshold) {
      badge.classList.add('icon-pop');
      fg.style.transform = 'translateX(-110%)';
      fg.style.opacity = '0';
      setTimeout(() => {
        item.style.height = '0px';
        item.style.marginTop = '-12px';
        setTimeout(() => item.remove(), 300);
      }, 280);
    } else {
      fg.style.transform = 'translateX(0)';
      badge.style.transform = 'scale(0.3)';
      badge.style.opacity = '0';
    }
    dx = 0;
  }

  fg.addEventListener('mousedown', e => {
    if (e.target === checkbox || checkbox.contains(e.target)) return;
    down(e.clientX);
  });
  window.addEventListener('mousemove', e => move(e.clientX));
  window.addEventListener('mouseup', up);

  fg.addEventListener('touchstart', e => {
    if (e.target === checkbox || checkbox.contains(e.target)) return;
    down(e.touches[0].clientX);
  });
  fg.addEventListener('touchmove', e => move(e.touches[0].clientX));
  fg.addEventListener('touchend', up);

  return item;
}

items.forEach(d => list.appendChild(makeItem(d)));