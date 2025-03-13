document.addEventListener("DOMContentLoaded", function() {
    // Lista de entradas del blog
    const entradas = [
        // Entrada de blog sobre CARAS-R
        {
            Titulo: 'Sobre el Test CARAS-R',
            Imagen: 'images/tdah.svg',
            Descripcion: 'Exploramos las areas de aplicacion y su eficiencia en la identificacion del TDAH y TDA',
            Pagina: 'Articulos/articulo-caras.html'
        },
        // Entrada para la aplicación (Debe excluirse del blog)
        {
            Titulo: 'Aplicar CARAS-R',
            Imagen: '../images/aplicar.svg',
            Descripcion: 'Mide la atención sostenida y la atención selectiva (6 a 18 años).',
            Pagina: '../Pruebas/CARAS-R/aplicacion-caras.html'
        },
        {
            Titulo: 'Una herramienta clasica para evaluar la depresión',
            Imagen: 'images/depresion.svg',
            Descripcion: 'Uno de los inventarios mas utilizados en la identifiación de la depresión.',
            Pagina: 'Articulos/articulo-bdi.html'
        },
        {
            Titulo: 'Inventario de ansiedad, <br> "BAI"',
            Imagen: 'images/ansiedad.svg',
            Descripcion: 'Evalúa la gravedad de la sintomatología ansiosa (13 años o más).',
            Pagina: 'Articulos/ansiedad.html'
        },
        {
            Titulo: 'Cuestionario de estrés',
            Imagen: 'images/estres.svg',
            Descripcion: 'Evalúa la intensidad del estrés (13 años o más).',
            Pagina: '/Cuestionario-de-estres'
        }
    ];

    const excluir = [
        'Aplicar CARAS-R',
        'Cuestionario de estrés',
        // Puedes agregar más títulos aquí
    ];

    // Filtrar las entradas para excluir las que no van en el blog
    const entradasBlog = entradas.filter(entrada => !excluir.includes(entrada.Titulo));

    // Función para crear las entradas dinámicamente
    function crearBlog(blogId, entradas) {
        const blog = document.getElementById(blogId);
        if (!blog) {
            console.log(`No se encontró la sección de blog con el id: ${blogId}`);
            return; // Si no se encuentra el elemento, salimos de la función
        }

        blog.innerHTML = ""; // Limpia el contenido previo

        entradas.forEach(entrada => {
            const elementoEntrada = document.createElement('button');
            elementoEntrada.classList.add('entrada');
            elementoEntrada.innerHTML = `
                <img src="${entrada.Imagen}" alt="${entrada.Titulo}">
                <div class="entrada-contenido">
                    <h3>${entrada.Titulo}</h3>
                    <p>${entrada.Descripcion}</p>
                </div>
            `;

            elementoEntrada.addEventListener('click', () => {
                setTimeout(() => {
                    window.location.href = entrada.Pagina;
                }, 200);
            });

            blog.appendChild(elementoEntrada);
        });
    }

    // Ejecutar la función con diferentes secciones cuando la página se carga

    // Cargar la sección principal del blog con entradas filtradas
    crearBlog('entradas_blog', entradasBlog);
    
    // Cargar solo la sección de CARAS (si existe)
    const carasSection = document.getElementById('caras');
    if (carasSection) {
        crearBlog('caras', [entradas[1]]);
    }

    // Cargar solo la sección de Estrés (si existe)
    const estresSection = document.getElementById('estres');
    if (estresSection) {
        crearBlog('estres', [entradas[3]]);
    } else {
        console.log("El elemento con id 'estres' no está presente en el DOM.");
    }
});
