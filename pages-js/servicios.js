document.addEventListener('DOMContentLoaded', () => {

    const navegacion = [
        {
            selector: '.final-card:nth-child(1) .btn-ver-mas',
            url: 'servicios-secciones/maquinados.html'
        },
        {
            selector: '.final-card:nth-child(2) .btn-ver-mas',
            url: 'servicios-secciones/desarrollo-proyectos.html'
        },
        {
            selector: '.btn-proyectos',
            url: 'servicios-secciones/desarrollo-proyectos.html'
        }
    ];

    navegacion.forEach(({ selector, url }) => {
        const boton = document.querySelector(selector);
        if (boton) {
            boton.addEventListener('click', (e) => {
                e.preventDefault();
                window.location.href = url;
            });
        }
    });
});