const Matriculas = require("../../models/mongodb/matricula");



const getMatriculas = async (req, res) => {
  try {
    await Matriculas.find().then((data) => {
      res.status(200).json({ data: data, message: "Consulta exitosa" });
      return;
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



const getMatricula = async (req, res) => {
  try {
    const existeItem = await Matriculas.findOne({
      where: { id: req.params.id },
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


const getMatriculaDni = async (req, res) => {
  try {
    const existeItem = await Matriculas.findOne({
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


const delMatricula = async (req, res) => {
  const existeItem = await Matriculas.findByIdAndDelete(req.params.id);
  if (!existeItem) {
    res.status(400).json({ message: "El ID indicado no está registrado" });
    return;
  }
  try {
    await Matriculas.destroy({ where: { id: req.params.id } });
    res.status(200).json({ message: "Registro Eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const AddMatricula = async (req, res) => {
  const existeItem = await Matriculas.findOne({
    $and: [
      { curso: req.body.curso},
      { student: req.body.student },
    ],
  });
  if (existeItem) {
    return res
      .status(400)
      .json({ message: "El Estudiante ya está registrado" });
  }

  const matricula = new Matriculas({
    curso: req.body.curso,
    profesor: req.body.profesor,
    student: req.body.student,
    turno: req.body.turno,
    finicio: req.body.finicio,
    ffin: req.body.ffin,
  });
  try {
    const registro = await matricula.save();
    res.status(201).json({
      status: "201",
      data: registro,
      message: "El registro fué creado",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



const updateMatricula = async (req, res) => {
  const id = req.params.id;
  const existeItem = await Matriculas.findOne({ _id: req.params.id });
  try {
    if (existeItem.student !== req.body.student) {
      const existeItem = await Matriculas.findOne({
        $and: [{ curso: req.body.curso }, { student: req.body.student }],
      });
      if (existeItem) {
        return res
          .status(400)
          .json({ message: "El Estudiante ya está registrado" });
      }
    }
    const matricula = await Matriculas.findByIdAndUpdate(id, {
      profesor: req.body.profesor,
      student: req.body.student,
      turno: req.body.turno,
      finicio: req.body.finicio,
      ffin: req.body.ffin,
    });

    res.json({
      data: matricula,
      message: "El registro fué Actualizado",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getMatriculas,
  getMatricula,
  delMatricula,
  AddMatricula,
  updateMatricula,
  getMatriculaDni,
};
