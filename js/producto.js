// Obtiene el parámetro 'producto' de la URL
const params = new URLSearchParams(window.location.search);
const productoId = parseInt(params.get("producto"));


obtenerCatalogo().then((catalogo) => {
    if (!isNaN(productoId) && productoId >= 0 && productoId < catalogo.length) {
        const producto = catalogo[productoId];

        document.querySelector("#nombreProducto").textContent = producto.nombre;
        document.querySelector("#descripcion").textContent = producto.descripcion;
        document.querySelector("#precio-det").textContent = "$" + producto.precio.toLocaleString("es-AR");

        const imagen = document.querySelector("#imagenProducto");
        imagen.src = producto.imagen;
        imagen.alt = producto.nombre;

        const detalles = document.querySelector("#detalles");
        detalles.innerHTML = "";

        for (let clave in producto) {
            if (!["nombre", "descripcion", "precio", "destacado", "imagen"].includes(clave)) {
                const p = document.createElement("p");
                p.innerHTML = `<span class="clave">${clave}:</span> ${producto[clave]}`;
                detalles.appendChild(p);
            }
        }

        // Botón de carrito
        const btnToggle = document.querySelector("#botonToggle");
        function actualizarBoton() {
            if (estaEnCarrito(productoId)) {
                btnToggle.textContent = "Eliminar del carrito";
            } else {
                btnToggle.textContent = "Agregar al carrito";
            }
        }

        btnToggle.addEventListener("click", () => {
            if (estaEnCarrito(productoId)) {
                eliminarProducto(productoId);
            } else {
                agregarProducto(productoId);
            }
            actualizarBoton();
        });

        actualizarBoton();
    } else {
        console.error("Producto no encontrado");
        window.location.href = "index.html";
    }
});
