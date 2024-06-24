const Teachers = require("../../models/mongodb/teachers");



const getTeachers = async (req, res) => {
  try {
    await Teachers.find().then((data) => {
      res.status(200).json({ data: data, message: "Consulta exitosa" });
      return;
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



const getTeacher = async (req, res) => {
  try {
    const existeItem = await Teachers.findOne({ where: { id: req.params.id } });
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


const getTeacherDni = async (req, res) => {
  try {
    const existeItem = await Teachers.findOne({
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



const delTeacher = async (req, res) => {
  const existeItem = await Teachers.findByIdAndDelete(req.params.id);
  if (!existeItem) {
    res.status(400).json({ message: "El ID indicado no está registrado" });
    return;
  }
  try {
    await Teachers.destroy({ where: { id: req.params.id } });
    res.status(200).json({ message: "Registro Eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const AddTeacher = async (req, res) => {

  const existeItem = await Teachers.findOne({ dni: req.body.dni });
  if (existeItem) {
    return res
      .status(400)
      .json({ message: "El código indicado ya está registrado" });
  }

  const teacher = new Teachers({
    dni: req.body.dni,
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    adress: req.body.adress,
    city: req.body.city,
    email: req.body.email,
    celular: req.body.celular,
    condicion: req.body.condicion,
  });
  teacher.password = await teacher.encryptPassword(req.body.password);
  try {
    const registro = await teacher.save();
    res.status(201).json({
      status: "201",
      data: registro,
      message: "El registro fué creado",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



const upDateTeacher = async (req, res) => {
  const id = req.params.id;

  try {
    const teacher = await Teachers.findByIdAndUpdate(id, {
      nombre: req.body.nombre,
      celular: req.body.celular,
      condicion: req.body.condicion,
    });
    
    teacher.password = await teacher.encryptPassword(req.body.password);
    const regTeacher = await teacher.save()
    res.json({
      data: regTeacher,
      message: "El registro fué Actualizado",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getTeachers,
  getTeacher,
  delTeacher,
  AddTeacher,
  upDateTeacher,
  getTeacherDni,
};
