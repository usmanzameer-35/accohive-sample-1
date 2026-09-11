// Initialize Lucide icons after the markup is available.
const refreshIcons = () => {
	if (window.lucide) window.lucide.createIcons();
};

refreshIcons();

// Reveal sections only when they enter the viewport.
const revealObserver = new IntersectionObserver((entries, observer) => {
	entries.forEach((entry) => {
		if (!entry.isIntersecting) return;
		entry.target.classList.add('visible');
		observer.unobserve(entry.target);
	});
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

// Keep the mobile navigation keyboard and screen-reader friendly.
const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');
menuToggle?.addEventListener('click', () => {
	const isOpen = mainNav.classList.toggle('open');
	menuToggle.setAttribute('aria-expanded', String(isOpen));
});
mainNav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
	mainNav.classList.remove('open');
	menuToggle?.setAttribute('aria-expanded', 'false');
}));

// Add a compact header state after the first scroll movement.
const header = document.querySelector('[data-header]');
window.addEventListener('scroll', () => header?.classList.toggle('scrolled', window.scrollY > 24), { passive: true });

// Drive the delivery model detail panel from the six-step timeline.
const timelineSteps = document.querySelectorAll('.timeline-step');
const timelineProgress = document.querySelector('.timeline-progress');
const detailIndex = document.querySelector('.detail-index');
const detailTitle = document.querySelector('.timeline-detail h3');
const detailText = document.querySelector('.timeline-detail p');
const timelineContent = [
	['Start with the shape of the problem.', 'We map your current workflows, pressure points and ambitions. No assumptions, no generic playbook. Just a precise view of what better looks like for your firm.'],
	['Turn your ambition into an operating model.', 'Together we design the right blend of people, process and controls for the work you want to move through the system.'],
	['Make your way of working repeatable.', 'Your standards, terminology and preferred tools become part of a shared delivery language that the whole team can trust.'],
	['Prove the motion on real work.', 'A focused pilot lets us tune the handoffs, surface the edge cases and show measurable improvement before we scale.'],
	['A delivery team that feels like yours.', 'Your AccoHive team runs inside the agreed rhythm, with visible ownership, QA and communication at every step.'],
	['The system keeps getting sharper.', 'Regular reviews turn learnings into better playbooks, stronger controls and more capacity for your next stage of growth.'],
];

const updateTimeline = (index) => {
	const [title, text] = timelineContent[index];
	timelineSteps.forEach((step, stepIndex) => step.classList.toggle('active', stepIndex === index));
	if (timelineProgress) timelineProgress.style.width = `${(index / (timelineSteps.length - 1)) * 100}%`;
	if (detailIndex) detailIndex.innerHTML = `${String(index + 1).padStart(2, '0')} <span>/ 06</span>`;
	if (detailTitle) detailTitle.textContent = title;
	if (detailText) detailText.textContent = text;
};

timelineSteps.forEach((step) => step.addEventListener('click', () => updateTimeline(Number(step.dataset.step))));

// Add a gentle pointer parallax to the hero and CTA atmosphere.
const parallaxTargets = document.querySelectorAll('.hero-visual, .cta-panel');
if (window.matchMedia('(pointer: fine)').matches) {
	parallaxTargets.forEach((target) => target.addEventListener('pointermove', (event) => {
		const bounds = target.getBoundingClientRect();
		const x = (event.clientX - bounds.left) / bounds.width - 0.5;
		const y = (event.clientY - bounds.top) / bounds.height - 0.5;
		target.style.transform = `translate(${x * 6}px, ${y * 6}px)`;
	}));
	parallaxTargets.forEach((target) => target.addEventListener('pointerleave', () => {
		target.style.transform = '';
	}));
}
