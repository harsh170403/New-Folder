from flask import Blueprint, jsonify, request, send_from_directory
from flask_login import login_required, current_user
from werkzeug.utils import secure_filename
from .forms import ShopItemsForm, OrderForm
from .models import Product, Order, Customer
from . import db
import os

admin = Blueprint('admin', __name__)

@admin.route('/media/<path:filename>')
def get_image(filename):
    return send_from_directory('media', filename)

@admin.route('/api/add-shop-items', methods=['POST'])
@login_required
def add_shop_items():
    if current_user.id == 1:
        data = request.get_json()
        product_name = data.get('product_name')
        current_price = data.get('current_price')
        previous_price = data.get('previous_price')
        in_stock = data.get('in_stock')
        flash_sale = data.get('flash_sale')
        file = request.files.get('product_picture')

        if file:
            file_name = secure_filename(file.filename)
            file_path = os.path.join('media', file_name)
            file.save(file_path)
        else:
            file_path = None

        new_shop_item = Product(
            product_name=product_name,
            current_price=current_price,
            previous_price=previous_price,
            in_stock=in_stock,
            flash_sale=flash_sale,
            product_picture=file_path
        )

        try:
            db.session.add(new_shop_item)
            db.session.commit()
            return jsonify({'message': f'{product_name} added Successfully'}), 201
        except Exception as e:
            return jsonify({'error': 'Product Not Added'}), 400

    return jsonify({'error': 'Unauthorized'}), 403

# View shop items
@admin.route('/api/shop-items', methods=['GET'])
@login_required
def shop_items():
    if current_user.id == 1:
        items = Product.query.order_by(Product.date_added).all()
        return jsonify([item.to_dict() for item in items]), 200
    return jsonify({'error': 'Unauthorized'}), 403

# Update item
@admin.route('/api/update-item/<int:item_id>', methods=['PUT'])
@login_required
def update_item(item_id):
    if current_user.id == 1:
        data = request.get_json()
        product_name = data.get('product_name')
        current_price = data.get('current_price')
        previous_price = data.get('previous_price')
        in_stock = data.get('in_stock')
        flash_sale = data.get('flash_sale')
        file = request.files.get('product_picture')

        file_name = secure_filename(file.filename) if file else None
        file_path = os.path.join('media', file_name) if file else None

        try:
            Product.query.filter_by(id=item_id).update({
                'product_name': product_name,
                'current_price': current_price,
                'previous_price': previous_price,
                'in_stock': in_stock,
                'flash_sale': flash_sale,
                'product_picture': file_path
            })
            if file:
                file.save(file_path)
            db.session.commit()
            return jsonify({'message': f'{product_name} updated Successfully'}), 200
        except Exception as e:
            return jsonify({'error': 'Item Not Updated'}), 400

    return jsonify({'error': 'Unauthorized'}), 403

# Delete item
@admin.route('/api/delete-item/<int:item_id>', methods=['DELETE'])
@login_required
def delete_item(item_id):
    if current_user.id == 1:
        try:
            item_to_delete = Product.query.get(item_id)
            db.session.delete(item_to_delete)
            db.session.commit()
            return jsonify({'message': 'One Item deleted'}), 200
        except Exception as e:
            return jsonify({'error': 'Item not deleted'}), 400

    return jsonify({'error': 'Unauthorized'}), 403

# View orders
@admin.route('/api/view-orders', methods=['GET'])
@login_required
def order_view():
    if current_user.id == 1:
        orders = Order.query.all()
        return jsonify([order.to_dict() for order in orders]), 200
    return jsonify({'error': 'Unauthorized'}), 403

# Update order
@admin.route('/api/update-order/<int:order_id>', methods=['PUT'])
@login_required
def update_order(order_id):
    if current_user.id == 1:
        data = request.get_json()
        status = data.get('order_status')

        order = Order.query.get(order_id)
        order.status = status

        try:
            db.session.commit()
            return jsonify({'message': f'Order {order_id} Updated successfully'}), 200
        except Exception as e:
            return jsonify({'error': f'Order {order_id} not updated'}), 400

    return jsonify({'error': 'Unauthorized'}), 403

# View customers
@admin.route('/api/customers', methods=['GET'])
@login_required
def display_customers():
    if current_user.id == 1:
        customers = Customer.query.all()
        return jsonify([customer.to_dict() for customer in customers]), 200
    return jsonify({'error': 'Unauthorized'}), 403

# Admin page
@admin.route('/')
@login_required
def admin_page():
    if current_user.id == 1:
        return send_from_directory('frontend/build', 'index.html')
    return jsonify({'error': 'Unauthorized'}), 403
