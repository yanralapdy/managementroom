const models = require('../models');
const rooms = models.rooms;

exports.showAllRoom = async (req, res) => {
  const find = await rooms.findAll({
    attributes: ['id', 'name'],
    order: [['id', 'ASC']],
  });
  res.send(find);
};
exports.addRoom = (req, res) => {
  const {name} = req.body;
  rooms
    .create({
      name: name,
    })
    .then(result => {
      res.send({
        success: true,
        result,
      });
    })
    .catch(err =>
      res.send({
        err,
        message: 'fail to insert data',
        data: req.params.idWt,
      }),
    );
};

exports.updateRoom = (req, res) => {
  const {id} = req.params;
  rooms
    .update(req.body, {where: {id: id}})
    .then(() => {
      rooms
        .findOne({where: {id: id}})
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
