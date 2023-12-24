import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    names: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    products: [
      {
        type: String,
        required: false,
      },
    ],

    status: {
      type: String,
      enum: ["pending", "complete", "cancel"],
      default: "pending", // Set a default value if needed
    },

    selectedDistrict: {
      type: String,
      required: true,
    },
    selectedDivision: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    deliveryCharge: {
      type: Number,
      required: true,
    },
    totalWithDelivery: {
      type: Number,
      required: true,
    },
    subTotal: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Orders", orderSchema);
