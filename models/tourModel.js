const mongoose = require("mongoose");

//Tour schema design
const tourSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name for this tour."],
      trim: true,
      unique: [true, "Name must be unique"],
      minLength: [3, "Name must be at least 3 characters."],
      maxLenght: [100, "Name is too large"],
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      rquired: true,
      min: [0, "Price can't be negative"],
    },
    image: {
      type: String,
      rquired: true,
    },
    view: {
      type: Number,
      min: [0, "total view of cant negative"],
      default: 0,
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["available", "not-available"],
        message: "status can't be {VALUE}",
      },
    },
  },
  {
    timestamps: true,
  }
);

const Tours = mongoose.model("Tours", tourSchema);

module.exports = Tours;
