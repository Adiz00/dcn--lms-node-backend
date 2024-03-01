const mongoose = require('mongoose');

const teacherSchema = mongoose.Schema({
    teacher_name: String,
    teacher_email: String,
    teacher_password: String,
    teacher_course: String,
    teacher_Institute: String,
    active: { type: Boolean, default: true },
    approved: { type: Boolean, default: true },
  });

  const teacherModel = mongoose.model("teacher", teacherSchema);

module.exports= teacherModel;