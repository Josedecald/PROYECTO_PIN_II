<?php

    $conexion = mysqli_connect("bokzfymrzwfpccbqsjza-mysql.services.clever-cloud.com", "uxqieajd9dm1llbe", "QrGkyfXIT8cd4hf4ik7v", "bokzfymrzwfpccbqsjza");

    if ($conexion)
        echo "Conectado exitosamente a la base de datos";
    else
        echo "Conexion erroneo";