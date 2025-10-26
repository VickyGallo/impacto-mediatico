# 📊 Evaluador de Impacto Mediático
Proyecto de prueba técnica - Octubre 2025

## 🎯 Descripción
Aplicación web desarrollada para analizar el impacto mediático de notas de prensa mediante un flujo automatizado con **n8n** y un frontend simple en **HTML, CSS y JavaScript**.

El sistema consulta datos desde un endpoint (Google Apps Script) y devuelve métricas como:
- Cobertura mediática (%)
- Alcance estimado (personas impactadas)
- Duración (días en agenda)
- Engagement (%)
- Resultado global visual (verde/amarillo/rojo)

---

## 🧠 Tecnologías utilizadas
- **Frontend:** HTML5, CSS3, JavaScript (Fetch API)
- **Automatización:** n8n
- **Endpoint:** Google Apps Script (GET → JSON)
- **Comunicación:** Webhook POST / Respond to Webhook

---

## ⚙️ Flujo de trabajo
1. **Webhook (POST)** recibe los datos del formulario.  
2. **HTTP Request (GET)** consulta el endpoint de datos.  
3. **Respond to Webhook** devuelve el análisis al frontend.  
4. El frontend muestra métricas visuales y permite comparar resultados.

---

## 💻 Ejecución local
1. Instalar y abrir n8n:
   ```bash
   n8n
