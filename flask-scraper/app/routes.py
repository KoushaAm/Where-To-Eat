from flask import request, jsonify
from flask_cors import CORS
from .scraper import scrape_address
from . import app

CORS(app)  # This will enable CORS for all routes

@app.route('/scrape-address', methods=['POST'])
def get_address():
    data = request.get_json()
    url = data.get('link')
    if not url:
        return jsonify({'error': 'URL is required'}), 400

    address = scrape_address(url)
    if address:
        return jsonify({'address': address}), 200
    return jsonify({'error': 'Could not fetch address'}), 500