// app.js
const express = require('express');
const app = express();
const vehiculosRoutes = require('./routes/vehiculos'); // Importa las rutas de vehículos
const connection = require('./config/db');  // Importa la conexión a la base de datos

// Middleware para procesar datos JSON en las peticiones
app.use(express.json());

// Ruta de vehículos
app.use('/api/vehiculos', vehiculosRoutes);

// Iniciar el servidor en el puerto 5000
app.listen(5000, () => {
  console.log('Servidor corriendo en http://localhost:5000');
});
