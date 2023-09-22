console.table(productos);

let hoy = new Date().getDay();
const dias = ["Lunes","Martes","Miercoles","Jueves","Viernes","Sabado","Domingo"]
alert(`Feliz ${dias[hoy]}! el peor dia de la semana ¬¬`);

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
console.log(carrito);


const contenedorProds = document.getElementById('misprods');
const tablaBody = document.getElementById('tablabody');
const btnFinalizar = document.getElementById('finalizar');
const btnVaciar = document.getElementById('vaciar');

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

//DOM
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

    //eventos
    let botones = document.getElementsByClassName('compra');
    for (const boton of botones) {
        //opcion 1 - addEventListener
        boton.addEventListener('click', () => {
            console.log('Hiciste click en el boton cuyo id es ' + boton.id);
            const prodACarro = listaProds.find((producto) => producto.id == boton.id);
            console.log(prodACarro);
            //cargar producto encontrado al carro
            agregarAlCarrito(prodACarro);
        });

        //opcion 2

    }
}

renderizarProds(productos);

function agregarAlCarrito(producto) {
    carrito.push(producto);
    console.table(carrito);

    Swal.fire(
        `Agregaste "${producto.nombre}" correctamente!`,
        'Suma más productos o finaliza la compra en el pie de página!',
        'success'
    )
    //agregar el producto a la tabla

    tablaBody.innerHTML += `
        <tr>
            <td>${producto.id}</td>
            <td>${producto.nombre}</td>
            <td>${producto.precio}</td>
        </tr>
    `;
    //calcular el total gastado hasta el momento
    const subTotal = carrito.reduce((acumulador, prod) => acumulador + prod.precio, 0);
    console.log('Subtotal $' + subTotal);
    document.getElementById('total').innerText = 'Total a pagar $:' + subTotal;
    //localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

btnFinalizar.onclick = () => {
    if (carrito.length === 0) {
        Swal.fire({
            title: 'No podes comprar la nada misma',
            imageUrl: 'https://memeprod.sgp1.digitaloceanspaces.com/user-maker-thumbnail/042d89bdfeb4267b666e01aba51d5629.gif',
            imageWidth: 400,
            imageHeight: 330,
            imageAlt: 'Custom image',
        });
    ;    
    } else {
        const subTotal = carrito.reduce((acumulador, prod) => acumulador + prod.precio, 0);
        Swal.fire({
            title: 'Gracias por tu compra !!!',
            text: `Recibiras tu pedido en 48hs... creo. Debes abonarle al repartidor $${subTotal}`,
            imageUrl: 'https://media.tenor.com/aoU9vq-JavUAAAAM/driver-homer.gif',
            imageWidth: 400,
            imageHeight: 330,
            imageAlt: 'Custom image',
        });
        carrito = [];
        tablaBody.innerHTML = '';
        document.getElementById('total').innerText = 'Total a pagar $:';
        localStorage.removeItem('carrito');
    }
}


btnVaciar.onclick = () => {
    carrito = [];
    tablaBody.innerHTML = '';
    document.getElementById('total').innerText = 'Total a pagar $:';
    localStorage.removeItem('carrito');
    Swal.fire(
        `Espero que lo llenes rapido... estamos con problemas financieros`,
    )

}

// filtro precios max

const btnFiltrar = document.getElementById('btnFiltrar');
const btnLimpiarFiltro = document.getElementById('btnLimpiarFiltro');
const inputPrecioMax = document.getElementById('PrecioMax');

btnFiltrar.addEventListener('click', () => {
    const precioMaxInput = inputPrecioMax.value;

    if (precioMaxInput === '') {
        Swal.fire({
            text: 'ingresa algo en el input, genio',
            imageUrl: 'https://i.pinimg.com/1200x/51/a9/94/51a99455fc929e4a07b72d1f86ca8fe0.jpg',
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: 'Custom image',
        })
        return;
    }

    const precioMax = parseInt(precioMaxInput);

    const productosCumplenFiltro = productos.some(producto => producto.precio <= precioMax);  //no recuerdo haber visto el some en clase, pero lo encontre en esta pagina de metodos: https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/some

    if (!productosCumplenFiltro) {
        Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Tan barato no vendemos, esto es argentina rey',
        })
        return;
    }

    const productosFiltrados = productos.filter(producto => producto.precio <= precioMax);

    renderizarProds(productosFiltrados);
});

btnLimpiarFiltro.addEventListener('click', () => {
    inputPrecioMax.value = '';
    renderizarProds(productos);
});
