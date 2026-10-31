// ========== MODAL ==========
const modal = document.getElementById('productModal');
const modalClose = document.querySelector('.modal-close');
const modalOverlay = document.querySelector('.product-modal-overlay');

const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalMaterial = document.getElementById('modalMaterial');
const modalTolerance = document.getElementById('modalTolerance');
const modalFinish = document.getElementById('modalFinish');
const modalMainImage = document.getElementById('modalMainImage');
const modalGallery = document.getElementById('modalGallery');
const modalLoader = document.getElementById('modalLoader');

// ========== DATOS ==========
const products = {
    1: {
        title: "DISEÑO DE UTILLAJE",
        description: "Resultado: Solución a medida para producción en serie.",
        material: "Acero / Aluminio",
        tolerance: "10–15 días hábiles",
        finish: "Planos + 3D",
        images: [
            "../../img/proyectos/utillaje1.png",
            "../../img/proyectos/utillaje2.png"
        ]
    },
    2: {
        title: "PROTOTIPO FUNCIONAL",
        description: "Resultado: Validación rápida antes de producción.",
        material: "Según requerimiento",
        tolerance: "7–12 días hábiles",
        finish: "Ensamble funcional",
        images: [
            "../../img/proyectos/prototipo1.png",
            "../../img/proyectos/prototipo2.png",
            "../../img/proyectos/prototipo3.png"
        ]
    },
    3: {
        title: "INGENIERÍA INVERSA",
        description: "Resultado: Replicación exacta de piezas existentes.",
        material: "Escaneo 3D",
        tolerance: "8–14 días hábiles",
        finish: "Planos + modelo CAD",
        images: [
            "../../img/proyectos/ingenieria1.png",
            "../../img/proyectos/ingenieria2.png"
        ]
        // video: ["../../img/proyectos/video-ejemplo.mp4"]
    }
};

// ========== ABRIR MODAL ==========
document.querySelectorAll('.maquinado-card').forEach(card => {
    card.style.cursor = 'pointer';

    card.addEventListener('click', () => {
        // Usamos data-id en vez de depender del orden del DOM
        const id = card.dataset.id;
        const product = products[id];
        if (!product || !modal) return;

        // Textos
        if (modalTitle) modalTitle.textContent = product.title;
        if (modalDescription) modalDescription.textContent = product.description;
        if (modalMaterial) modalMaterial.textContent = product.material;
        if (modalTolerance) modalTolerance.textContent = product.tolerance;
        if (modalFinish) modalFinish.textContent = product.finish;

        // Reset imagen + loader
        if (modalMainImage) {
            modalMainImage.classList.remove('loaded');
            modalMainImage.src = '';
            modalMainImage.alt = '';
        }
        if (modalLoader) modalLoader.classList.remove('hidden');

        // Limpiar galería
        if (modalGallery) modalGallery.innerHTML = '';

        // Precargar imagen principal
        const mainSrc = product.images[0];
        const preload = new Image();
        preload.src = mainSrc;

        preload.onload = () => {
            if (modalMainImage) {
                modalMainImage.src = mainSrc;
                modalMainImage.alt = product.title;
                modalMainImage.classList.add('loaded');
            }
            if (modalLoader) modalLoader.classList.add('hidden');
        };

        preload.onerror = () => {
            console.error('No se pudo cargar la imagen:', mainSrc);
            if (modalLoader) modalLoader.classList.add('hidden');
        };

        // Miniaturas
        product.images.forEach((src, i) => {
            const thumb = document.createElement('img');
            thumb.src = src;
            thumb.alt = `${product.title} ${i + 1}`;
            if (i === 0) thumb.classList.add('active');

            thumb.addEventListener('click', () => {
                if (modalMainImage) {
                    modalMainImage.src = src;
                    modalMainImage.classList.add('loaded');
                }
                if (modalGallery) {
                    modalGallery.querySelectorAll('img').forEach(t => t.classList.remove('active'));
                }
                thumb.classList.add('active');
            });

            if (modalGallery) modalGallery.appendChild(thumb);
        });

        // Video (si existe)
        if (product.video && product.video.length > 0 && modalGallery) {
            const videoSrc = product.video[0];
            const videoThumb = document.createElement('div');
            videoThumb.className = 'video-thumb';
            videoThumb.innerHTML = `
                <img src="${product.images[0]}" alt="Video">
                <div class="play-overlay"><span class="play-icon">▶</span></div>
            `;

            videoThumb.addEventListener('click', (e) => {
                e.stopPropagation();

                const overlay = document.createElement('div');
                overlay.className = 'video-modal-overlay';
                overlay.innerHTML = `
                    <div class="video-modal-content">
                        <button class="video-modal-close">&times;</button>
                        <video controls autoplay>
                            <source src="${videoSrc}" type="video/mp4">
                        </video>
                    </div>
                `;

                document.body.appendChild(overlay);
                requestAnimationFrame(() => overlay.classList.add('active'));

                const video = overlay.querySelector('video');
                const closeBtn = overlay.querySelector('.video-modal-close');

                const closeVideo = () => {
                    overlay.classList.remove('active');
                    setTimeout(() => {
                        if (video) video.pause();
                        overlay.remove();
                    }, 250);
                };

                if (closeBtn) closeBtn.addEventListener('click', closeVideo);
                overlay.addEventListener('click', (e) => {
                    if (e.target === overlay) closeVideo();
                });

                const onEsc = (e) => {
                    if (e.key === 'Escape') {
                        closeVideo();
                        document.removeEventListener('keydown', onEsc);
                    }
                };
                document.addEventListener('keydown', onEsc);
            });

            modalGallery.appendChild(videoThumb);
        }

        // Abrir modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

// ========== CERRAR MODAL ==========
function closeModal() {
    if (!modal) return;

    modal.classList.remove('active');
    document.body.style.overflow = '';

    if (modalMainImage) {
        modalMainImage.src = '';
        modalMainImage.classList.remove('loaded');
        modalMainImage.alt = '';
    }
    if (modalGallery) modalGallery.innerHTML = '';
    if (modalLoader) modalLoader.classList.remove('hidden');
}

if (modalClose) modalClose.addEventListener('click', closeModal);
if (modalOverlay) modalOverlay.addEventListener('click', closeModal);

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
        closeModal();
    }
});