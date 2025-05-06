document.addEventListener("DOMContentLoaded", function() {
    // Lista de entradas del blog
    const entradas = [
        {
            Titulo: 'Percepción de diferencias para la evaluacion del TDAH y TDA',
            Imagen: '../images/tdah.svg',
            Descripcion: 'Las aplicación de pruebas de percepción en la evaluación del TDAH y TDA',
            Pagina: 'Articulos/articulo-caras.html'
        },
        {
            Titulo: 'Aplicar CARAS-R',
            Imagen: '../images/aplicar.svg',
            Descripcion: 'Mide la atención sostenida y la atención selectiva (6 a 18 años).',
            Pagina: '../Pruebas/CARAS-R/aplicacion-caras.html'
        },
        {
            Titulo: 'Una herramienta clásica para evaluar la depresión',
            Imagen: '../images/depresion.svg',
            Descripcion: 'Uno de los inventarios más utilizados en la identificación de la depresión.',
            Pagina: 'Articulos/articulo-bdi.html'
        },
        {
            Titulo: 'Un inventario sencillo para la ansiedad',
            Imagen: '../images/ansiedad.svg',
            Descripcion: '21 preguntas para identificar rápidamente el grado de ansiedad.',
            Pagina: 'Articulos/ansiedad.html'
        },
        {
            Titulo: 'Cuestionario de estrés',
            Imagen: '../images/estres.svg',
            Descripcion: 'Evalúa la intensidad del estrés (13 años o más).',
            Pagina: '/Cuestionario-de-estres'
        }
    ];

    // Entradas que no deben aparecer en la sección principal del blog
    const excluir = ['Aplicar CARAS-R', 'Cuestionario de estrés'];

    // Filtrar entradas visibles en el blog
    const entradasBlog = entradas.filter(entrada => !excluir.includes(entrada.Titulo));

    function crearBlog(blogId, entradas) {
        const blog = document.getElementById(blogId);
        if (!blog) {
            console.warn(`No se encontró el contenedor con ID: ${blogId}`);
            return;
        }

        blog.innerHTML = ""; // Limpiar contenido previo

        entradas.forEach(entrada => {
            const elementoEntrada = document.createElement('div');
            elementoEntrada.classList.add('entrada');
            elementoEntrada.innerHTML = `
                <img src="${entrada.Imagen}" alt="${entrada.Titulo}">
                <div class="entrada-contenido">
                    <h1>${entrada.Titulo}</h1>
                    <p>${entrada.Descripcion}</p>
                    <a href="${entrada.Pagina}" class="boton-leer">Leer más</a>
                </div>
            `;

            blog.appendChild(elementoEntrada);
        });
    }

    // Crear entradas en secciones correspondientes
    crearBlog('entradas_blog', entradasBlog);

    const carasSection = document.getElementById('caras');
    if (carasSection) {
        crearBlog('caras', [entradas[1]]);
    }

    const estresSection = document.getElementById('estres');
    if (estresSection) {
        crearBlog('estres', [entradas[4]]);
    } else {
        console.log("El elemento con id 'estres' no está presente en el DOM.");
    }
});
