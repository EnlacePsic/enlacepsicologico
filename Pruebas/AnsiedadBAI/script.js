// app.js
let mostrarFormulario = true;
let testIniciado = false;
let resultadoCalculado = false;
let puntajeTotal = 0;
let mensajeResultado = "";
let afirmacionActual = "";
let indiceAfirmacionActual = 0;

let afirmaciones = [
    "1. Torpe o entumecido",
    "2. Acalorado",
    "3. Con temblor en las piernas",
    "4. Incapaz de relajarse",
    "5. Con temor a que ocurra lo peor",
    "6. Mareado, o que se le va la cabeza",
    "7. Con latidos del corazón fuertes y acelerados",
    "8. Inestable",
    "9. Atemorizado o asustado",
    "10. Nervioso",
    "11. Con sensación de bloqueo",
    "12. Con temblores en las manos",
    "13. Inquieto, inseguro",
    "14. Con miedo a perder el control",
    "15. Con sensación de ahogo",
    "16. Con temor a morir",
    "17. Con miedo",
    "18. Con problemas digestivos",
    "19. Con desvanecimientos",
    "20. Con rubor facial",
    "21. Con sudores, fríos o calientes"
];

let opcionesComunes = [
    { texto: "No", puntaje: 0 },
    { texto: "Levemente", puntaje: 1 },
    { texto: "Moderado", puntaje: 2 },
    { texto: "Bastante", puntaje: 3 }
];

// Cambié la función para manejar la visualización del formulario
document.getElementById("iniciarTestButton").addEventListener("click", () => {
    document.getElementById("instrucciones").style.display = "none";
    document.getElementById("testContainer").style.display = "block";
    iniciarTest(); // Ahora el test comienza cuando se hace clic en "Proceder con el test"
});

function iniciarTest() {
    testIniciado = true;
    puntajeTotal = 0;
    resultadoCalculado = false;
    indiceAfirmacionActual = 0;
    seleccionarNuevaAfirmacion();
}

function seleccionarNuevaAfirmacion() {
    if (indiceAfirmacionActual >= afirmaciones.length) {
        resultadoCalculado = true;
        calcularResultado();
        return;
    }

    const afirmacion = afirmaciones[indiceAfirmacionActual];
    document.getElementById("afirmacionActual").innerText = afirmacion;

    const optionsContainer = document.getElementById("optionsContainer");
    optionsContainer.innerHTML = ''; // Limpiar las opciones anteriores

    opcionesComunes.forEach(opcion => {
        const button = document.createElement("button");
        button.innerText = opcion.texto;
        button.addEventListener("click", () => responder(opcion.puntaje));
        optionsContainer.appendChild(button);
    });
}

function responder(respuesta) {
    if (!resultadoCalculado) {
        puntajeTotal += respuesta;
        indiceAfirmacionActual++;

        if (indiceAfirmacionActual < afirmaciones.length) {
            seleccionarNuevaAfirmacion();
        } else {
            resultadoCalculado = true;
            calcularResultado();
        }
    }
}

function calcularResultado() {
    let mensajeResultado = "";
    if (puntajeTotal <= 21) {
        mensajeResultado = "Ansiedad muy baja";
    } else if (puntajeTotal <= 35) {
        mensajeResultado = "Ansiedad moderada";
    } else {
        mensajeResultado = "Ansiedad severa";
    }

    document.getElementById("mensajeResultado").innerText = mensajeResultado;
    
    // Ocultar el contenedor de preguntas y mostrar los resultados
    document.getElementById("testContainer").style.display = "none";
    document.getElementById("resultadoContainer").style.display = "block";

    // Agregar evento para reiniciar el test
    document.getElementById("reiniciarTestButton").addEventListener("click", reiniciarTest);
}

function reiniciarTest() {
    location.reload();
}
