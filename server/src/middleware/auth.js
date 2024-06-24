const jwt = require("jsonwebtoken");

exports.isAuthenticated = async (req, res, next) => {
  const token = req.body.token || req.headers["authorization"];
  console.log(req.headers,"lucas")
  console.log(token, "TOKEN")
  if (!token) {
    return res.status(401).json({
      status: "401",
      message: "Debe loguearse para utilizar esta función.",
    });
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      status: "401",
      message: "Token inválido.",
    });
  }
};

exports.isAdmin = (req, res, next) => {
  if (req.user?.role !== 'isAdmin') {
    return res.status(403).json({
      status: "403",
      message: "Acceso denegado. No tienes permisos de administrador.",
    });
  }
  next();
};
