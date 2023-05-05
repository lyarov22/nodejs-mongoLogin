const bcrypt = require('bcryptjs');
const User = require('../models/user');

async function register(req, res){
    const { email, password } = req.body;

    if (!email || !password) {
       return res.status(400).send('Input Email And Password');
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).send('This Email already registred')
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const user = new User({
        email,
        password: hashedPassword,
    });

    try {
        await user.save();
        res.send('Successful register');
    } catch (err) {
        res.status(500).send('Error from save user in DB');
    }

}

module.exports = {
    register
};