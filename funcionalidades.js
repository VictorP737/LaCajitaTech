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

//boton comprar ahora cada producto
// Funcionalidad para botón COMPRAR AHORA
document.querySelectorAll('.btn-comprar-ahora').forEach(btn => {
    btn.addEventListener('click', function () {
        const producto = this.getAttribute('data-producto');
        const precio = this.getAttribute('data-precio');
        const mensaje = `¡Hola LaCajitaTech! Quiero comprar: ${producto} - $${precio}`;
        const numero = '573113903985'; // Cambiar si es necesario
        window.open(`https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`, '_blank');
    });
});

// Mostrar/ocultar flecha "volver arriba" solo en móvil
function esMovil() {
    return window.innerWidth <= 768;
}

function actualizarFlechaArriba() {
    const btn = document.getElementById('btn-arriba');
    if (!btn) return;
    if (esMovil() && window.scrollY > 200) {
        btn.style.display = 'block';
    } else {
        btn.style.display = 'none';
    }
}

window.addEventListener('scroll', actualizarFlechaArriba);
window.addEventListener('resize', actualizarFlechaArriba);

const btnArriba = document.getElementById('btn-arriba');
if (btnArriba) {
    btnArriba.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}
