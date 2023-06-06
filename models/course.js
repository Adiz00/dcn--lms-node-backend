const mongoose = require('mongoose');

const courseSchema=mongoose.Schema({
    course_name:String,
})

const courseModel=mongoose.model("course",courseSchema)


module.exports= courseModel;