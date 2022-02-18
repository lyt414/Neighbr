const Users = require('../db/models/users');
const utils = require('./utils.js');

module.exports = {
  login: async (req, res, next) => {
    try {
      const user = await Users.findOne({ username: req.body.username });
      if (!user) {
        res.status(401).json({ message: 'could not find user' });
      }
      const isValid = utils.comparePassword(req.body.password, user.password, user.salt);
      if (isValid) {
        // issue JWT token
        const tokenObj = utils.issueJWT(user);
        res.status(200).json({
          token: tokenObj.token,
          expiresIn: tokenObj.expires,
          avatar_url: user.avatar_url,
          username: user.username
        });
      } else {
        res.status(401).json({ message: 'You entered the wrong password' });
      }
    } catch (e) {
      console.error(e);
      next(e);
    }
  },
  signup: async (req, res, next) => {
    // check if username or email exists
    try {
      const userR = await Users.find({
        $or: [
          {
            username: req.body.username
          },
          {
            email: req.body.email
          }
        ]
      });
      if (userR.length > 0) {
        res.json({ success: false, msg: 'This username/email has been registered!' });
      } else {
        const saltHash = utils.genPassword(req.body.password);
        const { salt, hash } = saltHash;

        const newUser = new Users({
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          username: req.body.username,
          email: req.body.email,
          password: hash,
          salt,
          avatar_url: req.body.avatar_url,
          street_address: req.body.street_address,
          city: req.body.city,
          state: req.body.state,
          zip: req.body.zip,
          country: req.body.country,
          bio: req.body.bio
        });

        try {
          newUser.save()
            .then((user) => {
              res.json({ success: true, user });
            });
        } catch (err) {
          res.json({ success: false, msg: err });
        }
      }
    } catch (e) {
      // console.error(e);
      next(e);
    }
    // if (!req.body.username || !req.body.password || !req.body.email) {
    //   res.json({ success: false, msg: 'Please pass username and password.' });
  }
};
