import { Router } from 'express';
import usersController from '../controllers/users.controller.js';

const router = Router();

/**
 * @openapi
 * /api/users:
 *   get:
 *     summary: Listar todos los usuarios
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: { type: string }
 *                 payload:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 */

router.get('/',usersController.getAllUsers);


/**
 * @openapi
 * /api/users/{uid}:
 *   get:
 *     summary: Obtener un usuario por id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: { type: string }
 *                 payload:
 *                   $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuario no encontrado
 */
router.get('/:uid',usersController.getUser);


/**
 * @openapi
 * /api/users/{uid}:
 *   put:
 *     summary: Actualizar un usuario
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUserInput'
 *     responses:
 *       200:
 *         description: Actualizado
 *       404:
 *         description: Usuario no encontrado
 */
router.put('/:uid',usersController.updateUser);


/**
 * @openapi
 * /api/users/{uid}:
 *   delete:
 *     summary: Eliminar un usuario
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Eliminado
 */
router.delete('/:uid',usersController.deleteUser);

export default router;