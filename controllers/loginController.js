const bcrypt = require('bcryptjs');
const User = require('../models/user');

async function login(req, res) {
    const { email, password } = req.body;

    // Check correct labels
    if (!email || !password) {
        return res.status(400).send('Input Email And Password');
    }

    //Search Email
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).send('Wrong Email or Password');
    }

    //Check password
    const isPasswordCorrect = bcrypt.compareSync(password, user.password);
    if (!isPasswordCorrect) {
        return res.status(400).send('Wrong Email or Password');
    }

    req.session.isAuthenticated = true;
    req.session.user = {
        _id: user._id,
        email: user.email,
        role: user.role,
    };

    res.redirect('/')

}

module.exports = {
    login
};