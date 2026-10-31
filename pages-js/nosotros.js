document.addEventListener("DOMContentLoaded", () => {
    const valores = document.querySelectorAll(".valor");

    valores.forEach((valor) => {
        valor.addEventListener("click", () => {
            valores.forEach((otro) => {
                if (otro !== valor) otro.classList.remove("abierto");
            });
            valor.classList.toggle("abierto");
        });

        // Accesibilidad básica con teclado
        valor.setAttribute("tabindex", "0");
        valor.setAttribute("role", "button");

        valor.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                valor.click();
            }
        });
    });
});

// PERSONAL

document.querySelectorAll('.persona-imagen').forEach(imagen => {
    imagen.addEventListener('click', () => {
        const persona = imagen.closest('.persona');
        const isOpen = persona.classList.contains('abierto');

        // Cerrar todas
        document.querySelectorAll('.persona').forEach(p => {
            p.classList.remove('abierto');
        });

        // Abrir la actual solo si no estaba abierta
        if (!isOpen) {
            persona.classList.add('abierto');
        }
    });
});

// VALORES

document.querySelectorAll('.valor').forEach(valor => {
    valor.addEventListener('click', () => {
        const isOpen = valor.classList.contains('abierto');

        // Cerrar todos
        document.querySelectorAll('.valor').forEach(v => v.classList.remove('abierto'));

        // Abrir el actual si no estaba abierto
        if (!isOpen) {
            valor.classList.add('abierto');
        }
    });
});