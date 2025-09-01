// -------------------- CARRITO GLOBAL -------------------- //
const contadorCarrito = document.querySelector("#contador-carrito");

// Recuperar carrito desde localStorage o crear uno vacío
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Actualiza el contador
function actualizarContador() {
    if (contadorCarrito) {
        contadorCarrito.textContent = carrito.length;
    }
}

// Guarda el carrito en localStorage
function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Verifica si el producto ya está en el carrito
function estaEnCarrito(id) {
    return carrito.includes(id);
}

// Agregar producto
function agregarProducto(id) {
    if (!estaEnCarrito(id)) {
        carrito.push(id);
        guardarCarrito();
        actualizarContador();
    }
}

// Eliminar producto
function eliminarProducto(id) {
    carrito = carrito.filter(pid => pid !== id);
    guardarCarrito();
    actualizarContador();
}

// -------------------- INICIALIZACIÓN -------------------- //
actualizarContador();
