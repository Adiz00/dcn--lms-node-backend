const express = require("express");
require('dotenv').config();
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const DBURI = "mongodb+srv://admin:admin@cluster0.pl9v2ie.mongodb.net/dcn-lms";

const courseModel = require("./models/course");
const teacherModel = require("./models/teacher");
const studentModel = require("./models/student");


const port = process.env.PORT || 3030;  // Choose your desired port number

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


  
console.log("env: ",process.env.PORT)
// IP 192.168.100.14:5000
mongoose
  .connect(DBURI)
  .then((res) => {
    console.log("mongodb connected");
  })
  .catch((err) => {
    console.log("db error ", err);
  });

app.use(cors());

// Define your routes and middleware here
app.use(express.json());

// ==================================================================================
// ============   create course api  ==============================================
// ==================================================================================

app.post("/api/course", (req, res) => {
  console.log(req.body);

  const { courseName } = req.body;

  if (!courseName) {
    res.json({  
      message: "required fields missing",
      status: false,
    });
    return;
  }
  const objToSend = {
    course_name: courseName,
  };

  // ============ course  model  ==============================================
  courseModel
    .create(objToSend)
    .then((data) => {
      res.json({
        message: "course created successfully",
        data: data,
        status: true,
      });
      console.log("course created successfully:", data);
    })
    .catch((error) => {
      res.json({
        message: "error",
        error: error,
        status: false,
      });
      console.error("Failed to create course:", error);
    });
});
// ============      ==============================================

// ==================================================================================
// ============   get courses api  ==============================================
// ==================================================================================

app.get("/api/courses", (req, res) => {
  console.log("hit", req.body);

  courseModel
    .find({})
    .then((data) => {
      res.json({
        message: "course get successfully",
        data: data,
        status: true,
      });
      console.log("course get successfully:", data);
    })
    .catch((error) => {
      res.json({
        message: "error",
        error: error,
        status: false,
      });
      console.error("Failed to get course:", error);
    });
});
// ============     =============================================

// ==================================================================================
// ============   create teacher api  ==============================================// ==================================================================================
// ==================================================================================

app.post("/api/teacher", (req, res) => {
  console.log(req.body);
  console.log("hit");

  const { teacherName, teacherEmail, teacherPassword, teacherCourse } =
    req.body;

  if (!teacherName || !teacherEmail || !teacherPassword || !teacherCourse) {
    res.json({
      message: "Required fields missing",
      status: false,
    });
    return;
  }

  // Check if the teacher with the given email already exists
  teacherModel
    .findOne({ teacher_email: teacherEmail })
    .then((existingTeacher) => {
      if (existingTeacher) {
        // Teacher with the same email already exists
        return res.status(400).json({
          message: "Teacher with this email already exists",
          status: false,
        });
      }

      // Teacher doesn't exist, proceed with creating the teacher
      const objToSend = {
        teacher_name: teacherName,
        teacher_email: teacherEmail,
        teacher_password: teacherPassword,
        teacher_course: teacherCourse,
        active: true,
        approved: true,
      };

      teacherModel
        .create(objToSend)
        .then((data) => {
          res.json({
            message: "Teacher created successfully",
            data: data,
            status: true,
          });
          console.log("Teacher created successfully:", data);
        })
        .catch((error) => {
          res.json({
            message: "Error",
            error: error,
            status: false,
          });
          console.error("Failed to create teacher:", error);
        });
    })
    .catch((error) => {
      res.json({
        message: "Error",
        error: error,
        status: false,
      });
      console.error("Failed to check teacher:", error);
    });
});

// ==================================================================================
// ============   get teacher api  ==============================================
// ==================================================================================

app.get("/api/teachers", (req, res) => {
  console.log("get teachers");
  teacherModel
    .find({})
    .then((data) => {
      res.json({
        message: "Teachers fetched successfully",
        data: data,
        status: true,
      });
      console.log("Teachers fetched successfully:", data);
    })
    .catch((error) => {
      res.json({
        message: "Error",
        error: error,
        status: false,
      });
      console.error("Failed to fetch teachers:", error);
    });
});

// ============    ==============================================

// ==================================================================================
// ============   create std api  ==============================================
// ==================================================================================

app.post("/api/student", (req, res) => {
    console.log(req.body);
    console.log("hit");
  
    const { stdName, stdEmail, stdPassword, stdCourse } = req.body;
  
    if (!stdName || !stdEmail || !stdPassword || !stdCourse) {
      res.json({
        message: "Required fields missing",
        status: false,
      });
      return;
    }
  
    // Check if the student with the given email already exists
    studentModel
      .findOne({ std_email: stdEmail })
      .then((existingStudent) => {
        if (existingStudent) {
          // Student with the same email already exists
          return res.status(400).json({
            message: "Student with this email already exists",
            status: false,
          });
        }
  
        // Student doesn't exist, proceed with creating the student
        const objToSend = {
          std_name: stdName,
          std_email: stdEmail,
          std_password: stdPassword,
          std_course: stdCourse,
          active: true,
          approved: true,
          grades: [] // Add an empty array for grades
        };
  
        studentModel
          .create(objToSend)
          .then((data) => {
            res.json({
              message: "Student created successfully",
              data: data,
              status: true,
            });
            console.log("Student created successfully:", data);
          })
          .catch((error) => {
            res.json({
              message: "Error",
              error: error,
              status: false,
            });
            console.error("Failed to create student:", error);
          });
      })
      .catch((error) => {
        res.json({
          message: "Error",
          error: error,
          status: false,
        });
        console.error("Failed to check student:", error);
      });
  });
// ==================================================================================

// ==================================================================================
// ============   get std api  ==============================================
// ==================================================================================

app.get("/api/students", (req, res) => {
  console.log("get students");
  studentModel
    .find({})
    .then((data) => {
      res.json({
        message: "students fetched successfully",
        data: data,
        status: true,
      });
      console.log("students fetched successfully:", data);
    })
    .catch((error) => {
      res.json({
        message: "Error",
        error: error,
        status: false,
      });
      console.error("Failed to fetch students:", error);
    });
});

// ============    ==============================================

// ============    ==============================================
// ============  login api  ==============================================
// ============    ==============================================

app.post("/api/login", (req, res) => {
    const { email, password } = req.body;
  
    // Check if the email and password match a student
    studentModel.findOne({ std_email: email, std_password: password })
      .then((student) => {
        if (student) {
          // Email and password match a student
          res.json({
            message: "Login successful as student",
            userType: "student",
            data: student,
            status: true,
          });
        } else {
          // Check if the email and password match a teacher
          teacherModel.findOne({ teacher_email: email, teacher_password: password })
            .then((teacher) => {
              if (teacher) {
                // Email and password match a teacher
                res.json({
                  message: "Login successful as teacher",
                  userType: "teacher",
                  data: teacher,
                  status: true,
                });
              } else {
                // Email and password do not match any student or teacher
                res.json({
                  message: "Invalid email or password",
                  status: false,
                });
              }
            })
            .catch((error) => {
              res.json({
                message: "Error",
                error: error,
                status: false,
              });
            });
        }
      })
      .catch((error) => {
        res.json({
          message: "Error",
          error: error,
          status: false,
        });
      });
  });
  

