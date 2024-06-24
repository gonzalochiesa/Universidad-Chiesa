const Students = require("../../models/mongodb/students");



const getStudents = async (req, res) => {
  try {
    await Students.find().then((data) => {
      res.status(200).json({ data: data, message: "Consulta exitosa" });
      return;
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



const getStudent = async (req, res) => {
  try {
    const existeItem = await Students.findOne({ where: { id: req.params.id } });
    if (existeItem) {
      res.status(200).json({ data: existeItem, message: "Consulta exitosa" });
      return;
    }
    if (!existeItem) {
      res.status(400).json({ message: "El ID indicado no está registrado" });
      return;
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getStudentDni = async (req, res) => {
  try {
    const existeItem = await Students.findOne({
      where: { dni: req.params.dni },
    });
    if (existeItem) {
      res.status(200).json({ data: existeItem, message: "Consulta exitosa" });
      return;
    }
    if (!existeItem) {
      res.status(400).json({ message: "El ID indicado no está registrado" });
      return;
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



const delStudent = async (req, res) => {
  const existeItem = await Students.findByIdAndDelete(req.params.id);
  if (!existeItem) {
    res.status(400).json({ message: "El ID indicado no está registrado" });
    return;
  }
  try {
    await Students.destroy({ where: { id: req.params.id } });
    res.status(200).json({ message: "Registro Eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const AddStudent = async (req, res) => {
  const existeItem = await Students.findOne({ dni: req.body.dni });
  if (existeItem) {
    return res
      .status(400)
      .json({ message: "El código indicado ya está registrado" });
  }

  const student = new Students({
    dni: req.body.dni,
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    adress: req.body.adress,
    city: req.body.city,
    email: req.body.email,
    celular: req.body.celular,
    condicion: req.body.condicion,
  });
  student.password = await student.encryptPassword(req.body.password);
  try {
    const registro = await student.save();
    res.status(201).json({
      status: "201",
      data: registro,
      message: "El registro fué creado",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const updateStudent = async (req, res) => {
  const id = req.params.id;
  try {
    const student = await Students.findByIdAndUpdate(id, {
      nombre: req.body.nombre,
      celular: req.body.celular,
      condicion: req.body.condicion,
    });
    
    student.password = await student.encryptPassword(req.body.password);
    const regStudent = await student.save();
   
    res.json({
      data: regStudent,
      message: "El registro fué Actualizado",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getStudents,
  getStudent,
  delStudent,
  AddStudent,
  updateStudent,
  getStudentDni,
};
