const mysql = require('mysql2');

// Crear la conexión a la base de datos
const connection = mysql.createConnection({
  host: 'localhost',    // El servidor MySQL está en tu máquina local
  user: 'root',         // Usuario por defecto de MySQL
  password: 'HianStiven#324', // Contraseña que configuraste durante la instalación de MySQL
  database: 'ventas_vehiculos'  // Nombre de la base de datos que creaste en MySQL
});

// Intentar conectar a la base de datos
connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err.stack);
    return;
  }
  console.log('Conexión a la base de datos establecida con éxito!');
});

// Exportar la conexión para usarla en otros archivos
module.exports = connection;
