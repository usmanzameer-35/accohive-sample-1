const refreshRegionalIcons = () => { if (window.lucide) window.lucide.createIcons(); };
refreshRegionalIcons();

document.querySelectorAll('.regions-menu').forEach((menu) => {
  const trigger = menu.querySelector('.regions-trigger');
  const panel = menu.querySelector('.regions-panel');
  const close = () => { trigger.setAttribute('aria-expanded', 'false'); panel.hidden = true; menu.classList.remove('is-open'); };
  trigger.addEventListener('click', () => {
    const open = trigger.getAttribute('aria-expanded') === 'true';
    trigger.setAttribute('aria-expanded', String(!open));
    panel.hidden = open;
    menu.classList.toggle('is-open', !open);
    if (!open) panel.querySelector('a')?.focus();
  });
  menu.querySelectorAll('.region-link').forEach((link) => link.addEventListener('click', close));
  document.addEventListener('click', (event) => { if (!menu.contains(event.target)) close(); });
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') { close(); trigger.focus(); } });
});

document.querySelectorAll('.regions-trigger').forEach((trigger) => {
  trigger.addEventListener('keydown', (event) => {
    const links = [...trigger.closest('.regions-menu').querySelectorAll('.region-link')];
    if (event.key === 'ArrowDown') { event.preventDefault(); links[0]?.focus(); }
  });
});
