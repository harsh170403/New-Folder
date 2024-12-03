import stripe
from config import Config

stripe.api_key = Config.STRIPE_API_KEY

def create_stripe_payment(amount, currency="usd"):
    intent = stripe.PaymentIntent.create(
        amount=int(amount * 100),  
        currency=currency,
        payment_method_types=["card"],
    )
    return intent
