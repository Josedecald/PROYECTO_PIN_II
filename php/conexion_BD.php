<?php
$conexion = mysqli_connect("bokzfymrzwfpccbqsjza-mysql.services.clever-cloud.com", "uxqieajd9dm1llbe", "QrGkyfXIT8cd4hf4ik7v", "bokzfymrzwfpccbqsjza");

if (!$conexion) {
    die("Error de conexión: " . mysqli_connect_error());
} else {
    echo "Conexión exitosa a la base de datos";
}
