const models = require('../models');
const rooms = models.rooms;
const checkins = models.orders;
const customers = models.customers;

exports.showCheckin = async (req, res) => {
  const find = await rooms.findAll({
    attributes: ['id', 'name'],
    order: [['id', 'ASC']],
    include: [
      {
        model: checkins,
        as: 'order',
        required: false,
        include: [
          {
            model: customers,
            as: 'customerId',
          },
        ],
      },
    ],
  });
  res.send(find);
};
exports.checkin = (req, res) => {
  const {
    duration,
    is_booked,
    is_done,
    order_end_time,
    customer,
    room,
  } = req.body;
  checkins
    .create({
      duration,
      is_booked,
      is_done,
      order_end_time,
      customer,
      room,
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
  checkins
    .update(req.body, {where: {id}})
    .then(() => {
      checkins
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
