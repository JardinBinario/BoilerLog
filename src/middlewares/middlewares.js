const { validationResult } = require('express-validator');
const { response } = require('express');
const jwt = require('jsonwebtoken');
const { v4 } = require('uuid');
const {config} = require('../config');

const checkRole = (req, res = response, next) => {
    const [,token] = req.header('Authorization').split(' ');

    const { rol } = jwt.verify(token, config.privateKey);

    //TODO we can add multi-role validation in here in case of needed for admin endpoints like user update, or for support roles.

    rol !== 'ADMIN'
        ? res.status(401).json({ ok: false, err: 'No estas autorizado.' })
        : next();

}

const isAuthenticated = (req, res, next) => {
    req.isAuthenticated()
        ? next()
        : res.redirect('/login');
}

const erroresEnPeticion = (req, res = response, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        });
    }

    next();
}

const etiquetarPeticion = (req, res = response, next) => {
    const requestId = v4();
    res.setHeader('X-Request-Id', requestId);
    next();
}

const validarJWT = (req, res = response, next) => {
    const [,token] = req.header('Authorization').split(' ');


    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'Se necesita un token de autorización'
        });
    }

    try {
        const { uid, name, rol } = jwt.verify(token, config.privateKey);
        req.uid = uid;
        req.name = name;
        req.rol = rol;
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        });
    }

    next();
}

module.exports = {
    checkRole,
    isAuthenticated,
    erroresEnPeticion,
    validarJWT,
    etiquetarPeticion
}