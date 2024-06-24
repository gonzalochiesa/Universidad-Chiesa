const express = require("express");
const router = express.Router();
const {
  getMatriculas,
  getMatricula,
  getMatriculaDni,
  AddMatricula,
  delMatricula,
  updateMatricula,
} = require("../../controller/mongodb/matriculas");



router.get("/matriculas", getMatriculas);
router.get("/matricula/:id", getMatricula);
router.get("/matricula/:dni", getMatriculaDni);
router.post("/matricula", validarData, AddMatricula);
router.put("/matricula/:id", validarData, updateMatricula);
router.delete("/matricula/:id", delMatricula);
function validarData(req, res, next) {

  const {profesor, turno, finicio, ffin, curso, student } = req.body;

  if (!curso) {
    return res.status(400).json({
      message: "El curso es requerido..",
      exito: false,
    });
  }
  if (!profesor) {
    return res.status(400).json({
      message: "El nombre del profesor es requerido..",
      exito: false,
    });
  }
  if (!student) {
    return res.status(400).json({
      message: "El nombre del estudiante es requerido..",
      exito: false,
    });
  }
  if (!turno) {
    return res.status(400).json({
      message: "El turno es requerido..",
      exito: false,
    });
  }
  if (!finicio) {
    return res.status(400).json({
      message: "La fecha de inicio es requerida..",
      exito: false,
    });
  }
  if (!ffin) {
    return res.status(400).json({
      message: "La fecha de finalizacion es requerida ..",
      exito: false,
    });
  }
  next();
}

module.exports = router;
