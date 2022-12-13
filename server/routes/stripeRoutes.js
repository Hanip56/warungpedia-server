const e = require("express");
const asyncHandler = require("express-async-handler");
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

const router = require("express").Router();

const storeItems = new Map([
  [1, { priceInCents: 1000, name: "Karedok" }],
  [2, { priceInCents: 1100, name: "Kupat" }],
]);

router.post("/", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: req.body.items.map((item) => {
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: item.title,
            },
            unit_amount: item.price,
          },
          quantity: item.amount,
        };
      }),
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}?success=true`,
      cancel_url: `${process.env.CLIENT_URL}?canceled=true`,
    });
    console.log("ok");
    res.status(200).json({ url: session.url });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

module.exports = router;
