const { User, validate } = require('../../models/User');
const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const _ = require('lodash');
const bcrypt = require('bcryptjs');


router.get('/', async (req, res) => {
    const users = await User.find();
    users.length > 0 ? res.json(users) : res.status(404).send('No users found');
});

router.post('/register', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).json({ email: 'user already exists' });
    const avatar = gravatar.url(req.body.email, { s: 200, r: 'pg', d: 'mm' });
    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        avatar,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();
    return res.json({ user: user });

})


module.exports = router;