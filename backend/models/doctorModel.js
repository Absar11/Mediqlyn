import mongoose from "mongoose";

// Review Sub-Schema
const reviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  userName: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const doctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String, required: true },
    speciality: { type: String, required: true },
    degree: { type: String, required: true },
    experience: { type: String, required: true },
    about: { type: String, required: true },
    available: { type: Boolean, default: true },
    fees: { type: Number, required: true },
    address: { type: Object, required: true },
    date: { type: Number, required: true },
    slots_booked: { type: Object, default: {} },

    // ✅ New fields for rating & review
    reviews: [reviewSchema],
    averageRating: { type: Number, default: 0 },
  },
  { minimize: false }
);

// Recalculate averageRating before saving
doctorSchema.methods.calculateAverageRating = function () {
  if (this.reviews.length === 0) {
    this.averageRating = 0;
  } else {
    const sum = this.reviews.reduce((acc, curr) => acc + curr.rating, 0);
    this.averageRating = sum / this.reviews.length;
  }
};

const doctorModel =
  mongoose.models.doctor || mongoose.model("doctor", doctorSchema);

export default doctorModel;
