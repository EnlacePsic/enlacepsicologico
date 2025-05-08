let puntajeInatencion = 0;
let puntajeHiperactividad = 0;
let indiceActual = 0;
let resultadoCalculado = false;

const afirmaciones = ['1. ¿Con qué frecuencia tiene dificultades para finalizar los detalles de un proyecto, una vez que las partes más difíciles ya están hechas?', '2. ¿Con qué frecuencia tiene problemas para organizar tareas o actividades?', '3. ¿Con qué frecuencia tiene dificultades para recordar citas o compromisos?', '4. ¿Con qué frecuencia evita, pospone o no le gustan tareas que requieren un esfuerzo mental sostenido?', '5. ¿Con qué frecuencia pierde cosas necesarias para tareas o actividades (llaves, anteojos, papeles, etc.)?', '6. ¿Con qué frecuencia se distrae con actividades o ruidos a su alrededor?', '7. ¿Con qué frecuencia deja su asiento en reuniones u otras situaciones donde se espera que permanezca sentado?', '8. ¿Con qué frecuencia se siente inquieto o con dificultad para estar quieto por mucho tiempo?', '9. ¿Con qué frecuencia tiene dificultad para relajarse en su tiempo libre?', '10. ¿Con qué frecuencia habla en exceso?', '11. ¿Con qué frecuencia termina las frases de otras personas o contesta antes de que terminen de hablar?', '12. ¿Con qué frecuencia tiene dificultad para esperar su turno en situaciones grupales?', '13. ¿Con qué frecuencia interrumpe o se entromete cuando otros están ocupados?', '14. ¿Con qué frecuencia experimenta sentimientos de inquietud interna (como si necesitara moverse constantemente)?', '15. ¿Con qué frecuencia toma decisiones impulsivas sin considerar las consecuencias?', '16. ¿Con qué frecuencia cambia de una actividad a otra sin completarlas?', '17. ¿Con qué frecuencia otros le dicen que parece no prestar atención cuando le hablan?', '18. ¿Con qué frecuencia se siente mentalmente agotado por intentar concentrarse?'];

const opciones = [
  { texto: "Nunca", puntaje: 0 },
  { texto: "Raramente", puntaje: 1 },
  { texto: "A veces", puntaje: 2 },
  { texto: "Frecuentemente", puntaje: 3 },
  { texto: "Muy frecuentemente", puntaje: 4 }
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
    if (puntaje <= 16) return "poco probable";
    else if (puntaje <= 23) return "probable";
    else return "altamente probable";
  }

  const inatencionNivel = interpretar(puntajeInatencion);
  const hiperactividadNivel = interpretar(puntajeHiperactividad);

  mensaje += `Síntomas de inatención: nivel ${inatencionNivel} (puntaje: ${puntajeInatencion}/36).\n`;
  mensaje += `Síntomas de hiperactividad/impulsividad: nivel ${hiperactividadNivel} (puntaje: ${puntajeHiperactividad}/36).\n\n`;

  document.getElementById("mensajeResultado").innerText = mensaje;
  document.getElementById("testContainer").style.display = "none";
  document.getElementById("resultadoContainer").style.display = "block";

  document.getElementById("reiniciarTestButton").addEventListener("click", () => location.reload());
}