const affirmations = [
    "1. Tristeza", "2. Pesimismo", "3. Fracaso", "4. Pérdida de placer", "5. Sentimientos de culpa", 
    "6. Sentimientos de castigo", "7. Insatisfacción con uno mismo", "8. Autocrítica", "9. Pensamientos o deseos suicidas", 
    "10. Llanto", "11. Agitación", "12. Pérdida de interés", "13. Indecisión", "14. Inutilidad", "15. Pérdida de energía", 
    "16. Cambios en los hábitos de sueño", "17. Irritabilidad", "18. Cambios en el apetito", "19. Dificultad de concentración", 
    "20. Cansancio o fatiga", "21. Pérdida de interés en el sexo"
];

const options = [
    [
        { text: "0.- No me siento triste", score: 0 },
        { text: "1.- Me siento triste gran parte del tiempo", score: 1 },
        { text: "2.- Me siento triste todo el tiempo", score: 2 },
        { text: "3.- Me siento tan triste o soy tan infeliz que no puedo soportarlo", score: 3 }
    ],
    [
        { text: "0.- No estoy desalentado respecto de mi futuro", score: 0 },
        { text: "1.- Me siento más desalentado respecto de mi futuro que lo que solía estarlo", score: 1 },
        { text: "2.- No espero que las cosas funcionen para mí", score: 2 },
        { text: "3.- Siento que no hay esperanza para mi futuro y que sólo puede empeorar", score: 3 }
    ],
    [
        { text: "0.- No me siento como un fracasado", score: 0 },
        { text: "1.- He fracasado más de lo que hubiera debido", score: 1 },
        { text: "2.- Cuando miro hacia atrás, veo muchos fracasos", score: 2 },
        { text: "3.- Siento que como persona soy un fracaso total", score: 3 }
    ],
    [
        { text: "0.- Obtengo tanto placer como siempre por las cosas de las que disfruto", score: 0 },
        { text: "1.- No disfruto tanto de las cosas como solía hacerlo", score: 1 },
        { text: "2.- Obtengo muy poco placer de las cosas que solía disfrutar", score: 2 },
        { text: "3.- No puedo obtener ningún placer de las cosas de las que solía disfrutar", score: 3 }
    ],
    [
        { text: "0.- No me siento particularmente culpable", score: 0 },
        { text: "1.- Me siento culpable respecto de varias cosas que he hecho o que debería haber hecho", score: 1 },
        { text: "2.- Me siento bastante culpable la mayor parte del tiempo", score: 2 },
        { text: "3.- Me siento culpable todo el tiempo", score: 3 }
    ],
    [
        { text: "0.- No siento que esté siendo castigado", score: 0 },
        { text: "1.- Siento que tal vez pueda ser castigado", score: 1 },
        { text: "2.- Espero ser castigado", score: 2 },
        { text: "3.- Siento que estoy siendo castigado", score: 3 }
    ],
    [
        { text: "0.- Siento acerca de mí lo mismo que siempre", score: 0 },
        { text: "1.- He perdido la confianza en mí mismo", score: 1 },
        { text: "2.- Estoy decepcionado conmigo mismo", score: 2 },
        { text: "3.- No me gusto a mí mismo", score: 3 }
    ],
    [
        { text: "0.- No me critico ni me culpo más de lo habitual", score: 0 },
        { text: "1.- Estoy más crítico conmigo mismo de lo que solía estarlo", score: 1 },
        { text: "2.- Me critico a mí mismo por todos mis errores", score: 2 },
        { text: "3.- Me culpo a mí mismo por todo lo malo que sucede", score: 3 }
    ],
    [
        { text: "0.- No tengo ningún pensamiento de matarme", score: 0 },
        { text: "1.- He tenido pensamientos de matarme, pero no lo haría", score: 1 },
        { text: "2.- Querría matarme", score: 2 },
        { text: "3.- Me mataría si tuviera la oportunidad de hacerlo", score: 3 }
    ],
    [
        { text: "0.- No lloro más de lo que solía hacerlo", score: 0 },
        { text: "1.- Lloro más de lo que solía hacerlo", score: 1 },
        { text: "2.- Lloro por cualquier pequeñez", score: 2 },
        { text: "3.- Siento ganas de llorar pero no puedo", score: 3 }
    ],
    [
        { text: "0.- No estoy más inquieto o tenso que lo habitual", score: 0 },
        { text: "1.- Me siento más inquieto o tenso que lo habitual", score: 1 },
        { text: "2.- Estoy tan inquieto o agitado que me es difícil quedarme quieto", score: 2 },
        { text: "3.- Estoy tan inquieto o agitado que tengo que estar siempre en movimiento o haciendo algo", score: 3 }
    ],
    [
        { text: "0.- No he perdido el interés en otras actividades o personas", score: 0 },
        { text: "1.- Estoy menos interesado que antes en otras personas o cosas", score: 1 },
        { text: "2.- He perdido casi todo el interés en otras personas o cosas", score: 2 },
        { text: "3.- Me es difícil interesarme por algo", score: 3 }
    ],
    [
        { text: "0.- Tomo mis propias decisiones tan bien como siempre", score: 0 },
        { text: "1.- Me resulta más difícil que de costumbre tomar decisiones", score: 1 },
        { text: "2.- Encuentro mucha más dificultad que antes para tomar decisiones", score: 2 },
        { text: "3.- Tengo problemas para tomar cualquier decisión", score: 3 }
    ],
    [
        { text: "0.- No siento que yo no sea valioso", score: 0 },
        { text: "1.- No me considero a mí mismo tan valioso y útil como solía considerarme", score: 1 },
        { text: "2.- Me siento menos valioso cuando me comparo con otros", score: 2 },
        { text: "3.- Siento que no valgo nada", score: 3 }
    ],
    [
        { text: "0.- Tengo tanta energía como siempre", score: 0 },
        { text: "1.- Tengo menos energía que la que solía tener", score: 1 },
        { text: "2.- No tengo suficiente energía para hacer demasiado", score: 2 },
        { text: "3.- No tengo energía suficiente para hacer nada", score: 3 }
    ],
    [
        { text: "0.- No he experimentado ningún cambio en mis hábitos de sueño", score: 0 },
        { text: "1.- Duermo un poco más o un poco menos que lo habitual", score: 1 },
        { text: "2.- Duermo mucho más o mucho menos que lo habitual", score: 2 },
        { text: "3.- Duermo la mayor parte del día o me despierto mucho más temprano y no puedo volver a dormirme", score: 3 }
    ],
    [
        { text: "0.- No estoy más irritable que lo habitual", score: 0 },
        { text: "1.- Estoy más irritable que lo habitual", score: 1 },
        { text: "2.- Estoy mucho más irritable que lo habitual", score: 2 },
        { text: "3.- Estoy irritable todo el tiempo", score: 3 }
    ],
    [
        { text: "0.- No he experimentado ningún cambio en mi apetito", score: 0 },
        { text: "1.- Mi apetito es un poco menor o mayor que lo habitual", score: 1 },
        { text: "2.- Mi apetito es mucho menor o mayor que lo habitual", score: 2 },
        { text: "3.- No tengo apetito en absoluto o quiero comer todo el día", score: 3 }
    ],
    [
        { text: "0.- Puedo concentrarme tan bien como siempre", score: 0 },
        { text: "1.- No puedo concentrarme tan bien como habitualmente", score: 1 },
        { text: "2.- Me es difícil mantener la mente en algo por mucho tiempo", score: 2 },
        { text: "3.- Encuentro que no puedo concentrarme en nada", score: 3 }
    ],
    [
        { text: "0.- No estoy más cansado o fatigado que lo habitual", score: 0 },
        { text: "1.- Me fatigo o me canso más fácilmente que lo habitual", score: 1 },
        { text: "2.- Estoy demasiado fatigado o cansado para hacer muchas de las cosas que solía hacer", score: 2 },
        { text: "3.- Estoy demasiado fatigado o cansado para hacer la mayoría de las cosas que solía hacer", score: 3 }
    ],
    [
        { text: "0.- No he notado ningún cambio reciente en mi interés por el sexo", score: 0 },
        { text: "1.- Estoy menos interesado en el sexo de lo que solía estarlo", score: 1 },
        { text: "2.- Estoy mucho menos interesado en el sexo", score: 2 },
        { text: "3.- He perdido completamente el interés en el sexo", score: 3 }
    ]
];

let currentAffirmationIndex = 0;
let totalScore = 0;
let resultCalculated = false;

document.getElementById("startTestButton").addEventListener("click", startTest);
document.getElementById("resetButton").addEventListener("click", resetTest);

function startTest() {
    document.getElementById("instructions").style.display = "none";
    document.getElementById("testContainer").style.display = "block";
    loadNextAffirmation();
}

function loadNextAffirmation() {
    if (currentAffirmationIndex >= affirmations.length) {
        calculateResult();
        return;
    }
    document.getElementById("questionText").innerText = affirmations[currentAffirmationIndex];
    const optionsContainer = document.getElementById("optionsContainer");
    optionsContainer.innerHTML = '';
    
    options[currentAffirmationIndex].forEach(option => {
        const button = document.createElement("button");
        button.innerText = option.text;
        button.onclick = () => selectAnswer(option.score);
        optionsContainer.appendChild(button);
    });
}

function selectAnswer(score) {
    if (resultCalculated) return;
    totalScore += score;
    currentAffirmationIndex++;
    if (currentAffirmationIndex < affirmations.length) {
        loadNextAffirmation();
    } else {
        calculateResult();
    }
}

function calculateResult() {
    resultCalculated = true;
    let resultMessage = '';
    if (totalScore <= 13) {
        resultMessage = "Mínimo o nulo";
    } else if (totalScore <= 19) {
        resultMessage = "Leve";
    } else if (totalScore <= 29) {
        resultMessage = "Moderada";
    } else {
        resultMessage = "Severa";
    }
    
    // Mostrar el mensaje del resultado
    document.getElementById("resultMessage").innerText = resultMessage;
    
    // Ocultar el contenedor de preguntas y opciones
    document.getElementById("testContainer").style.display = "none";
    
    // Mostrar solo el contenedor de resultados
    document.getElementById("resultContainer").style.display = "block";
}

function resetTest() {
    totalScore = 0;
    currentAffirmationIndex = 0;
    resultCalculated = false;
    
    // Ocultar los resultados y mostrar las instrucciones
    document.getElementById("resultContainer").style.display = "none";
    document.getElementById("instructions").style.display = "block";
}

