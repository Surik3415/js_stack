import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
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
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true
    },
    productID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    items: [cartItemSchema]
  },
  { timestamps: true}
)

const cartItemSchema = new mongoose.Schema(
  {
    productID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true
    },
    quantity: {
      type: Number,
      min: 1,
      default: 1,
      required: true
    }
  },
  { timestamps: true }
)

export const Cart = mongoose.model("Cart", cartSchema)
