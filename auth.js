const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authenticate = require("./middleware/authenticate");

require("./db/conn");
const User = require("./model/userSchema");

router.post("/signup1", async (req, res) => {
  const { fname, lname, email, mobile, password, cpassword } = req.body;
  if (!fname || !lname || !email || !mobile || !password || !cpassword) {
    return res.status(422).json({ error: "All fields are mandatory" });
  }
  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(409).json({ error: "Email already exists" });
    } else if (password != cpassword) {
      return res.status(401).json({ error: "password doesn't match" });
    } else {
      const user = new User({
        fname,
        lname,
        email,
        mobile,
        password,
        cpassword,
      });

      await user.save();
      res.status(201).json({ message: "user registered successfully" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    let token;
    const { text, password } = req.body;
    if (!text || !password) {
      return res.status(400).json({ message: "all fields are mandatory" });
    }

    const userExist = await User.findOne({ email: text });
    if (userExist) {
      const isMatch = await bcrypt.compare(password, userExist.password);
      token = await userExist.generateAuthToken();
      console.log(token);

      res.cookie("jwtoken", token),
        {
          expires: new Date(Date.now() + 25892000000),
          httpOnly: true,
        };

      if (!isMatch) {
        res.status(400).json({ message: "Invalid Credentials" });
      } else {
        res.status(201).json({ message: "login successful" });
      }
    } else {
      res.status(400).json({ message: "Invalid Credentials" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/users", authenticate, (req, res) => {
  // User.find().then((data) => {
  //   res.status(201).json(data);
  // });
  res.send(req.rootUser);
});
router.get("/logout", (req, res) => {
  res.clearCookie("jwtoken", { path: "/" });
  res.status(200).send("User Logged Out !");
});
module.exports = router;
