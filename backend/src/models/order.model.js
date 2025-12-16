import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    clerkId: {
      type: String,
      ref: "User"
    },
    orderItems: [orderItemSchema],
    shippingAddress: {
      type: shippingAddressSchema,
      required: true
    },
    paymentResult: {
      id: String,
      status: String
    },
    totalPrice: {
      type: Number,
      required: true,
      min: 0
    },
    status: {
      type: String,
      enum: ["pending", "shipped", "delivered"],
      default: "pending",
      required: true
    },
    delivered_at: {
      type: Date
    },
    shipped_at: {
      type: Date
    }
  },
  { timestamps: true}
)

const orderItemSchema = mongoose.Schema(
  { 
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true
    },
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    image: {
      type: String
    }
  },
  { timestamps: true }
)

const shippingAddressSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true
    },
    streetAddress: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    zipCode: {
      type: String,
      required: true
    },
    phoneNumber: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
)

export const Order = mongoose.model("Order", orderSchema)
