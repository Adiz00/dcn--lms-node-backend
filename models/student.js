const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
    std_name: String,
    std_email: String,
    std_password: String,
    std_course: String,
    active: { type: Boolean, default: true },
    approved: { type: Boolean, default: true },
    grades: { type: Array, default: [] } // Add a field for grades as an empty array
  });

  const studentModel = mongoose.model("student", studentSchema);

module.exports= studentModel;