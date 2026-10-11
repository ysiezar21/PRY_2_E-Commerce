import { LOCATIONS } from './costaRicaLocations';

const NAME_REGEX = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ' -]+$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Deja solo los dígitos del teléfono y quita el prefijo +506 si viene
export function normalizePhone(value) {
  const digits = String(value).replace(/\D/g, '');
  return digits.length === 11 && digits.startsWith('506') ? digits.slice(3) : digits;
}

// Cada validador devuelve un mensaje de error, o '' si el campo es válido
const validators = {
  fullName: (value) => {
    const name = value.trim().replace(/\s+/g, ' ');
    if (!name) return 'Ingrese su nombre completo.';
    if (!NAME_REGEX.test(name)) return 'El nombre solo puede contener letras.';
    if (name.split(' ').length < 2) return 'Ingrese su nombre y apellido.';
    return '';
  },

  email: (value) => {
    const email = value.trim();
    if (!email) return 'Ingrese su correo electrónico.';
    if (!EMAIL_REGEX.test(email)) return 'Ingrese un correo válido, por ejemplo nombre@correo.com.';
    return '';
  },

  phone: (value) => {
    if (!value.trim()) return 'Ingrese su número de teléfono.';
    if (!/^[\d\s+()-]+$/.test(value)) return 'El teléfono solo puede contener números.';
    if (!/^[2-8]\d{7}$/.test(normalizePhone(value))) {
      return 'Ingrese un teléfono de 8 dígitos, por ejemplo 8888-8888.';
    }
    return '';
  },

  province: (value) => (value ? '' : 'Seleccione una provincia.'),

  canton: (value, form) => {
    if (!form.province) return 'Primero seleccione una provincia.';
    if (!value) return 'Seleccione un cantón.';
    if (!LOCATIONS[form.province]?.includes(value)) return 'El cantón no pertenece a la provincia.';
    return '';
  },

  address: (value) => {
    const address = value.trim();
    if (!address) return 'Ingrese su dirección de entrega.';
    if (address.length < 10) return 'Agregue más detalle a la dirección (distrito, calle, número de casa).';
    if (address.length > 200) return 'La dirección no puede superar los 200 caracteres.';
    return '';
  },

  notes: (value) => (value.length > 200 ? 'Las indicaciones no pueden superar los 200 caracteres.' : ''),
};

// Devuelve solo los campos con error: { campo: mensaje }
export function validateForm(form) {
  const errors = {};

  Object.keys(validators).forEach((name) => {
    const message = validators[name](form[name] ?? '', form);
    if (message) errors[name] = message;
  });

  return errors;
}