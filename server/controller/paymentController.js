const stripe = require("stripe")(process.env.STRIP_PRIVATE_KEY);

const PaymentStripe = async (req, res) => {
  const item = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: item.title,
            },
            unit_amount: item.price,
          },
          quantity: item.quantity,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/cancel",
    });

    res.status(200).json({
      url: session.url,
      message: "Payment complete successfully",
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the session" });
  }
};

module.exports = {
  PaymentStripe,
};
