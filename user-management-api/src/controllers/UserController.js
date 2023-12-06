const User = require('../models/User');

const sendResponse = (res, result) => {
  res.status(result.code).send(result);
};

const sendError = (res, error) => {
  res.status(400).send(error);
};

exports.create = async (req, res) => {
  try {
    const result = await User.createUser(req);
    sendResponse(res, result);
  } catch (error) {
    sendError(res, error);
  }
};

exports.findAll = async (req, res) => {
  try {
    const user = await User.getAllUser(req);

    sendResponse(res, user);
  } catch (error) {
    sendError(res, error);
  }
};

exports.findOne = async (req, res) => {
  try {
    const user = await User.findUser(req);

    sendResponse(res, user);
  } catch (error) {
    sendError(res, error);
  }
};

exports.update = async (req, res) => {
  try {
    const user = await User.updateUser(req);

    sendResponse(res, user);
  } catch (error) {
    sendError(res, error);
  }
};

exports.delete = async (req, res) => {
  try {
    const user = await User.deleteUser(req);

    sendResponse(res, user);
  } catch (error) {
    sendError(res, error);
  }
};
