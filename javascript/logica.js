let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
console.log(carrito);


const contenedorProds = document.getElementById('misprods');
const tablaBody = document.getElementById('tablabody');
const btnFinalizar = document.getElementById('finalizar');
const btnVaciar = document.getElementById('vaciar');
const carritoImg = document.getElementById('carrito-img');

const indicadorCarrito = document.createElement('div'); // buruja que indica los elementos en el carrito (no funciona)

indicadorCarrito.id = 'carrito-indicador';

carritoImg.appendChild(indicadorCarrito); // buruja que indica los elementos en el carrito (no funciona)
let productos = [];



// Función para actualizar el indicador de cantidad en el carrito, no logre que funcione, tengo un error con el css que no pude encontrar
function actualizarIndicador() {
    if (carrito.length > 0) {
        indicadorCarrito.style.display = 'block'; 
        indicadorCarrito.textContent = carrito.length; 
    } else {
        indicadorCarrito.style.display = 'none'; 
    }
}

// Función de Fetch para cargar los datos desde "productos.json" (local)
fetch('../json/productos.json')
    .then((response) => response.json())
    .then((data) => {
        productos = data;
        renderizarProds(productos);
    })
    .catch((error) => {
        console.error('Error al cargar los datos:', error);
    });

// DOM
function renderizarProds(listaProds) {
    contenedorProds.innerHTML = '';
    for (const prod of listaProds) {
        contenedorProds.innerHTML += `
            <div class="card" style="width: 18rem;">
                <img class="card-img-top" src=${prod.foto} alt=${prod.nombre}/>
                <div class="card-body">
                    <h5 class="card-title">${prod.nombre}</h5>
                    <p class="card-text">$ ${prod.precio}</p>
                    <button id=${prod.id} class="btn btn-primary compra">Comprar</button>
                </div>
            </div>
        `;
    }

    const carritoNav = document.getElementById("carritonav");
    // tabla carrito
    function dibujarTabla() {
        for (const prod of carrito) {
            tablaBody.innerHTML += `
                <tr>
                    <td>${prod.id}</td>
                    <td>${prod.nombre}</td>
                    <td>${prod.precio}</td>
                </tr>
            `;
        }

        const subTotal = carrito.reduce((acumulador, prod) => acumulador + prod.precio, 0);
        console.log('Subtotal $' + subTotal);
        document.getElementById('total').innerText = 'Total a pagar $:' + subTotal;
    }

    if (carrito.length != 0) {
        dibujarTabla();
    }

    // Eventos
    let botones = document.getElementsByClassName('compra');
    for (const boton of botones) {
        boton.addEventListener('click', () => {
            const prodACarro = listaProds.find((producto) => producto.id == boton.id);
            console.log(prodACarro);
            agregarAlCarrito(prodACarro);
        });
    }
}

function agregarAlCarrito(producto) {
    carrito.push(producto);
    console.table(carrito);

    Swal.fire(
        `Agregaste "${producto.nombre}" correctamente!`,
        'Suma más productos o finaliza la compra en el pie de página!',
        'success'
    );

    // Agregar el producto a la tabla
    tablaBody.innerHTML += `
        <tr>
            <td><img src="${producto.foto}" alt="${producto.nombre}" width="50" height="50"></td>
            <td>${producto.nombre}</td>
            <td>${producto.precio}</td>
        </tr>
    `;

    // Calcular el total gastado hasta el momento
    const subTotal = carrito.reduce((acumulador, prod) => acumulador + prod.precio, 0);
    console.log('Subtotal $' + subTotal);
    document.getElementById('total').innerText = 'Total a pagar $:' + subTotal;

    // Almacenar en localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));

    actualizarIndicador(); // buruja que indica los elementos en el carrito (no funciona)
}

btnFinalizar.onclick = () => {
    if (carrito.length === 0) {
        Swal.fire({
            title: 'No puedes comprar la nada misma',
            imageUrl: 'https://memeprod.sgp1.digitaloceanspaces.com/user-maker-thumbnail/042d89bdfeb4267b666e01aba51d5629.gif',
            imageWidth: 400,
            imageHeight: 330,
            imageAlt: 'Custom image',
        });
    } else {
        const subTotal = carrito.reduce((acumulador, prod) => acumulador + prod.precio, 0);
        Swal.fire({
            title: '¡Gracias por tu compra!',
            text: `Recibirás tu pedido en 48 horas. Debes abonarle al repartidor $${subTotal}`,
            imageUrl: 'https://media.tenor.com/aoU9vq-JavUAAAAM/driver-homer.gif',
            imageWidth: 400,
            imageHeight: 330,
            imageAlt: 'Custom image',
        });
        carrito = [];
        tablaBody.innerHTML = '';
        document.getElementById('total').innerText = 'Total a pagar $:';
        localStorage.removeItem('carrito');

        
        actualizarIndicador(); // buruja que indica los elementos en el carrito (no funciona)
    }
}

btnVaciar.onclick = () => {
    carrito = [];
    tablaBody.innerHTML = '';
    document.getElementById('total').innerText = 'Total a pagar $:';
    localStorage.removeItem('carrito');
    Swal.fire(
        `Espero que lo llenes rápido... estamos con problemas financieros`,
    )
    

    actualizarIndicador(); // buruja que indica los elementos en el carrito (no funciona)
}

// Filtro precios máximos

const btnFiltrar = document.getElementById('btnFiltrar');
const btnLimpiarFiltro = document.getElementById('btnLimpiarFiltro');
const inputPrecioMax = document.getElementById('PrecioMax');

inputPrecioMax.addEventListener('keydown', (event) => {  //Event listener para poder apretar enter en el filtrado, para los ansiosos como yo ;)
    if (event.key === 'Enter') {
        event.preventDefault();
        btnFiltrar.click();
    }
});
btnFiltrar.addEventListener('click', () => {
    const precioMaxInput = inputPrecioMax.value;

    if (precioMaxInput === '') {
        Swal.fire({
            text: 'Ingresa algo en el input, genio',
            imageUrl: 'https://i.pinimg.com/1200x/51/a9/94/51a99455fc929e4a07b72d1f86ca8fe0.jpg',
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: 'Custom image',
        });
        return;
    }

    const precioMax = parseInt(precioMaxInput);

    const productosCumplenFiltro = productos.some(producto => producto.precio <= precioMax);

    if (!productosCumplenFiltro) {
        Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Tan barato no vendemos, esto es Argentina, rey',
        });
        return;
    }

    const productosFiltrados = productos.filter(producto => producto.precio <= precioMax);

    renderizarProds(productosFiltrados);
});

btnLimpiarFiltro.addEventListener('click', () => {
    inputPrecioMax.value = '';
    renderizarProds(productos);
});
