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

Markdown

---

## 📋 5 Casos de Prueba Documentados
Se documentan 5 casos de prueba que cubren los tres posibles resultados del sistema de clasificación (FUNCIONÓ, REGULAR, NO FUNCIONÓ). La lógica de cálculo se basa en el número de registros (máx. 50) y un engagement simulado.

| Caso | Organización/Tema | Registros (Ej.) | Cobertura (Sim.) | Engagement (Sim.) | Resultado Global |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **1** | Org: EcoVida / Tema: Éxito Ecológico | 40 | 80% | 85% | ✅ FUNCIONÓ |
| **2** | Org: InnovaTech / Tema: Lanzamiento IA | 50 | 100% | 45% | ⚠️ REGULAR |
| **3** | Org: Alimentos S.A. / Tema: Retiro Producto | 25 | 50% | 70% | ⚠️ REGULAR |
| **4** | Org: ONG Futuro / Tema: Convocatoria local | 15 | 30% | 20% | ❌ NO FUNCIONÓ |
| **5** | Org: VickyGallo / Tema: Nuevo Proyecto | 45 | 90% | 75% | ✅ FUNCIONÓ |

---

## 💻 Ejecución local
1. Instalar y abrir **n8n** (o usar la versión en la nube).
2. **Importar el Workflow:** Abrir el archivo `Prueba ICC-Victoria Gallo.json` en n8n.
3. **Activar el Workflow:** Asegurar que el *workflow* esté activo.
4. **Abrir el Front-end:** Abrir el archivo `index.html` en un navegador web. El front-end está configurado para llamar al Webhook de n8n en `http://localhost:5678/webhook-test/analyze-press`.
5. **Probar:** Ingresar los datos y hacer clic en **"Analizar"**.

## Video demo ejecucion de formulario
https://drive.google.com/file/d/1BJrY1JUYbN1cIVhcFTYCAd6f7NwuS-Rt/view?usp=drive_link
