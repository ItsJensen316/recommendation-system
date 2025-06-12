const facultySchema = require("../models/faculty");
const basicInformationSchema = require("../models/basicInformation");
const professionalInformationSchema = require("../models/professionalInformation");
const addressDetailsSchema = require("../models/addressDetails");
const accountSecuritySchema = require("../models/accountSecurity");
const optionalQuestionsSchema = require("../models/optionalQuestions");
const bcrypt = require("bcrypt");

const insertAllDetails = async (req, res) => {
  try {
    const { formData } = req.body;
    const userId = req.params.id;
    // console.log("id" , req.params.id)
    const {
      basic_information,
      professional_information,
      address_details,
      account_security,
      optional_questions,
    } = formData;

    const basicInfo = new basicInformationSchema(basic_information);
    const professionalInfo = new professionalInformationSchema(
      professional_information
    );
    const addressInfo = new addressDetailsSchema(address_details);
    const accountSecurityInfo = new accountSecuritySchema(account_security);
    const optionalQuestionsInfo = new optionalQuestionsSchema(
      optional_questions
    );

    const savedBasicInfo = await basicInfo.save();
    const savedProfessionalInfo = await professionalInfo.save();
    const savedAddressInfo = await addressInfo.save();
    const savedAccountSecurityInfo = await accountSecurityInfo.save();
    const savedOptionalQuestionsInfo = await optionalQuestionsInfo.save();

    await facultySchema.findByIdAndUpdate(
      userId,
      {
        basicInfo: savedBasicInfo._id,
        professionalInfo: savedProfessionalInfo._id,
        addressInfo: savedAddressInfo._id,
        accountSecurityInfo: savedAccountSecurityInfo._id,
        optionalQuestionsInfo: savedOptionalQuestionsInfo._id,
      },
      { new: true }
    );

    // Send success response
    res.status(201).send({ message: "All details inserted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Error inserting details" });
  }
};

async function handleFacultyLogin(req, res) {
  const { username, password } = req.body;

  const existingUser = await facultySchema.findOne({ username: username });
  // res.send(existingUser);
  if (existingUser) {
    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      existingUser.password
    );
    if (isPasswordMatch) {
      // return res.status(400).send("User already exists!");
      console.log("Logged in successfully");
      const objId = await existingUser._id;
      res.status(200).send(`Logged in successfully, objID : ${objId}`);
    } else {
      console.log("password not match");
    }
  } else {
    console.log("no user exist");
  }
}

async function handleFacultySignup(req, res) {
  const { username, password } = req.body;
  const loginData = req.body;

  const existingUser = await facultySchema.findOne({ username: username });

  if (existingUser) {
    return res.status(400).send("User already exists!");
  } else {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await facultySchema.insertMany([{ username, password: hashedPassword }]);
    res.send("Successful");
  }
}

async function handlePostFacultyProfile(req, res) {
  const userid = req.params.id;
  const existingUser = await facultySchema.findOne({ _id: userid });
  if (existingUser) {
    insertAllDetails(req, res);
  } else {
    console.log("no user exist");
  }
}

async function handleGetFacultyProfile(req, res) {
  const userId = req.params.id;

  try {
    const facultyWithProfile = await facultySchema
      .findById(userId)
      .populate([
        { path: "basicInfo" },
        { path: "professionalInfo" },
        { path: "addressInfo" },
        { path: "accountSecurityInfo" },
        { path: "optionalQuestionsInfo" },
      ]);
    const userDetails = {
      basicInfo: facultyWithProfile.basicInfo._doc,
      professionalInfo: facultyWithProfile.professionalInfo._doc,
      addressInfo: facultyWithProfile.addressInfo._doc,
      accountSecurityInfo: facultyWithProfile.accountSecurityInfo._doc,
      optionalQuestionsInfo: facultyWithProfile.optionalQuestionsInfo._doc,
    };
    res.status(200).send(userDetails);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Error fetching user details" });
  }
}

async function handleFacultyAppraisal(req, res) {}

module.exports = {
  handleFacultyLogin,
  handleFacultySignup,
  handlePostFacultyProfile,
  handleFacultyAppraisal,
  handleGetFacultyProfile,
};
