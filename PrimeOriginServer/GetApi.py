import sqlite3

# Connexion à la base de données
conn = sqlite3.connect('database.db')
cursor = conn.cursor()

# Récupérer toutes les données de la table utilisateur
cursor.execute("SELECT * FROM users")

# Récupérer les noms des colonnes
columns = [description[0] for description in cursor.description]

# Récupérer toutes les lignes (données)
rows = cursor.fetchall()

# Afficher chaque ligne sous forme de clé-valeur
for row in rows:
    user_data = dict(zip(columns, row))  # Combine les colonnes et les valeurs dans un dictionnaire
    print(user_data)

# Fermer la connexion
conn.close()
