const User = require('../../models/mongodb/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


exports.AddUser = async (req, res) => {

  const { password, role,dni,nombre,apellido,email,adress,city,celular,condicion } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ dni,nombre,apellido,email,adress,city,celular,condicion, password: hashedPassword, role });
    await newUser.save();
    return res.status(201).json({ message: 'Usuario creado exitosamente' });
  } catch (error) {
    return res.status(400).json({ message: 'Error al crear usuario', error });
  }
};


exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(400).json({ message: 'Error al autenticar usuario', error });
  }
};


exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(400).json({ message: 'Error al obtener usuarios', error });
  }
};


exports.getUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: 'Error al obtener usuario', error });
  }
};


exports.delUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json({ message: 'Usuario eliminado exitosamente' });
  } catch (error) {
    res.status(400).json({ message: 'Error al eliminar usuario', error });
  }
};


exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, password, role } = req.body;

  try {
    const updateData = { username, role };


    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }

    const user = await User.findByIdAndUpdate(id, updateData, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json({ message: 'Usuario actualizado exitosamente', user });
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar usuario', error });
  }
};

exports.cambioClaveUser = async (req, res) => {
  const { id, newPassword } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const user = await User.findByIdAndUpdate(id, { password: hashedPassword }, { new: true });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json({ message: 'Clave de usuario actualizada exitosamente', user });
  } catch (error) {
    res.status(400).json({ message: 'Error al cambiar clave del usuario', error });
  }
};

exports.upDateUser = async (req, res) => {
  const { id } = req.params;
  const { username, password, role } = req.body;

  try {
    const updateData = { username, role };

  
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }

    const user = await User.findByIdAndUpdate(id, updateData, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json({ message: 'Usuario actualizado exitosamente', user });
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar usuario', error });
  }
};
