const models = require('../models');
const customers = models.customers;

exports.showAllCustomers = async (req, res) => {
  const find = await customers.findAll({
    attributes: ['id', 'name', 'identity_number', 'phone_number', 'image'],
    order: [['id', 'ASC']],
  });
  res.send(find);
};
exports.addCustomer = (req, res) => {
  const {name, identity_number, phone_number, image} = req.body;
  customers
    .create({
      name,
      identity_number,
      phone_number,
      image,
    })
    .then(result => {
      res.send({
        success: true,
        result,
      });
    })
    .catch(() =>
      res.send({
        message: 'fail to insert data',
        data: req.param.id,
      }),
    );
};

exports.updateCustomer = (req, res) => {
  const {id} = req.params;
  customers
    .update(req.body, {where: {id}})
    .then(() => {
      customers
        .findOne({where: {id}})
        .then(result => {
          res.send({
            result,
          });
        })
        .catch(() => {
          res.send({
            message: 'failed',
            reason: 'cannot find the room',
          });
        });
    })
    .catch(() => {
      res.send({
        message: 'failed',
        reason: 'the input is not correct',
      });
    });
};
