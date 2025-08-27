document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("form-contacto");
    const mensajeExito = document.getElementById("mensaje-exito");

    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Evita que se recargue la página

        // Tomar valores de los inputs
        const nombre = document.getElementById("nombre").value;
        const email = document.getElementById("email").value;
        const mensaje = document.getElementById("mensaje").value;

        // Mostrar mensaje de éxito
        mensajeExito.textContent = `Gracias ${nombre}, tu mensaje fue enviado.`;
        mensajeExito.style.display = "block";

        // Ocultar el mensaje después de 5 segundos
        setTimeout(() => {
            mensajeExito.style.display = "none";
        }, 5000);

        // Limpiar el formulario
        form.reset();
    });
});
