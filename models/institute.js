const mongoose = require('mongoose');

const instituteSchema = mongoose.Schema({
    institute_name: String,
    institute_email: String,
    institute_password: String,
  });

  const instituteModel = mongoose.model("institute", instituteSchema);

module.exports= instituteModel;