const express = require("express");
const router = express.Router();
const {
  getUsers,
  getUser,
  delUser,
  AddUser,
  upDateUser,
  loginUser,
  cambioClaveUser,
} = require("../../controller/mongodb/users");

const { isAuthenticated, isAdmin } = require("../../middleware/auth");

router.get("/users", isAuthenticated, isAdmin, getUsers);
router.get("/user/:id", isAuthenticated, getUser);
router.post("/user", isAuthenticated, isAdmin, validarData, AddUser);
router.post("/user/login", loginUser);
router.delete("/user/:id", isAuthenticated, isAdmin, delUser);
router.put("/user/cambio", isAuthenticated, isAdmin, cambioClaveUser);
router.put("/user/:id", isAuthenticated, isAdmin, validarData, upDateUser);

function validarData(req, res, next) {
  const { dni, nombre, apellido, adress,password, email,condicion,role } = req.body;

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
  if (!role) {
    return res.status(400).json({
      message: "El rol es obligatorio..",
      exito: false,
    });
  }
  next();
}

module.exports = router;
