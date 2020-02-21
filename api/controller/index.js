require("dotenv").config;
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const { User } = require("../models/userSchema");
const { ChatGroup } = require("../models/chatGroupSchema");
const HttpStatus = require("http-status-codes");
const { logger } = require("../../config/logger");

module.exports.createGroup = (req, res) => {
  logger.addContext("route", req.route.path);
  const { body, payload } = req;

  ChatGroup.create({ ...body, createdBy: payload._id }, (err, chatGroup) => {
    if (err) {
      const { errors } = err;
      logger.error(`${Object.keys(errors)} errors are existed`);
      return res
        .status(HttpStatus.NOT_ACCEPTABLE)
        .json({ errors, message: "-Chat Group Cannot be Registed-" });
    }
    const responseData = chatGroup;
    logger.info(`-Chat was registered with the ${chatGroup.createdBy}-`);
    return res.status(HttpStatus.OK).json({
      responseData,
      message: "-Chat Group Is Sucessfully Registered-"
    });
  });
};

module.exports.checkGroup = (req, res) => {
  logger.addContext("route", req.route.path);
  console.log(req);
  const { id } = req.params;
  const { _id } = req.payload;
  logger.info(`Group with ${id} was requested by ${_id}`);
  ChatGroup.findById({ _id: id })
    .then(groupGroupInfo => {
      const { participents } = groupGroupInfo;
      if (participents.indexOf(_id) !== -1) {
        return res
          .status(HttpStatus.OK)
          .json({ groupGroupInfo, message: "-Group Data was sent-" });
      } else {
        return res
          .status(HttpStatus.CONFLICT)
          .json({ message: "-No access to this Group-" });
      }
    })
    .catch(err => {
      crashLogger.error(err);
      res
        .status(HttpStatus.FORBIDDEN)
        .json({ message: "-Group Doesn't Exist-" });
    });
};

module.exports.addParticipents = async (req, res) => {
  logger.addContext("route", req.route.path);
  const { id } = req.params;
  const { email } = req.body;
  try {
    const { _id } = await User.findOne({ email });
    const { participents } = await ChatGroup.findById({ _id: id });
    if (participents.indexOf(_id) === -1) {
      const result = await ChatGroup.findByIdAndUpdate(
        { _id: id },
        { $push: { participents: _id } },
        { new: true, runValidators: true }
      );
      return res
        .status(HttpStatus.OK)
        .json({ result, message: "-Group was updated-" });
    }
    throw (err = `The User with the email already exists`);
  } catch (err) {
    return res.status(HttpStatus.CONFLICT).json({ err, message: "Error" });
  }
};

module.exports.logout = (req, res) => {
  res.json("User is logged Out");
};
