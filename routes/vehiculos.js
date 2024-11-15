const express = require('express');
const router = express.Router();
const connection = require('../config/db');  // Asegúrate de que la conexión a la base de datos esté bien importada

// Ruta para obtener los vehículos desde la base de datos
router.get('/', (req, res) => {
  connection.query('SELECT * FROM vehiculos', (err, results) => {
    if (err) {
      console.error('Error al obtener vehículos:', err.stack);
      return res.status(500).send('Error al obtener vehículos');
    }
    res.json(results);  // Devuelve los resultados de la base de datos en formato JSON
  });
});

module.exports = router;

// routes/vehiculos.js

// Ruta para crear un nuevo vehículo
router.post('/', (req, res) => {
    const { marca, modelo, año, precio } = req.body;  // Recibe los datos del vehículo desde el cuerpo de la solicitud
  
    // Verifica que los datos estén presentes
    if (!marca || !modelo || !año || !precio) {
      return res.status(400).send('Faltan datos del vehículo');
    }
  
    // Inserta el nuevo vehículo en la base de datos
    const query = 'INSERT INTO vehiculos (marca, modelo, año, precio) VALUES (?, ?, ?, ?)';
    connection.query(query, [marca, modelo, año, precio], (err, results) => {
      if (err) {
        console.error('Error al insertar vehículo:', err.stack);
        return res.status(500).send('Error al insertar vehículo');
      }
      res.status(201).send('Vehículo creado con éxito');  // Responde con éxito
    });
  });
  
  // routes/vehiculos.js

// Ruta para actualizar un vehículo por ID
router.put('/:id', (req, res) => {
    const { id } = req.params;  // Obtenemos el ID del vehículo desde los parámetros de la URL
    const { marca, modelo, año, precio } = req.body;  // Obtenemos los nuevos datos del vehículo
  
    // Verifica que los datos estén presentes
    if (!marca || !modelo || !año || !precio) {
      return res.status(400).send('Faltan datos del vehículo');
    }
  
    // Realiza la actualización del vehículo en la base de datos
    const query = 'UPDATE vehiculos SET marca = ?, modelo = ?, año = ?, precio = ? WHERE id = ?';
    connection.query(query, [marca, modelo, año, precio, id], (err, results) => {
      if (err) {
        console.error('Error al actualizar vehículo:', err.stack);
        return res.status(500).send('Error al actualizar vehículo');
      }
      if (results.affectedRows === 0) {
        return res.status(404).send('Vehículo no encontrado');
      }
      res.send('Vehículo actualizado con éxito');
    });
  });

  // routes/vehiculos.js

// Ruta para eliminar un vehículo por ID
router.delete('/:id', (req, res) => {
    const { id } = req.params;  // Obtenemos el ID del vehículo desde los parámetros de la URL
  
    // Realiza la eliminación del vehículo en la base de datos
    const query = 'DELETE FROM vehiculos WHERE id = ?';
    connection.query(query, [id], (err, results) => {
      if (err) {
        console.error('Error al eliminar vehículo:', err.stack);
        return res.status(500).send('Error al eliminar vehículo');
      }
      if (results.affectedRows === 0) {
        return res.status(404).send('Vehículo no encontrado');
      }
      res.send('Vehículo eliminado con éxito');
    });
  });
  
