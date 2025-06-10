// Carrito simple con localStorage

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Mostrar/ocultar modal
document.querySelector('.carrito').addEventListener('click', () => {
    renderCarrito();
    document.getElementById('modal-carrito').style.display = 'flex';
});
document.getElementById('modal-carrito').addEventListener('click', e => {
    if (e.target === document.getElementById('modal-carrito')) {
        document.getElementById('modal-carrito').style.display = 'none';
    }
});
document.getElementById('cerrar-carrito').onclick = () => {
    document.getElementById('modal-carrito').style.display = 'none';
};
document.getElementById('vaciar-carrito').onclick = () => {
    carrito = [];
    localStorage.setItem('carrito', JSON.stringify(carrito));
    renderCarrito();
    actualizarIconoCarrito();
};

// Agregar producto al carrito
document.querySelectorAll('.btn-carrito').forEach((btn) => {
    btn.addEventListener('click', function() {
        const prod = this.closest('.producto');
        const nombre = prod.querySelector('h4').textContent;
        // Obtener el precio del atributo data-precio del botón "COMPRAR AHORA"
        const btnComprar = prod.querySelector('.btn-comprar-ahora');
        const precio = parseInt(btnComprar.getAttribute('data-precio'));
        const img = prod.querySelector('img').src;
        const existe = carrito.find(p => p.nombre === nombre);
        if (existe) {
            existe.cantidad += 1;
        } else {
            carrito.push({ nombre, precio, cantidad: 1, img });
        }
        localStorage.setItem('carrito', JSON.stringify(carrito));
        renderCarrito();
        actualizarIconoCarrito();
        // Mostrar notificación
        const noti = document.getElementById('notificacion-carrito');
        noti.style.display = 'block';
        setTimeout(() => {
            noti.style.display = 'none';
        }, 2100);

    });
});

// Renderizar el carrito con botones + y -
function renderCarrito() {
    const items = document.getElementById('carrito-items');
    items.innerHTML = '';
    if (carrito.length === 0) {
        items.innerHTML = '<p>El carrito está vacío.</p>';
        document.getElementById('carrito-total').textContent = '';
        return;
    }
    carrito.forEach((prod, i) => {
        const div = document.createElement('div');
        div.innerHTML = `
            <img src="${prod.img}" alt="">
            <span style="flex:1;">${prod.nombre}</span>
            <button class="menos" data-i="${i}" style="margin:0 4px;">−</button>
            <span style="min-width:28px;text-align:center;">${prod.cantidad}</span>
            <button class="mas" data-i="${i}" style="margin:0 4px;">+</button>
            <span style="margin-left:8px;">$${(prod.precio * prod.cantidad).toLocaleString('es-CO')}</span>
            <button class="eliminar" data-i="${i}" style="margin-left:8px;">Eliminar</button>
        `;
        items.appendChild(div);
    });
    // Eliminar producto
    items.querySelectorAll('.eliminar').forEach(btn => {
        btn.onclick = function() {
            carrito.splice(this.dataset.i, 1);
            localStorage.setItem('carrito', JSON.stringify(carrito));
            renderCarrito();
            actualizarIconoCarrito();
        };
    });
    // Sumar cantidad
    items.querySelectorAll('.mas').forEach(btn => {
        btn.onclick = function() {
            carrito[this.dataset.i].cantidad += 1;
            localStorage.setItem('carrito', JSON.stringify(carrito));
            renderCarrito();
            actualizarIconoCarrito();
        };
    });
    // Restar cantidad
    items.querySelectorAll('.menos').forEach(btn => {
        btn.onclick = function() {
            if (carrito[this.dataset.i].cantidad > 1) {
                carrito[this.dataset.i].cantidad -= 1;
            } else {
                carrito.splice(this.dataset.i, 1);
            }
            localStorage.setItem('carrito', JSON.stringify(carrito));
            renderCarrito();
            actualizarIconoCarrito();
        };
    });
    // Total
    const total = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
    document.getElementById('carrito-total').textContent = 'Total: $' + total.toLocaleString('es-CO');
}

// Badge del carrito SIEMPRE visible con número
function actualizarIconoCarrito() {
    let badge = document.getElementById('carrito-badge');
    if (!badge) {
        badge = document.createElement('span');
        badge.id = 'carrito-badge';
        document.querySelector('.carrito').appendChild(badge);
    }
    const cantidad = carrito.reduce((acc, p) => acc + p.cantidad, 0);
    badge.textContent = cantidad;
    badge.style.display = 'inline-block';
}
actualizarIconoCarrito();

//funcionalidad comprar
document.getElementById('comprar-whatsapp').addEventListener('click', function() {
    const productos = JSON.parse(localStorage.getItem('carrito')) || [];

    if (productos.length === 0) {
        alert('Tu carrito está vacío');
        return;
    }

    let mensaje = '¡Hola LaCajitaTech! Quiero comprar los siguientes productos:%0A%0A';
    let total = 0;

    productos.forEach((producto, index) => {
        mensaje += `${index + 1}. ${producto.nombre} - $${producto.precio.toLocaleString('es-CO')} x${producto.cantidad}%0A`;
        total += producto.precio * producto.cantidad;
    });

    mensaje += `%0ATotal: $${total.toLocaleString('es-CO')}%0A%0AMi información:%0ANombre: [COMPLETAR]%0ADirección: [COMPLETAR]%0ATeléfono: [COMPLETAR]`;

    const telefono = '573113903985';
    window.open(`https://wa.me/${telefono}?text=${mensaje}`, '_blank');
});