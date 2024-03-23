<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Eventos</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <link rel="stylesheet" href="<?php echo base_url; ?>Assets/css/main.min.css">
</head>

<body>
<header>
        <nav class="navbar navbar-expand-md shadow">
            <div class="container">
                <a class="navbar-brand text-dark" href="../index.html">SereneMind</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="nav-link text-dark" href="../html\Main_user.html">Inicio</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link text-dark" href="#">Grupos</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link text-dark" href="../calendario/index.php">Citas</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link text-dark" href="#">Ayuda</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
    <div class="container-fluid d-flex align-items-center justify-content-center" style="height: 100vh;">
        <div class="col-md-6">
            <div id="calendar" class="shadow"></div>
        </div>
    </div>
        <div class="modal fade" id="myModal" tabindex="-1" aria-labelledby="Label" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header bg-info">
                        <h5 class="modal-title" id="titulo">Registro de Eventos</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form id="formulario" autocomplete="off">
                        <div class="modal-body">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-floating mb-3">
                                        <input type="hidden" id="id" name="id">
                                        <input id="title" type="text" class="form-control" name="title">
                                        <label for="title">Evento</label>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="form-floating mb-3">
                                        <input type="hidden" id="id" name="id">
                                        <input id="user" type="text" class="form-control" name="user">
                                        <label for="user">Usuario</label>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="form-floating mb-3">
                                        <input class="form-control" id="start" type="date" name="start">
                                        <label for="" class="form-label">Fecha</label>
                                    </div>

                                </div>
                                <div class="col-md-12">
                                    <div class="form-floating mb-3">
                                        <input class="form-control" id="color" type="color" name="color">
                                        <label for="color" class="form-label">Color</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                            <button type="button" class="btn btn-danger" id="btnEliminar">Eliminar</button>
                            <button type="submit" class="btn btn-info" id="btnAccion">Registrar</button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
    <script src="<?php echo base_url; ?>Assets/js/main.min.js"></script>
    <script src="<?php echo base_url; ?>Assets/js/es.js"></script>
    <script>
        const base_url = '<?php echo base_url; ?>';
    </script>
    <script src="<?php echo base_url; ?>Assets/js/sweetalert2.all.min.js"></script>
    <script src="<?php echo base_url; ?>Assets/js/app.js"></script>
</body>
</html>