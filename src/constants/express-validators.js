const { check } = require('express-validator');
const { erroresEnPeticion, } = require('../middlewares/middlewares');

const userSchema = [
    check('name', 'El nombre es obligatorio').notEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('lastName', 'El nombre es obligatorio').notEmpty(),
    check('user', 'El usuario es obligatorio').notEmpty(),
    check('pwd').notEmpty().withMessage('La contraseña es requerida')
        .isLength({ min: 6 })
        .withMessage('La contraseña debe de tener al menos 6 caractéres')
];

const validators = {
    authValidators: {
        '/new': userSchema,
        '/login': [
            check('user', 'El nombre es obligatorio').not().isEmpty(),
            check('pwd', 'La contraseña es obligatoria').not().isEmpty()
        ],
    },
};

Object.keys(validators).forEach((validator) => {
    Object.keys(validators[validator]).forEach((requestValidator) => {
        const toUpdate = validators[validator][requestValidator];
        toUpdate.push(erroresEnPeticion);
    });
});

module.exports = {
    validators
}