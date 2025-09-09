import { usersService } from "../services/index.js";
import { createHash, passwordValidation } from "../utils/index.js";
import UserDTO from '../dto/User.dto.js';
import { signToken, verifyToken } from '../utils/jwt.util.js';

const COOKIE_NAME = 'coderCookie';
const UNPROTECTED_COOKIE = 'unprotectedCookie';
const isProd = process.env.NODE_ENV === 'production';

const baseCookieOpts = {
  httpOnly: true,
  sameSite: isProd ? 'lax' : 'lax',
  secure: isProd,
  maxAge: 60 * 60 * 1000,
};

const register = async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;
    if (!first_name || !last_name || !email || !password) {
      return res.status(400).send({ status: "error", error: "Incomplete values" });
    }
    const exists = await usersService.getUserByEmail(email);
    if (exists) return res.status(400).send({ status: "error", error: "User already exists" });

    const hashedPassword = await createHash(password);
    const user = { first_name, last_name, email, password: hashedPassword };
    const result = await usersService.create(user);
    return res.send({ status: "success", payload: result._id });
  } catch (error) {
    return res.status(500).send({ status: "error", error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).send({ status: "error", error: "Incomplete values" });

    const user = await usersService.getUserByEmail(email);
    if (!user) return res.status(404).send({ status: "error", error: "User doesn't exist" });

    const isValidPassword = await passwordValidation(user, password);
    if (!isValidPassword) return res.status(400).send({ status: "error", error: "Incorrect password" });

    const userDto = UserDTO.getUserTokenFrom(user);
    const token = signToken(userDto, { expiresIn: '1h' });

    return res
      .cookie(COOKIE_NAME, token, baseCookieOpts)
      .send({ status: "success", message: "Logged in" });
  } catch (error) {
    return res.status(500).send({ status: "error", error: error.message });
  }
};

const current = async (req, res) => {
  try {
    const token = req.cookies[COOKIE_NAME];
    if (!token) return res.status(401).send({ status: "error", error: "No token" });

    const user = verifyToken(token);
    return res.send({ status: "success", payload: user });
  } catch (error) {
    return res.status(401).send({ status: "error", error: "Token invalido o expirado" });
  }
};

const unprotectedLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).send({ status: "error", error: "Valores incompletos" });

    const user = await usersService.getUserByEmail(email);
    if (!user) return res.status(404).send({ status: "error", error: "El usuario no existe" });

    const isValidPassword = await passwordValidation(user, password);
    if (!isValidPassword) return res.status(400).send({ status: "error", error: "Contraseña incorrecta" });

    const payload = UserDTO.getUserTokenFrom(user);
    const token = signToken(payload, { expiresIn: '1h' });

    return res
      .cookie(UNPROTECTED_COOKIE, token, baseCookieOpts)
      .send({ status: "success", message: "Unprotected Logged in" });
  } catch (error) {
    return res.status(500).send({ status: "error", error: error.message });
  }
};

const unprotectedCurrent = async (req, res) => {
  try {
    const token = req.cookies[UNPROTECTED_COOKIE];
    if (!token) return res.status(401).send({ status: "error", error: "No token" });

    const user = verifyToken(token);
    return res.send({ status: "success", payload: user });
  } catch (error) {
    return res.status(401).send({ status: "error", error: "Token invalido o expirado" });
  }
};

export default {
  register,
  login,
  current,
  unprotectedLogin,
  unprotectedCurrent
};