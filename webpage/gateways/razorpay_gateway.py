import razorpay # type: ignore
from config import Config

client = razorpay.Client(auth=(Config.RAZORPAY_KEY_ID, Config.RAZORPAY_KEY_SECRET))

def create_razorpay_order(amount, currency="INR"):
    order = client.order.create({"amount": int(amount * 100), "currency": currency})
    return order
