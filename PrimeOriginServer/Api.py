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

if __name__ == '__main__':
    init_db()  # Initialiser la base de données au démarrage
    app.run(debug=True)
