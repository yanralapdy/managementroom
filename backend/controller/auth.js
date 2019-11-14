const jwt = require('jsonwebtoken');
const {secret} = require('./../middleware');
const models = require('../models');
const Admin = models.admins;

//Login
exports.signIn = (req, res) => {
  const email = req.body.email;
  const password = req.body.password; //

  Admin.findOne({where: {email, password}}).then(admin => {
    if (admin) {
      const token = 'Bearer ' + jwt.sign({adminId: admin.id}, secret);
      res.send({
        id: admin.id,
        email: admin.email,
        name: admin.name,
        image: admin.image,
        token,
      });
    } else {
      res.send({
        error: true,
        message: 'wrong email or password',
      });
    }
  });
};
//
//Register
exports.signUp = (req, res) => {
  const {email} = req.body;
  Admin.findOne({where: {email}}).then(admin => {
    if (admin) {
      res.send({
        error: true,
        message: 'The email is already registered',
      });
    } else {
      Admin.create(req.body).then(item => {
        const token = 'Bearer ' + jwt.sign({adminId: item.id}, secret);
        res.send({
          id: item.id,
          email: item.email,
          name: item.name,
          token,
        });
      });
    }
  });
};
