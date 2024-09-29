from flask import Blueprint, jsonify, request
from flask_login import login_user, login_required, logout_user
from .models import Customer
from . import db
from flask_cors import CORS

auth = Blueprint('auth', __name__)
CORS(auth, resources={r"/api/*": {"origins": "http://localhost:5173"}})

@auth.route('/api/sign-up', methods=['POST'])
def sign_up():
    data = request.get_json()
    email = data.get('email')
    username = data.get('username')
    password1 = data.get('password1')
    password2 = data.get('password2')

    if not (email and username and password1 and password2):
        return jsonify({'error': 'Missing required fields'}), 400

    if password1 != password2:
        return jsonify({'error': 'Passwords do not match!'}), 400

    existing_customer = Customer.query.filter_by(email=email).first()
    if existing_customer:
        return jsonify({'error': 'Email already exists'}), 400

    new_customer = Customer(email=email, username=username, password=password1)
    
    try:
        db.session.add(new_customer)
        db.session.commit()
        return jsonify({'message': 'Account Created Successfully, You can now Login'}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Account Not Created!'}), 500
    
@auth.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not (email and password):
        return jsonify({'error': 'Email and password are required'}), 400

    customer = Customer.query.filter_by(email=email).first()
    if customer and customer.verify_password(password): 
        login_user(customer)
        return jsonify({'message': 'Login Successful'}), 200
    else:
        return jsonify({'error': 'Incorrect Email or Password'}), 400

@auth.route('/api/logout', methods=['POST'])
@login_required
def log_out():
    logout_user()
    return jsonify({'message': 'Logged out successfully'}), 200

@auth.route('/api/profile/<int:customer_id>', methods=['GET'])
@login_required
def profile(customer_id):
    customer = Customer.query.get(customer_id)
    if customer:
        return jsonify({
            'email': customer.email,
            'username': customer.username,
        }), 200
    else:
        return jsonify({'error': 'Customer not found'}), 404

@auth.route('/api/change-password/<int:customer_id>', methods=['POST'])
@login_required
def change_password(customer_id):
    data = request.get_json()
    current_password = data.get('current_password')
    new_password = data.get('new_password')
    confirm_new_password = data.get('confirm_new_password')

    if not (current_password and new_password and confirm_new_password):
        return jsonify({'error': 'Missing required fields'}), 400

    customer = Customer.query.get(customer_id)
    if customer and customer.check_password(current_password): 
        if new_password == confirm_new_password:
            customer.password = new_password  
            db.session.commit()
            return jsonify({'message': 'Password Updated Successfully'}), 200
        else:
            return jsonify({'error': 'New Passwords do not match'}), 400
    else:
        return jsonify({'error': 'Current Password is Incorrect'}), 400
