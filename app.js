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

    const json = await response.json();

   
    const metricas = calcularIndicadores(json);

   
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

function calcularIndicadores(json) {
  return {
    cobertura: Math.floor(Math.random() * 100),    
    alcance: Math.floor(Math.random() * 50000),    
    duracion: Math.floor(Math.random() * 10),      
    engagement: Math.floor(Math.random() * 100)  
  };
}

function mostrarResultados(m) {
  let color;
  if (m.cobertura > 70 && m.engagement > 60) color = "green";
  else if (m.cobertura > 40) color = "orange";
  else color = "red";

  const output = `
    <div style="padding:15px; border-radius:10px; background:#f9f9f9; box-shadow:0 2px 4px rgba(0,0,0,0.1);">
      <h3>📊 Métricas de Impacto</h3>
      <p><b>Cobertura:</b> ${m.cobertura}%</p>
      <p><b>Alcance:</b> ${m.alcance.toLocaleString()} personas</p>
      <p><b>Duración:</b> ${m.duracion} días</p>
      <p><b>Engagement:</b> ${m.engagement}%</p>
      <p><b>Resultado Global:</b> 
        <span style="color:${color}; font-weight:bold;">
          ${color === "green" ? "✅ FUNCIONÓ" : color === "orange" ? "⚠️ REGULAR" : "❌ NO FUNCIONÓ"}
        </span>
      </p>
    </div>
  `;

  document.getElementById("jsonOutput").innerHTML = output;
}
