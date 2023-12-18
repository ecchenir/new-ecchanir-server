import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },

  photo: {
    data: Buffer,
    contentType: String,
  },

  subCategory: [
    {
      type: String,
      required: false,
    },
  ],
});

export default mongoose.model("Category", categorySchema);
