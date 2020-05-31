const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const mongoose = require('mongoose');
const Post = mongoose.model('Post');
const User = mongoose.model('User');
//const auth = require('../../middleware/auth');
const requireLogin = require('../../middleware/requirelogin');
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

router.get('/user/:id', requireLogin, (req, res) => {
  console.log(req.params.id);
  User.findOne({ _id: req.params.id })
    .select('-password')
    .then((user) => {
      Post.find({ postedBy: req.params.id })
        .populate('postedBy', '_id name')
        .exec((err, posts) => {
          if (err) {
            return res.status(422).json({ error: err });
          }
          res.json({ user, posts });
        });
    })
    .catch((err) => {
      return res.status(404).json({ error: 'User not found' });
    });
});

router.put('/follow', requireLogin, (req, res) => {
  User.findByIdAndUpdate(
    req.body.followId,
    {
      $push: { followers: req.user._id },
    },
    {
      new: true,
    },
    (err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      }
      User.findByIdAndUpdate(
        req.user._id,
        {
          $push: { following: req.body.followId },
        },
        { new: true }
      )
        .select('-password')
        .then((result) => {
          res.json(result);
        })
        .catch((err) => {
          return res.status(422).json({ error: err });
        });
    }
  );
});
router.put('/unfollow', requireLogin, (req, res) => {
  User.findByIdAndUpdate(
    req.body.unfollowId,
    {
      $pull: { followers: req.user._id },
    },
    {
      new: true,
    },
    (err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      }
      User.findByIdAndUpdate(
        req.user._id,
        {
          $pull: { following: req.body.unfollowId },
        },
        { new: true }
      )
        .select('-password')
        .then((result) => {
          res.json(result);
        })
        .catch((err) => {
          return res.status(422).json({ error: err });
        });
    }
  );
});

router.put('/updatepic', requireLogin, (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    { $set: { pic: req.body.pic } },
    { new: true },
    (err, result) => {
      if (err) {
        return res.status(422).json({ error: 'pic canot post' });
      }
      res.json(result);
    }
  );
});

router.post('/search-users', (req, res) => {
  let userPattern = new RegExp('^' + req.body.query);
  User.find({ email: { $regex: userPattern } })
    .select('_id email')
    .then((user) => {
      res.json({ user });
    })
    .catch((err) => {
      console.log(err);
    });
});
module.exports = router;
