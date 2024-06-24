
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.generarJWT = (item) => {
  
  const payload = {
    id: item.id,
    name: item.nombre + " " + item.apellido,
    email: item.email,
    role: item.role,
    exp: Date.now() + 60 * 100,
  };

  const secret = process.env.JWT_SECRET_KEY;
  const token = jwt.sign(payload, secret);
 
  return token;
};

exports.verifyJWT = (token) => {
  const secret = process.env.JWT_SECRET_KEY;
  const decoded = jwt.verify(token, secret); 

  const decodedToken = jwt.decode(token, { complete: true });
  if (Date.now() > decodedToken.payload.exp) {
  }
  if (decodedToken) {
    console.log("decoded.....", decodedToken.payload);
  }
  return decodedToken.payload;
};

exports.generaId = () => {
  const random = Math.random().toString(32).substring(2);
  const fecha = Date.now().toString(32);
  return random + fecha;
};

exports.encriptar = async (password) => {
  const salt = bcrypt.genSalt(10);
  const hash = bcrypt.hash(password, 10);
  return await hash;
};

exports.comparePassword = async function (password, passwordDB) {
  const match = await bcrypt.compare(password, passwordDB);
  return match;
};




