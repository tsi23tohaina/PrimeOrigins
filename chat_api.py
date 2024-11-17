from flask import Flask, request, jsonify, render_template
import google.generativeai as genai
from flask_cors import CORS  # Import de CORS
import os 
import json 
from unidecode import unidecode as uni

# Configurer l'API Gemini
genai.configure(api_key="AIzaSyAfEB7q0Jd7LX_7hBeuzBEfVQegZOtHg78")
STATIC_FOLDER_PATH = os.path.abspath('src/static')
app = Flask(__name__, static_folder=STATIC_FOLDER_PATH)

UPLOAD_FOLDER = 'uploads/'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

# Appliquer CORS pour autoriser les requêtes depuis toutes les origines
CORS(app)

@app.route('/')
def upload_form():
    filename = 'index.html'
    return render_template(filename)

@app.route('/upload', methods=['POST'])
def upload_file():
    model = genai.GenerativeModel("gemini-1.5-flash")
    sms = request.form['sms']
    file = request.files['file']
    
    if file.filename == '':
        response = model.generate_content(sms)
        return jsonify({"response": response.text})
    
    if file and file.filename != '':
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], file.filename))
        img = file.filename
        dirname = 'uploads'
        filepath = os.path.join(dirname, img)
        myfile = genai.upload_file(filepath)
        response = model.generate_content([myfile, sms])
        return jsonify({ "response": response.text })


if __name__ == '__main__':
    app.run(host='10.166.2.156', port=8000)
    app.run(debug=True)