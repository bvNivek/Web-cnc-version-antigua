document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('btn-regresar');
    if (btn) {
        btn.addEventListener('click', (e) => {
            if (window.history.length > 1) {
                e.preventDefault();
                window.history.back();
            }
            // Si no hay historial, usa el href normal
        });
    }
});