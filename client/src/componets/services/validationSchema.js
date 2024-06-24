const initialForm = {
  password: "", 
  confirmPassword: "", 
};

const phoneRegex = /^(?:\+?56)?[98765432]\d{7}$/; 
const validationSchema = (formValues) => ({
  dni: [
    (value) =>
      value.trim() === "" ? "El número de documento es requerido" : undefined,
    (value) =>
      value.length < 8 ? "El DNI debe tener al menos 8 caracteres" : undefined,
    (value) =>
      value.match(/^[0-9]+$/) === null ? "Solo se admiten números" : undefined,
  ],
  nombre: [
    (value) => (value.trim() === "" ? "El Nombre es requerido" : undefined),
    (value) =>
      value.length < 3 ? "Nombre debe tener al menos 3 caracteres" : undefined,
  ],
  apellido: [
    (value) => (value.trim() === "" ? "El Apellido es requerido" : undefined),
    (value) =>
      value.length < 3
        ? "Apellidos deben tener al menos 3 caracteres"
        : undefined,
  ],
  email: [
    (value) => (value.trim() === "" ? "El Email es requerido" : undefined),
    (value) =>
      !/^\S+@\S+\.\S+$/.test(value) ? "Email no es válido" : undefined,
  ],
  password: [
    (value) => (value === "" ? "La contraseña es requerida" : undefined),
  ],
  descripcion: [
    (value) =>
      value.trim() === ""
        ? "La descripción ampliada del curso es requerida"
        : undefined,
  ],
  celular: [
    (value) =>
      value.trim() === "" ? "El número de celular es requerido" : undefined,
    (value) =>
      value.length < 9
        ? "El número debe tener al menos 9 caracteres"
        : undefined,
    (value) =>
      phoneRegex.test(value) === false
        ? "Solo se admiten números de celulares"
        : undefined,
  ],
  confirmPassword: [
    (value) =>
      value === ""
        ? "La confirmación de la contraseña es requerida"
        : undefined,
    (value) =>
      value !== formValues.password
        ? "La confirmación de la contraseña debe ser igual a la contraseña"
        : undefined,
  ],
});

export default validationSchema;
