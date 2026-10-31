document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;
    let prefix = '';

    if (path.includes('/servicios-secciones/')) {
        prefix = '../../';
    } else if (path.includes('/pages-html/')) {
        prefix = '../';
    }

    // ===== Cargar NAVBAR =====
    const navbarContainer = document.getElementById('navbar-container');
    if (navbarContainer) {
        fetch(prefix + 'components-html/navbar.html')
            .then(res => {
                if (!res.ok) throw new Error('Navbar no encontrado');
                return res.text();
            })
            .then(html => {
                navbarContainer.innerHTML = html;
                corregirEnlaces(prefix, '.navbar a');
                marcarPaginaActiva();
            })
            .catch(err => {
                console.error(err);
                navbarContainer.innerHTML = `<div style="background:#ffdddd;color:#900;padding:12px;">Error al cargar el menú</div>`;
            });
    }

    // ===== Cargar FOOTER =====
    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
        fetch(prefix + 'components-html/footer.html')
            .then(res => {
                if (!res.ok) throw new Error('Footer no encontrado');
                return res.text();
            })
            .then(html => {
                footerContainer.innerHTML = html;
                corregirEnlaces(prefix, '.footer a');
            })
            .catch(err => {
                console.error(err);
                footerContainer.innerHTML = `<div style="background:#ffdddd;color:#900;padding:12px;">Error al cargar el footer</div>`;
            });
    }
});

// Corregir rutas de los enlaces
function corregirEnlaces(prefix, selector) {
    document.querySelectorAll(selector).forEach(link => {
        let href = link.getAttribute('href');
        if (!href || href.startsWith('http') || href.startsWith('mailto:') || href === '#') return;

        if (href === 'index.html') {
            link.href = prefix + 'index.html';
        } else if (href.startsWith('pages-html/')) {
            link.href = prefix + href;
        }
    });
}

// Marcar página activa en el navbar
function marcarPaginaActiva() {
    const path = window.location.pathname;
    let pagina = 'index';

    if (path.includes('servicios') && !path.includes('secciones')) pagina = 'servicios';
    else if (path.includes('nosotros')) pagina = 'nosotros';
    else if (path.includes('contacto')) pagina = 'contacto';

    const enlace = document.querySelector(`.navbar-menu a[data-page="${pagina}"]`);
    if (enlace) enlace.classList.add('active');
}