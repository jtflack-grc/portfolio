function addWritingLane() {
  const methodSection = document.getElementById("method");
  const aboutSection = document.getElementById("about");
  const nav = document.querySelector('nav[aria-label="Primary navigation"]');

  if (!methodSection || !aboutSection || document.getElementById("writing")) {
    return;
  }

  const writingStyles = document.createElement("link");
  writingStyles.rel = "stylesheet";
  writingStyles.href = "writing.css?v=20260804-1";
  document.head.appendChild(writingStyles);

  if (nav && !nav.querySelector('a[href="#writing"]')) {
    const writingLink = document.createElement("a");
    writingLink.href = "#writing";
    writingLink.textContent = "Writing";
    const aboutLink = nav.querySelector('a[href="#about"]');
    nav.insertBefore(writingLink, aboutLink);
  }

  const writingSection = document.createElement("section");
  writingSection.className = "section writing";
  writingSection.id = "writing";
  writingSection.innerHTML = `
    <div class="section-heading reveal">
      <div>
        <p class="eyebrow">i on GRC / Selected writing</p>
        <h2>The writing behind<br />the work.</h2>
      </div>
      <p>
        For more than a year, <em>i on GRC</em> has examined what governance
        looks like when it reaches the systems, people, evidence, and decisions
        it is supposed to govern. The subjects change, but the question remains:
        what survives when framework language meets the operational layer?
      </p>
    </div>

    <div class="writing-layout">
      <article class="writing-feature reveal">
        <div class="writing-meta">
          <span>Featured essay</span>
          <span>Decision quality</span>
        </div>
        <h3>Audit-Ready Is Not Decision-Ready</h3>
        <p class="writing-deck">
          The controls can be mapped, the evidence assembled, and the heatmap
          glowing exactly where everyone expects it to glow while the decision
          itself remains untouched.
        </p>
        <p>
          This essay argues that mature GRC must do more than document
          uncertainty. It must connect scenarios, evidence, financial exposure,
          treatment options, and accountability to the choices leaders actually
          need to make.
        </p>
        <a
          class="text-link"
          href="https://www.linkedin.com/pulse/audit-ready-decision-ready-john-flack-cpgfe"
          target="_blank"
          rel="noreferrer"
          >Read the featured essay <span>↗</span></a
        >
      </article>

      <div class="writing-selected" aria-label="Selected i on GRC themes">
        <article class="writing-card reveal">
          <div class="writing-card-meta">
            <span>Platform security</span><span>01</span>
          </div>
          <h3>Can You Really Red Team an IBM i?</h3>
          <p>
            Offensive-security thinking translated into object authorities,
            privileged profiles, journaling, job flows, and the operating reality
            of a platform that does not fail like a generic endpoint.
          </p>
        </article>

        <article class="writing-card reveal">
          <div class="writing-card-meta">
            <span>Operational resilience</span><span>02</span>
          </div>
          <h3>When Reliability Becomes a Risk</h3>
          <p>
            A stable platform can coexist with a fragile organization. Long
            uptime does not resolve recovery dependencies, undocumented
            knowledge, aging ownership, or institutional concentration risk.
          </p>
        </article>

        <article class="writing-card reveal">
          <div class="writing-card-meta">
            <span>Quantitative risk</span><span>03</span>
          </div>
          <h3>From Fate to FAIR</h3>
          <p>
            A multi-part journey from vague risk labels toward defensible
            scenarios, evidence-sensitive ranges, financial exposure,
            uncertainty, and decisions that can be explained.
          </p>
        </article>

        <article class="writing-card reveal">
          <div class="writing-card-meta">
            <span>AI governance</span><span>04</span>
          </div>
          <h3>Human in the Loop May Be Out of the Loop</h3>
          <p>
            A human approval step does not automatically create meaningful
            oversight when speed, interface design, authority, information
            quality, and automation pressure have already narrowed the choice.
          </p>
        </article>
      </div>
    </div>

    <div class="writing-archive reveal">
      <div>
        <p class="eyebrow">More from the field notes</p>
        <p class="writing-archive-list">
          <span>Can You Blue Team an IBM i?</span><i></i>
          <span>Test LPAR Is Production Data Wearing Sweatpants</span><i></i>
          <span>FAIR-y Tales</span><i></i>
          <span>ISO governance on IBM i</span><i></i>
          <span>Modernization, GRC &amp; IBM i</span><i></i>
          <span>AI assurance and agentic trust</span>
        </p>
      </div>
      <a
        class="button button-ghost"
        href="https://www.linkedin.com/in/john-flack/recent-activity/articles/"
        target="_blank"
        rel="noreferrer"
        >Explore all writing <span>↗</span></a
      >
    </div>
  `;

  aboutSection.parentNode.insertBefore(writingSection, aboutSection);

  const aboutParagraphs = aboutSection.querySelectorAll(
    ".about-copy > p:not(.eyebrow):not(.about-lede)",
  );
  const finalAboutParagraph = aboutParagraphs[aboutParagraphs.length - 1];
  if (finalAboutParagraph) {
    finalAboutParagraph.innerHTML = `
      Today, I build public tools and learning environments that make those
      relationships legible, from IBM i evidence at the green screen to
      FAIR-informed financial models and AI governance interventions. I also
      publish <a class="inline-link" href="#writing"><em>i on GRC</em></a>, a
      long-form practitioner series examining governance from the operational
      layer.
    `;
  }
}

addWritingLane();

document.getElementById("year").textContent = new Date().getFullYear();

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

document
  .querySelectorAll(".reveal")
  .forEach((element) => observer.observe(element));

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
