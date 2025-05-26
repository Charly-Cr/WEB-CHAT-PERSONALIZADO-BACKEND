const { service, business } = require("../models");

const getAllServices = async (userId) => {
  const where = userId ? { userId } : {} ;  // Aquí se filtra por userId
  return await service.findAll({
    where,
    include: { 
      model: business,
    attributes: ["id", "businessName"] }  
  });
};


const createService = async (data) => {
  const { businessId, userId } = data;
  const businessBelongsToUser = await business.findOne({
    //El id del business(id) sea igual a data.businessId
    //El userId(dueño) sea igual a data.userId
    where: { id: businessId, userId }  // validas que el negocio sea suyo
  });
  if (!businessBelongsToUser) throw new Error("No autorizado");
  return await service.create(data);  // aquí ya tienes todo lo necesario
};


const getOneService = async (userId) => {
  const found = await service.findOne({
    where: { userId },  // más directo y eficiente
    include: {
      model: business,
      attributes: ["id", "businessName"],
    },
  });
  if (!found) throw new Error("No autorizado o no existe");
  return found;
};


const updateService = async (data, userId) => {
  const existing = await service.findOne({ where: { userId } });
  if (!existing) throw new Error("No autorizado");

  const [_, updated] = await service.update(data, {
    where: { userId },
    returning: true,
  });

  return updated[0];
};



const deleteService = async (userId) => {
  const existing = await service.findOne({ where: { userId } });
  if (!existing) throw new Error("No autorizado");

  return await service.destroy({ where: { userId } });
};

module.exports = {
  getAllServices,
  getOneService,
  createService,
  updateService,
  deleteService,
};
