
// Obtén los elementos select
const nivelUsuarioSelect = document.getElementById("nivelUsuario");
const gradoUsuarioSelect = document.getElementById("gradoUsuario");

// Función para actualizar las opciones del select de grados según el nivel
function actualizarOpcionesGrado() {
    // Obtén el valor del nivelUsuario
    let nivelUsuario = parseInt(nivelUsuarioSelect.value);

    // Limpia las opciones existentes (excepto la primera)
    gradoUsuarioSelect.innerHTML = '<option value="">Selecciona un grado</option>';

    // Añadir las nuevas opciones basadas en el nivelUsuario
    if (nivelUsuario === 1) {
        for (let i = 1; i <= 6; i++) {
            const option = document.createElement("option");
            option.value = i;
            option.textContent = i;
            gradoUsuarioSelect.appendChild(option);
        }
    } else if (nivelUsuario === 2 || nivelUsuario === 3) {
        const maxGrado = (nivelUsuario === 2) ? 3 : 4;
        for (let i = 1; i <= maxGrado; i++) {
            const option = document.createElement("option");
            option.value = i;
            option.textContent = i;
            gradoUsuarioSelect.appendChild(option);
        }
    }
}

// Funciones en JavaScript
function mostrarFormulario() 
    {
    document.getElementById('instrucciones').style.display = 'none';
    document.getElementById('formulario').style.display = 'block';
    }

function confirmarDatos() 
    {
    const nivel = document.getElementById('nivelUsuario').value;
    const grado = document.getElementById('gradoUsuario').value;
    const edad = document.getElementById('edadUsuario').value;

        if (nivel && grado && edad) 
            {
            document.getElementById('formulario').style.display = 'none';
            document.getElementById('resultados').style.display = 'block';

            // Asignar valores a los resultados
            document.getElementById('nivel').textContent = `Nivel: ${nivel}`;
            document.getElementById('grado').textContent = `Grado: ${grado}`;
            document.getElementById('edad').textContent = `Edad: ${edad}`;
            } 
        else 
            {
            alert('Por favor, completa todos los campos.');
            }
    }

// Prueba iniciada
// Instrucciones
//let mostrarFormularioFlag = true;
//const imagenEjemplo = "/Caras/Ejemplo.png";

// Datos del usuario
let testIniciado = false;
let edadIngresada = false;
let edadUsuario = 0;
let gradoUsuario = 0;
let nivelUsuario = 0;

// Efecto del marcador
let imagenRef = document.getElementById("imagenTest"); // Asegúrate de que el elemento exista en el HTML
let imagenAncho = 600;
let sectorSeleccionado = -1;
let mensaje = "";
let tiempoRestante = 180;
let temporizador = null; // Para almacenar el intervalo del temporizador

// Mostrar imágenes
let todasLasImagenes = [];
let imagenActual = "";
let indiceImagenActual = 0;
let imagenesConDiferencias = []; // Ejemplo: [{ imagen: "/img/Capa 1.svg", sectorConDiferencia: 2 }, ...]

// Puntajes y resultados
let puntos = 0;
let aciertos = 0;
let errores = 0;
let puntaje = 0;
let resultadoCalculado = false;

// Eneatipos y variables de puntuación
let eneatipoA = 0;
let eneatipoE = 0;
let eneatipoAE = 0;
let eneatipoICI = 0;
let A = 0; // Aciertos en baremos
let E = 0; // Errores en baremos

function getAciertosNetos() {
  return A - E;
}

function getICI() {
  const total = A + E;
  return total > 0 ? Math.round(getAciertosNetos() * 100 / total) : 0;
}

// ========================
// FUNCIONES DE INTERFAZ
// ========================
  
// Función para confirmar datos ingresados en el formulario
async function confirmarDatos() {
    // Obtén los valores de los campos del formulario
    nivelUsuario = parseInt(document.getElementById("nivelUsuario").value);
    gradoUsuario = parseInt(document.getElementById("gradoUsuario").value);
    edadUsuario = parseInt(document.getElementById("edadUsuario").value);

    // Validación para asegurarnos de que todos los campos estén completos
    if (!nivelUsuario || !gradoUsuario || !edadUsuario) {
        alert("Por favor, completa todos los campos.");
        return; // Detenemos el proceso si falta algún campo
    }

    // Validación de edad (debe estar entre 6 y 18)
    if (edadUsuario < 6 || edadUsuario > 18) {
        alert("Por favor ingresa una edad válida entre 6 y 18 años.");
        return;
    }
    
    // Validación de nivel (debe ser 1, 2 o 3)
    if (nivelUsuario < 1 || nivelUsuario > 3) {
        alert("Por favor selecciona un nivel válido.");
        return;
    }

    // Validación de grado (debe estar entre 1 y 6)
    if (gradoUsuario < 1 || gradoUsuario > 6) {
        alert("Por favor selecciona un grado válido entre 1 y 6.");
        return;
    }

    // Si todos los datos son válidos, muestra el mensaje de confirmación
    //mensaje = `Edad: ${edadUsuario}, Grado: ${gradoUsuario}, Nivel: ${nivelUsuario} confirmados.`;
    //document.getElementById("mensaje").textContent = mensaje;
  
    // Inicia el test
    await iniciarTest();
}


  
  // ========================
  // FUNCIONES DEL TEST
  // ========================
  
  // Inicia el test
  async function iniciarTest() {
    testIniciado = true;
    tiempoRestante = 180;
    puntos = 0;
    aciertos = 0;
    errores = 0;
    resultadoCalculado = false;
    mensaje = "";
    sectorSeleccionado = -1;
  
    // Reinicia contadores para eneatipos
    A = 0;
    E = 0;
    AE = 0;
    ICI = 0;
  
    // Genera la lista de imágenes (simulando 60 imágenes)
    todasLasImagenes = Array.from({ length: 60 }, (_, i) => `img/Capa ${i + 1}.svg`);
    
    // Define las diferencias para las imágenes (por simplicidad, se define solo para la primera imagen)
    const imagenesConDiferencias = [
        { imagen: "/img/Capa 1.svg", sectorConDiferencia: 2 },
        { imagen: "/img/Capa 2.svg", sectorConDiferencia: 2 },
        { imagen: "/img/Capa 3.svg", sectorConDiferencia: 0 },
        { imagen: "/img/Capa 4.svg", sectorConDiferencia: 2 },
        { imagen: "/img/Capa 5.svg", sectorConDiferencia: 2 },
        { imagen: "/img/Capa 6.svg", sectorConDiferencia: 2 },
        { imagen: "/img/Capa 7.svg", sectorConDiferencia: 0 },
        { imagen: "/img/Capa 8.svg", sectorConDiferencia: 0 },
        { imagen: "/img/Capa 9.svg", sectorConDiferencia: 0 },
        { imagen: "/img/Capa 10.svg", sectorConDiferencia: 0 },
        { imagen: "/img/Capa 11.svg", sectorConDiferencia: 1 },
        { imagen: "/img/Capa 12.svg", sectorConDiferencia: 2 },
        { imagen: "/img/Capa 13.svg", sectorConDiferencia: 0 },
        { imagen: "/img/Capa 14.svg", sectorConDiferencia: 1 },
        { imagen: "/img/Capa 15.svg", sectorConDiferencia: 2 },
        { imagen: "/img/Capa 16.svg", sectorConDiferencia: 1 },
        { imagen: "/img/Capa 17.svg", sectorConDiferencia: 0 },
        { imagen: "/img/Capa 18.svg", sectorConDiferencia: 1 },
        { imagen: "/img/Capa 19.svg", sectorConDiferencia: 0 },
        { imagen: "/img/Cara 20.svg", sectorConDiferencia: 1 },
        { imagen: "/img/Cara 21.svg", sectorConDiferencia: 1 },
        { imagen: "/img/Cara 22.svg", sectorConDiferencia: 0 },
        { imagen: "/img/Cara 23.svg", sectorConDiferencia: 2 },
        { imagen: "/img/Cara 24.svg", sectorConDiferencia: 0 },
        { imagen: "/img/Cara 25.svg", sectorConDiferencia: 2 },
        { imagen: "/img/Cara 26.svg", sectorConDiferencia: 1 },
        { imagen: "/img/Cara 27.svg", sectorConDiferencia: 1 },
        { imagen: "/img/Cara 28.svg", sectorConDiferencia: 0 },
        { imagen: "/img/Cara 29.svg", sectorConDiferencia: 2 },
        { imagen: "/img/Cara 30.svg", sectorConDiferencia: 0 },
        { imagen: "/img/Cara 31.svg", sectorConDiferencia: 1 },
        { imagen: "/img/Cara 32.svg", sectorConDiferencia: 1 },
        { imagen: "/img/Cara 33.svg", sectorConDiferencia: 0 },
        { imagen: "/img/Cara 34.svg", sectorConDiferencia: 1 },
        { imagen: "/img/Cara 35.svg", sectorConDiferencia: 2 },
        { imagen: "/img/Cara 36.svg", sectorConDiferencia: 0 },
        { imagen: "/img/Cara 37.svg", sectorConDiferencia: 0 },
        { imagen: "/img/Cara 38.svg", sectorConDiferencia: 1 },
        { imagen: "/img/Cara 39.svg", sectorConDiferencia: 1 },
        { imagen: "/img/Cara 40.svg", sectorConDiferencia: 1 },
        { imagen: "/img/Cara 41.svg", sectorConDiferencia: 2 },
        { imagen: "/img/Cara 42.svg", sectorConDiferencia: 2 },
        { imagen: "/img/Cara 43.svg", sectorConDiferencia: 0 },
        { imagen: "/img/Cara 44.svg", sectorConDiferencia: 1 },
        { imagen: "/img/Cara 45.svg", sectorConDiferencia: 1 },
        { imagen: "/img/Cara 46.svg", sectorConDiferencia: 1 },
        { imagen: "/img/Cara 47.svg", sectorConDiferencia: 2 },
        { imagen: "/img/Cara 48.svg", sectorConDiferencia: 2 },
        { imagen: "/img/Cara 49.svg", sectorConDiferencia: 1 },
        { imagen: "/img/Cara 50.svg", sectorConDiferencia: 0 },
        { imagen: "/img/Cara 51.svg", sectorConDiferencia: 0 },
        { imagen: "/img/Cara 52.svg", sectorConDiferencia: 2 },
        { imagen: "/img/Cara 53.svg", sectorConDiferencia: 1 },
        { imagen: "/img/Cara 54.svg", sectorConDiferencia: 2 },
        { imagen: "/img/Cara 55.svg", sectorConDiferencia: 2 },
        { imagen: "/img/Cara 56.svg", sectorConDiferencia: 2 },
        { imagen: "/img/Cara 57.svg", sectorConDiferencia: 0 },
        { imagen: "/img/Cara 58.svg", sectorConDiferencia: 1 },
        { imagen: "/img/Cara 59.svg", sectorConDiferencia: 2 },
        { imagen: "/img/Cara 60.svg", sectorConDiferencia: 0 }
      ];
      
  
    // Muestra la primera imagen del test
    indiceImagenActual = 0;
    seleccionarNuevaImagen();
  
    // Oculta el formulario y muestra el contenedor del test
    document.getElementById("formulario").style.display = "none";
    document.getElementById("test").style.display = "block";
  
    // Actualiza el ancho de la imagen (si es necesario)
    actualizarAnchoImagen();
  
    // Inicia el temporizador
    iniciarTemporizador();
  }
  
  // Selecciona y muestra una nueva imagen del test
  function seleccionarNuevaImagen() {
    if (indiceImagenActual >= todasLasImagenes.length) {
      mensaje = "Test finalizado";
      testIniciado = false;
      resultadoCalculado = true;
      calcularPuntaje();
      mostrarResultados();
      return;
    }
    imagenActual = todasLasImagenes[indiceImagenActual];
    indiceImagenActual++;
    sectorSeleccionado = -1;
    // Actualiza la imagen en el DOM
    if (imagenRef) {
      imagenRef.src = imagenActual;
    }
    actualizarMarcador();
  }
  
// Inicia el temporizador (cuenta regresiva)
function iniciarTemporizador() {
    const display = document.getElementById("tiempoRestanteDisplay");

    // Verifica si el display existe
    if (!display) {
        console.error('El elemento para mostrar el tiempo restante no se encuentra.');
        return;
    }

    // Si ya existe un temporizador, lo cancela antes de iniciar uno nuevo
    if (temporizador) clearInterval(temporizador);

    // Inicia el temporizador
    temporizador = setInterval(() => {
        if (tiempoRestante > 0 && testIniciado) {
            tiempoRestante--;  // Disminuye el tiempo restante
            display.textContent = `Tiempo restante: ${tiempoRestante}`;  // Actualiza el tiempo en el DOM
        } else {
            if (testIniciado) {
                // Mensaje cuando se acabe el tiempo
                mensaje = "Tiempo agotado";
                document.getElementById("mensaje").textContent = mensaje;
                clearInterval(temporizador);  // Detiene el temporizador
                setTimeout(() => {
                    testIniciado = false;
                    resultadoCalculado = true;
                    calcularPuntaje();
                    mostrarResultados();  // Muestra los resultados después de 2 segundos
                }, 2000);
            }
        }
    }, 1000);  // El temporizador se actualiza cada segundo
}
  
  // Actualiza el ancho de la imagen (por si se requiere adaptabilidad)
  function actualizarAnchoImagen() {
    if (imagenRef) {
      imagenAncho = imagenRef.offsetWidth;
    }
  }
  
  // Detecta el sector de la imagen en que se hace clic
  async function DetectarSector(e) {
    if (!imagenRef) return;
    actualizarAnchoImagen();
    const x = e.offsetX; // Posición X del clic
    // Determina el sector: 0 (izquierda), 1 (centro) o 2 (derecha)
    if (x < imagenAncho / 3) {
      sectorSeleccionado = 0;
    } else if (x < 2 * imagenAncho / 3) {
      sectorSeleccionado = 1;
    } else {
      sectorSeleccionado = 2;
    }
    actualizarMarcador();
  
    // Verifica si el sector seleccionado es correcto para la imagen actual
    const imagenInfo = imagenesConDiferencias.find(item => item.imagen === imagenActual);
    if (imagenInfo && imagenInfo.sectorConDiferencia === sectorSeleccionado) {
      aciertos++;
      puntos++;
      A++; // Incrementa aciertos para eneatipos
      // Puedes mostrar un mensaje de acierto si lo deseas
    } else {
      errores++;
      E++; // Incrementa errores para eneatipos
      // Puedes mostrar un mensaje de error si lo deseas
    }
    
    // Breve retardo para que se note la selección
    setTimeout(() => {
      seleccionarNuevaImagen();
    }, 300);
  }
  
  // Actualiza el estilo del marcador que indica el sector seleccionado
  function actualizarMarcador() {
    const marcador = document.getElementById("marcador");
    if (sectorSeleccionado === -1 || imagenAncho === 0) {
      marcador.style.display = "none";
    } else {
      const left = sectorSeleccionado * (imagenAncho / 3);
      const width = imagenAncho / 3;
      marcador.style.display = "block";
      marcador.style.left = `${left}px`;
      marcador.style.width = `${width}px`;
    }
  }
  
  // ========================
  // CÁLCULO DE PUNTAJE
  // ========================
  
  function calcularPuntaje() {
    const total = aciertos + errores;
    if (total > 0) {
      puntaje = Math.floor(((aciertos - errores) * 100) / total);
    } else {
      puntaje = 0;
    }
    calcularEneatipos();
  }

    
  // ========================
  // CÁLCULO DE ENEATIPO
  // ========================
  
  
  function calcularEneatipos() {
    // Inicializamos los valores en caso de que no se encuentren
    let eneatipoA = 0;
    let eneatipoE = 0;
    let eneatipoAE = 0;
    let eneatipoICI = 0;
  
    // Declaramos las variables para los baremos
    let baremosA = [];
    let baremosE = [];
    let baremosAE = [];
    let baremosICI = [];
  
    // Validamos que la combinación de edad, grado y nivel sea correcta
    if (
      (nivelUsuario === 1 && (gradoUsuario < 1 || gradoUsuario > 6 || edadUsuario < 6 || edadUsuario > 11)) ||
      (nivelUsuario === 2 && (gradoUsuario < 1 || gradoUsuario > 3 || edadUsuario < 12 || edadUsuario > 15)) ||
      (nivelUsuario === 3 && (gradoUsuario < 1 || gradoUsuario > 4 || edadUsuario < 15 || edadUsuario > 18))
    ) {
      // Si la combinación no es válida, asignamos las listas basadas solo en la edad
      if (edadUsuario >= 6 && edadUsuario <= 11) {
        baremosA = baremosEdad6a7A;
        baremosE = baremosEdad6a7E;
        baremosAE = baremosEdad6a7AE;
        baremosICI = baremosEdad6a7ICI;
      } else if (edadUsuario >= 12 && edadUsuario <= 15) {
        baremosA = baremosEdad12a13A;
        baremosE = baremosEdad12a13E;
        baremosAE = baremosEdad12a13AE;
        baremosICI = baremosEdad12a13ICI;
      } else if (edadUsuario >= 16 && edadUsuario <= 18) {
        baremosA = baremosEdad16a18A;
        baremosE = baremosEdad16a18E;
        baremosAE = baremosEdad16a18AE;
        baremosICI = baremosEdad16a18ICI;
      }
    } else {
      // Si la combinación de edad y grado es válida, asignamos los baremos
      const baremosDict = {
        // Para 6 años
        '6_1': [baremosEdad6a7A, baremosEdad6a7E, baremosEdad6a7AE, baremosEdad6a7ICI],
        '7_1': [baremosEdad6a7A, baremosEdad6a7E, baremosEdad6a7AE, baremosEdad6a7ICI],
  
        // Para 7 años
        '7_2': [baremosEdad7a8A, baremosEdad7a8E, baremosEdad7a8AE, baremosEdad7a8ICI],
        '8_2': [baremosEdad7a8A, baremosEdad7a8E, baremosEdad7a8AE, baremosEdad7a8ICI],
  
        // Para 8 años
        '8_3': [baremosEdad8a9A, baremosEdad8a9E, baremosEdad8a9AE, baremosEdad8a9ICI],
        '9_3': [baremosEdad8a9A, baremosEdad8a9E, baremosEdad8a9AE, baremosEdad8a9ICI],
  
        // Para 9 años
        '9_4': [baremosEdad9a10A, baremosEdad9a10E, baremosEdad9a10AE, baremosEdad9a10ICI],
        '10_4': [baremosEdad9a10A, baremosEdad9a10E, baremosEdad9a10AE, baremosEdad9a10ICI],
  
        // Para 10 años
        '10_5': [baremosEdad10a11A, baremosEdad10a11E, baremosEdad10a11AE, baremosEdad10a11ICI],
        '11_5': [baremosEdad10a11A, baremosEdad10a11E, baremosEdad10a11AE, baremosEdad10a11ICI],
  
        // Para 11 años
        '11_6': [baremosEdad11a12A, baremosEdad11a12E, baremosEdad11a12AE, baremosEdad11a12ICI],
        '12_6': [baremosEdad11a12A, baremosEdad11a12E, baremosEdad11a12AE, baremosEdad11a12ICI],
  
        // Para 12 años
        '12_1': [baremosEdad12a13A, baremosEdad12a13E, baremosEdad12a13AE, baremosEdad12a13ICI],
        '13_1': [baremosEdad12a13A, baremosEdad12a13E, baremosEdad12a13AE, baremosEdad12a13ICI],
  
        // Para 13 años
        '13_2': [baremosEdad13a14A, baremosEdad13a14E, baremosEdad13a14AE, baremosEdad13a14ICI],
        '14_2': [baremosEdad13a14A, baremosEdad13a14E, baremosEdad13a14AE, baremosEdad13a14ICI],
  
        // Para 14 años
        '14_3': [baremosEdad14a15A, baremosEdad14a15E, baremosEdad14a15AE, baremosEdad14a15ICI],
        '15_3': [baremosEdad14a15A, baremosEdad14a15E, baremosEdad14a15AE, baremosEdad14a15ICI],
  
        // Para 15 años
        '15_1': [baremosEdad15a16A, baremosEdad15a16E, baremosEdad15a16AE, baremosEdad15a16ICI],
        '16_1': [baremosEdad15a16A, baremosEdad15a16E, baremosEdad15a16AE, baremosEdad15a16ICI],
  
        // Para 16 años
        '16_2': [baremosEdad16a18A, baremosEdad16a18E, baremosEdad16a18AE, baremosEdad16a18ICI],
        '17_2': [baremosEdad16a18A, baremosEdad16a18E, baremosEdad16a18AE, baremosEdad16a18ICI],
  
        // Para 17 años
        '17_3': [baremosEdad16a18A, baremosEdad16a18E, baremosEdad16a18AE, baremosEdad16a18ICI],
        '18_3': [baremosEdad16a18A, baremosEdad16a18E, baremosEdad16a18AE, baremosEdad16a18ICI],
  
        // Para 18 años
        '17_4': [baremosEdad16a18A, baremosEdad16a18E, baremosEdad16a18AE, baremosEdad16a18ICI],
        '18_4': [baremosEdad16a18A, baremosEdad16a18E, baremosEdad16a18AE, baremosEdad16a18ICI]
      };
  
      const key = `${edadUsuario}_${gradoUsuario}`;
      if (baremosDict[key]) {
        [baremosA, baremosE, baremosAE, baremosICI] = baremosDict[key];
      } else {
        if (edadUsuario >= 6 && edadUsuario <= 11) {
          baremosA = baremosEdad6a7A;
          baremosE = baremosEdad6a7E;
          baremosAE = baremosEdad6a7AE;
          baremosICI = baremosEdad6a7ICI;
        } else if (edadUsuario >= 12 && edadUsuario <= 15) {
          baremosA = baremosEdad12a13A;
          baremosE = baremosEdad12a13E;
          baremosAE = baremosEdad12a13AE;
          baremosICI = baremosEdad12a13ICI;
        } else if (edadUsuario >= 16 && edadUsuario <= 18) {
          baremosA = baremosEdad16a18A;
          baremosE = baremosEdad16a18E;
          baremosAE = baremosEdad16a18AE;
          baremosICI = baremosEdad16a18ICI;
        }
      }
    }
  
    // Evaluamos los resultados en base a los baremos asignados
    const baremoA = baremosA.find(b => A >= b.min && A <= b.max);
    eneatipoA = baremoA ? baremoA.eneatipo || eneatipoA : eneatipoA;
  
    const baremoE = baremosE.find(b => E >= b.min && E <= b.max);
    eneatipoE = baremoE ? baremoE.eneatipo || eneatipoE : eneatipoE;
  
    const baremoAE = baremosAE.find(b => AE >= b.min && AE <= b.max);
    eneatipoAE = baremoAE ? baremoAE.eneatipo || eneatipoAE : eneatipoAE;
  
    const baremoICI = baremosICI.find(b => ICI >= b.min && ICI <= b.max);
    eneatipoICI = baremoICI ? baremoICI.eneatipo || eneatipoICI : eneatipoICI;
  }
    
    // Baremo para aciertos (A) para edades de 6 a 7
    const baremosEdad6a7A = [
    { min: 35, max: 60, eneatipo: 9 },
    { min: 34, max: 34, eneatipo: 9 },
    { min: 33, max: 33, eneatipo: 9 },
    { min: 32, max: 32, eneatipo: 8 },
    { min: 29, max: 31, eneatipo: 8 },
    { min: 27, max: 28, eneatipo: 8 },
    { min: 26, max: 26, eneatipo: 7 },
    { min: 24, max: 25, eneatipo: 7 },
    { min: 22, max: 23, eneatipo: 6 },
    { min: 18, max: 21, eneatipo: 5 },
    { min: 17, max: 17, eneatipo: 4 },
    { min: 15, max: 16, eneatipo: 4 },
    { min: 14, max: 14, eneatipo: 4 },
    { min: 13, max: 13, eneatipo: 3 },
    { min: 12, max: 12, eneatipo: 3 },
    { min: 9,  max: 11, eneatipo: 2 },
    { min: 8,  max: 8,  eneatipo: 1 },
    { min: 7,  max: 7,  eneatipo: 1 },
    { min: 4,  max: 6,  eneatipo: 1 },
    { min: 0,  max: 3,  eneatipo: 1 }
  ];
  
  // Baremo para errores (E) para edades de 6 a 7
  const baremosEdad6a7E = [
    { min: 13, max: 60, eneatipo: 9 },
    { min: 10, max: 12, eneatipo: 9 },
    { min: 8,  max: 9,  eneatipo: 9 },
    { min: 7,  max: 7,  eneatipo: 8 },
    { min: 5,  max: 6,  eneatipo: 8 },
    { min: 4,  max: 4,  eneatipo: 8 },
    { min: 3,  max: 3,  eneatipo: 7 },
    { min: 2,  max: 2,  eneatipo: 7 },
    { min: 1,  max: 1,  eneatipo: 5 },
    { min: 0,  max: 0,  eneatipo: 4 },
  ];
  
  // Baremo para aciertos netos (AE) para edades de 6 a 7
  const baremosEdad6a7AE = [
    { min: 34, max: 60, eneatipo: 9 },
    { min: 33, max: 33, eneatipo: 9 },
    { min: 31, max: 32, eneatipo: 9 },
    { min: 28, max: 30, eneatipo: 8 },
    { min: 25, max: 27, eneatipo: 8 },
    { min: 24, max: 24, eneatipo: 7 },
    { min: 23, max: 23, eneatipo: 7 },
    { min: 22, max: 22, eneatipo: 6 },
    { min: 21, max: 21, eneatipo: 6 },
    { min: 20, max: 20, eneatipo: 6 },
    { min: 19, max: 19, eneatipo: 5 },
    { min: 18, max: 18, eneatipo: 5 },
    { min: 17, max: 17, eneatipo: 5 },
    { min: 15, max: 16, eneatipo: 4 },
    { min: 14, max: 14, eneatipo: 4 },
    { min: 13, max: 13, eneatipo: 4 },
    { min: 12, max: 12, eneatipo: 4 },
    { min: 10, max: 11, eneatipo: 3 },
    { min: 8,  max: 9,  eneatipo: 3 },
    { min: 5,  max: 7,  eneatipo: 2 },
    { min: 4,  max: 4,  eneatipo: 2 },
    { min: 3,  max: 3,  eneatipo: 1 },
    { min: -4, max: 2,  eneatipo: 1 },
    { min: -60, max: -5, eneatipo: 1 }
  ];
  
  // Baremo para ICI para edades de 6 a 7
  const baremosEdad6a7ICI = [
    { min: 94, max: 100, eneatipo: 6 },
    { min: 92, max: 93, eneatipo: 6 },
    { min: 90, max: 91, eneatipo: 5 },
    { min: 89, max: 89, eneatipo: 5 },
    { min: 88, max: 88, eneatipo: 5 },
    { min: 85, max: 87, eneatipo: 5 },
    { min: 82, max: 84, eneatipo: 4 },
    { min: 80, max: 81, eneatipo: 4 },
    { min: 75, max: 79, eneatipo: 4 },
    { min: 71, max: 74, eneatipo: 4 },
    { min: 64, max: 70, eneatipo: 3 },
    { min: 57, max: 63, eneatipo: 3 },
    { min: 29, max: 56, eneatipo: 2 },
    { min: 27, max: 28, eneatipo: 2 },
    { min: 23, max: 26, eneatipo: 1 },
    { min: 19, max: 22, eneatipo: 1 },
    { min: -15, max: 18, eneatipo: 1 },
    { min: -100, max: 16, eneatipo: 1 }
  ];

  // 7 a 8
const baremosEdad7a8A = [
    { min: 41, max: 60, eneatipo: 9 },
    { min: 38, max: 40, eneatipo: 9 },
    { min: 36, max: 37, eneatipo: 8 },
    { min: 35, max: 35, eneatipo: 8 },
    { min: 32, max: 34, eneatipo: 8 },
    { min: 29, max: 31, eneatipo: 8 },
    { min: 27, max: 28, eneatipo: 7 },
    { min: 26, max: 26, eneatipo: 7 },
    { min: 25, max: 25, eneatipo: 6 },
    { min: 24, max: 24, eneatipo: 6 },
    { min: 23, max: 23, eneatipo: 5 },
    { min: 22, max: 22, eneatipo: 5 },
    { min: 21, max: 21, eneatipo: 5 },
    { min: 20, max: 20, eneatipo: 5 },
    { min: 18, max: 19, eneatipo: 4 },
    { min: 16, max: 17, eneatipo: 4 },
    { min: 15, max: 15, eneatipo: 3 },
    { min: 13, max: 14, eneatipo: 3 },
    { min: 11, max: 12, eneatipo: 2 },
    { min: 10, max: 10, eneatipo: 2 },
    { min: 9, max: 9, eneatipo: 1 },
    { min: 7, max: 8, eneatipo: 1 },
    { min: 0, max: 6, eneatipo: 1 }
];

const baremosEdad7a8E = [
    { min: 12, max: 60, eneatipo: 9 },
    { min: 8, max: 11, eneatipo: 9 },
    { min: 7, max: 7, eneatipo: 9 },
    { min: 6, max: 6, eneatipo: 8 },
    { min: 4, max: 5, eneatipo: 8 },
    { min: 3, max: 3, eneatipo: 8 },
    { min: 2, max: 2, eneatipo: 7 },
    { min: 1, max: 1, eneatipo: 6 },
    { min: 0, max: 0, eneatipo: 4 }
];

const baremosEdad7a8AE = [
    { min: 39, max: 60, eneatipo: 9 },
    { min: 37, max: 38, eneatipo: 9 },
    { min: 35, max: 36, eneatipo: 8 },
    { min: 34, max: 34, eneatipo: 8 },
    { min: 30, max: 33, eneatipo: 8 },
    { min: 28, max: 29, eneatipo: 8 },
    { min: 26, max: 27, eneatipo: 7 },
    { min: 25, max: 25, eneatipo: 7 },
    { min: 24, max: 24, eneatipo: 6 },
    { min: 23, max: 23, eneatipo: 6 },
    { min: 22, max: 22, eneatipo: 6 },
    { min: 21, max: 21, eneatipo: 5 },
    { min: 20, max: 20, eneatipo: 5 },
    { min: 19, max: 19, eneatipo: 5 },
    { min: 18, max: 18, eneatipo: 5 },
    { min: 17, max: 17, eneatipo: 4 },
    { min: 16, max: 16, eneatipo: 4 },
    { min: 15, max: 15, eneatipo: 4 },
    { min: 14, max: 14, eneatipo: 4 },
    { min: 13, max: 13, eneatipo: 3 },
    { min: 11, max: 12, eneatipo: 3 },
    { min: 7, max: 10, eneatipo: 2 },
    { min: 6, max: 6, eneatipo: 1 },
    { min: 4, max: 5, eneatipo: 1 },
    { min: 0, max: 3, eneatipo: 1 },
    { min: -60, max: -1, eneatipo: 1 }
];

const baremosEdad7a8ICI = [
    { min: 94, max: 100, eneatipo: 6 },
    { min: 92, max: 93, eneatipo: 5 },
    { min: 90, max: 91, eneatipo: 5 },
    { min: 89, max: 89, eneatipo: 5 },
    { min: 87, max: 88, eneatipo: 5 },
    { min: 85, max: 86, eneatipo: 4 },
    { min: 82, max: 84, eneatipo: 4 },
    { min: 80, max: 81, eneatipo: 4 },
    { min: 76, max: 79, eneatipo: 4 },
    { min: 71, max: 75, eneatipo: 3 },
    { min: 65, max: 70, eneatipo: 3 },
    { min: 50, max: 64, eneatipo: 2 },
    { min: 45, max: 49, eneatipo: 2 },
    { min: 33, max: 44, eneatipo: 1 },
    { min: 20, max: 32, eneatipo: 1 },
    { min: 0, max: 19, eneatipo: 1 },
    { min: -100, max: -1, eneatipo: 1 }
];

// 8 a 9 años
const baremosEdad8a9A = [
    { min: 47, max: 60, eneatipo: 9 },
    { min: 45, max: 46, eneatipo: 9 },
    { min: 44, max: 44, eneatipo: 9 },
    { min: 43, max: 43, eneatipo: 8 },
    { min: 40, max: 42, eneatipo: 8 },
    { min: 37, max: 39, eneatipo: 8 },
    { min: 35, max: 36, eneatipo: 7 },
    { min: 34, max: 34, eneatipo: 7 },
    { min: 33, max: 33, eneatipo: 6 },
    { min: 32, max: 32, eneatipo: 6 },
    { min: 31, max: 31, eneatipo: 6 },
    { min: 30, max: 30, eneatipo: 5 },
    { min: 29, max: 29, eneatipo: 5 },
    { min: 28, max: 28, eneatipo: 5 },
    { min: 27, max: 27, eneatipo: 5 },
    { min: 26, max: 26, eneatipo: 4 },
    { min: 25, max: 25, eneatipo: 4 },
    { min: 24, max: 24, eneatipo: 4 },
    { min: 23, max: 23, eneatipo: 4 },
    { min: 21, max: 22, eneatipo: 3 },
    { min: 19, max: 20, eneatipo: 3 },
    { min: 17, max: 18, eneatipo: 2 },
    { min: 16, max: 16, eneatipo: 2 },
    { min: 15, max: 15, eneatipo: 1 },
    { min: 13, max: 14, eneatipo: 1 },
    { min: 0, max: 12, eneatipo: 1 }
];

const baremosEdad8a9E = [
    { min: 11, max: 60, eneatipo: 9 },
    { min: 9, max: 10, eneatipo: 9 },
    { min: 8, max: 8, eneatipo: 9 },
    { min: 7, max: 7, eneatipo: 8 },
    { min: 6, max: 6, eneatipo: 8 },
    { min: 5, max: 5, eneatipo: 8 },
    { min: 4, max: 4, eneatipo: 7 },
    { min: 3, max: 3, eneatipo: 6 },
    { min: 2, max: 2, eneatipo: 4 },
    { min: 1, max: 1, eneatipo: 4 },
    { min: 0, max: 0, eneatipo: 2 }
];

const baremosEdad8a9AE = [
    { min: 44, max: 60, eneatipo: 9 },
    { min: 42, max: 43, eneatipo: 9 },
    { min: 40, max: 41, eneatipo: 9 },
    { min: 38, max: 39, eneatipo: 8 },
    { min: 36, max: 37, eneatipo: 8 },
    { min: 34, max: 35, eneatipo: 8 },
    { min: 32, max: 33, eneatipo: 7 },
    { min: 30, max: 31, eneatipo: 7 },
    { min: 28, max: 29, eneatipo: 6 },
    { min: 27, max: 27, eneatipo: 5 },
    { min: 25, max: 26, eneatipo: 5 },
    { min: 23, max: 24, eneatipo: 4 },
    { min: 21, max: 22, eneatipo: 3 },
    { min: 19, max: 20, eneatipo: 2 },
    { min: 17, max: 18, eneatipo: 1 },
    { min: 16, max: 16, eneatipo: 1 },
    { min: 0, max: 15, eneatipo: 1 }
];

const baremosEdad8a9ICI = [
    { min: 94, max: 100, eneatipo: 6 },
    { min: 92, max: 93, eneatipo: 5 },
    { min: 90, max: 91, eneatipo: 5 },
    { min: 89, max: 89, eneatipo: 5 },
    { min: 87, max: 88, eneatipo: 5 },
    { min: 85, max: 86, eneatipo: 4 },
    { min: 82, max: 84, eneatipo: 4 },
    { min: 80, max: 81, eneatipo: 4 },
    { min: 76, max: 79, eneatipo: 4 },
    { min: 71, max: 75, eneatipo: 3 },
    { min: 65, max: 70, eneatipo: 3 },
    { min: 50, max: 64, eneatipo: 2 },
    { min: 45, max: 49, eneatipo: 2 },
    { min: 33, max: 44, eneatipo: 1 },
    { min: 20, max: 32, eneatipo: 1 },
    { min: 0, max: 19, eneatipo: 1 },
    { min: -100, max: -1, eneatipo: 1 }
];

// 9 a 10 años
const baremosEdad9a10A = [
    { min: 53, max: 60, eneatipo: 9 },
    { min: 51, max: 52, eneatipo: 9 },
    { min: 49, max: 50, eneatipo: 9 },
    { min: 48, max: 48, eneatipo: 8 },
    { min: 44, max: 47, eneatipo: 8 },
    { min: 42, max: 43, eneatipo: 8 },
    { min: 40, max: 41, eneatipo: 7 },
    { min: 39, max: 39, eneatipo: 7 },
    { min: 37, max: 38, eneatipo: 6 },
    { min: 36, max: 36, eneatipo: 6 },
    { min: 35, max: 35, eneatipo: 6 },
    { min: 34, max: 34, eneatipo: 5 },
    { min: 32, max: 33, eneatipo: 5 },
    { min: 31, max: 31, eneatipo: 5 },
    { min: 30, max: 30, eneatipo: 4 },
    { min: 29, max: 29, eneatipo: 4 },
    { min: 27, max: 28, eneatipo: 4 },
    { min: 26, max: 26, eneatipo: 4 },
    { min: 25, max: 25, eneatipo: 3 },
    { min: 23, max: 24, eneatipo: 3 },
    { min: 20, max: 22, eneatipo: 2 },
    { min: 19, max: 19, eneatipo: 2 },
    { min: 18, max: 18, eneatipo: 1 },
    { min: 17, max: 17, eneatipo: 1 },
    { min: 16, max: 16, eneatipo: 1 },
    { min: 0, max: 15, eneatipo: 1 }
  ];
  
  const baremosEdad9a10E = [
    { min: 10, max: 60, eneatipo: 9 },
    { min: 7, max: 9, eneatipo: 9 },
    { min: 5, max: 6, eneatipo: 9 },
    { min: 3, max: 4, eneatipo: 8 },
    { min: 2, max: 2, eneatipo: 8 },
    { min: 1, max: 1, eneatipo: 6 },
    { min: 0, max: 0, eneatipo: 5 }
  ];
  
  const baremosEdad9a10AE = [
    { min: 52, max: 60, eneatipo: 9 },
    { min: 50, max: 51, eneatipo: 9 },
    { min: 48, max: 49, eneatipo: 9 },
    { min: 47, max: 47, eneatipo: 8 },
    { min: 41, max: 46, eneatipo: 8 },
    { min: 39, max: 40, eneatipo: 7 },
    { min: 38, max: 38, eneatipo: 7 },
    { min: 36, max: 37, eneatipo: 6 },
    { min: 34, max: 35, eneatipo: 6 },
    { min: 32, max: 33, eneatipo: 5 },
    { min: 31, max: 31, eneatipo: 5 },
    { min: 30, max: 30, eneatipo: 5 },
    { min: 29, max: 29, eneatipo: 4 },
    { min: 28, max: 28, eneatipo: 4 },
    { min: 26, max: 27, eneatipo: 4 },
    { min: 25, max: 25, eneatipo: 4 },
    { min: 23, max: 24, eneatipo: 3 },
    { min: 21, max: 22, eneatipo: 3 },
    { min: 18, max: 20, eneatipo: 2 },
    { min: 17, max: 17, eneatipo: 2 },
    { min: 16, max: 16, eneatipo: 1 },
    { min: 14, max: 15, eneatipo: 1 },
    { min: 11, max: 13, eneatipo: 1 },
    { min: -60, max: 10, eneatipo: 1 }
  ];
  
  const baremosEdad9a10ICI = [
    { min: 96, max: 100, eneatipo: 5 },
    { min: 95, max: 95, eneatipo: 5 },
    { min: 94, max: 94, eneatipo: 4 },
    { min: 93, max: 93, eneatipo: 4 },
    { min: 92, max: 92, eneatipo: 4 },
    { min: 90, max: 91, eneatipo: 4 },
    { min: 87, max: 89, eneatipo: 3 },
    { min: 84, max: 86, eneatipo: 3 },
    { min: 76, max: 83, eneatipo: 2 },
    { min: 74, max: 75, eneatipo: 2 },
    { min: 69, max: 73, eneatipo: 1 },
    { min: 60, max: 68, eneatipo: 1 },
    { min: 43, max: 59, eneatipo: 1 },
    { min: -100, max: 42, eneatipo: 1 }
  ];

  // 10 a 11
  const baremosEdad10a11A = [
    { min: 58, max: 60, eneatipo: 9 },
    { min: 56, max: 57, eneatipo: 9 },
    { min: 54, max: 55, eneatipo: 9 },
    { min: 51, max: 53, eneatipo: 8 },
    { min: 47, max: 50, eneatipo: 8 },
    { min: 45, max: 46, eneatipo: 8 },
    { min: 42, max: 44, eneatipo: 7 },
    { min: 40, max: 41, eneatipo: 7 },
    { min: 38, max: 39, eneatipo: 6 },
    { min: 37, max: 37, eneatipo: 6 },
    { min: 36, max: 36, eneatipo: 5 },
    { min: 35, max: 35, eneatipo: 5 },
    { min: 33, max: 34, eneatipo: 5 },
    { min: 32, max: 32, eneatipo: 5 },
    { min: 30, max: 31, eneatipo: 4 },
    { min: 28, max: 29, eneatipo: 4 },
    { min: 26, max: 27, eneatipo: 3 },
    { min: 21, max: 25, eneatipo: 2 },
    { min: 18, max: 20, eneatipo: 1 },
    { min: 0, max: 17, eneatipo: 1 }
  ];
  
  const baremosEdad10a11E = [
    { min: 10, max: 60, eneatipo: 9 },
    { min: 7, max: 9, eneatipo: 9 },
    { min: 5, max: 6, eneatipo: 8 },
    { min: 3, max: 4, eneatipo: 8 },
    { min: 2, max: 2, eneatipo: 8 },
    { min: 1, max: 1, eneatipo: 6 },
    { min: 0, max: 0, eneatipo: 5 }
  ];
  
  const baremosEdad10a11AE = [
    { min: 56, max: 60, eneatipo: 9 },
    { min: 55, max: 55, eneatipo: 9 },
    { min: 52, max: 54, eneatipo: 9 },
    { min: 50, max: 51, eneatipo: 8 },
    { min: 47, max: 49, eneatipo: 8 },
    { min: 45, max: 46, eneatipo: 7 },
    { min: 43, max: 44, eneatipo: 7 },
    { min: 41, max: 42, eneatipo: 6 },
    { min: 39, max: 40, eneatipo: 6 },
    { min: 38, max: 38, eneatipo: 5 },
    { min: 37, max: 37, eneatipo: 5 },
    { min: 36, max: 36, eneatipo: 5 },
    { min: 35, max: 35, eneatipo: 4 },
    { min: 34, max: 34, eneatipo: 4 },
    { min: 33, max: 33, eneatipo: 4 },
    { min: 31, max: 32, eneatipo: 3 },
    { min: 30, max: 30, eneatipo: 3 },
    { min: 28, max: 29, eneatipo: 2 },
    { min: 27, max: 27, eneatipo: 2 },
    { min: 26, max: 26, eneatipo: 2 },
    { min: 25, max: 25, eneatipo: 1 },
    { min: 24, max: 24, eneatipo: 1 },
    { min: 23, max: 23, eneatipo: 1 }
  ];
  
  const baremosEdad10a11ICI = [
    { min: 96, max: 100, eneatipo: 5 },
    { min: 95, max: 95, eneatipo: 5 },
    { min: 94, max: 94, eneatipo: 4 },
    { min: 93, max: 93, eneatipo: 4 },
    { min: 92, max: 92, eneatipo: 4 },
    { min: 90, max: 91, eneatipo: 4 },
    { min: 87, max: 89, eneatipo: 3 },
    { min: 84, max: 86, eneatipo: 3 },
    { min: 76, max: 83, eneatipo: 2 },
    { min: 74, max: 75, eneatipo: 2 },
    { min: 69, max: 73, eneatipo: 1 },
    { min: 60, max: 68, eneatipo: 1 },
    { min: 43, max: 59, eneatipo: 1 },
    { min: -100, max: 42, eneatipo: 1 }
  ];

  // 11 a 12

const baremosEdad11a12A = [
    { min: 60, max: 60, eneatipo: 9 },
    { min: 59, max: 59, eneatipo: 9 },
    { min: 58, max: 58, eneatipo: 9 },
    { min: 51, max: 57, eneatipo: 8 },
    { min: 46, max: 50, eneatipo: 8 },
    { min: 44, max: 45, eneatipo: 7 },
    { min: 42, max: 43, eneatipo: 7 },
    { min: 41, max: 41, eneatipo: 6 },
    { min: 40, max: 40, eneatipo: 6 },
    { min: 38, max: 39, eneatipo: 6 },
    { min: 36, max: 37, eneatipo: 5 },
    { min: 34, max: 35, eneatipo: 5 },
    { min: 33, max: 33, eneatipo: 5 },
    { min: 32, max: 32, eneatipo: 4 },
    { min: 31, max: 31, eneatipo: 4 },
    { min: 30, max: 30, eneatipo: 4 },
    { min: 28, max: 29, eneatipo: 3 },
    { min: 26, max: 27, eneatipo: 3 },
    { min: 21, max: 25, eneatipo: 2 },
    { min: 18, max: 20, eneatipo: 1 },
    { min: 0, max: 17, eneatipo: 1 }
];

const baremosEdad11a12E = [
    { min: 10, max: 60, eneatipo: 9 },
    { min: 7, max: 9, eneatipo: 9 },
    { min: 5, max: 6, eneatipo: 9 },
    { min: 3, max: 4, eneatipo: 8 },
    { min: 2, max: 2, eneatipo: 8 },
    { min: 1, max: 1, eneatipo: 6 },
    { min: 0, max: 0, eneatipo: 5 }
];

const baremosEdad11a12AE = [
    { min: 60, max: 60, eneatipo: 9 },
    { min: 58, max: 59, eneatipo: 9 },
    { min: 57, max: 57, eneatipo: 9 },
    { min: 50, max: 56, eneatipo: 8 },
    { min: 46, max: 49, eneatipo: 8 },
    { min: 42, max: 45, eneatipo: 7 },
    { min: 41, max: 41, eneatipo: 7 },
    { min: 40, max: 40, eneatipo: 6 },
    { min: 39, max: 39, eneatipo: 6 },
    { min: 37, max: 38, eneatipo: 6 },
    { min: 36, max: 36, eneatipo: 5 },
    { min: 34, max: 35, eneatipo: 5 },
    { min: 32, max: 33, eneatipo: 5 },
    { min: 30, max: 31, eneatipo: 4 },
    { min: 29, max: 29, eneatipo: 4 },
    { min: 28, max: 28, eneatipo: 4 },
    { min: 26, max: 27, eneatipo: 3 },
    { min: 24, max: 25, eneatipo: 3 },
    { min: 20, max: 23, eneatipo: 2 },
    { min: 18, max: 19, eneatipo: 1 },
    { min: 17, max: 17, eneatipo: 1 },
    { min: 15, max: 16, eneatipo: 1 },
    { min: -60, max: 14, eneatipo: 1 }
];

const baremosEdad11a12ICI = [
    { min: 96, max: 100, eneatipo: 5 },
    { min: 95, max: 94, eneatipo: 5 },
    { min: 94, max: 94, eneatipo: 5 },
    { min: 93, max: 93, eneatipo: 4 },
    { min: 92, max: 92, eneatipo: 4 },
    { min: 90, max: 91, eneatipo: 4 },
    { min: 88, max: 89, eneatipo: 3 },
    { min: 84, max: 87, eneatipo: 3 },
    { min: 79, max: 83, eneatipo: 2 },
    { min: 74, max: 78, eneatipo: 2 },
    { min: 69, max: 73, eneatipo: 1 },
    { min: 61, max: 68, eneatipo: 1 },
    { min: 51, max: 60, eneatipo: 1 },
    { min: -100, max: 50, eneatipo: 1 }
];

  // 12 a 13
const baremosEdad12a13A = [
    { min: 60, max: 60, eneatipo: 9 },
    { min: 59, max: 59, eneatipo: 9 },
    { min: 58, max: 58, eneatipo: 8 },
    { min: 56, max: 57, eneatipo: 8 },
    { min: 54, max: 55, eneatipo: 8 },
    { min: 51, max: 53, eneatipo: 7 },
    { min: 49, max: 50, eneatipo: 6 },
    { min: 46, max: 48, eneatipo: 6 },
    { min: 44, max: 45, eneatipo: 5 },
    { min: 43, max: 43, eneatipo: 6 },
    { min: 42, max: 42, eneatipo: 5 },
    { min: 40, max: 41, eneatipo: 5 },
    { min: 38, max: 39, eneatipo: 5 },
    { min: 36, max: 37, eneatipo: 4 },
    { min: 35, max: 35, eneatipo: 4 },
    { min: 34, max: 34, eneatipo: 4 },
    { min: 32, max: 33, eneatipo: 4 },
    { min: 31, max: 31, eneatipo: 3 },
    { min: 29, max: 30, eneatipo: 3 },
    { min: 26, max: 28, eneatipo: 2 },
    { min: 25, max: 25, eneatipo: 2 },
    { min: 23, max: 24, eneatipo: 1 },
    { min: 21, max: 22, eneatipo: 1 },
    { min: 19, max: 20, eneatipo: 1 },
    { min: 0, max: 18, eneatipo: 1 }
];

const baremosEdad12a13E = [
    { min: 10, max: 60, eneatipo: 9 },
    { min: 7, max: 9, eneatipo: 9 },
    { min: 5, max: 6, eneatipo: 9 },
    { min: 3, max: 4, eneatipo: 8 },
    { min: 2, max: 2, eneatipo: 7 },
    { min: 1, max: 1, eneatipo: 6 },
    { min: 0, max: 0, eneatipo: 5 }
];

const baremosEdad12a13AE = [
    { min: 60, max: 60, eneatipo: 9 },
    { min: 58, max: 59, eneatipo: 9 },
    { min: 55, max: 57, eneatipo: 8 },
    { min: 52, max: 54, eneatipo: 8 },
    { min: 50, max: 51, eneatipo: 7 },
    { min: 47, max: 49, eneatipo: 7 },
    { min: 44, max: 46, eneatipo: 6 },
    { min: 42, max: 43, eneatipo: 6 },
    { min: 40, max: 41, eneatipo: 5 },
    { min: 39, max: 39, eneatipo: 5 },
    { min: 38, max: 38, eneatipo: 5 },
    { min: 37, max: 37, eneatipo: 5 },
    { min: 35, max: 36, eneatipo: 4 },
    { min: 34, max: 34, eneatipo: 4 },
    { min: 32, max: 33, eneatipo: 4 },
    { min: 30, max: 31, eneatipo: 4 },
    { min: 29, max: 29, eneatipo: 3 },
    { min: 27, max: 28, eneatipo: 3 },
    { min: 23, max: 26, eneatipo: 2 },
    { min: 22, max: 22, eneatipo: 2 },
    { min: 20, max: 21, eneatipo: 1 },
    { min: 18, max: 19, eneatipo: 1 },
    { min: 15, max: 17, eneatipo: 1 },
    { min: -60, max: 14, eneatipo: 1 }
];

const baremosEdad12a13ICI = [
    { min: 96, max: 100, eneatipo: 5 },
    { min: 95, max: 95, eneatipo: 5 },
    { min: 94, max: 94, eneatipo: 4 },
    { min: 92, max: 93, eneatipo: 4 },
    { min: 91, max: 91, eneatipo: 4 },
    { min: 89, max: 90, eneatipo: 4 },
    { min: 87, max: 88, eneatipo: 3 },
    { min: 84, max: 86, eneatipo: 3 },
    { min: 79, max: 83, eneatipo: 2 },
    { min: 74, max: 78, eneatipo: 2 },
    { min: 70, max: 73, eneatipo: 1 },
    { min: 68, max: 69, eneatipo: 1 },
    { min: 53, max: 67, eneatipo: 1 },
    { min: -100, max: 52, eneatipo: 1 }
];

// 13 a 14
const baremosEdad13a14A = [
    { min: 59, max: 60, eneatipo: 9 },
    { min: 58, max: 58, eneatipo: 8 },
    { min: 56, max: 57, eneatipo: 8 },
    { min: 53, max: 55, eneatipo: 8 },
    { min: 49, max: 52, eneatipo: 7 },
    { min: 48, max: 48, eneatipo: 7 },
    { min: 46, max: 47, eneatipo: 6 },
    { min: 44, max: 45, eneatipo: 6 },
    { min: 43, max: 43, eneatipo: 6 },
    { min: 42, max: 42, eneatipo: 5 },
    { min: 41, max: 41, eneatipo: 5 },
    { min: 39, max: 40, eneatipo: 5 },
    { min: 38, max: 38, eneatipo: 5 },
    { min: 37, max: 37, eneatipo: 4 },
    { min: 36, max: 36, eneatipo: 4 },
    { min: 34, max: 35, eneatipo: 4 },
    { min: 33, max: 33, eneatipo: 4 },
    { min: 31, max: 32, eneatipo: 3 },
    { min: 28, max: 30, eneatipo: 3 },
    { min: 24, max: 27, eneatipo: 2 },
    { min: 23, max: 23, eneatipo: 2 },
    { min: 22, max: 22, eneatipo: 1 },
    { min: 21, max: 21, eneatipo: 1 },
    { min: 19, max: 20, eneatipo: 1 },
    { min: 0, max: 18, eneatipo: 1 }
];

const baremosEdad13a14E = [
    { min: 7, max: 60, eneatipo: 9 },
    { min: 6, max: 6, eneatipo: 9 },
    { min: 5, max: 5, eneatipo: 9 },
    { min: 3, max: 4, eneatipo: 8 },
    { min: 2, max: 2, eneatipo: 8 },
    { min: 1, max: 1, eneatipo: 6 },
    { min: 0, max: 0, eneatipo: 5 }
];

const baremosEdad13a14AE = [
    { min: 58, max: 60, eneatipo: 9 },
    { min: 56, max: 57, eneatipo: 8 },
    { min: 52, max: 55, eneatipo: 8 },
    { min: 48, max: 51, eneatipo: 7 },
    { min: 46, max: 47, eneatipo: 7 },
    { min: 45, max: 45, eneatipo: 6 },
    { min: 43, max: 44, eneatipo: 6 },
    { min: 42, max: 42, eneatipo: 6 },
    { min: 40, max: 41, eneatipo: 5 },
    { min: 38, max: 39, eneatipo: 5 },
    { min: 37, max: 37, eneatipo: 5 },
    { min: 36, max: 36, eneatipo: 4 },
    { min: 34, max: 35, eneatipo: 4 },
    { min: 33, max: 33, eneatipo: 4 },
    { min: 32, max: 32, eneatipo: 4 },
    { min: 30, max: 31, eneatipo: 3 },
    { min: 27, max: 29, eneatipo: 3 },
    { min: 22, max: 26, eneatipo: 2 },
    { min: 20, max: 21, eneatipo: 1 },
    { min: 18, max: 19, eneatipo: 1 },
    { min: 16, max: 17, eneatipo: 1 },
    { min: -60, max: 15, eneatipo: 1 }
];

const baremosEdad13a14ICI = [
    { min: 97, max: 100, eneatipo: 5 },
    { min: 96, max: 96, eneatipo: 5 },
    { min: 95, max: 95, eneatipo: 4 },
    { min: 94, max: 94, eneatipo: 4 },
    { min: 92, max: 93, eneatipo: 4 },
    { min: 91, max: 91, eneatipo: 4 },
    { min: 89, max: 90, eneatipo: 3 },
    { min: 84, max: 88, eneatipo: 3 },
    { min: 76, max: 83, eneatipo: 2 },
    { min: 75, max: 75, eneatipo: 2 },
    { min: 72, max: 74, eneatipo: 1 },
    { min: 70, max: 71, eneatipo: 1 },
    { min: 67, max: 69, eneatipo: 1 },
    { min: -100, max: 66, eneatipo: 1 }
];

// 14 a 15
const baremosEdad14a15A = [
    { min: 60, max: 60, eneatipo: 9 },
    { min: 59, max: 59, eneatipo: 9 },
    { min: 58, max: 58, eneatipo: 8 },
    { min: 56, max: 57, eneatipo: 8 },
    { min: 54, max: 55, eneatipo: 8 },
    { min: 51, max: 53, eneatipo: 7 },
    { min: 47, max: 50, eneatipo: 7 },
    { min: 46, max: 46, eneatipo: 6 },
    { min: 44, max: 45, eneatipo: 6 },
    { min: 43, max: 43, eneatipo: 6 },
    { min: 42, max: 42, eneatipo: 5 },
    { min: 41, max: 41, eneatipo: 5 },
    { min: 40, max: 40, eneatipo: 5 },
    { min: 38, max: 39, eneatipo: 5 },
    { min: 37, max: 37, eneatipo: 4 },
    { min: 35, max: 36, eneatipo: 4 },
    { min: 34, max: 34, eneatipo: 4 },
    { min: 33, max: 33, eneatipo: 4 },
    { min: 31, max: 32, eneatipo: 3 },
    { min: 28, max: 30, eneatipo: 3 },
    { min: 25, max: 27, eneatipo: 2 },
    { min: 24, max: 24, eneatipo: 1 },
    { min: 21, max: 23, eneatipo: 1 },
    { min: 19, max: 20, eneatipo: 1 },
    { min: 0, max: 18, eneatipo: 1 }
];

const baremosEdad14a15E = [
    { min: 7, max: 60, eneatipo: 9 },
    { min: 6, max: 6, eneatipo: 9 },
    { min: 4, max: 5, eneatipo: 9 },
    { min: 3, max: 3, eneatipo: 8 },
    { min: 2, max: 2, eneatipo: 8 },
    { min: 1, max: 1, eneatipo: 7 },
    { min: 0, max: 0, eneatipo: 5 }
];

const baremosEdad14a15AE = [
    { min: 60, max: 60, eneatipo: 9 },
    { min: 58, max: 59, eneatipo: 9 },
    { min: 55, max: 57, eneatipo: 8 },
    { min: 53, max: 54, eneatipo: 8 },
    { min: 50, max: 52, eneatipo: 7 },
    { min: 47, max: 49, eneatipo: 7 },
    { min: 45, max: 46, eneatipo: 6 },
    { min: 43, max: 44, eneatipo: 6 },
    { min: 42, max: 42, eneatipo: 5 },
    { min: 41, max: 41, eneatipo: 5 },
    { min: 40, max: 40, eneatipo: 5 },
    { min: 37, max: 38, eneatipo: 5 },
    { min: 36, max: 36, eneatipo: 4 },
    { min: 34, max: 35, eneatipo: 4 },
    { min: 33, max: 33, eneatipo: 4 },
    { min: 32, max: 32, eneatipo: 4 },
    { min: 30, max: 31, eneatipo: 3 },
    { min: 27, max: 29, eneatipo: 3 },
    { min: 25, max: 26, eneatipo: 2 },
    { min: 24, max: 24, eneatipo: 2 },
    { min: 21, max: 23, eneatipo: 1 },
    { min: 19, max: 20, eneatipo: 1 },
    { min: 18, max: 18, eneatipo: 1 },
    { min: -60, max: 17, eneatipo: 1 }
];

const baremosEdad14a15ICI = [
    { min: 97, max: 100, eneatipo: 5 },
    { min: 96, max: 96, eneatipo: 4 },
    { min: 95, max: 95, eneatipo: 4 },
    { min: 93, max: 94, eneatipo: 4 },
    { min: 91, max: 92, eneatipo: 3 },
    { min: 88, max: 90, eneatipo: 3 },
    { min: 81, max: 87, eneatipo: 2 },
    { min: 80, max: 80, eneatipo: 2 },
    { min: 76, max: 79, eneatipo: 1 },
    { min: 69, max: 74, eneatipo: 1 },
    { min: -100, max: 68, eneatipo: 1 }
];

// 15 a 16
const baremosEdad15a16A = [
    { min: 60, max: 60, eneatipo: 9 },
    { min: 59, max: 59, eneatipo: 8 },
    { min: 58, max: 58, eneatipo: 8 },
    { min: 56, max: 57, eneatipo: 7 },
    { min: 55, max: 55, eneatipo: 8 },
    { min: 53, max: 54, eneatipo: 7 },
    { min: 52, max: 52, eneatipo: 7 },
    { min: 50, max: 51, eneatipo: 6 },
    { min: 48, max: 49, eneatipo: 6 },
    { min: 47, max: 47, eneatipo: 5 },
    { min: 46, max: 46, eneatipo: 5 },
    { min: 44, max: 45, eneatipo: 5 },
    { min: 43, max: 43, eneatipo: 5 },
    { min: 42, max: 42, eneatipo: 4 },
    { min: 41, max: 41, eneatipo: 4 },
    { min: 40, max: 40, eneatipo: 4 },
    { min: 37, max: 39, eneatipo: 4 },
    { min: 36, max: 36, eneatipo: 3 },
    { min: 33, max: 35, eneatipo: 3 },
    { min: 30, max: 32, eneatipo: 2 },
    { min: 28, max: 29, eneatipo: 2 },
    { min: 27, max: 27, eneatipo: 2 },
    { min: 24, max: 26, eneatipo: 1 },
    { min: 0, max: 23, eneatipo: 1 }
];

const baremosEdad15a16E = [
    { min: 6, max: 60, eneatipo: 9 },
    { min: 5, max: 5, eneatipo: 9 },
    { min: 4, max: 4, eneatipo: 9 },
    { min: 3, max: 3, eneatipo: 8 },
    { min: 2, max: 2, eneatipo: 8 },
    { min: 1, max: 1, eneatipo: 7 },
    { min: 0, max: 0, eneatipo: 5 }
];

const baremosEdad15a16AE = [
    { min: 60, max: 60, eneatipo: 9 },
    { min: 59, max: 59, eneatipo: 8 },
    { min: 56, max: 57, eneatipo: 8 },
    { min: 52, max: 54, eneatipo: 7 },
    { min: 49, max: 51, eneatipo: 6 },
    { min: 48, max: 48, eneatipo: 6 },
    { min: 46, max: 47, eneatipo: 5 },
    { min: 44, max: 45, eneatipo: 5 },
    { min: 42, max: 43, eneatipo: 5 },
    { min: 40, max: 41, eneatipo: 4 },
    { min: 39, max: 39, eneatipo: 4 },
    { min: 37, max: 38, eneatipo: 4 },
    { min: 35, max: 36, eneatipo: 3 },
    { min: 32, max: 34, eneatipo: 3 },
    { min: 28, max: 31, eneatipo: 2 },
    { min: 27, max: 27, eneatipo: 2 },
    { min: 26, max: 26, eneatipo: 1 },
    { min: 24, max: 25, eneatipo: 1 },
    { min: 22, max: 23, eneatipo: 1 },
    { min: -60, max: 22, eneatipo: 1 }
];

const baremosEdad15a16ICI = [
    { min: 97, max: 100, eneatipo: 5 },
    { min: 96, max: 96, eneatipo: 4 },
    { min: 95, max: 95, eneatipo: 4 },
    { min: 93, max: 94, eneatipo: 4 },
    { min: 92, max: 92, eneatipo: 3 },
    { min: 89, max: 91, eneatipo: 3 },
    { min: 86, max: 88, eneatipo: 2 },
    { min: 83, max: 85, eneatipo: 2 },
    { min: 81, max: 82, eneatipo: 1 },
    { min: 78, max: 80, eneatipo: 1 },
    { min: 72, max: 77, eneatipo: 1 },
    { min: -100, max: 71, eneatipo: 1 }
];

// 16 a 18
const baremosEdad16a18A = [
    { min: 60, max: 60, eneatipo: 9 },
    { min: 59, max: 59, eneatipo: 8 },
    { min: 58, max: 58, eneatipo: 8 },
    { min: 57, max: 57, eneatipo: 7 },
    { min: 56, max: 56, eneatipo: 7 },
    { min: 55, max: 55, eneatipo: 6 },
    { min: 54, max: 54, eneatipo: 6 },
    { min: 53, max: 53, eneatipo: 6 },
    { min: 52, max: 52, eneatipo: 6 },
    { min: 51, max: 51, eneatipo: 5 },
    { min: 50, max: 50, eneatipo: 5 },
    { min: 49, max: 49, eneatipo: 5 },
    { min: 48, max: 48, eneatipo: 5 },
    { min: 47, max: 47, eneatipo: 5 },
    { min: 46, max: 46, eneatipo: 5 },
    { min: 45, max: 45, eneatipo: 4 },
    { min: 44, max: 44, eneatipo: 4 },
    { min: 43, max: 43, eneatipo: 4 },
    { min: 42, max: 42, eneatipo: 4 },
    { min: 41, max: 41, eneatipo: 3 },
    { min: 40, max: 40, eneatipo: 3 },
    { min: 39, max: 39, eneatipo: 3 },
    { min: 38, max: 38, eneatipo: 3 },
    { min: 37, max: 37, eneatipo: 2 },
    { min: 36, max: 36, eneatipo: 2 },
    { min: 35, max: 35, eneatipo: 2 },
    { min: 34, max: 34, eneatipo: 2 },
    { min: 33, max: 33, eneatipo: 1 },
    { min: 32, max: 32, eneatipo: 1 },
    { min: 31, max: 31, eneatipo: 1 },
    { min: 30, max: 30, eneatipo: 1 },
    { min: 29, max: 29, eneatipo: 1 },
    { min: 0, max: 28, eneatipo: 1 }
];

const baremosEdad16a18E = [
    { min: 5, max: 60, eneatipo: 9 },
    { min: 4, max: 4, eneatipo: 9 },
    { min: 3, max: 3, eneatipo: 8 },
    { min: 2, max: 2, eneatipo: 8 },
    { min: 1, max: 1, eneatipo: 7 },
    { min: 0, max: 0, eneatipo: 5 }
];

const baremosEdad16a18AE = [
    { min: 60, max: 60, eneatipo: 9 },
    { min: 58, max: 59, eneatipo: 8 },
    { min: 56, max: 57, eneatipo: 7 },
    { min: 55, max: 55, eneatipo: 7 },
    { min: 54, max: 54, eneatipo: 6 },
    { min: 53, max: 53, eneatipo: 6 },
    { min: 52, max: 52, eneatipo: 6 },
    { min: 50, max: 51, eneatipo: 5 },
    { min: 48, max: 49, eneatipo: 5 },
    { min: 46, max: 47, eneatipo: 5 },
    { min: 44, max: 45, eneatipo: 4 },
    { min: 43, max: 43, eneatipo: 4 },
    { min: 42, max: 42, eneatipo: 4 },
    { min: 41, max: 41, eneatipo: 4 },
    { min: 40, max: 40, eneatipo: 3 },
    { min: 37, max: 39, eneatipo: 3 },
    { min: 34, max: 36, eneatipo: 2 },
    { min: 33, max: 33, eneatipo: 2 },
    { min: 32, max: 32, eneatipo: 1 },
    { min: 30, max: 31, eneatipo: 1 },
    { min: 27, max: 29, eneatipo: 1 },
    { min: -60, max: 26, eneatipo: 1 }
];

const baremosEdad16a18ICI = [
    { min: 97, max: 100, eneatipo: 5 },
    { min: 96, max: 96, eneatipo: 4 },
    { min: 95, max: 95, eneatipo: 4 },
    { min: 94, max: 94, eneatipo: 4 },
    { min: 93, max: 93, eneatipo: 3 },
    { min: 91, max: 92, eneatipo: 3 },
    { min: 87, max: 90, eneatipo: 2 },
    { min: 85, max: 86, eneatipo: 2 },
    { min: 84, max: 84, eneatipo: 1 },
    { min: 83, max: 83, eneatipo: 1 },
    { min: 78, max: 82, eneatipo: 1 },
    { min: -100, max: 77, eneatipo: 1 }
];

    const baremoA = baremosEdad6a7A.find(b => A >= b.min && A <= b.max);
    if (baremoA) {
      eneatipoA = baremoA.eneatipo;
    }

    const baremoE = baremosEdad6a7E.find(b => A >= b.min && A <= b.max);
    if (baremoA) {
      eneatipoE = baremoE.eneatipo;
    }

    const baremoAE = baremosEdad6a7AE.find(b => A >= b.min && A <= b.max);
    if (baremoAE) {
      eneatipoA = baremoAE.eneatipo;
    }

    const baremoICI = baremosEdad6a7ICI.find(b => A >= b.min && A <= b.max);
    if (baremoA) {
      eneatipoA = baremoICI.eneatipo;
    }
    
  
  // Funciones de apoyo para clasificar resultados (opcional)
  function GetEneatipoLabel(eneatipo) {
    switch (eneatipo) {
      case 9: return "muy alto";
      case 8: return "alto";
      case 7: return "medio-alto";
      case 6:
      case 5:
      case 4: return "medio";
      case 3: return "medio-bajo";
      case 2: return "bajo";
      case 1: return "muy bajo";
      default: return "No definido";
    }
  }
  
  
  function ClasifiCaraE_ICI(ae, ici) {
    const nivelAE = GetEneatipoLabel(ae);
    const nivelICI = GetEneatipoLabel(ici);
    if ((nivelAE === "medio" || nivelAE === "alto" || nivelAE === "muy alto") &&
        (nivelICI === "medio" || nivelICI === "alto" || nivelICI === "muy alto"))
      return "Eficaz y no impulsivo";
    if ((nivelAE === "medio" || nivelAE === "alto" || nivelAE === "muy alto") &&
        (nivelICI === "medio-bajo" || nivelICI === "bajo" || nivelICI === "muy bajo"))
      return "Eficaz e impulsivo";
    if ((nivelAE === "medio-bajo" || nivelAE === "bajo" || nivelAE === "muy bajo") &&
        (nivelICI === "medio" || nivelICI === "alto" || nivelICI === "muy alto"))
      return "Ineficaz y no impulsivo (TDA)";
    return "Ineficaz e impulsivo (TDAH)";
  }
  
  function ClasificarICI_Aciertos(ici, aciertos) {
    const nivelICI = GetEneatipoLabel(ici);
    const nivelAciertos = GetEneatipoLabel(aciertos);
    if ((nivelICI === "medio" || nivelICI === "alto" || nivelICI === "muy alto") &&
        (nivelAciertos === "medio-bajo" || nivelAciertos === "bajo" || nivelAciertos === "muy bajo"))
      return "Inatento (posible TDA)";
    if ((nivelICI === "medio" || nivelICI === "alto" || nivelICI === "muy alto") &&
        (nivelAciertos === "medio" || nivelAciertos === "medio-alto" || nivelAciertos === "alto" || nivelAciertos === "muy alto"))
      return "Rendimiento normal";
    if ((nivelICI === "medio-bajo" || nivelICI === "bajo" || nivelICI === "muy bajo") &&
        (nivelAciertos === "medio-bajo" || nivelAciertos === "bajo" || nivelAciertos === "muy bajo"))
      return "Combinado (TDAH)";
    return "Impulsivo";
  }
  
    // Muestra la sección de resultados (puedes personalizar qué información mostrar)
    function mostrarResultados() {
    // Por ejemplo, asigna los datos del evaluado y los puntajes a elementos del HTML
    document.getElementById("resultados").style.display = "block";
    document.getElementById("nivel").textContent = `Nivel: ${nivelUsuario}`;
    document.getElementById("grado").textContent = `Grado: ${gradoUsuario}`;
    document.getElementById("edad").textContent = `Edad: ${edadUsuario}`;
    document.getElementById("aciertos").textContent = `Aciertos: ${aciertos}`;
    document.getElementById("errores").textContent = `Errores: ${errores}`;
    document.getElementById("puntaje").textContent = `Puntaje: ${puntaje}`;

    // Puedes incluir la interpretación de eneatipos si lo deseas
    document.getElementById("eneatipoA").textContent = `Eneatipo A: ${GetEneatipoLabel(eneatipoA)}`;
    document.getElementById("eneatipoE").textContent = `Eneatipo E: ${GetEneatipoLabel(eneatipoE)}`;
    document.getElementById("eneatipoAE").textContent = `Eneatipo AE: ${GetEneatipoLabel(eneatipoAE)}`;
    document.getElementById("eneatipoICI").textContent = `Eneatipo ICI: ${GetEneatipoLabel(eneatipoICI)}`;

        // Llama a las funciones de clasificación
    const clasificacionCaraEICI = ClasifiCaraE_ICI(eneatipoAE, eneatipoICI);
    const clasificacionICI_Aciertos = ClasificarICI_Aciertos(eneatipoICI, aciertos);

    // Muestra los resultados de las clasificaciones
    document.getElementById("clasificacionCaraE_ICI").textContent = `Clasificación Cara E e ICI: ${clasificacionCaraEICI}`;
    document.getElementById("clasificacionICI_Aciertos").textContent = `Clasificación ICI y Aciertos: ${clasificacionICI_Aciertos}`;

    // Mostrar el tiempo restante en los resultados
    document.getElementById("tiempoRestanteDisplay").textContent = `Tiempo restante: ${tiempoRestante}`;
    document.getElementById("test").style.display = "none";
}

  
  
  // Función para regresar al inicio (reinicia la página o navega a la ruta inicial)
  function RegresarAlInicio() {
    window.location.href = "heustonn-html/articulos/articulo-caras.html";
  }
  
  // ========================
  // EVENTOS Y ACTUALIZACIONES
  // ========================
  
  // Actualizar el ancho de la imagen cuando se redimensione la ventana
  window.addEventListener("resize", () => {
    actualizarAnchoImagen();
    actualizarMarcador();
  });

function regresarAlInicio() 
{
    // Ocultar la sección de resultados
    document.getElementById('resultados').style.display = 'none';
    
    // Mostrar la sección de instrucciones nuevamente
    document.getElementById('instrucciones').style.display = 'block';
        
    // Limpiar los valores ingresados en el formulario y resultados
    document.getElementById('nivelUsuario').value = '';
    document.getElementById('gradoUsuario').value = '';
    document.getElementById('edadUsuario').value = '';
    
    // También puedes limpiar las secciones de resultados si es necesario
    document.getElementById('nivel').textContent = 'Nivel: ';
    document.getElementById('grado').textContent = 'Grado: ';
    document.getElementById('edad').textContent = 'Edad: ';
    document.getElementById('aciertos').textContent = 'Aciertos: ';
    document.getElementById('aciertosNetos').textContent = 'Aciertos netos: ';
    document.getElementById('errores').textContent = 'Errores: ';
    document.getElementById('puntaje').textContent = 'Puntaje: ';
    document.getElementById('eneatipoA').textContent = 'Nivel de aciertos (A): ';
    document.getElementById('eneatipoE').textContent = 'Nivel de errores (E): ';
    document.getElementById('eneatipoAE').textContent = 'Nivel de eficacia (A-E): ';
    document.getElementById('eneatipoICI').textContent = 'Nivel de impulsividad (ICI): ';
    document.getElementById('clasificacionCaraE_ICI').textContent = 'Estilo de respuesta (A-E vs. ICI): ';
    document.getElementById('clasificacionICI_Aciertos').textContent = 'Contingencia de rendimiento (ICI vs. A): ';
    document.getElementById('tiempoRestante').textContent = 'Tiempo restante: ';
}
    


