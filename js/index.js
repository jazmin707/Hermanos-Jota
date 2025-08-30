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