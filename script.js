function addWritingLane() {
  const methodSection = document.getElementById("method");
  const aboutSection = document.getElementById("about");
  const nav = document.querySelector('nav[aria-label="Primary navigation"]');

  if (!methodSection || !aboutSection || document.getElementById("writing")) {
    return;
  }

  const writingStyles = document.createElement("link");
  writingStyles.rel = "stylesheet";
  writingStyles.href = "writing.css?v=20260804-2";
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

      <div class="writing-selected" aria-label="Selected i on GRC articles">
        <a class="writing-card reveal" href="https://www.linkedin.com/pulse/can-you-red-team-ibm-i-john-flack-pabze" target="_blank" rel="noreferrer">
          <div class="writing-card-meta">
            <span>Platform security</span><span>01 ↗</span>
          </div>
          <h3>Can You Red Team an IBM i?</h3>
          <p>
            Offensive-security thinking translated into object authorities,
            privileged profiles, journaling, job flows, and the operating reality
            of a platform that does not fail like a generic endpoint.
          </p>
        </a>

        <a class="writing-card reveal" href="https://www.linkedin.com/pulse/black-swan-green-screen-john-flack-doyce" target="_blank" rel="noreferrer">
          <div class="writing-card-meta">
            <span>Operational resilience</span><span>02 ↗</span>
          </div>
          <h3>Black Swan, Green Screen</h3>
          <p>
            A long-running platform can still carry tail risk, fragile recovery
            assumptions, and dangerous confidence when uptime is treated as a
            substitute for resilience evidence.
          </p>
        </a>

        <a class="writing-card reveal" href="https://www.linkedin.com/pulse/alignment-continuous-reconciliation-john-flack-v4ele" target="_blank" rel="noreferrer">
          <div class="writing-card-meta">
            <span>Governance engineering</span><span>03 ↗</span>
          </div>
          <h3>Alignment Is Continuous Reconciliation</h3>
          <p>
            Governance maturity depends on keeping inventories, risk registers,
            workflows, owners, exceptions, evidence, and systems from drifting
            into separate versions of reality.
          </p>
        </a>

        <a class="writing-card reveal" href="https://www.linkedin.com/pulse/dont-blink-john-flack-otnoe" target="_blank" rel="noreferrer">
          <div class="writing-card-meta">
            <span>Critical systems</span><span>04 ↗</span>
          </div>
          <h3>Don't Blink</h3>
          <p>
            OT security offers IBM i governance a sharper vocabulary for zones,
            conduits, consequence, recovery, and the difference between a system
            that keeps running and one that can explain itself.
          </p>
        </a>
      </div>
    </div>

    <div class="writing-archive reveal">
      <div>
        <p class="eyebrow">More long-form field notes</p>
        <div class="writing-archive-grid">
          <a href="https://www.linkedin.com/pulse/can-you-blue-team-ibm-i-john-flack-w5bse" target="_blank" rel="noreferrer"><span>Can You Blue Team an IBM i?</span><b>↗</b></a>
          <a href="https://www.linkedin.com/pulse/ibm-i-offboarding-profiles-you-didnt-revoke-john-flack-oplie" target="_blank" rel="noreferrer"><span>IBM i Offboarding</span><b>↗</b></a>
          <a href="https://www.linkedin.com/pulse/soc-2-ibm-i-john-flack-0bj8e" target="_blank" rel="noreferrer"><span>SOC 2 &amp; the IBM i</span><b>↗</b></a>
          <a href="https://www.linkedin.com/pulse/frameworks-coso-ibm-i-john-flack-dcrne" target="_blank" rel="noreferrer"><span>COSO &amp; the IBM i</span><b>↗</b></a>
          <a href="https://www.linkedin.com/pulse/i-grc-is0-27701-clause-9-ibm-john-flack-n5jwe" target="_blank" rel="noreferrer"><span>ISO 27701: Clause 9</span><b>↗</b></a>
          <a href="https://www.linkedin.com/pulse/i-grc-is0-27701-clause-10-ibm-john-flack-6nz1e" target="_blank" rel="noreferrer"><span>ISO 27701: Clause 10</span><b>↗</b></a>
          <a href="https://ibmireference.blogspot.com/search/label/IBM%20%22%28A%29i%20on%20GRC%20-%20ISO%2027001%22" target="_blank" rel="noreferrer"><span>ISO 27001 IBM i Series</span><b>↗</b></a>
          <a href="https://www.linkedin.com/in/john-flack/recent-activity/articles/" target="_blank" rel="noreferrer"><span>Complete Article Archive</span><b>↗</b></a>
        </div>
      </div>
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
