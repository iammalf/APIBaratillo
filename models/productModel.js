const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Por Favor Ingrese el Nombre"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Por Favor Ingrese la Descripción"],
  },

  // TODO: FALTA ASIGNAR UNIQUE:TRUE AL CAMPO SLUG
  slug: {
    type: String,
    required: [true, "Por Favor Ingrese el slug"],
  },
  price: {
    type: Number,
    required: [true, "Por Favor Ingrese el Precio"],
  },
  rating: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Por Favor Ingrese la Categoría"],
  },
  stock: {
    type: Number,
    required: [true, "Por Favor Ingrese el Stock"],
    maxLength: [4, "El stock no puede exceder los 4 caracteres"],
    default: 1,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
