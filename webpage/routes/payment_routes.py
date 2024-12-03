from flask import Blueprint, jsonify, request
from gateways.paypal_gateway import create_paypal_payment
from gateways.stripe_gateway import create_stripe_payment
from gateways.razorpay_gateway import create_razorpay_order

payment_bp = Blueprint("payment", __name__)

@payment_bp.route("/paypal", methods=["POST"])
def paypal_payment():
    amount = request.json["amount"]
    success, payment = create_paypal_payment(amount)
    if success:
        return jsonify({"approval_url": payment["links"][1]["href"]})
    return jsonify({"error": "Failed to create PayPal payment"}), 400

@payment_bp.route("/stripe", methods=["POST"])
def stripe_payment():
    amount = request.json["amount"]
    intent = create_stripe_payment(amount)
    return jsonify({"client_secret": intent["client_secret"]})

@payment_bp.route("/razorpay", methods=["POST"])
def razorpay_payment():
    amount = request.json["amount"]
    order = create_razorpay_order(amount)
    return jsonify({"order_id": order["id"]})
