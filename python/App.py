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
            content = {'total': result[0]}
            payload.append(content)
            content = {}
        return jsonify(payload)
    except Exception as e:
        print(e)
        return jsonify({"informacion":e})

# ruta para consultar por parametro
@cross_origin()
@app.route('/getAllById/<id>',methods=['GET'])
def getAllById(id):
    try:
        cur = mysql.connection.cursor()
        cur.execute('SELECT * FROM usuarios WHERE id = %s', (id))
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
    

#### ruta para registrar usuario########
@cross_origin()
@app.route('/add_contact', methods=['POST'])
def add_contact():
    try:
        if request.method == 'POST':
            nombre = request.json['nombre'] 
            email = request.json['email']        
            password = request.json['password']
            edad = request.json['edad']
            genero = request.json['genero']  
            carrera = request.json['carrera'] 
            cur = mysql.connection.cursor()
            cur.execute("INSERT INTO contacts (nombre, email, password, edad, genero, carrera) VALUES (%s,%s,%s)", (nombre, email, password, edad, genero, carrera))
            mysql.connection.commit()
            return jsonify({"informacion":"Registro exitoso"})
        
    except Exception as e:
        print(e)
        return jsonify({"informacion":e})


######### ruta para actualizar################
@cross_origin()
@app.route('/update/<id>', methods=['PUT'])
def update_contact(id):
    try:
        nombre = request.json['nombre'] 
        email = request.json['email']        
        password = request.json['password']
        edad = request.json['edad']
        genero = request.json['genero']  
        carrera = request.json['carrera'] 
        cur = mysql.connection.cursor()
        cur.execute("""
        UPDATE contacts
        SET nombre = %s,
            email = %s,
            password = %s,
            edad = %s,
            genero = %s,
            carrera = %s
        WHERE id = %s
        """, (nombre, email, password, edad, genero, carrera, id))
        mysql.connection.commit()
        return jsonify({"informacion":"Registro actualizado"})
    except Exception as e:
        print(e)
        return jsonify({"informacion":e})

########## Ruta para eliminar usuario ################
@cross_origin()
@app.route('/delete/<email>', methods = ['DELETE'])
def delete_contact(email):
    try:
        cur = mysql.connection.cursor()
        cur.execute('DELETE FROM contacts WHERE id = %s', (email,))
        mysql.connection.commit()
        return jsonify({"informacion":"Registro eliminado"}) 
    except Exception as e:
        print(e)
        return jsonify({"informacion":e})


# starting the app
if __name__ == "__main__":
    app.run(port=3000, debug=True)
