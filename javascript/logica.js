
console.table(productos);

let hoy = new Date().getDay();
const dias = ["Lunes","Martes","Miercoles","Jueves","Viernes","Sabado","Domingo"]
alert(`Feliz ${dias[hoy]}! el peor dia de la semana ¬¬`);

function filtrarPrecioMax(precioMax) {

    const filtro = productos.filter((producto) => producto.precio <= precioMax);

    if (filtro.length != 0) {

        let textoAlert = "Los productos que tenemos debajo de ese precio:  \n";
        filtro.forEach((producto) => {
            textoAlert += `Codigo: ${producto.id} - ${producto.nombre} - $ ${producto.precio}\n`;
        });
        alert(textoAlert);
    } else {
        alert("Tan barato no vendemos, esto es argentina rey");
    }
    alert("")
}

let precio = parseFloat(prompt("Ingresa el precio maximo que puedes abonar *ingrese 0 para cancelar*"));

while (precio != 0) {
    filtrarPrecioMax(precio);

    precio = parseFloat(prompt("Ingresa el precio maximo que puedes abonar *ingrese 0 para cancelar*"));
}

