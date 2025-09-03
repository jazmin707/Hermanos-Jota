function renderDestacados() {
    const contenedor = document.getElementById("productos-destacados");

    // Filtrar solo los productos destacados
    const destacados = catalogoProducto.filter(producto => producto.destacado);

    // Limpiar contenedor
    contenedor.innerHTML = "";

    // Recorrer y generar HTML de cada producto
    destacados.forEach(producto => {
        const productoHTML = `
            <div class="producto">
                <h3>${producto.nombre}</h3>
                <img src="./imagenes/${producto.nombre}.png" alt="${producto.nombre}" width="60" height="60">
                <p>${producto.descripcion}</p>
                <p><strong>Medidas:</strong> ${producto.medidas} <br> <strong>Materiales:</strong> ${producto.materiales}</p>
            </div>
        `;
        contenedor.innerHTML += productoHTML;
    });
}

// Ejecutar cuando la página termine de cargar
document.addEventListener("DOMContentLoaded", renderDestacados);
    
//-boton "ver mas" y que salga la descripcion y especificaciones del producto o "añadir al carrito"
document.addEventListener("DOMContentLoaded", () => {
    const botones = document.querySelectorAll('.boton-vermas');

    botones.forEach(boton => {
        boton.addEventListener('click', () => {
            const tarjeta = boton.closest('.tarjeta-individual');
            const contenidoExtra = tarjeta.querySelector('.cont-extra');
            const estabaActivo = contenidoExtra.classList.contains('activo');

            document.querySelectorAll('.cont-extra').forEach(c => c.classList.remove('activo'));
            document.querySelectorAll('.boton-vermas').forEach(b => b.textContent = 'Ver más');

            if (!estabaActivo) {
                contenidoExtra.classList.add('activo');
                boton.textContent = 'Ver menos';
            }
        })
    })

    // Añadir al carrito
    let contadorCarrito = 0;
    const botonesAgregar = document.querySelectorAll('.añadir-carrito');

    botonesAgregar.forEach(boton => {
        boton.addEventListener('click', () => {
            contadorCarrito++;
            document.getElementById('contador-carrito').textContent = contadorCarrito;
        })
    })
})
