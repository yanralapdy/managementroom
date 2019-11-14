const models = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const webtoons = models.webtoons;
const users = models.users;
const favourites = models.favourites;
const episodes = models.episodes;
const images = models.images;

//show all users

//Webtoon
exports.showAllRoom = async (req, res) => {
  if (req.query.title) {
    const find = await webtoons.findAll({
      attributes: ['id', 'name'],
    });
    res.send(find);
  }
};
exports.findToonTitle = async (req, res) => {
  const title = await webtoons.findAll({
    where: {title: {[Op.like]: `%${req.query.title}%`}},
  });
  res.send(title);
};
//Webtoon Episode
exports.showEpisode = async (req, res) => {
  const eps = await episodes.findAll({
    where: {webtoon: req.params.id},
    include: [
      {
        model: webtoons,
        as: 'webToon',
      },
    ],
  });
  res.send(eps);
};
//Webtoon Episode Image
exports.showEpImage = (req, res) => {
  episodes
    .findOne({
      where: {webtoon: req.params.idWt, id: req.params.idEp},
    })
    .then(eps => {
      images
        .findAll({
          where: {episode: eps.id},
        })
        .then(result => res.send(result))
        //catch err of the second query
        .catch(() =>
          res.send({
            data: 'The Episode does not exist!',
          }),
        );
    })
    //catch err first query
    .catch(() =>
      res.send({
        data: 'The Episode does not exist!',
      }),
    );
};
//Favourite
//Showing all
exports.showFavourite = async (req, res) => {
  const fav = await favourites.findAll({
    where: {user: req.params.id},
    include: [
      {
        model: webtoons,
        as: 'webtoonId',
      },
      {
        model: users,
        as: 'userId',
      },
    ],
  });
  res.send(fav);
};

//User
exports.showAllUser = (req, res) => {
  users.findAll().then(result => res.send(result));
};

//MyWebtoon Menu
exports.myWebtoon = async (req, res) => {
  const webtoon = await webtoons.findAll({
    where: {created_by: req.params.id},
    include: {
      model: users,
      as: 'createdBy',
    },
  });
  res.send(webtoon);
};
//Create Webtoon Menu
//1.Adding New Webtoon
exports.createWebtoon = (req, res) => {
  const {title, genre, image} = req.body;
  const fav_count = 0;
  const createdBy = req.params.id;
  webtoons
    .create({
      title: title,
      genre: genre,
      fav_count: fav_count,
      image: image,
      created_by: createdBy,
    })
    .then(result => {
      res.send({
        success: true,
        data: req.body,
        allData: createdBy,
        fav: fav_count,
      });
    });
};
//2.Showing Add New/Update Webtoon Menu
exports.showCreateWebtoon = (req, res) => {
  webtoons
    .findOne({where: {created_by: req.params.idUs, id: req.params.idWt}})
    .then(eps => {
      episodes
        .findAll({
          where: {webtoon: eps.id},
        })
        .then(result => res.send(result));
    });
};
//3.Update Webtoon
exports.updateWebtoon = (req, res) => {
  const {idUs, idWt} = req.params;
  webtoons
    .update(req.body, {where: {id: idWt, created_by: idUs}})
    .then(result => {
      res.send({
        success: true,
        data: result,
      });
    })
    .catch(err => {
      err;
    });
};
//4.Delete Webtoon
exports.deleteWebtoon = (req, res) => {
  const {idUs, idWt} = req.params;
  webtoons
    .destroy({where: {id: idWt, created_by: idUs}})
    .then(result => {
      res.send({
        success: 'file has been deleted',
        data: result.id,
      });
    })
    .catch(() =>
      res.send({
        message: 'The data does not exist!',
      }),
    );
};
// exports.showCreateWebtoon = (req, res) => {
//   webtoons
//     .findOne({
//       where: {created_by: req.params.idUs, id: req.params.idWt},
//     })
//     .then(eps => {
//       episodes
//         .findAll({
//           where: {webtoon: eps.id},
//           attributes: ['title', 'image', 'webtoon', 'updatedAt'],
//         })
//         .then(result => res.send(result))
//         //catch err of the second query
//         .catch(() =>
//           res.send({
//             data: 'The Episode does not exist!',
//             datum: eps.id,
//           }),
//         );
//     })
//     //catch err first query
//     .catch(() =>
//       res.send({
//         data: 'The Webtoon does not exist!',
//       }),
//     );
// };
//
//Update Episode/Create Episode
//Showing The Content that belong to the Episode
exports.showEditEp = (req, res) => {
  webtoons
    .findOne({
      where: {created_by: req.params.idUs, id: req.params.idWt},
    })
    .then(eps => {
      episodes
        .findOne({
          where: {webtoon: eps.id, id: req.params.idEp},
        })
        .then(img => {
          images
            .findAll({
              where: {episode: img.id},
              include: {
                model: episodes,
                as: 'epIsode',
              },
            })
            .then(result => res.send(result))
            //catch err of the second query
            .catch(() =>
              res.send({
                data: 'The Images does not exist!',
                datum: img.id,
              }),
            );
        })
        .catch(() =>
          res.send({
            data: 'The Episodes does not exist!',
          }),
        );
    })
    //catch err first query
    .catch(() =>
      res.send({
        data: 'The Webtoon does not exist!',
      }),
    );
};
//
//Create New Episode
exports.createEp = (req, res) => {
  const {title, image} = req.body;
  episodes
    .create({
      title: title,
      image: image,
      webtoon: req.params.idWt,
    })
    .then(result => {
      res.send({
        success: true,
        data: req.params.idWt,
        result,
      });
    })
    .catch(() =>
      res.send({
        message: 'fail to insert data',
        data: req.params.idWt,
      }),
    );
};
//
//Update Episode
exports.updateEpisode = (req, res) => {
  const {idUs, idWt, idEp} = req.params;
  webtoons.findOne({where: {id: idWt, created_by: idUs}}).then(webtoon => {
    episodes
      .update(req.body, {where: {id: idEp, webtoon: webtoon.id}})
      .then(() => {
        episodes.findOne({where: {id: idEp, webtoon: idWt}}).then(result => {
          res.send({
            result,
          });
        });
      })
      .catch(err => {
        res.send(err);
      });
  });
};
//
//Delete Episode
exports.deleteEps = (req, res) => {
  const {idUs, idWt, idEp} = req.params;
  webtoons
    .findOne({where: {id: idWt, created_by: idUs}})
    .then(result => {
      episodes.destroy({where: {id: idEp, webtoon: result.id}});
    })
    .then(() => {
      res.send({
        message: 'The Episode has been delete',
        id: idEp,
      });
    })
    .catch(() =>
      res.send({
        message: 'The data does not exist!',
      }),
    );
};
//
//
//Add/Update Episode Images
//Add New Images into it's episode
exports.createImg = (req, res) => {
  const {page, image} = req.body;
  images
    .create({
      page: page,
      image: image,
      episode: req.params.idEp,
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
        data: req.params.idEp,
      }),
    );
};
//Delete Images
exports.deleteImg = (req, res) => {
  const {idUs, idWt, idEp, idIm} = req.params;
  webtoons.findOne({where: {id: idWt, created_by: idUs}}).then(eps => {
    episodes
      .findOne({where: {id: idEp, webtoon: eps.id}})
      .then(result => {
        images.destroy({where: {id: idIm, episode: result.id}}).then(() => {
          res
            .send({
              message: 'The Image has been delete',
              id: idEp,
            })
            .catch(() =>
              res.send({
                message: 'The data does not exist!',
              }),
            );
        });
      })
      .catch(epi =>
        res.send({
          message: 'The data does not exist!',
          data: epi,
        }),
      );
  });
};
