from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app, resources={
    r"/api/*": {
        "origins": ["https://ubezpieczenia-app.vercel.app"],
        "methods": ["POST", "OPTIONS"],
        "allow_headers": ["Content-Type"]
    }
})

# Wczytanie danych z pliku JSON
with open('ubezpieczenie.json', 'r', encoding='utf-8') as file:
    insurance_data = json.load(file)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/calculate-rate', methods=['POST'])
def calculate():
    try:
        request_data = request.json
        vehicle_value = float(request_data.get('value'))
        period = int(request_data.get('period'))
        limit = int(request_data.get('limit'))

        print(f"Otrzymane dane: wartość={vehicle_value}, okres={period}, limit={limit}")

        # Wyszukiwanie odpowiednich stawek
        found_proposal = None
        for rate in insurance_data['ubezpieczenie']['stawki']:
            print(f"Sprawdzam stawkę dla limitu {rate['limit']} i okresu {rate['okres']}")
            if rate['limit'] == limit and rate['okres'] == period:
                for stawka in rate['stawki']:
                    print(f"Sprawdzam przedział: {stawka['wartosc_od']} - {stawka['wartosc_do']}")
                    if stawka['wartosc_od'] <= vehicle_value <= stawka['wartosc_do']:
                        found_proposal = stawka['skladka_klienta']
                        print(f"Znaleziono stawkę: {found_proposal}")
                        break
            if found_proposal is not None:
                break

        if found_proposal is None:
            return jsonify({'error': 'Nie znaleziono stawki dla podanych wartości'}), 404

        return jsonify({'rate': found_proposal})

    except Exception as e:
        print(f"Wystąpił błąd: {str(e)}")
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
