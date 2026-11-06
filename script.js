// Adds an accessible current-section indicator to the portfolio navigation.
(() => {
  const links = Array.from(document.querySelectorAll('.titlebar nav a[href^="#"]'));
  const sections = links
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  if (!('IntersectionObserver' in window) || sections.length === 0) return;

  const linksBySection = new Map(
    links.map((link) => [document.querySelector(link.getAttribute('href')), link])
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        links.forEach((link) => link.removeAttribute('aria-current'));
        linksBySection.get(entry.target)?.setAttribute('aria-current', 'location');
      });
    },
    { rootMargin: '-20% 0px -65% 0px' }
  );

  sections.forEach((section) => observer.observe(section));
})();
