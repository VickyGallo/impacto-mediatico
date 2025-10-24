const WEBHOOK_URL = "http://localhost:5678/webhook/analyze-press"; // Usa este si estás corriendo n8n localmente

document.getElementById("pressForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    organization: document.getElementById("organization").value,
    topic: document.getElementById("topic").value,
    date: document.getElementById("date").value
  };

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    if (!response.ok) throw new Error("Error en el servidor");

    const json = await response.json();

    // Mostrar un resumen corto
    document.getElementById("statusMessage").innerHTML =
      `<span class="success">✅ Resultado recibido con ${json.data?.length || 0} registros.</span>`;

    // Mostrar el JSON completo (opcional)
    document.getElementById("jsonOutput").textContent = JSON.stringify(json, null, 2);
    document.getElementById("result").classList.remove("hidden");
  } catch (error) {
    document.getElementById("statusMessage").innerHTML =
      `<span class="error">❌ No se pudo conectar con el servidor: ${error.message}</span>`;
    document.getElementById("jsonOutput").textContent = "";
    document.getElementById("result").classList.remove("hidden");
  }
});
