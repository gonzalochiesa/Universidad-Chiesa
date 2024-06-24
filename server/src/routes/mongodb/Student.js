const express = require("express");
const router = express.Router();
const {
  getStudents,
  getStudent,
  getStudentDni,
  AddStudent,
  delStudent,
  updateStudent,
} = require("../../controller/mongodb/students");



router.get("/students", getStudents);
router.get("/student/:id", getStudent);
router.get("/studentdni/:dni", getStudentDni);
router.post("/student", validarData, AddStudent);
router.put("/student/:id", validarData, updateStudent);
router.delete("/student/:id", delStudent);



function validarData(req, res, next) {
  const { dni, nombre, apellido, adress,password, email,condicion } = req.body;

  if (!dni) {
    return res.status(400).json({
      message: "Ingrese un Dni válido..",
      exito: false,
    });
  }
  if (!nombre) {
    return res.status(400).json({
      message: "El nombre, del Estudiante está vacío..",
      exito: false,
    });
  }
  if (!apellido) {
    return res.status(400).json({
      message: "El apellido del estudiante está vacío..",
      exito: false,
    });
  }
  if (!adress) {
    return res.status(400).json({
      message: "La direccion está vacía..",
      exito: false,
    });
  }
  if (!email) {
    return res.status(400).json({
      message: "El email vacío..",
      exito: false,
    });
  }
  if (!password) {
    return res.status(400).json({
      message: "La contraseña es obligatoria..",
      exito: false,
    });
  }
  if (!condicion) {
    return res.status(400).json({
      message: "La condicion del curso es obligatoria..",
      exito: false,
    });
  }
  next();
}

module.exports = router;
