from flask import Flask
from flask_cors import CORS
from config import Config
from routes.payment_routes import payment_bp

def create_app():
    app = Flask(__name__)
    CORS(app)

    app.config.from_object(Config)

    app.register_blueprint(payment_bp, url_prefix="/api/payments")

    return app

app = create_app()

if __name__ == "__main__":
    app.run(debug=True)
