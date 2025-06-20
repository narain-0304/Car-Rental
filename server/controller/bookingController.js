import Stripe from "stripe";
import Booking from "../models/Booking.js";
import Car from "../models/Car.js";
import "dotenv/config.js";
const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

// Book Car with Stripe Payment
export const createBooking = async (req, res) => {
  try {
    const { carId, checkIn, checkOut } = req.body;
    const userId = req.user._id;
    const { origin } = req.headers;

    const car = await Car.findById(carId);
    if (!car)
      return res.status(404).json({ success: false, message: "Car not found" });

    const requestedStart = new Date(checkIn);
    const requestedEnd = new Date(checkOut);

    const isConflict = car.bookedDates.some(({ from, to }) => {
      return requestedStart < new Date(to) && requestedEnd > new Date(from);
    });

    if (isConflict) {
      return res.status(400).json({
        success: false,
        message: "Selected time overlaps with an existing booking.",
      });
    }

    const totalHours = Math.ceil((requestedEnd - requestedStart) / 3600000);
    const baseAmount = totalHours * car.rentPerHour;
    const totalAmount = baseAmount + Math.floor(baseAmount * 0.02); // Add 2% fee

    const booking = await Booking.create({
      user: userId,
      car: car._id,
      checkIn: requestedStart,
      checkOut: requestedEnd,
      totalHours,
      totalAmount,
    });

    // ✅ Add the booked dates to the car
    await Car.findByIdAndUpdate(car._id, {
      $push: {
        bookedDates: {
          from: requestedStart,
          to: requestedEnd,
        },
      },
    });

    const session = await stripeInstance.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: `${car.brand} ${car.model}`,
            },
            unit_amount: Math.floor(totalAmount * 100),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${origin}/loader?next=my-bookings`,
      cancel_url: `${origin}/cars`,
      metadata: {
        bookingId: booking._id.toString(),
        userId: userId.toString(),
        carId: car._id.toString(),
        from: requestedStart.toISOString(),
        to: requestedEnd.toISOString(),
      },
    });
    
    res.json({ success: "true", url: session.url });
  } catch (error) {
    console.error("Stripe Booking Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getUserBookings = async (req, res) => {
  try {
    const userId = req.user._id;

    const bookings = await Booking.find({ user: userId })
      .populate("car", "name brand model images")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: "true", bookings });
  } catch (err) {
    console.error("Get User Bookings Error:", err);
    res
      .status(500)
      .json({ success: "false", error: "Failed to fetch bookings" });
  }
};

export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "name email")
      .populate("car", "name brand model images")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: "true", bookings });
  } catch (err) {
    console.error("Get All Bookings Error:", err);
    res
      .status(500)
      .json({ success: "false", error: "Failed to fetch bookings" });
  }
};

export const stripeWebhook = async (req, res) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const sig = req.headers["stripe-signature"];

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook Error:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      const { bookingId } = session.metadata;

      await Booking.findByIdAndUpdate(bookingId, { isPaid: true });
      break;
    }

    case "checkout.session.expired":
    case "payment_intent.canceled":
    case "payment_intent.payment_failed": {
      const session = event.data.object;
      const metadata = session.metadata || {};

      const { bookingId, carId, from, to } = metadata;

      // Delete booking
      await Booking.findByIdAndDelete(bookingId);

      // Remove bookedDates from car
      if (carId && from && to) {
        await Car.findByIdAndUpdate(carId, {
          $pull: {
            bookedDates: {
              from: new Date(from),
              to: new Date(to),
            },
          },
        });
      }

      break;
    }

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
};