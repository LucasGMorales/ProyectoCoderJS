
let valorCarritoTotal = 0

function sumarTotalCarrito(precioAlimento) {
    valorCarritoTotal = valorCarritoTotal + precioAlimento
}

let listaAlimentos = parseInt(prompt("Alimentos Omega\n1-Harina Integral x1kg _ $900 \n2-Semillas de chia x500gr _ $1000 \n3-Fideos integrales x250gr _ $600\n0- Para finalizar la compra"));

while (listaAlimentos !== 0) {
    switch (listaAlimentos) {
        case 1:
            alert("Agregaste Harina integral x1kg a tu carrito!");
            sumarTotalCarrito(900)
            break;
        case 2:
            alert("Agregaste Semillas de chia x500gr a tu carrito!");
            sumarTotalCarrito(1000)
            break;
        case 3:
            alert("Agregaste Fideos integrales x250gr a tu carrito!");
            sumarTotalCarrito(600)
            break;
        default:
            alert("Error: Elegir producto de la lista.");
            break;

    }

    listaAlimentos = parseInt(prompt("Alimentos Omega\n1-Harina Integral x1kg _ $900 \n2-Semillas de chia x500gr _ $1000 \n3-Fideos integrales x250gr _ $600\n0- Para finalizar la compra"));
}

alert("El monto a pagar es de $"+valorCarritoTotal+"\ ¡Gracias por su compra! Vuelva prontos")
