from flask import Blueprint, jsonify, request, flash, redirect
from .models import Product, Cart, Order
from flask_login import login_required, current_user
from . import db
import requests

API_TOKEN = 'YOUR_API_TOKEN'

views = Blueprint('views', __name__)

@views.route('/')
def home():
    """Fetch products for the homepage."""
    items = Product.query.filter_by(flash_sale=True).all()
    cart = Cart.query.filter_by(customer_link=current_user.id).all() if current_user.is_authenticated else []
    products = [{'id': item.id, 'name': item.product_name, 'price': item.current_price} for item in items]
    cart_items = [{'id': c.id, 'product_id': c.product_link, 'quantity': c.quantity} for c in cart]
    return jsonify({'products': products, 'cart': cart_items})

@views.route('/add-to-cart/<int:item_id>', methods=['POST'])
@login_required
def add_to_cart(item_id):
    """Add an item to the cart."""
    item_to_add = Product.query.get(item_id)
    if not item_to_add:
        return jsonify({'error': 'Item not found'}), 404

    item_exists = Cart.query.filter_by(product_link=item_id, customer_link=current_user.id).first()
    if item_exists:
        item_exists.quantity += 1
        db.session.commit()
        return jsonify({'message': f'{item_to_add.product_name} quantity updated', 'quantity': item_exists.quantity})
    else:
        new_cart_item = Cart(quantity=1, product_link=item_to_add.id, customer_link=current_user.id)
        db.session.add(new_cart_item)
        db.session.commit()
        return jsonify({'message': f'{item_to_add.product_name} added to cart'})

@views.route('/cart')
@login_required
def show_cart():
    """Display cart contents."""
    cart = Cart.query.filter_by(customer_link=current_user.id).all()
    cart_data = [{'id': item.id, 'product_id': item.product_link, 'quantity': item.quantity,
                  'price': item.product.current_price, 'name': item.product.product_name} for item in cart]
    amount = sum(item.product.current_price * item.quantity for item in cart)
    return jsonify({'cart': cart_data, 'amount': amount, 'total': amount + 200})

@views.route('/pluscart/<int:cart_id>', methods=['POST'])
@login_required
def plus_cart(cart_id):
    """Increase cart item quantity."""
    cart_item = Cart.query.get(cart_id)
    if not cart_item:
        return jsonify({'error': 'Item not found'}), 404
    cart_item.quantity += 1
    db.session.commit()
    return jsonify({'message': 'Quantity updated', 'quantity': cart_item.quantity})

@views.route('/minuscart/<int:cart_id>', methods=['POST'])
@login_required
def minus_cart(cart_id):
    """Decrease cart item quantity or remove it."""
    cart_item = Cart.query.get(cart_id)
    if not cart_item:
        return jsonify({'error': 'Item not found'}), 404
    if cart_item.quantity > 1:
        cart_item.quantity -= 1
    else:
        db.session.delete(cart_item)
    db.session.commit()
    return jsonify({'message': 'Cart updated', 'quantity': cart_item.quantity if cart_item.quantity > 0 else 0})

@views.route('/removecart/<int:cart_id>', methods=['DELETE'])
@login_required
def remove_cart(cart_id):
    """Remove an item from the cart."""
    cart_item = Cart.query.get(cart_id)
    if not cart_item:
        return jsonify({'error': 'Item not found'}), 404
    db.session.delete(cart_item)
    db.session.commit()
    return jsonify({'message': 'Item removed from cart'})

@views.route('/place-order', methods=['POST'])
@login_required
def place_order():
    """Place an order."""
    customer_cart = Cart.query.filter_by(customer_link=current_user.id).all()
    if not customer_cart:
        return jsonify({'error': 'Your cart is empty'}), 400

    try:
        total = sum(item.product.current_price * item.quantity for item in customer_cart) + 200

        response = requests.post(
            'https://api.intasend.com/api/v1/collections/mpesa/stk_push',
            json={
                'amount': total,
                'phone_number': 'YOUR_PHONE_NUMBER',
                'email': current_user.email,
                'narrative': 'Purchase of goods'
            },
            headers={'Authorization': f'Bearer {API_TOKEN}', 'Content-Type': 'application/json'}
        )
        response_data = response.json()

        for item in customer_cart:
            new_order = Order(
                quantity=item.quantity,
                price=item.product.current_price,
                status=response_data.get('invoice', {}).get('state', 'Pending').capitalize(),
                payment_id=response_data.get('id'),
                product_link=item.product_link,
                customer_link=item.customer_link
            )
            db.session.add(new_order)
            product = Product.query.get(item.product_link)
            product.in_stock -= item.quantity
            db.session.delete(item)
        db.session.commit()
        return jsonify({'message': 'Order placed successfully'})
    except Exception as e:
        print('Error:', e)
        return jsonify({'error': 'Failed to place order'}), 500

@views.route('/orders')
@login_required
def order():
    """Get all orders for the user."""
    orders = Order.query.filter_by(customer_link=current_user.id).all()
    order_data = [{'id': o.id, 'product_id': o.product_link, 'quantity': o.quantity,
                   'price': o.price, 'status': o.status} for o in orders]
    return jsonify({'orders': order_data})

@views.route('/search', methods=['POST'])
def search():
    """Search for products."""
    data = request.get_json()
    search_query = data.get('search')
    items = Product.query.filter(Product.product_name.ilike(f'%{search_query}%')).all()
    results = [{'id': item.id, 'name': item.product_name, 'price': item.current_price} for item in items]
    return jsonify({'results': results})
