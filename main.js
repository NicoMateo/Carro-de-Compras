const libros = [
    { id: "libro1", titulo: "Título del Libro 1", autor: "Autor del Libro 1", precio: 15 },
    { id: "libro2", titulo: "Título del Libro 2", autor: "Autor del Libro 2", precio: 10 },
    { id: "libro3", titulo: "Título del Libro 3", autor: "Autor del Libro 3", precio: 12 },
    // Agregar más libros 
];

let carroDeCompras = [];

function crearOpcionesLibros() {
    const librosSelect = document.getElementById('libros');

    for (const libro of libros) {
        const option = document.createElement('option');
        option.value = libro.id;
        option.textContent = `${libro.titulo} - ${libro.autor} ($${libro.precio})`;
        librosSelect.appendChild(option);
    }
}

function agregarAlCarro() {
    const librosSelect = document.getElementById('libros');
    const cantidadInput = document.getElementById('cantidad');

    const libroId = librosSelect.value;
    const cantidad = parseInt(cantidadInput.value);

    if (libroId && cantidad) {
        const libroSeleccionado = libros.find(libro => libro.id === libroId);

        if (libroSeleccionado) {
            let encontrado = false;
            for (const element of carroDeCompras) {
                if (element.producto === libroId) {
                    element.cantidad += cantidad;
                    encontrado = true;
                    break;
                }
            }
            if (!encontrado) {
                carroDeCompras.push({ producto: libroId, cantidad: cantidad });
            }

            const { titulo, autor } = libroSeleccionado;
            alert(`Se ha agregado ${cantidad} unidades de "${titulo}" de ${autor} al carrito de compras.`);

            calcularPrecioTotal();
        } else {
            alert('El libro seleccionado no existe.');
        }
    } else {
        alert('Debe seleccionar un libro y especificar una cantidad válida.');
    }

    cantidadInput.value = '';
}

// Llamamos a la función crearOpcionesLibros() para generar las opciones del select
crearOpcionesLibros();

// Asignamos el evento click al botón "Agregar al carrito"
document.getElementById('agregarAlCarro').addEventListener('click', agregarAlCarro);

function calcularPrecioTotal() {
    let total = 0;
    for (const element of carroDeCompras) {
        const { producto, cantidad } = element;
        const libroSeleccionado = libros.find(libro => libro.id === producto);

        if (libroSeleccionado) {
            const { precio } = libroSeleccionado;
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

document.getElementById('calcularPrecioTotal').addEventListener('click', calcularPrecioTotal);
document.getElementById('vaciarCarro').addEventListener('click', vaciarCarro);
document.getElementById('buscarProducto').addEventListener('click', buscarProducto);
