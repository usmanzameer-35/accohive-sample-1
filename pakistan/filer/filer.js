const refreshFilerIcons = () => { if (window.lucide) window.lucide.createIcons(); };
refreshFilerIcons();
const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');
menuToggle?.addEventListener('click', () => { const open = mainNav.classList.toggle('open'); menuToggle.setAttribute('aria-expanded', String(open)); menuToggle.querySelector('.sr-only').textContent = open ? 'Close menu' : 'Open menu'; });
mainNav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => { mainNav.classList.remove('open'); menuToggle?.setAttribute('aria-expanded', 'false'); }));
