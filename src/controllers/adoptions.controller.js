import { adoptionsService, petsService, usersService } from "../services/index.js";

const getAllAdoptions = async (req, res, next) => {
  try {
    const result = await adoptionsService.getAll();
    res.send(result);
  } catch (err) {
    next(err);
  }
};

const getAdoption = async (req, res, next) => {
  try {
    const adoptionId = req.params.aid;
    const adoption = await adoptionsService.getBy({ _id: adoptionId });
    if (!adoption) return res.status(404).send({ status: "error", error: "Adopcion no encontrada" });
    res.send({ status: "success", payload: adoption });
  } catch (err) {
    next(err);
  }
};

const createAdoption = async (req, res, next) => {
  try {
    const { uid, pid } = req.params;
    const user = await usersService.getUserById(uid);
    if (!user) return res.status(404).send({ status: "error", error: "Usuario no encontrado" });

    const pet = await petsService.getBy({ _id: pid });
    if (!pet) return res.status(404).send({ status: "error", error: "Mascota no encontrada" });
    if (pet.adopted) return res.status(400).send({ status: "error", error: "La mascota ya fue adoptada" });

    user.pets.push(pet._id);
    await usersService.update(user._id, { pets: user.pets });
    await petsService.update(pet._id, { adopted: true, owner: user._id });
    await adoptionsService.create({ owner: user._id, pet: pet._id });

    res.send({ status: "success", message: "Mascota adoptada" });
  } catch (err) {d
    next(err);
  }
};

export default {
  createAdoption,
  getAllAdoptions,
  getAdoption,
};