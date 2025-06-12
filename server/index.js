const express = require("express");
const { connectToMongoDB } = require("./connect");

const facultyRoute = require("./routes/faculty");

const path = require("path");
const { spawn } = require('child_process');
// const BasicInformation = require("./BasicInformationSchema");
// const ProfessionalInformation = require("./ProfessionalInformationSchema");
// const AddressDetails = require("./AddressDetailsSchema");
// const AccountSecurity = require("./AccountSecuritySchema");
// const OptionalQuestions = require("./OptionalQuestionsSchema");
const bcrypt = require("bcrypt");
const cors = require("cors");
const { Collection } = require("mongoose");
const collection = require("./models/faculty");
const port = 5000;

const app = express();

connectToMongoDB("mongodb://localhost:27017/Project");
app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use("/faculty", facultyRoute);














app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// app.post("/login", async (req, res) => {
//   const { username, password } = req.body;

//   const existingUser = await collection.findOne({ username: username });
//   if (existingUser) {
//     const isPasswordMatch = await bcrypt.compare(
//       req.body.password,
//       existingUser.password
//     );
//     if (isPasswordMatch) {
//       // return res.status(400).send("User already exists!");
//       console.log("Logged in successfully");
//       const objId = await existingUser._id;
//       res.status(200).send({ objId });
//     } else {
//       console.log("password not match");
//     }
//   } else {
//     console.log("no user exist");
//   }
// });

app.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  const loginData = req.body;

  const existingUser = await collection.findOne({ username: username });

  if (existingUser) {
    return res.status(400).send("User already exists!");
  } else {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await collection.insertMany([{ username, password: hashedPassword }]);
    res.send("Successful");
  }
});



// app.get("/profiledetails/:id", async (req, res) => {
//   const userid = req.params.id;
//   // console.log(userid);
//   try {
//     // const existingUser = await collection.findOne({ username: username });
//     const basicInfo = await BasicInformation.findOne({ userId: userid });
//     // console.log(basicInfo)
//     const professionalInfo = await ProfessionalInformation.findOne({
//       userId: userid,
//     });
//     const addressDetails = await AddressDetails.findOne({ userId: userid });
//     const accountSecurity = await AccountSecurity.findOne({ userId: userid });
//     const optionalQuestions = await OptionalQuestions.findOne({
//       userId: userid,
//     });

//     const userDetails = {
//       basicInfo,
//       professionalInfo,
//       addressDetails,
//       accountSecurity,
//       optionalQuestions,
//     };
//     // console.log(userDetails)
//     res.status(200).send(userDetails);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ error: "Error fetching user details" });
//   }
// });

app.get("/faculty-list", async (req, res) => {
  try {
    const faculties = await collection.find();
    console.log(faculties);

    // console.log(userDetails)
    res.status(200).send(faculties);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Error fetching user details" });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  const pythonProcess = spawn('python', ['script.py']); // Adjust script name/path as necessary

  // Capture standard output
  pythonProcess.stdout.on('data', (data) => {
    console.log(`Python Output: ${data}`);
  });

  // Capture standard error
  pythonProcess.stderr.on('data', (error) => {
    console.error(`Python Error: ${error}`);
  });

  pythonProcess.on('error', (error) => {
    console.error(`Error executing Python script: ${error.message}`);
  });

  pythonProcess.on('close', (code) => {
    console.log(`Python process exited with code ${code}`);
    if (code === 0) {
      console.log("Python script ran successfully.");
    } else {
      console.log("Python script encountered an error.");
    }
  });
});