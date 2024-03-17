const express = require('express');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth.controller');
const { validarJWT, checkRole } = require('../middlewares/middlewares');
const { validators } = require('../constants/express-validators');

const { authValidators } = validators;
const authRouter = express.Router();

authRouter.post('/auth/create_user', authValidators['/new'], validarJWT, checkRole, crearUsuario);
authRouter.post('/auth/login', authValidators['/login'], loginUsuario);
authRouter.get('/auth/renew', validarJWT, revalidarToken);

module.exports = authRouter;