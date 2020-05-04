const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const User = require('../../models/User');
const auth = require('../../middleware/auth');
const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

//@route post api/users
//@description Reagister admin
//@access private
router.post(
  '/',
  [
    check('username', 'Username is required').not().isEmpty(),
    check('email', 'Email address is required').not().isEmpty(),
    check('password', 'Password is required').isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password, pic } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ message: 'User already exists' }] });
      }

      user = new User({
        name,
        email,
        password,
        pic,
      });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();
      res.json({ message: 'saved successfully' });
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Internal server error');
    }
  }
);
