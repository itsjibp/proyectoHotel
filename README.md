
### Paso 1: Configuración de la Base de Datos

1.  Abre tu cliente MySQL (MySQL Workbench, phpMyAdmin, etc.).
2.  Crea una nueva base de datos llamada `proyecto_hotel`.
3.  Ejecuta los siguientes comandos SQL para crear las tablas:

    ```sql
    -- CLIENTES (La clave primaria es AUTO_INCREMENT)
    CREATE TABLE clientes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL,
        telefono VARCHAR(20),
        email VARCHAR(100) UNIQUE NOT NULL
    );

    -- HABITACIONES (La clave primaria es VARCHAR)
    CREATE TABLE habitaciones (
        numero VARCHAR(10) PRIMARY KEY,
        tipo VARCHAR(50) NOT NULL,
        precio DECIMAL(10, 2) NOT NULL,
        estado ENUM('disponible', 'ocupada', 'mantenimiento') NOT NULL
    );

    -- RESERVAS (Contiene claves foráneas)
    CREATE TABLE reservas (
        id INT AUTO_INCREMENT PRIMARY KEY,
        id_cliente INT,
        id_habitacion VARCHAR(10),
        fecha_entrada DATE NOT NULL,
        fecha_salida DATE NOT NULL,
        FOREIGN KEY (id_cliente) REFERENCES clientes(id),
        FOREIGN KEY (id_habitacion) REFERENCES habitaciones(numero)
    );
    ```

### Paso 2: Configuración del Backend (Node.js)

1.  Navega a la carpeta del proyecto en tu terminal.
2.  Instala las dependencias necesarias (`express`, `mysql2`, `cors`):

    ```bash
    npm install express mysql2 cors
    ```
    *(**Nota:** El archivo `package.json` también debe existir para que esto funcione, pero asumo que ya lo tienes).*

### Paso 3: Ejecución del Proyecto

1.  **Iniciar el Servidor:** En la terminal, ejecuta el servidor Node.js:

    ```bash
    node index.js
    ```
    *Verás el mensaje `🚀 Servidor corriendo en http://localhost:3000`.*

2.  **Abrir el Frontend:** Abre tu navegador web y abre el archivo `index.html` directamente (o navega a `http://localhost:3000/index.html` si lo estás sirviendo con Express).

## 🔑 Endpoints de la API

| Método | Ruta | Descripción |
| :--- | :--- | :--- |
| `GET` | `/clientes` | Obtiene todos los clientes. |
| `POST`| `/cliente` | Registra un nuevo cliente. |
| `GET` | `/habitaciones`| Obtiene todas las habitaciones. |
| `POST`| `/habitacion`| Registra una nueva habitación. |
| `GET` | `/reservas` | Obtiene todas las reservas. |
| `POST`| `/reserva` | Registra una nueva reserva. |

## ⚠️ Nota Importante sobre Reservas

Para que el registro de reservas funcione (`POST /reserva`), **DEBES** ingresar un `ID Cliente` y un `ID Habitación` que ya existan en sus respectivas tablas. La base de datos aplica restricciones de Clave Foránea (FK).