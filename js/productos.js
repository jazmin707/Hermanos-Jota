
const contenedor = document.querySelector("#grilla-productos");
const formulario = document.querySelector("#formulario");
const inputBusqueda = document.getElementById("busqueda");


function renderizarProductos(productos) {
    contenedor.innerHTML = "";
    productos.forEach((mueble, index) => {
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("tarjeta");

        const enlace = document.createElement("a");
        enlace.href = `producto.html?producto=${index}`;

        const titulo = document.createElement("h3");
        titulo.textContent = mueble.nombre;
        titulo.classList.add("subtitulos");

        const precio = document.createElement("p");
        precio.textContent = "$" + mueble.precio.toLocaleString("es-AR");
        precio.classList.add("precio");
        precio.id = "precio";

        const img = document.createElement("img");
        img.src = mueble.imagen;
        img.alt = mueble.nombre;

        const div = document.createElement("div");
        div.appendChild(titulo);
        div.appendChild(img);
        div.appendChild(precio);

        enlace.appendChild(div);
        tarjeta.appendChild(enlace);
        contenedor.appendChild(tarjeta);
    });
}

// Carga inicial del catálogo
obtenerCatalogo().then((productos) => {
    renderizarProductos(productos);

    formulario.addEventListener("submit", (e) => {
        e.preventDefault();
        const texto = inputBusqueda.value.toLowerCase().trim();
        const filtrados = productos.filter((mueble) =>
            mueble.nombre.toLowerCase().includes(texto)
        );
        renderizarProductos(filtrados);
    });
});
