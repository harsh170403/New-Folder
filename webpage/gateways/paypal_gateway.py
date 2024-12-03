from flask import Config
import paypalrestsdk

def configure_paypal():
    paypalrestsdk.configure({
        "mode": "sandbox", 
        "client_id": Config.PAYPAL_CLIENT_ID,
        "client_secret": Config.PAYPAL_CLIENT_SECRET,
    })

def create_paypal_payment(amount, currency="USD"):
    configure_paypal()
    payment = paypalrestsdk.Payment({
        "intent": "sale",
        "payer": {"payment_method": "paypal"},
        "transactions": [{"amount": {"total": str(amount), "currency": currency}}],
        "redirect_urls": {
            "return_url": "http://localhost:3000/success",
            "cancel_url": "http://localhost:3000/cancel",
        },
    })
    return payment.create(), payment
