const express = require("express");
const router = express.Router();
const {
  getTeachers,
  getTeacher,
  delTeacher,
  AddTeacher,
  upDateTeacher,
  getTeacherDni,
} = require("../../controller/mongodb/teachers");



router.get("/teachers", getTeachers);
router.get("/teacher/:id", getTeacher);
router.get("/teacher/:dni", getTeacherDni);
router.post("/teacher", validarData, AddTeacher);
router.delete("/teacher/:id", delTeacher);
router.put("/teacher/:id", validarData,  upDateTeacher);
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
