from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from config import Config

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    CORS(app)

    from routes.auth_routes import auth_bp
    from routes.policy_routes import policy_bp
    from routes.claim_routes import claim_bp

    app.register_blueprint(auth_bp, url_prefix="/auth")
    app.register_blueprint(policy_bp, url_prefix="/policy")
    app.register_blueprint(claim_bp, url_prefix="/claim")

    return app
