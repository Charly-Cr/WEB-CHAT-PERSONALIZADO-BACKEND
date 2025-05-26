const { business, user } = require("../models");

// Función para generar slug desde el nombre
const generateSlug = (name) =>
  name
    .toLowerCase()                // convierte todo a minúsculas
    .replace(/\s+/g, '-')         // reemplaza espacios por guiones
    .replace(/[^\w\-]+/g, '')     // elimina caracteres especiales
    .replace(/\-\-+/g, '-')       // evita guiones duplicados
    .replace(/^-+|-+$/g, '');     // quita guiones al inicio o final

const normalizeColor = (color, defaultColor) => {
  if (!color || color.trim() === '' || color === '#000000') return defaultColor;
  return color;
};


const getAllBusinesses = async (userId) => {
  const where = userId ? { userId } : {};
  return await business.findAll({ 
    where,
    include: [user] 
  });
};

const createBusiness = async (body) => {
  console.log('createBusiness body:', body);
  try {
    const slug = generateSlug(body.businessName);

    const existing = await business.findOne({ where: { slug } });
    if (existing) throw new Error("Ya existe un negocio con ese nombre");

    return await business.create({
      ...body,
      slug,
      primaryColor: normalizeColor(body.primaryColor, "#4f46e5"),
      secondaryColor: normalizeColor(body.secondaryColor, "#14b8a6"),
      backgroundColor: normalizeColor(body.backgroundColor, "#0f172a"),
      textColor: normalizeColor(body.textColor, "#ffffff"),
    });
  } catch (error) {
    console.error('Error en createBusiness:', error);
    throw error; // para que el middleware catchError lo capture y envíe 500 al cliente
  }
};

const getOneBusiness = async (userId) => {
  const found = await business.findOne({
    where: { userId },
    include: {
      model: user
    },
  });
  if (!found) throw new Error("No autorizado o no existe");
  return found;
};

const getBusinessBySlug = async (slug) => {
  return await business.findOne({ where: { slug } });
};

const putBusiness = async (body, userId) => {
  return await business.update(body, { where: { userId }, returning: true });
};

const removeBusiness = async (userId, id) => {
  return await business.destroy({ where: { userId, id } });
};

module.exports = {
  getAllBusinesses,
  createBusiness,
  getOneBusiness,
  getBusinessBySlug,
  putBusiness,
  removeBusiness,
};
