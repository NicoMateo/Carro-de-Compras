const productos = {
    camisa: {
    precio: 25,
    descuento: 10
    },
    pantalon: {
    precio: 40,
    descuento: 20
    },
    zapatos: {
    precio: 50,
    descuento: 0
    }
};

let carroDeCompras = [];

function agregarAlCarro() {
const productoInput = document.getElementById('producto');
const cantidadInput = document.getElementById('cantidad');
    
const producto = productoInput.value;
const cantidad = parseInt(cantidadInput.value);

    if (producto && cantidad) {
    let encontrado = false;
    for (const element of carroDeCompras) {
        if (element.producto === producto) {
        element.cantidad += cantidad;
        encontrado = true;
        break;
        }
    }
    if (!encontrado) {
    carroDeCompras.push({ producto: producto, cantidad: cantidad });
    }
    alert(`Se ha agregado ${cantidad} unidades de ${producto} al carrito de compras.`);
    } else {
    alert('Debe introducir un producto y una cantidad válidos.');
    }

    productoInput.value = '';
    cantidadInput.value = '';
}

function calcularPrecioTotal() {
    let total = 0;
    for (const element of carroDeCompras) {
    const { producto, cantidad } = element;
    const { precio, descuento } = productos[producto];
      total += precio * cantidad * (1 - descuento / 100);
    }
    alert(`El precio total de tu compra es de $${total.toFixed(2)}.`);
}

function vaciarCarro() {
    carroDeCompras = [];
    alert('El carrito de compras ha sido vaciado.');
}

function buscarProducto() {
    const productoBuscadoInput = document.getElementById('productoBuscado');
    const productoBuscado = productoBuscadoInput.value;
    let encontrado = false;

    for (const element of carroDeCompras) {
    if (element.producto === productoBuscado) {
        encontrado = true;
        alert(`El producto ${productoBuscado} se encuentra en el carrito.`);
        break;
    }
    }

    if (!encontrado) {
    alert(`El producto ${productoBuscado} no se encuentra en el carrito.`);
    }

    productoBuscadoInput.value = '';
}

function filtrarPorDescuento() {
    const descuentoMinimoInput = document.getElementById('descuentoMinimo');
    const descuentoMinimo = parseInt(descuentoMinimoInput.value);

    const productosConDescuento = carroDeCompras.filter(element => {
    const descuento = productos[element.producto].descuento;
    return descuento >= descuentoMinimo;
    });

    if (productosConDescuento.length > 0) {
    alert('Los siguientes productos tienen un descuento igual o mayor al valor introducido:');
    for (const element of productosConDescuento) {
        alert(`- ${element.producto}`);
    }
    } else {
    alert('No hay productos con un descuento igual o mayor al valor introducido.');
    }

    descuentoMinimoInput.value = '';
}


