from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)  # Autoriser les requêtes cross-origin

# Initialiser la base de données SQLite
def init_db():
    with sqlite3.connect('database.db') as conn:
        conn.execute('''
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                email TEXT UNIQUE NOT NULL,
                username TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL
            )
        ''')
        conn.execute('''
            CREATE TABLE IF NOT EXISTS prod (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT UNIQUE NOT NULL,
                description TEXT UNIQUE NOT NULL,
                price TEXT NOT NULL
            )
        ''')
        conn.commit()

@app.route('/api/register', methods=['POST'])
def register():
    data = request.json
    email = data.get('email')
    username = data.get('username')
    password = data.get('password')

    if not email or not username or not password:
        return jsonify({'error': 'Tous les champs sont obligatoires'}), 400

    try:
        with sqlite3.connect('database.db') as conn:
            cursor = conn.cursor()

            # Vérifier si l'email ou le nom d'utilisateur existe déjà
            cursor.execute('SELECT * FROM users WHERE email = ? OR username = ?', (email, username))
            existing_user = cursor.fetchone()

            if existing_user:
                return jsonify({'error': 'L\'email ou le nom d\'utilisateur est déjà utilisé'}), 400

            # Insérer le nouvel utilisateur
            cursor.execute('INSERT INTO users (email, username, password) VALUES (?, ?, ?)', (email, username, password))
            conn.commit()

            return jsonify({'message': 'Utilisateur enregistré avec succès'}), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/insert', methods=['POST'])
def insert():
    data = request.json
    name = data.get('name')
    description = data.get('descritpion')
    price = data.get('price')

    if not name or not description or not price:
        return jsonify({'error': 'Tous les champs sont obligatoires'}), 400

    try:
        with sqlite3.connect('database.db') as conn:
            cursor = conn.cursor()

            # Vérifier si l'email ou le nom d'utilisateur existe déjà
            cursor.execute("INSERT INTO prod (name,description,price) VALUES (?, ?, ?)", (name, description, price))
            existing_user = cursor.fetchone()

            # Insérer le nouvel utilisateur
            conn.commit()

            return jsonify({'message': 'Fako enregistré avec succès'}), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/achat', methods=['POST'])
def achat():
    data = request.json
    ids = data.get('ids')
    

    try:
        with sqlite3.connect('database.db') as conn:
            cursor = conn.cursor()

            # Vérifier si l'email ou le nom d'utilisateur existe déjà
            for i in ids:
                cursor.execute("SELECT * FROM prod WHERE id=? ", i)
            existing_ids = cursor.fetchone()

            for i in ids:
                cursor.execute("DELETE FROM prod WHERE id=? ", i)
            # Insérer le nouvel utilisateur
            conn.commit()

            return jsonify({'data': existing_ids}), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    

    try:
        with sqlite3.connect('database.db') as conn:
            cursor = conn.cursor()

            cursor.execute("SELECT (username, password) FROM users")
            data = cursor.fetchone()
            
            for i in data:
                if password == i[0] and username == i[1]:
                    return jsonify({'username': username}), 201       
            conn.commit()

            return jsonify({'error': 'Mot de passe ou nom d\'utilisateur incorrect'}), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(host='192.168.137.1', port=8000)
    init_db()  # Initialiser la base de données au démarrage
    #app.run(debug=True)
