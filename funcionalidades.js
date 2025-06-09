// Acordeón del footer
document.querySelectorAll('.accordion-title').forEach(btn => {
    btn.addEventListener('click', function() {
        const isActive = this.classList.contains('active');
        document.querySelectorAll('.accordion-title').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.accordion-content').forEach(c => {
            c.style.maxHeight = '0px';
            c.classList.remove('open');
        });
        if (!isActive) {
            this.classList.add('active');
            const content = this.nextElementSibling;
            content.classList.add('open');
            const padding = 32;
            content.style.maxHeight = (content.scrollHeight + padding) + "px";
        }
    });
});

// Filtro de productos por categoría
document.querySelectorAll('.filtro .item').forEach(btn => {
    btn.addEventListener('click', function() {
        const categoria = this.getAttribute('data-categoria');
        document.querySelectorAll('.producto').forEach(prod => {
            if (categoria === "todos" || prod.getAttribute('data-categoria') === categoria) {
                prod.style.display = '';
            } else {
                prod.style.display = 'none';
            }
        });
        document.querySelectorAll('.filtro .item').forEach(b => b.classList.remove('activo'));
        this.classList.add('activo');
    });
});