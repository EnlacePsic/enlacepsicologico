document.addEventListener("DOMContentLoaded", function() {
    // Lista de pruebas
    const pruebas = [
        //Tarjeta para el catalogo
        {
            Titulo: 'Test CARAS-R',
            Imagen: 'images/tdah.svg',
            Descripcion: 'Mide la atención sostenida y la atención selectiva (6 a 18 años).',
            Pagina: '/heustonn-html/articulos/articulo-caras.html'
        },
        //Tarjeta para la aplicación (Hay que evitar que salga en el catalogo)
        {
            Titulo: 'Aplicar CARAS-R',
            Imagen: 'images/tdah.svg',
            Descripcion: 'Mide la atención sostenida y la atención selectiva (6 a 18 años).',
            Pagina: '../pruebas/caras-r/aplicacion-caras.html'
        },
        {
            Titulo: 'Inventario de depresión <br> "BDI-II"',
            Imagen: 'images/depresion.svg',
            Descripcion: 'Evalúa síntomas depresivos mediante autoinforme (13 años o más).',
            Pagina: '/Cuestionario-de-depresion'
        },
        {
            Titulo: 'Cuestionario de ansiedad, <br> "BAI"',
            Imagen: 'images/ansiedad.svg',
            Descripcion: 'Evalúa la gravedad de la sintomatología ansiosa (13 años o más).',
            Pagina: '/Cuestionario-de-ansiedad'
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

    // Filtrar las pruebas para excluir las de tipo "aplicación"
    const pruebasCatalogo = pruebas.filter(prueba => !excluir.includes(prueba.Titulo));

    // Función para crear las tarjetas dinámicamente
    function crearCatalogo(catalogoId, pruebas) {
        const catalogo = document.getElementById(catalogoId);
        if (!catalogo) {
            console.log(`No se encontró el catálogo con el id: ${catalogoId}`);
            return; // Si no se encuentra el elemento, salimos de la función
        }

        catalogo.innerHTML = ""; // Limpia el contenido previo

        pruebas.forEach(prueba => {
            const tarjeta = document.createElement('button');
            tarjeta.classList.add('tarjeta');
            tarjeta.innerHTML = `
                <img src="${prueba.Imagen}" alt="${prueba.Titulo}">
                <h3>${prueba.Titulo}</h3>
                <p>${prueba.Descripcion}</p>
            `;

            tarjeta.addEventListener('click', () => {
                setTimeout(() => {
                    window.location.href = prueba.Pagina;
                }, 200);
            });

            catalogo.appendChild(tarjeta);
        });
    }

    // Ejecutar la función con diferentes catálogos cuando la página se carga

    // Cargar catálogo principal con pruebas filtradas
    crearCatalogo('catalogo', pruebasCatalogo);
    
    // Cargar solo el catálogo de CARAS (si existe)
    const carasSection = document.getElementById('caras');
    if (carasSection) {
        crearCatalogo('caras', [pruebas[1]]);
    }

    // Cargar solo el catálogo de Estrés (si existe)
    const estresSection = document.getElementById('estres');
    if (estresSection) {
        crearCatalogo('estres', [pruebas[3]]);
    } else {
        console.log("El elemento con id 'estres' no está presente en el DOM.");
    }
});
