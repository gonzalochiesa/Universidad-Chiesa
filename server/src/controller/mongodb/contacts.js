const Contacts = require("../../models/mongodb/contacts");




const getContacts = async (req, res) => {
  try {
    await Contacts.find().then((data) => {
      res.status(200).json({ data: data, message: "Consulta exitosa" });
      return;
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



const delContact = async (req, res) => {
  const existeItem = await Contacts.findByIdAndDelete(req.params.id);
  if (!existeItem) {
    res.status(400).json({ message: "El ID indicado no está registrado" });
    return;
  }
  try {
    await Contacts.destroy({ where: { id: req.params.id } });
    res.status(200).json({ message: "Registro Eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const AddContact = async (req, res) => {

  const contact = new Contacts({
    nombre: req.body.nombre,
    email: req.body.email,
    celular: req.body.celular,
    city: req.body.city,
    curso: req.body.curso,
    comment: req.body.comment,
  });

  try {
    const registro = await contact.save();
    // const ressult = courseController(req, res);
    res.status(201).json({
      status: "201",
      data: registro,
      message: "El registro fue creado",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getContacts,
  delContact,
  AddContact
};
