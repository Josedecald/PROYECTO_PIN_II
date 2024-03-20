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
            content = {'id': result[0], 'nombre': result[1], 'email': result[2], 'password': result[3], 'edad': result[4], 'genero': result[5], 'carrera': result[6]}
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
        cur.execute('SELECT * FROM usuarios WHERE id = %s', (email))
        rv = cur.fetchall()
        cur.close()
        payload = []
        content = {}
        for result in rv:
            content = {'id': result[0], 'nombre': result[1], 'email': result[2], 'password': result[3], 'edad': result[4], 'genero': result[5], 'carrera': result[6]}
            payload.append(content)
            content = {}
        return jsonify(payload)
    except Exception as e:
        print(e)
        return jsonify({"informacion":e})
    

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
            cur.execute("INSERT INTO usuarios (nombre, email, password, edad, genero, carrera) VALUES (%s, %s, %s, %s, %s, %s)", (nombre, email, password, edad, genero, carrera))
            mysql.connection.commit()
            return jsonify({"informacion":"Registro exitoso"})
        
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


# starting the app
if __name__ == "__main__":
    app.run(port=3000, debug=True)
