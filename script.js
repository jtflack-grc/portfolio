const writingStyles = document.querySelector(
  'link[rel="stylesheet"][href^="writing.css"]',
);
if (writingStyles) {
  writingStyles.setAttribute("href", "writing.css?v=20260831-1");
}

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08 },
  );

  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("visible"));
}

const themeToggle = document.querySelector(".theme-toggle");

function currentTheme() {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

function syncThemeControl() {
  if (!themeToggle) return;
  const isLight = currentTheme() === "light";
  themeToggle.setAttribute("aria-pressed", String(isLight));
  themeToggle.setAttribute(
    "aria-label",
    isLight ? "Switch to OLED dark theme" : "Switch to light theme",
  );
  const label = themeToggle.querySelector(".theme-label");
  if (label) label.textContent = isLight ? "OLED" : "Light";
}

syncThemeControl();

themeToggle?.addEventListener("click", () => {
  const nextTheme = currentTheme() === "light" ? "dark" : "light";
  if (nextTheme === "light") {
    document.documentElement.dataset.theme = "light";
  } else {
    delete document.documentElement.dataset.theme;
  }
  try {
    localStorage.setItem("portfolio-theme", nextTheme);
  } catch (_) {}
  syncThemeControl();
});

function installLclAttractMode() {
  const preview = document.querySelector(".lcl-ironterm-preview");
  if (!preview) return;

  const stage = preview.querySelector(".lcl-5250-stage");
  const signon = preview.querySelector(".lcl-5250-screen");
  const signonCursor = signon?.querySelector(".lcl-5250-cursor");
  const oiaCursor = preview.querySelector(".lcl-oia-cursor");
  if (!stage || !signon || !signonCursor || !oiaCursor) return;

  signon.classList.add("lcl-screen-signon", "is-active");

  const userValue = document.createElement("span");
  userValue.className = "lcl-5250-item lcl-preview-user";
  userValue.style.setProperty("--row", "6");
  userValue.style.setProperty("--col", "53");
  userValue.style.setProperty("--span", "10");
  signon.insertBefore(userValue, signonCursor);

  const main = document.createElement("div");
  main.className = "lcl-5250-screen lcl-screen-main";
  main.innerHTML = `
    <span class="lcl-5250-item lcl-5250-hi" style="--row:1;--col:1;--span:80"> Main Menu                    Legacy Control Lab                      CLAIMS400 </span>
    <span class="lcl-5250-item" style="--row:3;--col:6;--span:28">Select one of the following:</span>
    <span class="lcl-5250-item" style="--row:6;--col:6;--span:20"> 1. User tasks</span>
    <span class="lcl-5250-item" style="--row:7;--col:6;--span:28"> 2. General system tasks</span>
    <span class="lcl-5250-item" style="--row:8;--col:6;--span:34"> 3. Files, libraries, and folders</span>
    <span class="lcl-5250-item" style="--row:9;--col:6;--span:20"> 4. Programming</span>
    <span class="lcl-5250-item" style="--row:10;--col:6;--span:20"> 5. Communications</span>
    <span class="lcl-5250-item" style="--row:11;--col:6;--span:30"> 6. Define or change system</span>
    <span class="lcl-5250-item" style="--row:12;--col:6;--span:29"> 7. Define or change menu</span>
    <span class="lcl-5250-item" style="--row:13;--col:6;--span:20"> 8. Security</span>
    <span class="lcl-5250-item" style="--row:18;--col:6;--span:14">90. Sign off</span>
    <span class="lcl-5250-item" style="--row:20;--col:1;--span:21">Selection or command</span>
    <span class="lcl-5250-item" style="--row:21;--col:1;--span:4">===&gt;</span>
    <span class="lcl-5250-cursor" style="--row:21;--col:6" title="5250 cursor"></span>
    <span class="lcl-5250-item" style="--row:24;--col:1;--span:62">F1=Help   F3=Exit   F4=Prompt   F9=Retrieve   F12=Cancel</span>
  `;
  stage.appendChild(main);

  const style = document.createElement("style");
  style.textContent = `
    .lcl-5250-stage {
      position: relative;
      padding: 0 !important;
    }
    .lcl-5250-screen {
      position: absolute;
      inset: 5px 7px 3px;
      width: auto;
      height: auto !important;
      opacity: 0;
      pointer-events: none;
      transition: opacity 180ms ease;
    }
    .lcl-5250-screen.is-active { opacity: 1; }
    .lcl-preview-user { color: #33ff33; }
    .lcl-ironterm-preview.is-submitting .lcl-screen-signon .lcl-5250-cursor {
      background: rgba(255, 80, 80, 0.68);
    }
    @media (prefers-reduced-motion: reduce) {
      .lcl-5250-screen { transition: none; }
    }
  `;
  document.head.appendChild(style);

  const reduceMotion =
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
  if (reduceMotion) return;

  const sleep = (ms) =>
    new Promise((resolve) => window.setTimeout(resolve, ms));

  function showScreen(target) {
    const showMain = target === "main";
    signon.classList.toggle("is-active", !showMain);
    main.classList.toggle("is-active", showMain);
    oiaCursor.textContent = showMain ? "21,06" : "06,53";
  }

  async function runLoop() {
    while (document.body.contains(preview)) {
      preview.classList.remove("is-submitting");
      userValue.textContent = "";
      showScreen("signon");
      await sleep(4800);

      for (const character of "QSECOFR") {
        userValue.textContent += character;
        await sleep(140);
      }

      await sleep(600);
      preview.classList.add("is-submitting");
      await sleep(500);
      preview.classList.remove("is-submitting");
      showScreen("main");
      await sleep(12500);
    }
  }

  let started = false;
  const start = () => {
    if (started) return;
    started = true;
    runLoop();
  };

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer.disconnect();
          start();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(preview);
  } else {
    start();
  }
}

installLclAttractMode();
