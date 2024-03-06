<?php
$conexion = mysqli_connect("localhost", "root", "123456", "usuarios");

if (!$conexion) {
    die("Error de conexión: " . mysqli_connect_error());
} else {
    echo "Conexión exitosa a la base de datos";
}
