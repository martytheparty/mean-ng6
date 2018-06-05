var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const User = require('../models/user');


module.exports = (router) => {

  router.post('/register', (req, res) => {
    // req.body.email
    // req.body.username
    // req.body.password

    if (!req.body.email) {
      res.json( { success: false, message: 'You must provide an e-mail' } );
    } else {
      if (!req.body.username) {
        res.json( { success: false, message: 'You must provide a user name' } );
      } else {
        if (!req.body.password) {
          res.json( { success: false, message: 'You must provide a password' } );
        } else {
          let user = new User({
            email:req.body.email.toLowerCase(),
            username:req.body.username.toLowerCase(),
            password:req.body.password
          });

          user.save((err) => {
              if (err) {
                res.json({ success: false, message: 'Count not save user. Error: ' + err });
              } else {
                res.json({ success: true, message: 'User saved!'});
              }
            }
          );
        }
      }


    }


  });

  return router;
}
