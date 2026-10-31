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
        title: "PULIDO DE MOLDE",
        description: "Resultado: Ajuste perfecto en ensamble crítico.",
        material: "Aluminio 6061",
        tolerance: "±0.01 mm",
        finish: "Anodizado",
        images: [
            "../../img/maquinados/Pulido/pulido.webp"
        
        ]
    },
    2: {
        title: "PLACA MANIPULADORA",
        description: "Resultado: Desempeño y concentricidad garantizados.",
        material: "Acero inoxidable",
        tolerance: "±0.005 mm",
        finish: "Rectificado",
        images: [
            "../../img/maquinados/PlacaManipuladora/placa.webp",
            "../../img/maquinados/PlacaManipuladora/placa2.webp",
            "../../img/maquinados/PlacaManipuladora/placa4.webp",
            "../../img/maquinados/PlacaManipuladora/placa5.webp"
        ],
        video: ["../../img/maquinados/PlacaManipuladora/placavideo1.mp4"]
    },
    3: {
        title: "DADOS",
        description: "Resultado: Corte limpio y mayor vida útil de herramienta.",
        material: "Acero para herramientas",
        tolerance: "±0.02 mm",
        finish: "Temple y revenido",
        images: [
            "../../img/maquinados/Dados/dados.webp",
            "../../img/maquinados/Dados/dados2.webp",
            "../../img/maquinados/Dados/dados3.webp",
            "../../img/maquinados/Dados/dados4.webp"
        ]
    },
    4: {
        title: "PERFILES DE ALUMINIO",
        description: "Resultado: Mayor rigidez con menor peso.",
        material: "Aluminio 6061 / 7075",
        tolerance: "±0.02 mm",
        finish: "Anodizado",
        images: [
            "../../img/maquinados/PerfilesAluminio/aluminio.webp"


        ]
    },
    5: {
        title: "BUJES DE PROTECCIÓN",
        description: "Resultado: Protección contra desgaste y alineación precisa.",
        material: "Bronce / Acero",
        tolerance: "±0.02 mm",
        finish: "Rectificado",
        images: [
            "../../img/maquinados/BujesProteccion/bujes-proteccion.webp",
            "../../img/maquinados/BujesProteccion/bujes-proteccion2.webp",
            "../../img/maquinados/BujesProteccion/bujes-proteccion3.webp",
            "../../img/maquinados/BujesProteccion/bujes-proteccion4.webp"
        ]
    },
    6: {
        title: "BUJES",
        description: "Resultado: Ajuste exacto y reducción de fricción.",
        material: "Bronce / Acero",
        tolerance: "±0.02 mm",
        finish: "Rectificado",
        images: [
            "../../img/maquinados/Bujes/bujes.webp",
            "../../img/maquinados/Bujes/bujes2.webp",
            "../../img/maquinados/Bujes/bujes3.webp",
            "../../img/maquinados/Bujes/bujes4.webp"
        ]
    },
    7: {
        title: "CUBRE POLVOS",
        description: "Resultado: Protección efectiva contra contaminantes.",
        material: "Caucho / Poliuretano",
        tolerance: "±0.02 mm",
        finish: "Moldeado",
        images: [
            "../../img/maquinados/CubrePolvos/cubre-polvos.webp",
            "../../img/maquinados/CubrePolvos/cubre-polvos2.webp"
        ]
    },
    8: {
        title: "ENGRANE",
        description: "Resultado: Transmisión suave y menor ruido.",
        material: "Acero / Nylon",
        tolerance: "±0.02 mm",
        finish: "Rectificado",
        images: [
            "../../img/maquinados/Engrane/engrane.webp",
            "../../img/maquinados/Engrane/engrane2.webp",
            "../../img/maquinados/Engrane/engrane3.webp",
            "../../img/maquinados/Engrane/engrane4.webp"
        ]
    },
    9: {
        title: "PIEZA PEEK",
        description: "Resultado: Alta resistencia química y térmica.",
        material: "PEEK",
        tolerance: "±0.02 mm",
        finish: "Mecanizado",
        images: [
            "../../img/maquinados/PiezaPeek/peek.webp",
            "../../img/maquinados/PiezaPeek/peek2.webp",
            "../../img/maquinados/PiezaPeek/peek3.webp",
            "../../img/maquinados/PiezaPeek/peek4.webp"
        ]
    },
    10: {
        title: "REGLETAS",
        description: "Resultado: Guía lineal precisa y estable.",
        material: "Acero inoxidable",
        tolerance: "±0.02 mm",
        finish: "Rectificado",
        images: [
            "../../img/maquinados/Regletas/regletas.webp",
            "../../img/maquinados/Regletas/regletas2.webp"
        ]
    },
    11: {
        title: "GRABADO LÁSER",
        description: "Resultado: Marcado permanente de alta precisión.",
        material: "Según pieza",
        tolerance: "±0.02 mm",
        finish: "Grabado láser",
        images: [
            "../../img/maquinados/GrabadoLaser/laser.webp"


        ]
    }
};

// ========== ABRIR MODAL ==========
document.querySelectorAll('.maquinado-card').forEach(card => {
    card.style.cursor = 'pointer';

    card.addEventListener('click', () => {
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
            thumb.loading = 'lazy';
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