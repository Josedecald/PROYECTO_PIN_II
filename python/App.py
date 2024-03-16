from flask import Flask, request, jsonify
from flask_mysqldb import MySQL
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)

# Mysql Connection
app.config['MYSQL_HOST'] = 'localhost' 
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = '123456'
app.config['MYSQL_DB'] = 'pin_ii_db'
mysql = MySQL(app)

# settings A partir de ese momento Flask utilizará esta clave para poder cifrar la información de la cookie
app.secret_key = "mysecretkey"
    
@cross_origin()
@app.route('/add_contact', methods=['POST'])
def add_contact():
    try:
        if request.method == 'POST':
            fullname = request.json['fullname']  ## nombre
            email = request.json['email']        ## telefono
            password = request.json['password']  ## email
            cur = mysql.connection.cursor()
            cur.execute("INSERT INTO usuarios (fullname, email, password) VALUES (%s,%s,%s)", (fullname, email, password))
            mysql.connection.commit()
            return jsonify({"informacion":"Registro exitoso"})
        
    except Exception as e:
        print(e)
        return jsonify({"informacion":e})

# starting the app
if __name__ == "__main__":
    app.run(port=5000, debug=True)
