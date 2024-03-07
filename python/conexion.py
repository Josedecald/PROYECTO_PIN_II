from flask import Flask, request, render_template
import mysql.connector

app = Flask(__name__)

# Configura los parámetros de conexión a la base de datos
conexion = mysql.connector.connect(
    host="bokzfymrzwfpccbqsjza-mysql.services.clever-cloud.com",
    user="uxqieajd9dm1llbe",
    password="QrGkyfXIT8cd4hf4ik7v",
    database="bokzfymrzwfpccbqsjza"
)

@app.route('/')
def formulario():
    return render_template('html/register.html')

@app.route('/registrar', methods=['POST'])
def registrar():
    if request.method == 'POST':
        nombre = request.form['Nombre']
        apellido = request.form['Apellido']
        email = request.form['Email']
        contraseña = request.form['Contrasena']

        cursor = conexion.cursor()

        # Ejecutar una consulta SQL para insertar los datos del usuario en la base de datos
        consulta = "INSERT INTO USUARIOS (NOMBRE, APELLIDO, CORREO, CONTRASEÑA) VALUES (%s, %s, %s, %s)"
        datos = (nombre, apellido, email, contraseña)
        cursor.execute(consulta, datos)

        # Confirmar los cambios en la base de datos
        conexion.commit()

        cursor.close()

        return 'Usuario registrado exitosamente'

if __name__ == '__main__':
    app.run(debug=True)
