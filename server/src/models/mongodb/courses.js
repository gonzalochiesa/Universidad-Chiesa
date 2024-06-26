const mongoose = require("mongoose");
const { Schema } = mongoose;
const { Mixed } = Schema.Types;

const CoursesSchema = new mongoose.Schema(
  {
    codigo: { type: Number, required: true, unique: true },
    nombre: { type: String, required: true, trim: true },
    descripcion: { type: String, required: true, trim: true },
    costo: { type: Number, required: true, trim: true },
    condicion : { type: String, required: true },
    duracion: { type: String, required: true },
    clasificacion: { type: Number, required: false },
    profesores: Mixed,
   
   
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Courses", CoursesSchema);
