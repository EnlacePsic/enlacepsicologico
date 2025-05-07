
let puntajeInatencion = 0;
let puntajeHiperactividad = 0;
let indiceActual = 0;
let resultadoCalculado = false;

const afirmaciones = [
  // Inatención
  "1. Tiene dificultad para prestar atención a los detalles o por cometer errores por descuido.",
  "2. Tiene dificultad para mantener la atención en tareas o actividades.",
  "3. Parece no escuchar cuando se le habla directamente.",
  "4. No sigue instrucciones y no finaliza tareas.",
  "5. Tiene dificultad para organizar tareas y actividades.",
  "6. Evita tareas que requieren esfuerzo mental sostenido.",
  "7. Pierde cosas necesarias para tareas o actividades.",
  "8. Se distrae fácilmente por estímulos externos.",
  "9. Es olvidadizo en las actividades diarias.",
  // Hiperactividad/Impulsividad
  "10. Mueve en exceso manos o pies, o se remueve en el asiento.",
  "11. Se levanta en situaciones en que debería permanecer sentado.",
  "12. Corre o trepa en situaciones inapropiadas.",
  "13. Tiene dificultad para jugar o realizar actividades tranquilamente.",
  "14. Está a menudo ‘en marcha’ o actúa como si tuviera un motor.",
  "15. Habla en exceso.",
  "16. Responde antes de que se le termine de hacer una pregunta.",
  "17. Tiene dificultad para esperar su turno.",
  "18. Interrumpe o se inmiscuye en conversaciones o juegos."
];

const opciones = [
  { texto: "Nunca", puntaje: 0 },
  { texto: "A veces", puntaje: 1 },
  { texto: "Frecuentemente", puntaje: 2 },
  { texto: "Muy frecuentemente", puntaje: 3 }
];

document.getElementById("iniciarTestButton").addEventListener("click", () => {
  document.getElementById("instrucciones").style.display = "none";
  document.getElementById("testContainer").style.display = "block";
  iniciarTest();
});

function iniciarTest() {
  puntajeInatencion = 0;
  puntajeHiperactividad = 0;
  indiceActual = 0;
  resultadoCalculado = false;
  mostrarPregunta();
}

function mostrarPregunta() {
  if (indiceActual >= afirmaciones.length) {
    calcularResultado();
    return;
  }

  document.getElementById("afirmacionActual").innerText = afirmaciones[indiceActual];
  const optionsContainer = document.getElementById("optionsContainer");
  optionsContainer.innerHTML = '';

  opciones.forEach(opcion => {
    const button = document.createElement("button");
    button.innerText = opcion.texto;
    button.addEventListener("click", () => registrarRespuesta(opcion.puntaje));
    optionsContainer.appendChild(button);
  });
}

function registrarRespuesta(puntaje) {
  if (!resultadoCalculado) {
    if (indiceActual < 9) {
      puntajeInatencion += puntaje;
    } else {
      puntajeHiperactividad += puntaje;
    }
    indiceActual++;
    mostrarPregunta();
  }
}

function calcularResultado() {
  resultadoCalculado = true;
  let mensaje = "";

  function interpretar(puntaje) {
    if (puntaje <= 12) return "bajo";
    else if (puntaje <= 18) return "moderado";
    else return "alto";
  }

  const inatencionNivel = interpretar(puntajeInatencion);
  const hiperactividadNivel = interpretar(puntajeHiperactividad);

  mensaje += `Síntomas de inatención: nivel ${inatencionNivel} (puntaje: ${puntajeInatencion}/27).\n`;
  mensaje += `Síntomas de hiperactividad/impulsividad: nivel ${hiperactividadNivel} (puntaje: ${puntajeHiperactividad}/27).\n\n`;

  mensaje += "Este cuestionario es solo una herramienta de tamizaje. Si presenta niveles moderados o altos, se recomienda acudir con un profesional de la salud mental para una evaluación clínica completa.";

  document.getElementById("mensajeResultado").innerText = mensaje;
  document.getElementById("testContainer").style.display = "none";
  document.getElementById("resultadoContainer").style.display = "block";

  document.getElementById("reiniciarTestButton").addEventListener("click", () => location.reload());
}
