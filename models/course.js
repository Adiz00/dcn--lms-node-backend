const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
  course_name: String,
  course_Announcements: {
    type: Array,
    default: []
  },
  course_Institute: String,
});

const courseModel = mongoose.model("course", courseSchema);

module.exports = courseModel;
