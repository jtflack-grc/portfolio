document.getElementById('year').textContent = new Date().getFullYear();

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));


const themeToggle = document.querySelector('.theme-toggle');

function currentTheme() {
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
}

function syncThemeControl() {
  if (!themeToggle) return;
  const isLight = currentTheme() === 'light';
  themeToggle.setAttribute('aria-pressed', String(isLight));
  themeToggle.setAttribute('aria-label', isLight ? 'Switch to OLED dark theme' : 'Switch to light theme');
  const label = themeToggle.querySelector('.theme-label');
  if (label) label.textContent = isLight ? 'OLED' : 'Light';
}

syncThemeControl();

themeToggle?.addEventListener('click', () => {
  const nextTheme = currentTheme() === 'light' ? 'dark' : 'light';
  if (nextTheme === 'light') {
    document.documentElement.dataset.theme = 'light';
  } else {
    delete document.documentElement.dataset.theme;
  }
  try {
    localStorage.setItem('portfolio-theme', nextTheme);
  } catch (_) {}
  syncThemeControl();
});
