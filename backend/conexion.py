from flask import Flask, jsonify, request
from flask_mysqldb import MySQL
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)  # Permitir todas las rutas y todos los orígenes

# Mysql Connection
app.config['MYSQL_HOST'] = 'localhost' 
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'publicaciones'
mysql = MySQL(app)

# settings
app.secret_key = "mysecretkey"



@app.route('/create_post', methods=['POST'])

def create_post():
    data = request.json
    text = data.get('text')
    publicationTime = data.get('publicationTime')

    if not text or not publicationTime:
        return jsonify({'error': 'Faltan datos obligatorios'}), 400

    cursor = mysql.connection.cursor()
    cursor.execute("INSERT INTO posts (text, publicationTime) VALUES (%s, %s)", (text, publicationTime))
    mysql.connection.commit()
    return jsonify({'message': 'Post guardado correctamente', 'postId': cursor.lastrowid}), 201

# Definir rutas para manejar las solicitudes del cliente
@app.route('/get_posts', methods=['GET'])
def get_posts():
    cursor = mysql.connection.cursor()
    cursor.execute("SELECT * FROM posts")
    posts = cursor.fetchall()
    return jsonify(posts)

@app.route('/create_response/<int:postId>/responses', methods=['POST'])

def create_response(postId):
    data = request.json
    text = data.get('text')
    publicationTime = data.get('publicationTime')

    if not text:
        return jsonify({'error': 'Falta el texto de la respuesta'}), 400

    cursor = mysql.connection.cursor()
    cursor.execute("INSERT INTO responses (post_id, text, publicationTime) VALUES (%s, %s, %s)", (postId, text, publicationTime))
    mysql.connection.commit()
    return jsonify({'message': 'Respuesta guardada correctamente'}), 201

if __name__ == '__main__':
    app.run(port=4000, debug=True)
