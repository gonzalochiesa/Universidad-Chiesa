const express = require("express");
const router = express.Router();
const {
  getContacts,
  delContact,
  AddContact
} = require("../../controller/mongodb/contacts.js");
const { isAuthenticated, isAdmin } = require("../../middleware/auth");
router.get("/contacts", isAuthenticated, isAdmin, getContacts);
router.post("/contact", validarData, AddContact);
router.delete("/contact/:id", isAuthenticated, isAdmin, delContact);

function validarData(req, res, next) {

    const { nombre, email, curso, comment} = req.body;
  
    if (!nombre) {
      return res.status(400).json({
        message: "Ingrese su nombre",
        exito: false,
      });
    }
    if (!email) {
      return res.status(400).json({
        message: "Ingrese un email",
        exito: false,
      });
    }
    if (!curso) {
        return res.status(400).json({
          message: "el curso es obligatorio",
          exito: false,
        });
      }
      if (!comment) {
        return res.status(400).json({
          message: "el comentario es obligatorio",
          exito: false,
        });
      }
    next();
  }


module.exports = router;
