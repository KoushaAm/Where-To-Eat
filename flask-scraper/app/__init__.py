from flask import Flask
import os
app = Flask(__name__)

# load configuration from config.py
app.config.from_pyfile('../config.py')
os.environ['FLASK_APP'] = 'app'
os.environ['FLASK_RUN_HOST'] = '192.168.1.67'
os.environ['FLASK_RUN_PORT'] = '4000'

from . import routes

if __name__ == '__main__':
    app.run(host="192.168.1.67", port=4000)  # Change the port number here