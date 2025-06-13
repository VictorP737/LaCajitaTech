// ==========================
// Acordeón del footer
// ==========================
document.querySelectorAll('.accordion-title').forEach(btn => {
    btn.addEventListener('click', function () {
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

// ==========================
// Filtro de productos por categoría
// ==========================
document.querySelectorAll('.filtro .item').forEach(btn => {
    btn.addEventListener('click', function () {
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

// ==========================
// Botón COMPRAR AHORA (WhatsApp)
// ==========================
document.querySelectorAll('.btn-comprar-ahora').forEach(btn => {
    btn.addEventListener('click', function () {
        const producto = this.getAttribute('data-producto');
        const precio = this.getAttribute('data-precio');
        const mensaje = `¡Hola LaCajitaTech! Quiero comprar: ${producto} - $${precio}`;
        const numero = '573113903985'; // Cambiar si es necesario
        window.open(`https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`, '_blank');
    });
});

// ==========================
// Mostrar/ocultar flecha "volver arriba" solo en móvil
// ==========================
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
    btnArriba.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ==========================
// Cambio automático y manual de imágenes de productos
// ==========================
document.querySelectorAll('.img-cambio').forEach(img => {
    const imagenes = img.getAttribute('data-imagenes').split(',');
    let idx = 0;
    let intervalo;

    function cambiarImagen() {
        idx = (idx + 1) % imagenes.length;
        img.src = imagenes[idx];
    }

    // Cambio automático cada 6 segundos
    intervalo = setInterval(cambiarImagen, 6000);

    // Cambio por click
    img.addEventListener('click', cambiarImagen);

    // Pausa el cambio automático si el mouse está encima
    img.addEventListener('mouseenter', () => clearInterval(intervalo));
    img.addEventListener('mouseleave', () => {
        intervalo = setInterval(cambiarImagen, 6000);
    });
});

// ==========================
// Flechas de navegación del filtro de categorías
// ==========================
document.addEventListener('DOMContentLoaded', function () {
    const filtro = document.querySelector('.filtro');
    const leftArrow = document.getElementById('filtro-arrow-left');
    const rightArrow = document.getElementById('filtro-arrow-right');
    if (filtro && leftArrow && rightArrow) {
        leftArrow.addEventListener('click', () => {
            filtro.scrollBy({ left: -200, behavior: 'smooth' });
        });
        rightArrow.addEventListener('click', () => {
            filtro.scrollBy({ left: 200, behavior: 'smooth' });
        });
    }
});

document.getElementById('btn-comprar').addEventListener('click', function () {
  fetch('/api/conversion', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      event: 'Purchase',
      email: 'cliente@correo.com',
      phone: '3113903985',
      value: 259000
    })
  })
  .then(res => res.json())
  .then(data => console.log('Conversión enviada:', data))
  .catch(err => console.error('Error al enviar conversión:', err));
});
// ==========================
// Enviar evento de conversión al cargar la página