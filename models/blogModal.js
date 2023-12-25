import mongoose from "mongoose";

const blogsSchema = new mongoose.Schema({
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
});

export default mongoose.model("Blogs", blogsSchema);
