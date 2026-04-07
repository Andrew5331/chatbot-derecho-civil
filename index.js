// ============================================================
// CHATBOT WHATSAPP - DERECHO CIVIL
// Usando Twilio WhatsApp API + Express.js
// ============================================================

const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

// ============================================================
// CONTENIDO DEL MENÚ
// ============================================================

const MENU_PRINCIPAL = `¡Hola! ⚖️✨
Has ingresado al mundo del Derecho Civil, donde las normas organizan la vida en sociedad 🧑‍⚖️📜
Soy tu asistente virtual y estoy aquí para guiarte.
¿Listo(a) para aprender? 😄
Elige una opción y comencemos 🚀

1️⃣ ¿Qué es el Derecho Civil?
2️⃣ Temas del curso
3️⃣ Importancia del Derecho Civil
4️⃣ Evaluaciones del curso
5️⃣ Horario y clases`;

const RESPUESTAS = {
  "1": `📘 *¿Qué es el Derecho Civil?*

El Derecho Civil es una rama del derecho privado que regula las relaciones jurídicas entre las personas en su vida cotidiana.

Se encarga de aspectos como:
• La identidad de las personas
• La familia
• Los bienes
• Los contratos y las obligaciones

Su finalidad es garantizar el orden, la justicia y el respeto de los derechos y deberes entre los ciudadanos.

_Responde *MENU* para volver al inicio._`,

  "2": `📚 *Temas del curso*

En este curso aprenderás los principales contenidos del Derecho Civil:

📌 *Personas y capacidad jurídica:* quiénes pueden ejercer derechos y asumir obligaciones.

📌 *Acto jurídico:* cómo se forman y validan los acuerdos.

📌 *Obligaciones:* vínculos legales que obligan a cumplir algo (como pagar una deuda).

📌 *Contratos:* acuerdos entre personas que generan derechos y deberes.

📌 *Derechos reales:* relación de las personas con los bienes (propiedad, posesión, etc.).

────────────────────

📖 *Estructura del Código Civil*

El Código Civil está organizado de la siguiente manera:

📘 *Título Preliminar:* Artículos I al X

📗 *Libro I: Derechos de las Personas* (Art. 1 - 139)

📗 *Libro II: Acto Jurídico* (Art. 140 - 232)

📗 *Libro III: Derecho de Familia* (Art. 233 - 659)

📗 *Libro IV: Derecho de Sucesiones* (Art. 660 - 880)

📗 *Libro V: Derechos Reales* (Art. 881 - 1131)

📗 *Libro VI: Las Obligaciones* (Art. 1132 - 1350)

📗 *Libro VII: Fuente de las Obligaciones* (Art. 1351 - 1988)

📗 *Libro VIII: Prescripción y Caducidad* (Art. 1989 - 2007)

📗 *Libro IX: Registros Públicos* (Art. 2008 - 2045)

📗 *Libro X: Derecho Internacional Privado* (Art. 2046 - 2111)

📕 *Título Final:* (Art. 2112 - 2122)

────────────────────

Estos temas te ayudarán a comprender cómo funciona la ley en la vida diaria.

_Responde *MENU* para volver al inicio._`,

  "3": `🧑‍⚖️ *Importancia del Derecho Civil*

El Derecho Civil es fundamental porque regula la convivencia social.

Gracias a sus normas, las personas pueden:
✅ Resolver conflictos
✅ Proteger sus bienes
✅ Formar familias legalmente
✅ Realizar acuerdos con seguridad jurídica

Sin esta rama del derecho, sería difícil mantener el orden y la justicia en la sociedad.

_Responde *MENU* para volver al inicio._`,

  "4": `📝 *Evaluaciones del curso*

El curso se evalúa mediante diferentes actividades:

📊 *Prácticas calificadas:* ejercicios o casos para aplicar lo aprendido.

📊 *Examen parcial:* evaluación de los temas vistos en la primera parte del curso.

📊 *Examen final:* evaluación global de todos los contenidos.

📊 *Participación:* intervenciones en clase, análisis de casos y trabajos grupales.

Esto permite evaluar tanto la teoría como la aplicación práctica.

_Responde *MENU* para volver al inicio._`,

  "5": `📅 *Horario y clases*

Las clases se realizan *dos veces por semana* y combinan teoría con análisis de casos reales.

Durante las sesiones:
🗓️ El docente explica los conceptos clave
🗓️ Se aplican en situaciones prácticas
🗓️ Se facilita la comprensión activa

Es importante asistir y participar activamente para aprovechar mejor el curso.

_Responde *MENU* para volver al inicio._`,
};

// ============================================================
// WEBHOOK - Recibe mensajes de WhatsApp
// ============================================================

app.post("/webhook", (req, res) => {
  const mensajeRecibido = (req.body.Body || "").trim().toLowerCase();
  const numeroUsuario = req.body.From;

  console.log(`📩 Mensaje de ${numeroUsuario}: "${mensajeRecibido}"`);

  let respuesta = "";

  if (
    mensajeRecibido === "hola" ||
    mensajeRecibido === "menu" ||
    mensajeRecibido === "menú" ||
    mensajeRecibido === "inicio" ||
    mensajeRecibido === "start" ||
    mensajeRecibido === ""
  ) {
    respuesta = MENU_PRINCIPAL;
  } else if (RESPUESTAS[mensajeRecibido]) {
    respuesta = RESPUESTAS[mensajeRecibido];
  } else {
    respuesta = `❓ No entendí tu mensaje.\n\nResponde con un número del *1 al 5* para ver las opciones, o escribe *MENU* para ver el menú principal.`;
  }

  // Formato TwiML que Twilio necesita
  const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Message>${respuesta}</Message>
</Response>`;

  res.set("Content-Type", "text/xml");
  res.send(twiml);
});

// Ruta de verificación
app.get("/", (req, res) => {
  res.send("✅ Chatbot Derecho Civil activo y funcionando.");
});

// ============================================================
// INICIAR SERVIDOR
// ============================================================

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});
