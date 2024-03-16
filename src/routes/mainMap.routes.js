const express = require('express');

const authRoutes = require('./auth.routes');
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.use(authRoutes);
// TODO add other routes like so router.use(indexRoutes);

module.exports = router;
