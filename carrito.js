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
        const precio = parseFloat(prod.querySelector('.precio').textContent.replace('$','').replace(',',''));
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
            <span style="margin-left:8px;">$${(prod.precio * prod.cantidad).toLocaleString()}</span>
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
    document.getElementById('carrito-total').textContent = 'Total: $' + total.toLocaleString();
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