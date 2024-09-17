from flask import Flask, send_from_directory, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
import os

db = SQLAlchemy()
DB_NAME = 'database.sqlite3'

def create_database():
    db.create_all()
    print('Database Created')

def create_app():
    app = Flask(__name__, static_folder='frontend/build', static_url_path='')

    app.config['SECRET_KEY'] = 'hbnwdvbn ajnbsjn ahe'
    app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{DB_NAME}'

    db.init_app(app)

    login_manager = LoginManager()
    login_manager.init_app(app)
    login_manager.login_view = 'auth.login'

    @login_manager.user_loader
    def load_user(id):
        from .models import Customer
        return Customer.query.get(int(id))

    # Register Blueprints
    from .views import views
    from .auth import auth
    from .admin import admin
    from .models import Customer, Cart, Product, Order

    app.register_blueprint(views, url_prefix='/')
    app.register_blueprint(auth, url_prefix='/')
    app.register_blueprint(admin, url_prefix='/')

    # Serve React frontend
    @app.route('/')
    @app.route('/<path:path>')
    def serve_react_app(path=None):
        if path and os.path.exists(os.path.join('frontend/build', path)):
            return send_from_directory('frontend/build', path)
        return send_from_directory('frontend/build', 'index.html')

    @app.errorhandler(404)
    def page_not_found(error):
        return jsonify({'error': 'Not found'}), 404

    # Create database if not exists
    with app.app_context():
        create_database()

    return app
