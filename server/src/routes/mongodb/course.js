const express = require("express");
const router = express.Router();
const {
  getCourses,
  getCourse,
  delCourse,
  AddCourse,
  upDateCourse,
  getCourseCodigo,
} = require("../../controller/mongodb/courses");



router.get("/courses", getCourses);
router.get("/course/:id", getCourse);
router.get("/course/:codigo", getCourseCodigo);
router.post("/course", validarData, AddCourse);
router.put("/course/:id", validarData, upDateCourse);
router.delete("/course/:id", delCourse);

function validarData(req, res, next) {

  const { codigo, nombre, descripcion, costo, condicion, duracion } = req.body;

  if (!codigo) {
    return res.status(400).json({
      message: "El codigo es requerido..",
      exito: false,
    });
  }
  if (!nombre) {
    return res.status(400).json({
      message: "El nombre del Estudiante está vacío..",
      exito: false,
    });
  }
  if (!descripcion) {
    return res.status(400).json({
      message: "La descripcion del curso es requerida..",
      exito: false,
    });
  }
  if (!costo) {
    return res.status(400).json({
      message: "El costo del curso es requerido..",
      exito: false,
    });
  }
  if (!condicion) {
    return res.status(400).json({
      message: "La condicion es requerida..",
      exito: false,
    });
  }
  if (!duracion) {
    return res.status(400).json({
      message: "La duracion es requerida..",
      exito: false,
    });
  }
  next();
}


module.exports = router;
