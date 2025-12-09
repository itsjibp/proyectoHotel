

$(document).ready(function() {
    // URL base de tu API, donde corre tu servidor Node.js
    const API_URL = 'http://localhost:3000';

    // Inicializar DataTables
    const tablaClientes = $('#tabla-clientes').DataTable();
    const tablaHabitaciones = $('#tabla-habitaciones').DataTable();
    const tablaReservas = $('#tabla-reservas').DataTable();

    // ----------------------------------------------------
    //  Funciones de CARGA (GET)
    // ----------------------------------------------------

    function cargarClientes() {
        $.ajax({
            url: `${API_URL}/clientes`,
            method: 'GET',
            success: function(data) {
                tablaClientes.clear();
                data.forEach(cliente => {
                    tablaClientes.row.add([cliente.id, cliente.nombre, cliente.telefono, cliente.email]);
                });
                tablaClientes.draw();
            },
            error: (err) => console.error("Error al cargar clientes.", err)
        });
    }

    function cargarHabitaciones() {
        $.ajax({
            url: `${API_URL}/habitaciones`,
            method: 'GET',
            success: function(data) {
                tablaHabitaciones.clear();
                data.forEach(hab => {
                    tablaHabitaciones.row.add([hab.numero, hab.tipo, `$${parseFloat(hab.precio).toFixed(2)}`, hab.estado]);
                });
                tablaHabitaciones.draw();
            },
            error: (err) => console.error("Error al cargar habitaciones.", err)
        });
    }

    function cargarReservas() {
        $.ajax({
            url: `${API_URL}/reservas`,
            method: 'GET',
            success: function(data) {
                tablaReservas.clear();
                data.forEach(reserva => {
                    tablaReservas.row.add([reserva.id, reserva.id_cliente, reserva.id_habitacion, reserva.fecha_entrada, reserva.fecha_salida]);
                });
                tablaReservas.draw();
            },
            error: (err) => console.error("Error al cargar reservas.", err)
        });
    }

    // ----------------------------------------------------
    //  Eventos de REGISTRO (POST)
    // ----------------------------------------------------

    // Evento para Registrar Cliente
    $('#form-cliente').on('submit', function(e) {
        e.preventDefault();
        const nuevoCliente = {
            nombre: $('#cliente-nombre').val(),
            telefono: $('#cliente-telefono').val(),
            email: $('#cliente-email').val()
        };

        $.ajax({
            url: `${API_URL}/cliente`,
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(nuevoCliente),
            success: function(response) {
                alert('Cliente registrado con éxito.');
                $('#form-cliente')[0].reset();
                cargarClientes();
            },
            error: (err) => alert('Error al registrar cliente. Revisa tu backend.')
        });
    });
    
    // Evento para Registrar Habitación
    $('#form-habitacion').on('submit', function(e) {
        e.preventDefault();
        const nuevaHab = {
            numero: $('#hab-numero').val(),
            tipo: $('#hab-tipo').val(),
            precio: parseFloat($('#hab-precio').val()),
            estado: $('#hab-estado').val()
        };

        $.ajax({
            url: `${API_URL}/habitacion`,
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(nuevaHab),
            success: function(response) {
                alert('Habitación registrada con éxito.');
                $('#form-habitacion')[0].reset();
                cargarHabitaciones();
            },
            error: (err) => alert('Error al registrar habitación. Revisa tu backend.')
        });
    });

    // Evento para Registrar Reserva
    $('#form-reserva').on('submit', function(e) {
        e.preventDefault();
        const nuevaReserva = {
            // ¡CORRECCIÓN! Eliminamos parseInt() para evitar el error de tipo de dato
            id_cliente: $('#res-id-cliente').val(), 
            id_habitacion: $('#res-id-habitacion').val(), 
            fecha_entrada: $('#res-fecha-entrada').val(),
            fecha_salida: $('#res-fecha-salida').val()
        };

        $.ajax({
            url: `${API_URL}/reserva`,
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(nuevaReserva),
            success: function(response) {
                alert('Reserva registrada con éxito.');
                $('#form-reserva')[0].reset();
                cargarReservas();
            },
            error: (err) => alert('Error al registrar reserva. Revisa tu backend y verifica que los IDs de Cliente y Habitación existan.')
        });
    });


    // ----------------------------------------------------
    //  Carga inicial de datos al iniciar la página
    // ----------------------------------------------------
    cargarClientes();
    cargarHabitaciones();
    cargarReservas();

});
