document.addEventListener("DOMContentLoaded", function () {
    const equipo = [
      {
        nombre: "Arturo Garcia",
        rol: "Psicólogo clínica (Evaluación)",
        imagen: "../images/arturo.jpg",
        color: "rgba(235, 23, 129, 0.85)" // rosa
      },
      {
        nombre: "Evelyn Martinez",
        rol: "Psicóloga clinico (Niños)",
        imagen: "../images/evelyn.png",
        color: "rgba(31, 184, 240, 0.85)" // azul cielo
      },
      {
        nombre: "Lizbeth Cerda",
        rol: "Psicóloga clinico (Duelo)",
        imagen: "../images/lizbeth.jpg",
        color: "rgba(144, 238, 144, 0.85)" // verde claro
      }
    ];
  
    const contenedor = document.getElementById("equipo");
  
    equipo.forEach(miembro => {
      const div = document.createElement("div");
      div.classList.add("miembro");
  
      // Degradado con color principal y color con opacidad reducida
      const colorBase = miembro.color;
      const colorFade = miembro.color.replace('0.85', '0.6');
  
      div.innerHTML = `
        <img src="${miembro.imagen}" alt="${miembro.nombre}" onerror="this.src='../images/default.jpg'">
        <div class="overlay" style="background: linear-gradient(to top, ${colorBase}, ${colorFade});">
          <h3>${miembro.nombre.toUpperCase()}</h3>
          <p>${miembro.rol}</p>
        </div>
      `;
  
      contenedor.appendChild(div);
    });
  });
  