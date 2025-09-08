import { Router } from 'express';
import { createHash } from '../utils/index.js';
import { mockUser, mockPet, mockMany } from '../mocks/generators.js';
import userModel from '../dao/models/User.js';
import petModel from '../dao/models/Pet.js';

const router = Router();

router.get('/mockingusers', async (req, res) => {
  try {
    const { count = 50 } = req.query;
    const hash = await createHash('coder123');
    const users = mockMany(count, () => mockUser({ hash }));
    res.send({ status: 'success', payload: users });
  } catch (err) {
    res.status(500).send({ status: 'error', error: err.message });
  }
});

router.get('/mockingpets', async (req, res) => {
  try {
    const { count = 50 } = req.query;
    const pets = mockMany(count, mockPet);
    res.send({ status: 'success', payload: pets });
  } catch (err) {
    res.status(500).send({ status: 'error', error: err.message });
  }
});

router.post('/generateData', async (req, res) => {
  try {
    let { users = 0, pets = 0 } = req.body || {};
    users = Number.isFinite(+users) && +users >= 0 ? +users : 0;
    pets = Number.isFinite(+pets) && +pets >= 0 ? +pets : 0;

    const operations = [];
    let insertedUsers = [];
    let insertedPets = [];

    if (users > 0) {
      const hash = await createHash('coder123');
      const userDocs = mockMany(users, () => mockUser({ hash }));
      operations.push(
        userModel.insertMany(userDocs, { ordered: false }).then(r => { insertedUsers = r; })
      );
    }

    if (pets > 0) {
      const petDocs = mockMany(pets, mockPet);
      operations.push(
        petModel.insertMany(petDocs, { ordered: false }).then(r => { insertedPets = r; })
      );
    }

    await Promise.all(operations);

    res.send({
      status: 'success',
      message: 'Datos generados correctamente',
      meta: {
        requested: { users, pets },
        inserted: { users: insertedUsers.length, pets: insertedPets.length }
      },
      samples: {
        users: insertedUsers.slice(0, 3),
        pets: insertedPets.slice(0, 3)
      }
    });
  } catch (err) {
    res.status(500).send({ status: 'error', error: err.message });
  }
});

export default router;