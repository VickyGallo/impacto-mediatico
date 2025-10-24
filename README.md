# 📊 Evaluador de Impacto Mediático

Proyecto desarrollado como parte del desafío técnico de integración con **n8n**, **Google Apps Script** y un **frontend en HTML + CSS + JavaScript**.

---

## 🚀 Descripción General

Este proyecto permite analizar el impacto mediático de notas de prensa utilizando un flujo automatizado en **n8n** conectado a una API de Google Sheets.

**Flujo general:**

1. El usuario completa el formulario con:
   - Organización
   - Tema o título de la nota
   - Fecha de publicación (opcional)

2. El frontend envía los datos vía `POST` al webhook de n8n.

3. n8n consulta la API de Google Script y devuelve un JSON con métricas de análisis.

4. El front muestra el resultado con resumen e indicadores visuales.

---

## 🧩 Arquitectura

**Frontend:**  
- HTML + CSS + JavaScript Vanilla  
- `fetch()` → webhook n8n  
- Visualización simple y responsiva

**Backend (n8n):**
- Webhook (POST)
- HTTP Request → Google Script
- Respond to Webhook (200)

**API externa:**  
Google Apps Script que expone los datos de Google Sheets  
([documentación incluida en `endpoint_documentation.md`](endpoint_documentation.md))

---

## 📂 Estructura del Proyecto

