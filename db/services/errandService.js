const { Errand, Location, Users } = require('../models/index.js');

//createErrand or postErrand?

const createErrand = (errandObject, callback) => {
  let { errand } = errandObject.data
    console.log('in errand service:', errand)
  Users.findOne({ username: errand.requester})
    .then((result) => {
      console.log('in errand service result', result)
      errand.requester = result
      return Errand.create(errand)
    })
    .then((result) => {
      return Location
        .findById(result.pickup.locationId)
        .updateOne({ $push: { errands: result._id } })
    })
    .then((result) => { callback(null, result); })
    .catch((err) => { callback(err, null); });
};

const getAllErrands = (callback) => {
  Errand.find()
    .lean()
    .populate('requester')
    .then((result) => { callback(null, result); })
    .catch((err) => { callback(err, null); });
};

const getErrand = (filter, callback) => {
  Errand.find(filter)
    .then((result) => { callback(null, result); })
    .catch((err) => { callback(err, null); });
};

const getErrandById = (id, callback) => {
  Errand.findById(id)
    .then((result) => { callback(null, result); })
    .catch((err) => { callback(err, null); });
};



const markErrandAccepted = (errandId, user, callback) => {
  console.log('user: ', user);
  Users.findOne(
    { username: user }
  )
    .then((response) => {
      console.log(response);
      return Errand.findOneAndUpdate(
        { _id: errandId },
        { $set: { accepted: true, runner: response._id } }
      );
    })
    .then((errand) => {
      Location.findOneAndUpdate({_id: errand.pickup.locationId}, { $push: { acceptedErrands: errandId }})
    })
    .then((result) => { callback(null, result); })
    .catch((err) => { callback(err, null); });
};

module.exports = {
  createErrand,
  getAllErrands,
  getErrand,
  getErrandById,
  // postErrand,
  markErrandAccepted
};
