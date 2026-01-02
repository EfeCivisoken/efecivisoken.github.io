// --- Theme toggle (persisted) ---
const btn = document.getElementById("modeToggle");
const html = document.documentElement;

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark" || savedTheme === "light") {
  html.setAttribute("data-theme", savedTheme);
  if (btn) btn.textContent = savedTheme === "dark" ? "☀️" : "🌙";
}

if (btn) {
  btn.addEventListener("click", () => {
    const isDark = html.getAttribute("data-theme") === "dark";
    const next = isDark ? "light" : "dark";
    html.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    btn.textContent = next === "dark" ? "☀️" : "🌙";
  });
}

// --- Footer year ---
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// --- Projects rendering (safe + resilient) ---
async function loadProjects() {
  const grid = document.getElementById("projectGrid");
  if (!grid) return;

  try {
    const r = await fetch("projects.json", { cache: "no-store" });
    if (!r.ok) throw new Error(`Failed to load projects.json (${r.status})`);
    const ps = await r.json();

    if (!Array.isArray(ps) || ps.length === 0) {
      grid.innerHTML = `<p class="muted">No projects found.</p>`;
      return;
    }

    ps.forEach((p) => {
      const card = document.createElement("div");
      card.className = "card";

      const img = document.createElement("img");
      img.src = p.img || "";
      img.alt = p.title || "Project image";
      img.loading = "lazy";

      const h3 = document.createElement("h3");
      h3.textContent = p.title || "Untitled Project";

      const desc = document.createElement("p");
      desc.textContent = p.desc || "";

      const a = document.createElement("a");
      a.className = "btn outline";
      a.href = p.link || "#";
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.textContent = "View";

      card.append(img, h3, desc, a);
      grid.appendChild(card);
    });
  } catch (err) {
    console.error(err);
    grid.innerHTML = `<p class="muted">Could not load projects right now.</p>`;
  }
}

loadProjects();
