const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');

//authMiddleware.requireLogin,

router.get('/',  (req, res) => {
    res.render('dashboard', { session: req.session });
});

module.exports = router;

