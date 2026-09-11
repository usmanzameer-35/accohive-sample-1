const revealItems = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries, observer) => {
	entries.forEach((entry) => {
		if (!entry.isIntersecting) return;
		entry.target.classList.add('visible');
		observer.unobserve(entry.target);
	});
}, { threshold: 0.14 });

revealItems.forEach((item) => revealObserver.observe(item));

const heroArt = document.querySelector('.hero-art');
if (heroArt && window.matchMedia('(pointer: fine)').matches) {
	heroArt.addEventListener('pointermove', (event) => {
		const bounds = heroArt.getBoundingClientRect();
		const x = (event.clientX - bounds.left) / bounds.width - 0.5;
		const y = (event.clientY - bounds.top) / bounds.height - 0.5;
		heroArt.style.transform = `translate(${x * 9}px, ${y * 9}px)`;
	});

	heroArt.addEventListener('pointerleave', () => {
		heroArt.style.transform = '';
	});
}
