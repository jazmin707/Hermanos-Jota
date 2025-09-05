const contadorCarrito = document.querySelector("#contador-carrito");

// Recuperar carrito desde localStorage o crear vacío
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Guardar carrito
function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Verificar si producto está
function estaEnCarrito(id) {
    return carrito.some(p => p.id === id);
}

// Agregar producto
function agregarProducto(id) {
    const item = carrito.find(p => p.id === id);
    if (item) {
        item.cantidad++;
    } else {
        carrito.push({ id, cantidad: 1 });
    }
    guardarCarrito();
    actualizarContador();
}

// Eliminar producto
function eliminarProducto(id) {
    carrito = carrito.filter(p => p.id !== id);
    guardarCarrito();
    actualizarContador();
}

// Contador
function actualizarContador() {
    if (contadorCarrito) {
        const totalCant = carrito.reduce((acc, p) => acc + p.cantidad, 0);
        contadorCarrito.textContent = totalCant;
    }
}
actualizarContador();

// ---------- Carrito Lateral ----------
const carritoLateral = document.querySelector("#carrito-lateral");
const carritoIcono = document.querySelector(".carrito");
const cerrarCarrito = document.querySelector("#cerrarCarrito");
const carritoItems = document.querySelector("#carrito-items");
const carritoTotal = document.querySelector("#carrito-total");

// Abrir carrito
carritoIcono.addEventListener("click", () => {
    carritoLateral.classList.add("activo");
    renderizarCarrito();
});

// Cerrar
cerrarCarrito.addEventListener("click", () => {
    carritoLateral.classList.remove("activo");
});

// Renderizar
function renderizarCarrito() {
    carritoItems.innerHTML = "";
    let total = 0;

    carrito.forEach(({ id, cantidad }) => {
        const producto = catalogoGlobal[id];
        if (!producto) return;

        const item = document.createElement("div");
        item.classList.add("item-carrito");
        item.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <div class="item-info">
                <p>${producto.nombre}</p>
                <p>$${producto.precio.toLocaleString("es-AR")}</p>
            </div>
            <div class="controles">
                <button class="menos">-</button>
                <span>${cantidad}</span>
                <button class="mas">+</button>
            </div>
        `;

        // Disminuir
        item.querySelector(".menos").addEventListener("click", () => {
            if (cantidad > 1) {
                carrito.find(p => p.id === id).cantidad--;
            } else {
                eliminarProducto(id);
            }
            guardarCarrito();
            renderizarCarrito();
        });

        // Aumentar
        item.querySelector(".mas").addEventListener("click", () => {
            carrito.find(p => p.id === id).cantidad++;
            guardarCarrito();
            renderizarCarrito();
        });

        carritoItems.appendChild(item);
        total += producto.precio * cantidad;
    });

    carritoTotal.textContent = "$" + total.toLocaleString("es-AR");
}

// Comprar
document.querySelector("#btn-comprar").addEventListener("click", () => {
    if (carrito.length === 0) {
        alert("Tu carrito está vacío, esperando la pieza perfecta para vos");
        return;
    }

    alert("Gracias por confiar en nosotros. Tu compra ya está en camino.");
    carrito = [];
    guardarCarrito();
    actualizarContador();
    renderizarCarrito();
    carritoLateral.classList.remove("activo");
});

