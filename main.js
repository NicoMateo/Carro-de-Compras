let productos = {
    'camisa': {
        precio: 25,
        descuento: 10
    },
    'pantalon': {
        precio: 40,
        descuento: 20
    },
    'zapatos': {
        precio: 50,
        descuento: 0
    }
};

let carroDeCompras = [];

function agregarAlCarro() {
    let productoInput = document.getElementById('producto');
    let cantidadInput = document.getElementById('cantidad');
    
    let producto = productoInput.value;
    let cantidad = parseInt(cantidadInput.value);

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
        let precio = productos[element.producto].precio;
        let cantidad = element.cantidad;
        if (productos[element.producto].descuento) {
            let descuento = productos[element.producto].descuento;
            total += precio * cantidad * (1 - descuento / 100);
        } else {
            total += precio * cantidad;
        }
    }
    alert(`El precio total de tu compra es de $${total.toFixed(2)}.`);
}

function vaciarCarro() {
    carroDeCompras = [];
    alert('El carrito de compras ha sido vaciado.');
}

function buscarProducto() {
    let productoBuscadoInput = document.getElementById('productoBuscado');
    let productoBuscado = productoBuscadoInput.value;
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
    let descuentoMinimoInput = document.getElementById('descuentoMinimo');
    let descuentoMinimo = parseInt(descuentoMinimoInput.value);

    let productosConDescuento = carroDeCompras.filter(element => {
        let descuento = productos[element.producto].descuento;
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


