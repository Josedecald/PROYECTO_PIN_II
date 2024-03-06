<?php
$host = "localhost:3306";
$database = "usuarios";
$user = "root";
$password = "123456";

$conexion = mysqli_connect($host, $user, $password, $database);

if (!$conexion) {
    die("Error de conexión: " . mysqli_connect_error());
} else {
    echo "Conexión exitosa a la base de datos";
}
