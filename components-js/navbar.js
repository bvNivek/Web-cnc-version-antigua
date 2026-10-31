document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;

    // Calcular prefijo según la carpeta actual
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
                if (!res.ok) throw new Error('No se encontró navbar.html');
                return res.text();
            })
            .then(html => {
                navbarContainer.innerHTML = html;
                corregirEnlaces(prefix);
                marcarPaginaActiva();
            })
            .catch(err => {
                console.error('Error navbar:', err);
                navbarContainer.innerHTML = `<div style="background:#ffdddd;color:#900;padding:12px;">Error al cargar el menú</div>`;
            });
    }

    // ===== Cargar FOOTER =====
    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
        fetch(prefix + 'components-html/footer.html')
            .then(res => {
                if (!res.ok) throw new Error('No se encontró footer.html');
                return res.text();
            })
            .then(html => {
                footerContainer.innerHTML = html;
                corregirEnlaces(prefix);
            })
            .catch(err => {
                console.error('Error footer:', err);
                footerContainer.innerHTML = `<div style="background:#ffdddd;color:#900;padding:12px;">Error al cargar el footer</div>`;
            });
    }
});

// Corrige todos los enlaces del navbar y footer
function corregirEnlaces(prefix) {
    document.querySelectorAll('.navbar a, .footer a').forEach(link => {
        const href = link.getAttribute('href');

        // Ignorar enlaces externos, mailto o #
        if (!href || href.startsWith('http') || href.startsWith('mailto:') || href === '#') {
            return;
        }

        if (href === 'index.html') {
            link.href = prefix + 'index.html';
        } 
        else if (href.startsWith('pages-html/')) {
            link.href = prefix + href;
        }
    });
}

// Marca el enlace activo
function marcarPaginaActiva() {
    const path = window.location.pathname;
    let pagina = 'index';

    if (path.includes('servicios') && !path.includes('secciones')) {
        pagina = 'servicios';
    } else if (path.includes('nosotros')) {
        pagina = 'nosotros';
    } else if (path.includes('contacto')) {
        pagina = 'contacto';
    } else if (path.includes('maquinados')) {
        pagina = 'maquinados';
    } else if (path.includes('desarrollo')) {
        pagina = 'desarrollo';
    }

    const enlace = document.querySelector(`.navbar-menu a[data-page="${pagina}"]`);
    if (enlace) {
        enlace.classList.add('active');
    }
}