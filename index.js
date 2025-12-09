// ----------------------------------------------------
// Servidor Node.js (Backend)
// ----------------------------------------------------
const express = require('express');
const mysql = require('mysql2'); 
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware para procesar JSON y habilitar CORS
app.use(express.json());
app.use(cors());

// =========================
// Conexión a la base de datos MySQL
// =========================
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root', // Asegúrate de que esta sea tu contraseña real
    database: 'proyecto_hotel'
});

db.connect(err => {
    if (err) {
        console.error('Error de conexión a MySQL:', err.message);
        return;
    }
    console.log('Conectado exitosamente a la base de datos MySQL (proyecto_hotel)');
});

// ----------------------------------------------------
// Rutas API (Endpoints)
// ----------------------------------------------------

// 1. OBTENER todos los clientes (GET /clientes)
app.get('/clientes', (req, res) => {
    const sql = 'SELECT * FROM clientes';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// 2. REGISTRAR un nuevo cliente (POST /cliente)
app.post('/cliente', (req, res) => {
    const { nombre, telefono, email } = req.body;
    const sql = 'INSERT INTO clientes (nombre, telefono, email) VALUES (?, ?, ?)';
    db.query(sql, [nombre, telefono, email], (err, result) => {
        if (err) {
            console.error('Error al registrar cliente:', err);
            return res.status(500).json({ error: 'Error al registrar cliente en la BD' });
        }
        res.status(201).json({ message: 'Cliente registrado', id: result.insertId });
    });
});

// 3. OBTENER todas las habitaciones (GET /habitaciones)
app.get('/habitaciones', (req, res) => {
    const sql = 'SELECT * FROM habitaciones';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// 4. REGISTRAR una nueva habitación (POST /habitacion)
app.post('/habitacion', (req, res) => {
    const { numero, tipo, precio, estado } = req.body;
    const sql = 'INSERT INTO habitaciones (numero, tipo, precio, estado) VALUES (?, ?, ?, ?)';
    db.query(sql, [numero, tipo, precio, estado], (err, result) => {
        if (err) {
            console.error('Error al registrar habitación:', err);
            return res.status(500).json({ error: 'Error al registrar habitación en la BD' });
        }
        res.status(201).json({ message: 'Habitación registrada' });
    });
});

// 5. OBTENER todas las reservas (GET /reservas)
app.get('/reservas', (req, res) => {
    const sql = 'SELECT * FROM reservas';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// 6. REGISTRAR una nueva reserva (POST /reserva)
app.post('/reserva', (req, res) => {
    const { id_cliente, id_habitacion, fecha_entrada, fecha_salida } = req.body;
    const sql = 'INSERT INTO reservas (id_cliente, id_habitacion, fecha_entrada, fecha_salida) VALUES (?, ?, ?, ?)';
    db.query(sql, [id_cliente, id_habitacion, fecha_entrada, fecha_salida], (err, result) => {
        if (err) {
            console.error('Error al registrar reserva:', err);
            // Manejo de errores de Clave Foránea (FK)
            if (err.code === 'ER_NO_REFERENCED_ROW_2' || err.code === 'ER_NO_REFERENCED_ROW') {
                return res.status(400).json({ error: 'ID de Cliente o Habitación no encontrado.' });
            }
            return res.status(500).json({ error: 'Error al registrar reserva en la BD' });
        }
        res.status(201).json({ message: 'Reserva registrada', id: result.insertId });
    });
});

// Iniciar el servidor de Express
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});