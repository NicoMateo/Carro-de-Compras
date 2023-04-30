// Objeto para almacenar los productos del carro de compras
var carroDeCompras = {};

// Función para agregar un producto al objeto del carro de compras
function agregarProducto(producto, precio, cantidad) {
    if (carroDeCompras[producto]) {
        carroDeCompras[producto].cantidad += cantidad;
    } else {
        carroDeCompras[producto] = {
            precio: precio,
            cantidad: cantidad
        };
    }
    actualizarTabla();
}

// Función para eliminar un producto del objeto del carro de compras
function eliminarProducto(producto) {
    delete carroDeCompras[producto];
    actualizarTabla();
}

// Función para actualizar la tabla HTML con los productos del carro de compras
function actualizarTabla() {
    var tabla = document.getElementById("carro").getElementsByTagName("tbody")[0];
    tabla.innerHTML = "";
    for (var producto in carroDeCompras) {
        var fila = tabla.insertRow(-1);
        var celdaProducto = fila.insertCell(0);
        var celdaPrecio = fila.insertCell(1);
        var celdaCantidad = fila.insertCell(2);
        var celdaTotal = fila.insertCell(3);
        var celdaEliminar = fila.insertCell(4);
        celdaProducto.innerHTML = producto;
        celdaPrecio.innerHTML = carroDeCompras[producto].precio;
        celdaCantidad.innerHTML = carroDeCompras[producto].cantidad;
        celdaTotal.innerHTML = carroDeCompras[producto].precio * carroDeCompras[producto].cantidad;
        celdaEliminar.innerHTML = '<button onclick="eliminarProducto(\'' + producto + '\')">Eliminar</button>';
    }
}

// Evento para agregar un producto al carro de compras
document.getElementById("agregarProducto").addEventListener("submit", function(event) {
    event.preventDefault();
    var producto = document.getElementById("producto").value;
    var precio = parseFloat(document.getElementById("precio").value);
    var cantidad = parseInt(document.getElementById("cantidad").value);
    agregarProducto(producto, precio, cantidad);
    document.getElementById("agregarProducto").reset();
});

// Evento para finalizar la compra
document.getElementById("finalizarCompra").addEventListener("click", function() {
    var total = 0;
    for (var producto in carroDeCompras) {
        total += carroDeCompras[producto].precio * carroDeCompras[producto].cantidad;
    }
    alert("Total de la compra: $" + total);
    carroDeCompras = {};
    actualizarTabla();
});
