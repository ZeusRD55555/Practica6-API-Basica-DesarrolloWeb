
const express = require('express')
const app = express()

// Permite recibir datos en formato JSON
app.use(express.json())

// Lista inicial de productos
const productos = [
    {
        id: 1,
        nombre: 'Teclado inalambrico',
        descripcion: 'Teclado 101 teclas idioma ingles',
        precio: 1500.00
    },
    {
        id: 2,
        nombre: 'Mouse inalambrico',
        descripcion: 'Mouse optico inalambrico.',
        precio: 600.00
    },
    {
        id: 3,
        nombre: 'Monitor 23.5 pulgadas full hd',
        descripcion: 'Monitor Full HD panel IPS',
        precio: 6500.00
    }
]

// GET - Listar todos los productos
app.get('/productos', (req, res) => {
    // Devuelve la lista completa
    res.json(productos)
})

// GET - Obtener un producto por id
app.get('/productos/:id', (req, res) => {
    // Obtiene el ID enviado en la URL
    const id = parseInt(req.params.id)
    // Busca el producto que tenga ese ID
    const producto = productos.find(p => p.id === id)

    // Verifica si el producto existe
    if (!producto) {
        return res.status(404).json({ mensaje: 'Producto no encontrado' })
    }

    res.json(producto)
})


// ============================================================
// PRÁCTICA 6: Completa los siguientes métodos de la API
// ============================================================

// TODO: POST /productos - Crear nuevo producto
app.post('/productos', (req, res) => {
    // Extrae los datos enviados en el cuerpo de la solicitud
    const { nombre, descripcion, precio } = req.body

    // Comprueba que todos los campos estén completos
    if (!nombre || !descripcion || precio === undefined) {
        return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' })
    }

    // Genera un nuevo ID tomando como referencia el mayor existente
    const nuevoId = Math.max(...productos.map(p => p.id)) + 1

    // Crea el objeto del nuevo producto
    const nuevoProducto = {
        id: nuevoId,
        nombre,
        descripcion,
        precio: parseFloat(precio)
    }

    // Agrega el producto a la lista
    productos.push(nuevoProducto)

    // Devuelve el producto creado con estado 201
    res.status(201).json(nuevoProducto)
})

// TODO: PUT /productos/:id - Actualizar producto
app.put('/productos/:id', (req, res) => {
    // Obtiene el ID y busca su posición en la lista
    const id = parseInt(req.params.id)
    const indice = productos.findIndex(p => p.id === id)

    // Comprueba si el producto existe
    if (indice === -1) {
        return res.status(404).json({ mensaje: 'Producto no encontrado' })
    }

    // Recibe los nuevos datos del producto
    const { nombre, descripcion, precio } = req.body

    // Verifica que todos los campos estén completos
    if (!nombre || !descripcion || precio === undefined) {
        return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' })
    }

    // Reemplaza los datos del producto seleccionado
    productos[indice] = {
        id: id,
        nombre,
        descripcion,
        precio: parseFloat(precio)
    }

    // Devuelve el producto actualizado
    res.status(200).json(productos[indice])
})

// TODO: DELETE /productos/:id - Eliminar producto
app.delete('/productos/:id', (req, res) => {
    // Obtiene el ID y busca la posición del producto
    const id = parseInt(req.params.id)
    const indice = productos.findIndex(p => p.id === id)

    // Comprueba si el producto existe
    if (indice === -1) {
        return res.status(404).json({ mensaje: 'Producto no encontrado' })
    }

    // Guarda el producto antes de eliminarlo
    const productoEliminado = productos[indice]

    // Elimina un elemento de la lista usando su posición
    productos.splice(indice, 1)

    // Confirma la eliminación y devuelve el producto eliminado
    res.status(200).json({
        mensaje: 'Producto eliminado',
        producto: productoEliminado
    })
})

// Inicia el servidor en el puerto 3000
app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000')
})
