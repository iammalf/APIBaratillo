const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Por favor ingrese su Nombre"],
    maxLength: [80, "El Nombre no debe exceder los 80 caracteres"],
    minLength: [8, "El Nombre debe contener al menos 8 caracteres"],
  },
  email: {
    type: String,
    required: [true, "Por favor ingrese su Email"],
    unique: true,
    validate: [validator.isEmail, "Por favor ingrese un Email valido"],
  },
  password: {
    type: String,
    required: [true, "Por favor ingrese su Contraseña"],
    minLength: [8, "La Contraseña debe contener al menos 8 caracteres"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

module.exports = mongoose.model("User", userSchema);
