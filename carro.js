let carroDeCompras = [];

function agregarAlCarro(producto, cantidad) {
    let encontrado = false;
    for (const element of carroDeCompras) {
        if (element.producto === producto) {
        element.cantidad += cantidad;
        encontrado = true;
        break;
        }
    }
        if (!encontrado){
        carroDeCompras.push({producto: producto, cantidad: cantidad});
        }
}

function calcularPrecioTotal() {
    let total = 0;
    for (const element of carroDeCompras) {
        let precio = productos[element.producto].precio;
        let cantidad = element.cantidad;
        if (productos[element.producto].descuento) {
        let descuento = productos[element.producto].descuento;
        total += precio * cantidad * (1 - descuento/100);
        } else {
        total += precio * cantidad;
        }
    }
    return total;
}

function vaciarCarro() {
    carroDeCompras = [];
}
