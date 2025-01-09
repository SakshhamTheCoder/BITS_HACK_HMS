# root_folder/backend/app/__init__.py
from flask import Flask
from flask_cors import CORS
from config import Config

def create_app(config_class=Config):
    app = Flask(__name__)
    CORS(app)
    app.config.from_object(config_class)
    
    from app.routes import main
    app.register_blueprint(main)
    
    return app