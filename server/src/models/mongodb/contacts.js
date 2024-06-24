const mongoose = require("mongoose");
const { Schema } = mongoose;
const { Mixed } = Schema.Types;

const ContactSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true, trim: true },
    email: {
        type: String,
        match: [
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          `Ingrece un email válido`,
        ],
        required: true,
        trim: true,
        unique: true,
    },
    celular: { type: String, required: false },
    city: { type: String, required: false },
    curso: { type: String, required: true },
    comment: { type: String, required: true, trim: true }
   },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Contact", ContactSchema);
