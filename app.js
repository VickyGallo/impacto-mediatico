const WEBHOOK_URL = "http://localhost:5678/webhook/analyze-press";

document.getElementById("pressForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    organization: document.getElementById("organization").value,
    topic: document.getElementById("topic").value,
    date: document.getElementById("date").value,
  };

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error("Error en el servidor");

    const metricas = await response.json();

    mostrarResultados(metricas);

    document.getElementById("statusMessage").innerHTML = `
      <span class="success">✅ Resultado recibido correctamente.</span>
    `;
    document.getElementById("result").classList.remove("hidden");
  } catch (error) {
    document.getElementById("statusMessage").innerHTML = `
      <span class="error">❌ No se pudo conectar con el servidor: ${error.message}</span>
    `;
    document.getElementById("jsonOutput").textContent = "";
    document.getElementById("result").classList.remove("hidden");
  }
});

function renderMetric(nombre, valor, unidad) {
  let color = valor > 70 ? "green" : valor > 40 ? "orange" : "red";
  return `
    <div class="metric-card">
      <div class="metric-title">${nombre}: ${valor}${unidad}</div>
      <div class="metric-bar">
        <div class="metric-fill ${color}" style="width:${valor}%;"></div>
      </div>
    </div>
  `;
}

function mostrarResultados(m) {
  let color;
  if (m.cobertura > 70 && m.engagement > 60) color = "green";
  else if (m.cobertura > 40) color = "orange";
  else color = "red";

  const output = `
    <h3>📊 Métricas de Impacto</h3>
    ${renderMetric("Cobertura", m.cobertura, "%")}
    ${renderMetric("Alcance", m.alcance, " personas")}
    ${renderMetric("Duración", m.duracion, " días")}
    ${renderMetric("Engagement", m.engagement, "%")}
    <p><b>Resultado Global:</b> 
      <span style="color:${color}; font-weight:bold;">
        ${
          color === "green"
            ? "✅ FUNCIONÓ"
            : color === "orange"
            ? "⚠️ REGULAR"
            : "❌ NO FUNCIONÓ"
        }
      </span>
    </p>
  `;

  document.getElementById("jsonOutput").innerHTML = output;

  const rawJson = document.getElementById("rawJson");
  const toggleBtn = document.getElementById("toggleDetails");
  const saveBtn = document.getElementById("saveResult");

  toggleBtn.classList.remove("hidden");
  saveBtn.classList.remove("hidden");

  rawJson.textContent = JSON.stringify(m, null, 2);
}
let resultadosGuardados = [];

const saveBtn = document.getElementById("saveResult");
const compareBtn = document.getElementById("compareResults");
const comparisonDiv = document.getElementById("comparison");
const toggleBtn = document.getElementById("toggleDetails");
const rawJson = document.getElementById("rawJson");

toggleBtn.addEventListener("click", () => {
  rawJson.classList.toggle("hidden");
  toggleBtn.textContent = rawJson.classList.contains("hidden")
    ? "Ver detalles 🔍"
    : "Ocultar detalles ❌";
});

saveBtn.addEventListener("click", () => {
  const jsonData = rawJson.textContent;
  if (!jsonData) return alert("No hay resultados para guardar.");

  const parsed = JSON.parse(jsonData);
  resultadosGuardados.push(parsed);

  if (resultadosGuardados.length === 1) {
    alert("Primer resultado guardado. Analiza otra nota para comparar.");
  } else if (resultadosGuardados.length === 2) {
    compareBtn.classList.remove("hidden");
    alert("Listo: podés comparar los dos resultados.");
  } else {
    alert("Solo se pueden comparar 2 resultados a la vez.");
  }
});

compareBtn.addEventListener("click", () => {
  if (resultadosGuardados.length < 2) return;

  const [a, b] = resultadosGuardados;
  comparisonDiv.classList.remove("hidden");

  const html = `
    <h3>⚖️ Comparación de Notas</h3>
    <div class="compare-container">
      <div class="compare-card">
        <h4>Nota 1</h4>
        ${renderMetric("Cobertura", a.cobertura, "%")}
        ${renderMetric("Engagement", a.engagement, "%")}
        ${renderMetric("Duración", a.duracion, " días")}
      </div>
      <div class="compare-card">
        <h4>Nota 2</h4>
        ${renderMetric("Cobertura", b.cobertura, "%")}
        ${renderMetric("Engagement", b.engagement, "%")}
        ${renderMetric("Duración", b.duracion, " días")}
      </div>
    </div>
  `;
  comparisonDiv.innerHTML = html;
});
