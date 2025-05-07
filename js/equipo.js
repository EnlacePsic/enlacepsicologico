document.addEventListener("DOMContentLoaded", function () {
  const equipo = [
    {
      nombre: "Lic. Arturo Garcia",
      rol: "Psicólogo clínico",
      imagen: "../images/arturo.jpg",
      color: "rgba(235, 23, 129, 0.85)", // rosa
      whatsapp: "5218187606515",
      mensaje: "Hola Arturo, me interesa una evaluación psicológica contigo. ¿Podrías brindarme más información?"
    },
    {
      nombre: "Lic. Evelyn Martinez",
      rol: "Psicóloga clinico",
      imagen: "../images/evelyn.png",
      color: "rgba(31, 184, 240, 0.85)", // azul cielo
      whatsapp: "5218122518382",
      mensaje: "Hola Evelyn, estoy buscando terapia para un niño y me gustaría saber cómo trabajas. ¿Podrías contarme más?"
    },
    {
      nombre: "Lic. Lizbeth Cerda",
      rol: "Psicóloga clinico",
      imagen: "../images/lizbeth.jpg",
      color: "rgba(144, 238, 144, 0.85)", // verde claro
      whatsapp: "5218110402737",
      mensaje: "Hola Lizbeth, estoy atravesando un proceso de duelo y me interesa comenzar terapia contigo. ¿Tienes disponibilidad?"
    }
  ];

  const contenedor = document.getElementById("equipo");

  equipo.forEach(miembro => {
    const div = document.createElement("div");
    div.classList.add("miembro");

    // Degradado
    const colorBase = miembro.color;
    const colorFade = miembro.color.replace('0.85', '0.6');

    div.innerHTML = `
      <img src="${miembro.imagen}" alt="${miembro.nombre}" onerror="this.src='../images/default.jpg'">
      <div class="overlay" style="background: linear-gradient(to top, ${colorBase}, ${colorFade});">
        <h3>${miembro.nombre.toUpperCase()}</h3>
        <p>${miembro.rol}</p>
      </div>
    `;

    // Click abre WhatsApp con mensaje personalizado
    div.addEventListener("click", () => {
      const url = `https://wa.me/${miembro.whatsapp}?text=${encodeURIComponent(miembro.mensaje)}`;
      window.open(url, '_blank');
    });

    contenedor.appendChild(div);
  });
});
