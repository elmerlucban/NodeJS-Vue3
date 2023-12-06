const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const TableUtil = require('../helpers/TableUtil');
const { success, error } = require('../helpers/ResponseFormatter');

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: false,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
      default: 'password123'
    },
    firstName: {
      type: String,
      required: false,
      trim: true,
    },
    lastName: {
      type: String,
      required: false,
      trim: true,
    },
  },
  { timestamps: true }
);

userSchema.statics.createUser = async (req) => {
  const { username, password, firstName, lastName } = req.body;
  const user = new User({ username, password, firstName, lastName });

  const response = await user.save();

  if (!response) {
    return error();
  }
  
  return success(response, 'Success! The user has been created successfully.');
};

userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

userSchema.statics.updateUser = async (req) => {
  const { username, firstName, lastName } = req.body;
  const data = { username, firstName, lastName };

  const response = await User.findByIdAndUpdate(req.params.userId, data, { new: true });

  if (!response) {
    return error();
  }

  return success(response, 'Success! The user has been updated successfully.');
};

userSchema.statics.getAllUser = async (req) => {
  const { limit = 10, page = 1 } = req.query;
  const startIndex = (parseInt(page) - 1) * parseInt(limit);

  const totalCount = await User.countDocuments().exec();
  const result = await User.find().sort({ createdAt: -1 }).limit(parseInt(limit)).skip(startIndex);
 
  return TableUtil.paginate(req, totalCount, result);
};

userSchema.statics.findUser = async (req) => {
  const _id = req.params.userId;
  const user = await User.findOne({ _id });

  if (!user) {
    return error();
  }

  return success(user);
};

userSchema.statics.deleteUser = async (req) => {
  const _id = req.params.userId;
  const user = await User.findByIdAndDelete({ _id });

  if (!user) {
    return error();
  }

  return success(user);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
