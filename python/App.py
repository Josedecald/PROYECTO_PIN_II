############# importar librerias o recursos#####
from flask import Flask, request, jsonify
from flask_mysqldb import MySQL
from flask_cors import CORS, cross_origin

# initializations
app = Flask(__name__)
CORS(app)

# Mysql Connection
app.config['MYSQL_HOST'] = 'localhost' 
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = '123456'
app.config['MYSQL_DB'] = 'pin_ii_db'
mysql = MySQL(app)

###################################### USUARIOS ##########################################################################

# ruta para consultar todos los usuarios
@cross_origin()
@app.route('/getAll', methods=['GET'])
def getAll():
    try:
        cur = mysql.connection.cursor()
        cur.execute('SELECT * FROM usuarios')
        rv = cur.fetchall()
        cur.close()
        payload = []
        content = {}
        for result in rv:
            content = {'id_usuario': result[0], 'nombre': result[1], 'email': result[2], 'password': result[3], 'edad': result[4], 'genero': result[5], 'carrera': result[6]}
            payload.append(content)
            content = {}
        return jsonify(payload)
    except Exception as e:
        print(e)
        return jsonify({"informacion":e})
    
# ruta para consultar el numero de usuarios
@cross_origin()
@app.route('/getcount', methods=['GET'])
def getcount():
    try:
        cur = mysql.connection.cursor()
        cur.execute('SELECT COUNT(*) as total from usuarios')
        rv = cur.fetchall()
        cur.close()
        payload = []
        content = {}
        for result in rv:
            content = {'total de usuarios': result[0]}
            payload.append(content)
            content = {}
        return jsonify(payload)
    except Exception as e:
        print(e)
        return jsonify({"informacion":e})

# ruta para consultar por parametro
@cross_origin()
@app.route('/getAllById/<email>',methods=['GET'])
def getAllById(email):
    try:
        cur = mysql.connection.cursor()
        cur.execute('SELECT * FROM usuarios WHERE email = %s', (email,))
        rv = cur.fetchall()
        cur.close()
        payload = []
        content = {}
        for result in rv:
            content = {'id_usuario': result[0], 'nombre': result[1], 'email': result[2], 'password': result[3], 'edad': result[4], 'genero': result[5], 'carrera': result[6]}
            payload.append(content)
            content = {}
        return jsonify(payload)
    except Exception as e:
        print(e)
        return jsonify({"informacion":str(e)})
    
#ruta para registrar usuario
@cross_origin()
@app.route('/add_user', methods=['POST'])
def add_user():
    try:
        if request.method == 'POST':
            nombre = request.json['nombre'] 
            email = request.json['email']        
            password = request.json['password']
            edad = request.json['edad']
            genero = request.json['genero']  
            carrera = request.json['carrera']
            
            cur = mysql.connection.cursor()
            cur.execute("SELECT * FROM usuarios WHERE email = %s", (email,))
            usuario_existente = cur.fetchone()

            if not usuario_existente:
                cur = mysql.connection.cursor()
                cur.execute("INSERT INTO usuarios (nombre, email, password, edad, genero, carrera) VALUES (%s, %s, %s, %s, %s, %s)", (nombre, email, password, edad, genero, carrera))
                mysql.connection.commit()
                return jsonify({"informacion":"Registro exitoso"})
            else:
                return jsonify({"informacion":"el usuario ya existe"})
        
    except Exception as e:
        print(e)
        return jsonify({"informacion":e})
    
#ruta para actualizar el usuario
@cross_origin()
@app.route('/updateuser/<email>', methods=['PUT'])
def update_user(email):
    try:
        nombre = request.json['nombre'] 
        nuevo_email = request.json['email']        
        password = request.json['password']
        edad = request.json['edad']
        genero = request.json['genero']  
        carrera = request.json['carrera']  

        cur = mysql.connection.cursor()
        cur.execute("SELECT * FROM usuarios WHERE email = %s", (email,))
        usuario_existente = cur.fetchone()
        cur.close()

        if usuario_existente:
            cur = mysql.connection.cursor()
            cur.execute("""
            UPDATE usuarios
            SET nombre = %s,
                email = %s,
                password = %s,
                edad = %s,
                genero = %s,
                carrera = %s
            WHERE email = %s
            """, (nombre, nuevo_email, password, edad, genero, carrera, email))
            mysql.connection.commit()
            cur.close()
            return jsonify({"informacion":"Registro actualizado"})
        else:
            return jsonify({"informacion": "El usuario con el correo electrónico proporcionado no existe."})

    except Exception as e:
        print(e)
        return jsonify({"informacion": str(e)})

#ruta para eliminar el usuario
@cross_origin()
@app.route('/delete/<email>', methods = ['DELETE'])
def delete_contact(email):
    try:
        cur = mysql.connection.cursor()
        cur.execute('DELETE FROM usuarios WHERE email = %s', (email,))
        mysql.connection.commit()
        return jsonify({"informacion":"Registro eliminado"}) 
    except Exception as e:
        print(e)
        return jsonify({"informacion":str(e)})

#########################################################################################################################
    

###################################### CITAS ###########################################################################

#Ruta para ver todas las citas
@cross_origin()
@app.route('/getAllEvents', methods=['GET'])
def getAllEvents():
    try:
        cur = mysql.connection.cursor()
        cur.execute('SELECT * FROM evento')
        rv = cur.fetchall()
        cur.close()
        payload = []
        content = {}
        for result in rv:
            content = {'id': result[0], 'id_usuario': result[1], 'titulo': result[2], 'fecha': str(result[3]), 'hora': str(result[4]), 'color': result[5]}
            payload.append(content)
            content = {}
        return jsonify(payload)
    except Exception as e:
        print(e)
        return jsonify({"informacion":str(e)})
    
#Registrar cita
@cross_origin()
@app.route('/registrar_cita', methods=['POST'])
def registrar_cita():
    try:
        titulo = request.json['titulo']
        fecha = request.json['fecha']
        hora = request.json['hora']
        color = request.json['color']
        email_usuario = request.json['email_usuario']

        cur = mysql.connection.cursor()
        cur.execute("SELECT id_usuario FROM usuarios WHERE email = %s", (email_usuario,))
        usuario = cur.fetchone()
        if usuario is None:
            return jsonify({"informacion": "No se encontró un usuario con ese email"})

        id_usuario = usuario[0]

        cur.execute("INSERT INTO evento (titulo, fecha, hora, color, id_usuario) VALUES (%s, %s, %s, %s, %s)", (titulo, fecha, hora, color, id_usuario))
        mysql.connection.commit()

        return jsonify({"informacion": "Cita registrada correctamente"})
    except Exception as e:
        print(e)
        return jsonify({"informacion": str(e)})

#Ruta para actualizar
@cross_origin()
@app.route('/updateEvent/<email>', methods=['PUT'])
def update_event(email):
    try:
        titulo = request.json['titulo'] 
        fecha = request.json['fecha']        
        hora = request.json['hora']
        color = request.json['color']
        usuario = email

        cur = mysql.connection.cursor()
        cur.execute("SELECT * FROM usuarios WHERE email = %s", (usuario,))
        usuario_existente = cur.fetchone()

        if usuario_existente:
            cur.execute("""
                UPDATE evento
                SET titulo = %s,
                    fecha = %s,
                    hora = %s,
                    color = %s
                WHERE id_usuario = %s
            """, (titulo, fecha, hora, color, usuario_existente[0]))
            mysql.connection.commit()
            cur.close()
            return jsonify({"informacion": "Evento actualizado correctamente."})
        else:
            return jsonify({"informacion": "El usuario con el correo electrónico proporcionado no existe."})

    except Exception as e:
        print(e)
        return jsonify({"informacion": str(e)})

#Ruta para eliminar evento
@cross_origin()
@app.route('/deleteEvent/<email>', methods=['DELETE'])
def delete_event(email):
    try:

        cur = mysql.connection.cursor()
        cur.execute('SELECT id_usuario FROM usuarios WHERE email = %s', (email,))
        usuario = cur.fetchone()

        if usuario:
            cur.execute('DELETE FROM evento WHERE id_usuario = %s', (usuario[0],))
            mysql.connection.commit()
            cur.close()
            return jsonify({"informacion": "Evento eliminado correctamente."})
        else:
            return jsonify({"informacion": "El usuario con el correo electrónico proporcionado no existe."})
    except Exception as e:
        print(e)
        return jsonify({"informacion": str(e)})

##############################################################################################################################

############################### PUBLICACIONES ###########################################################################

#ruta para guardar publicacion
@cross_origin()
@app.route('/guardar_publi', methods=['POST'])
def guardar_publi():
    try:
        contenido = request.json['contenido']
        fecha = request.json['fecha']
        hora = request.json['hora']
        url = request.json['url']
        email_usuario = request.json['email_usuario']

        cur = mysql.connection.cursor()
        cur.execute("SELECT id_usuario FROM usuarios WHERE email = %s", (email_usuario,))
        usuario = cur.fetchone()
        if usuario is None:
            return jsonify({"informacion": "No se encontró un usuario con ese email"})
        id_usuario = usuario[0]

        cur.execute("INSERT INTO publicaciones (contenido, fecha, hora, url) VALUES (%s, %s, %s, %s)", (contenido, fecha, hora, url))
        mysql.connection.commit()

        id_publi = cur.lastrowid

        cur.execute("INSERT INTO usu_publi (id_usuario, id_publi) VALUES (%s, %s)", (id_usuario, id_publi))
        mysql.connection.commit()

        return jsonify({"informacion": "Publicación registrada correctamente"})
    except Exception as e:
        print(e)
        return jsonify({"informacion": str(e)})

#ruta para actualizar publicaciones
@cross_origin()
@app.route('/updatePubli/<email>/<id_publi>', methods=['PUT'])
def update_Publi(email, id_publi):
    try:
        contenido = request.json['contenido'] 
        fecha = request.json['fecha']        
        hora = request.json['hora']
        url = request.json['url']

        cur = mysql.connection.cursor()
        cur.execute("SELECT id_usuario FROM usuarios WHERE email = %s", (email,))
        usuario_existente = cur.fetchone()
        
        if usuario_existente:
            id_usuario = usuario_existente[0]

            cur.execute("SELECT * FROM usu_publi WHERE id_usuario = %s AND id_publi = %s", (id_usuario, id_publi))
            acceso = cur.fetchone()
            
            if acceso:
                cur.execute("""
                    UPDATE publicaciones
                    SET contenido = %s,
                        fecha = %s,
                        hora = %s,
                        url = %s
                    WHERE id_publi = %s
                """, (contenido, fecha, hora, url, id_publi))
                mysql.connection.commit()
                cur.close()
                return jsonify({"informacion": "Publicación actualizada correctamente."})
            else:
                return jsonify({"informacion": "El usuario no tiene acceso a la publicación."})
        else:
            return jsonify({"informacion": "El usuario con el correo electrónico proporcionado no existe."})

    except Exception as e:
        print(e)
        return jsonify({"informacion": str(e)})

#ruta para ver todas las publicaciones 
@cross_origin()
@app.route('/getAllPubli', methods=['GET'])
def getAllPubli():
    try:
        cur = mysql.connection.cursor()
        cur.execute('SELECT * FROM publicaciones')
        rv = cur.fetchall()
        cur.close()
        payload = []
        content = {}
        for result in rv:
            content = {'id_publi': result[0], 'contenido': result[1],'fecha': str(result[2]), 'hora': str(result[3]), 'url': result[4]}
            payload.append(content)
            content = {}
        return jsonify(payload)
    except Exception as e:
        print(e)
        return jsonify({"informacion":str(e)})

#ruta para eliminar publicacion
@cross_origin()
@app.route('/deletePubli/<email>/<id_publi>', methods=['DELETE'])
def delete_publi(email, id_publi):
    try:
        cur = mysql.connection.cursor()
        cur.execute("SELECT id_usuario FROM usuarios WHERE email = %s", (email,))
        usuario_existente = cur.fetchone()
        
        if usuario_existente:
            id_usuario = usuario_existente[0]

            cur.execute("SELECT * FROM usu_publi WHERE id_usuario = %s AND id_publi = %s", (id_usuario, id_publi))
            acceso = cur.fetchone()
            
            if acceso:
                cur.execute('DELETE FROM publicaciones WHERE id_publi = %s', (id_publi,))
                mysql.connection.commit()

                cur.execute('DELETE FROM usu_publi WHERE id_usuario = %s AND id_publi = %s', (id_usuario, id_publi))
                mysql.connection.commit()
                cur.close()
                return jsonify({"informacion": "Publicación eliminada correctamente."})
            else:
                return jsonify({"informacion": "El usuario no tiene acceso a la publicación."})
        else:
            return jsonify({"informacion": "El usuario con el correo electrónico proporcionado no existe."})
    except Exception as e:
        print(e)
        return jsonify({"informacion": str(e)})


#########################################################################################################################################

#################################### CONTACTO ##############################################################################

#ruta para registrar contacto
@cross_origin()
@app.route('/add_contact', methods=['POST'])
def add_contact():
    try:
        if request.method == 'POST':
            nombre = request.json['nombre'] 
            correo = request.json['correo']        
            mensaje = request.json['mensaje']
            asunto = request.json['asunto']
            
            cur = mysql.connection.cursor()
            cur.execute("INSERT INTO contacto (nombre, correo, mensaje, asunto) VALUES (%s, %s, %s, %s)", (nombre, correo, mensaje, asunto))
            mysql.connection.commit()
            return jsonify({"informacion":"Registro exitoso"})
 
        
    except Exception as e:
        print(e)
        return jsonify({"informacion":str(e)})

@cross_origin()
@app.route('/getAllContact', methods=['GET'])
def getAllContact():
    try:
        cur = mysql.connection.cursor()
        cur.execute('SELECT * FROM contacto')
        rv = cur.fetchall()
        cur.close()
        payload = []
        content = {}
        for result in rv:
            content = {'id_contacto': result[0], 'nombre': result[1], 'correo': result[2], 'mensaje': result[3], 'asunto': result[4]}
            payload.append(content)
            content = {}
        return jsonify(payload)
    except Exception as e:
        print(e)
        return jsonify({"informacion":e})
#####################################################################################################################################

#################################### PROFESIONALES ###########################################################################################

# ruta para consultar todos los profesionales
@cross_origin()
@app.route('/getAllPro', methods=['GET'])
def getAllPro():
    try:
        cur = mysql.connection.cursor()
        cur.execute('SELECT * FROM profesional')
        rv = cur.fetchall()
        cur.close()
        payload = []
        content = {}
        for result in rv:
            content = {'id': result[0], 'nombre': result[1], 'correo': result[2], 'contraseña': result[3]}
            payload.append(content)
            content = {}
        return jsonify(payload)
    except Exception as e:
        print(e)
        return jsonify({"informacion":e})
    
# ruta para consultar el numero de usuarios
@cross_origin()
@app.route('/getcountPro', methods=['GET'])
def getcountPro():
    try:
        cur = mysql.connection.cursor()
        cur.execute('SELECT COUNT(*) as total from profesional')
        rv = cur.fetchall()
        cur.close()
        payload = []
        content = {}
        for result in rv:
            content = {'total de usuarios': result[0]}
            payload.append(content)
            content = {}
        return jsonify(payload)
    except Exception as e:
        print(e)
        return jsonify({"informacion":e})

# ruta para consultar por parametro
@cross_origin()
@app.route('/getAllById_Pro/<email>',methods=['GET'])
def getAllById_Pro(email):
    try:
        cur = mysql.connection.cursor()
        cur.execute('SELECT * FROM profesional WHERE correo = %s', (email,))
        rv = cur.fetchall()
        cur.close()
        payload = []
        content = {}
        for result in rv:
            content = {'id_profesional': result[0], 'nombre': result[1], 'correo': result[2], 'contraseña': result[3]}
            payload.append(content)
            content = {}
        return jsonify(payload)
    except Exception as e:
        print(e)
        return jsonify({"informacion":str(e)})
    
#ruta para registrar usuario
@cross_origin()
@app.route('/add_userPro', methods=['POST'])
def add_userPro():
    try:
        if request.method == 'POST':
            nombre = request.json['nombre'] 
            correo = request.json['correo']        
            contraseña = request.json['contraseña']
            
            cur = mysql.connection.cursor()
            cur.execute("SELECT * FROM profesional WHERE correo = %s", (correo,))
            usuario_existente = cur.fetchone()

            if not usuario_existente:
                cur = mysql.connection.cursor()
                cur.execute("INSERT INTO profesional (nombre, correo, contraseña) VALUES (%s, %s, %s)", (nombre, correo, contraseña))
                mysql.connection.commit()
                return jsonify({"informacion":"Registro exitoso"})
            else:
                return jsonify({"informacion":"el usuario ya existe"})
        
    except Exception as e:
        print(e)
        return jsonify({"informacion":str(e)})
    
#ruta para actualizar el usuario
@cross_origin()
@app.route('/updateuserPro/<email>', methods=['PUT'])
def update_userPro(email):
    try:
        nombre = request.json['nombre'] 
        correo = request.json['correo']        
        contraseña = request.json['contraseña']

        cur = mysql.connection.cursor()
        cur.execute("SELECT * FROM profesional WHERE correo = %s", (email,))
        usuario_existente = cur.fetchone()
        cur.close()

        if usuario_existente:
            cur = mysql.connection.cursor()
            cur.execute("""
            UPDATE profesional
            SET nombre = %s,
                correo = %s,
                contraseña = %s
            WHERE correo = %s
            """, (nombre, correo, contraseña, email))
            mysql.connection.commit()
            cur.close()
            return jsonify({"informacion":"Registro actualizado"})
        else:
            return jsonify({"informacion": "El usuario con el correo electrónico proporcionado no existe."})

    except Exception as e:
        print(e)
        return jsonify({"informacion": str(e)})

#ruta para eliminar profesional
@cross_origin()
@app.route('/deletePro/<email>', methods = ['DELETE'])
def delete_contactPro(email):
    try:
        cur = mysql.connection.cursor()
        cur.execute('DELETE FROM profesional WHERE correo = %s', (email,))
        mysql.connection.commit()
        return jsonify({"informacion":"Registro eliminado"}) 
    except Exception as e:
        print(e)
        return jsonify({"informacion":str(e)})

#####################################################################################################################################

################################### COMENTARIOS #####################################################################################

#ruta para guardar comentario    
@cross_origin()
@app.route('/guardar_comen', methods=['POST'])
def guardar_comen():
    try:
        contenido = request.json['contenido']
        fecha = request.json['fecha']
        hora = request.json['hora']

        cur = mysql.connection.cursor()
        cur.execute("INSERT INTO comentarios (contenido, fecha, hora) VALUES (%s, %s, %s)", (contenido, fecha, hora))
        mysql.connection.commit()

        return jsonify({"informacion": "Comentario registrado correctamente"})
    except Exception as e:
        print(e)
        return jsonify({"informacion": str(e)})

#ruta para actualizar comentario
@cross_origin()
@app.route('/updateComen/<id_comen>', methods=['PUT'])
def update_Comen(id_comen):
    try:
        contenido = request.json['contenido'] 
        fecha = request.json['fecha']        
        hora = request.json['hora']

        cur = mysql.connection.cursor()
        cur.execute("""
            UPDATE comentarios
            SET contenido = %s,
                fecha = %s,
                hora = %s
            WHERE id_comen = %s
        """, (contenido, fecha, hora, id_comen))
        mysql.connection.commit()
        cur.close()
        return jsonify({"informacion": "Comentario actualizado correctamente."})

    except Exception as e:
        print(e)
        return jsonify({"informacion": str(e)})

#ruta para ver todos los comentarios 
@cross_origin()
@app.route('/getAllComen', methods=['GET'])
def getAllComen():
    try:
        cur = mysql.connection.cursor()
        cur.execute('SELECT * FROM comentarios')
        rv = cur.fetchall()
        cur.close()
        payload = []
        content = {}
        for result in rv:
            content = {'id_publi': result[0], 'contenido': result[1],'fecha': str(result[2]), 'hora': str(result[3])}
            payload.append(content)
            content = {}
        return jsonify(payload)
    except Exception as e:
        print(e)
        return jsonify({"informacion":str(e)})

#ruta para eliminar publicacion
@cross_origin()
@app.route('/deleteComen/<id_comen>', methods=['DELETE'])
def delete_Comen(id_comen):
    try:
        cur = mysql.connection.cursor()
        cur.execute('DELETE FROM comentarios WHERE id_comen = %s', (id_comen,))
        mysql.connection.commit()
        cur.close()
        return jsonify({"informacion": "Publicación eliminada correctamente."})
    except Exception as e:
        print(e)
        return jsonify({"informacion": str(e)})


# starting the app
if __name__ == "__main__":
    app.run(port=5000, debug=True)
