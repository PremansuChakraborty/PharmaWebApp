import Razorpay from 'razorpay'



// ✅ Enable CORS for your frontend (localhost:5500)


// ✅ Initialize Razorpay instance with your test credentials
const razorpay = new Razorpay({
  key_id: 'rzp_test_MfzEUtnfE7fSOu',
  key_secret: 'xWYKGLzCuHl95qEvUetp3AFO'
});

// ✅ Order creation route
export const razorfunction=async (req, res) => {
  const { amount } = req.body;

  if (!amount || amount <= 0) {
    return res.status(400).send("Invalid amount");
  }

  const options = {
    amount: amount*100, // Amount in paise
    currency: 'INR',
    receipt: 'receipt_' + Math.floor(Math.random() * 10000)
  };

  try {
    const order = await razorpay.orders.create(options);
    console.log("Razorpay order created:", order);
    res.json(order);
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    res.status(500).send("Error creating order");
  }
}

