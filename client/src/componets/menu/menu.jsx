import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUsersContext } from "../../hooks/UsersContext";
import "./menu.css"; 

function MenuItem({ item }) {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="menuItem">
      <div onClick={handleToggle} className="menuItemTitle">
        {item.route ? <Link to={item.route}>{item.title}</Link> : item.title}
      </div>
      {isOpen && item.subItems.length > 0 && (
        <ul className="submenu">
          {item.subItems.map((subItem) => (
            <li key={subItem.title} className="submenuItem">
              {subItem.route ? (
                <Link to={subItem.route}>{subItem.title}</Link>
              ) : (
                <span onClick={subItem.action}>{subItem.title}</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Menu() {
  const { usersContext, setUsersContext } = useUsersContext();
  const navigate = useNavigate();

  console.log("usersContext:", usersContext); 

  if (usersContext === undefined) {
    return <div>Cargando...</div>;
  }

  const handleLogout = () => {
    setUsersContext({ isLoggedIn: false, role: "guest" });
    navigate("/login");
  };

  const menuItems = [
    {
      title: "Home",
      route: "/",
      subItems: [],
      allowedRoles: ["isAdmin", "isStudent", "isTeacher","guest"], 
    },
    {
      title: "Estudiante",
      subItems: [
        { title: "Registro", route: "/register" },
        { title: "Perfil", route: "/perfil" },
      ],
      allowedRoles: ["isAdmin", "isStudent"], 
    },
    {
      title: "Listados",
      subItems: [
        { title: "Cursos", route: "/vecurso" },
        { title: "Estudiantes por Curso", route: "/matricula" },
      ],
      allowedRoles: ["isAdmin", "isTeacher", "isStudent"], 
    },
    {
      title: "Administración",
      subItems: [
        { title: "Gestión de Cursos", route: "/cursos" },
        { title: "Gestión de Estudiantes", route: "/students" },
        { title: "Gestión de Profesores", route: "/teachers" },
        { title: "Matriculación de Cursos", route: "/matricula" },
        { title: "Usuarios", route: "/users" },
        { title: "Contactos", route: "/contact" },
      ],
      allowedRoles: ["isAdmin"], 
    },
  ];

  const accessItems = [
    {
      title: "Accesos",
      subItems: usersContext.isLoggedIn
        ? [
            { title: "Cambio de Clave", route: "/cambioClave", allowedRoles: ["isAdmin", "isStudent", "isTeacher", "guest"] },
            { title: "Salir", action: handleLogout },
          ]
        : [
            { title: "Inicio Sesión", route: "/login" },
            { title: "Registro", route: "/register",allowedRoles: ["isAdmin"] } ,
          ],
      allowedRoles: ["isAdmin", "isStudent", "isTeacher", "guest"], 
    }
  ];

  const userHasAccess = (item) => {
    if (!item.allowedRoles) return true;
    return item.allowedRoles.includes(usersContext.role);
  };

  return (
    <div className="menu">
      {menuItems.filter(userHasAccess).map((item) => (
        <MenuItem key={item.title} item={item} />
      ))}
      {accessItems.map((item) => (
        <MenuItem key={item.title} item={item} />
      ))}
    </div>
  );
}

export default Menu;
