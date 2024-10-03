const express = require("express");
const path = require("path");
const collection = require("./config");
const BasicInformation = require('./BasicInformationSchema');
const ProfessionalInformation = require('./ProfessionalInformationSchema');
const AddressDetails = require('./AddressDetailsSchema');
const AccountSecurity = require('./AccountSecuritySchema');
const OptionalQuestions = require('./OptionalQuestionsSchema');
const bcrypt = require("bcrypt");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const existingUser = await collection.findOne({ username: username });
  if (existingUser) {
    const isPasswordMatch = await bcrypt.compare(
        req.body.password,
      existingUser.password
    );
    if (isPasswordMatch) {
      // return res.status(400).send("User already exists!");
      console.log("Logged in successfully");
      const objId = await existingUser._id;
      res.status(200).send({objId});
    } else {
      console.log("password not match");
    }
  } else {
    console.log("no user exist");
  }
});

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

const port = 5000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
