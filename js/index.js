document.addEventListener("DOMContentLoaded", () => {
    const contenedor = document.getElementById("contenedor-galeria");

    obtenerCatalogo().then(catalogo => {
        const destacados = catalogo
            .map((producto, index) => ({ ...producto, index })) // Agregamos el índice
            .filter(producto => producto.destacado);

        destacados.forEach(producto => {
            const tarjeta = document.createElement("div");
            tarjeta.classList.add("tarjeta-individual");

            tarjeta.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.nombre}" width="200" height="200">
                <h3>${producto.nombre}</h3>
                <button class="boton-vermas">Ver más</button>
                <div class="cont-extra oculto">
                    <p>${producto.descripcion}</p>
                    <button class="añadir-carrito">Añadir al carrito</button>
                    <a href="producto.html?producto=${producto.index}" class="ver-producto">Ver producto</a>
                </div>
            `;

            contenedor.appendChild(tarjeta);
        });

        // Funcionalidad "Ver más"
        const botonesVerMas = document.querySelectorAll('.boton-vermas');

        botonesVerMas.forEach(boton => {
            boton.addEventListener('click', () => {
                const tarjeta = boton.closest('.tarjeta-individual');
                const contenidoExtra = tarjeta.querySelector('.cont-extra');
                const estabaActivo = contenidoExtra.classList.contains('activo');

                // Ocultar todas las demás
                document.querySelectorAll('.cont-extra').forEach(c => {
                    c.classList.remove('activo');
                    c.classList.add('oculto');
                });

                document.querySelectorAll('.boton-vermas').forEach(b => b.textContent = 'Ver más');

                // Si no estaba activa, mostrarla
                if (!estabaActivo) {
                    contenidoExtra.classList.add('activo');
                    contenidoExtra.classList.remove('oculto');
                    boton.textContent = 'Ver menos';
                }
            });
        });

        // Contador del carrito (simple)
        let contadorCarrito = 0;
        const botonesAgregar = document.querySelectorAll('.añadir-carrito');

        botonesAgregar.forEach(boton => {
            boton.addEventListener('click', () => {
                contadorCarrito++;
                document.getElementById('contador-carrito').textContent = contadorCarrito;
            });
        });
    });
});
