<?php
    include 'conexion_BD.php';

    $Nombre = $_POST["Nombre"];
    $Apellido = $_POST["Apellido"];
    $Email = $_POST["Email"];
    $Contrasena = $_POST["Contraseña"];

    $query = "INSER INTO USUARIOS(NOMBRE, APELLIDO, CORREO, CONTRASEÑA)
                VALUES('$Nombre', '$Apellido', '$Email', '$Contrasena')";

    $result = mysqli_query($conexion, $query);