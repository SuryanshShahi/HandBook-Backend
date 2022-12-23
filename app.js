const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
app.use(cookieParser());

dotenv.config({ path: "./config.env" });
app.use(express.json());
require("./db/conn");
const auth = require("./auth");

app.use(cors());
app.use("/", auth);
const PORT = process.env.PORT || 5000;

// if (process.env.NODE_ENV == "production") {
//   app.use(express.static("client/build"));
//   // const path = require("path");
//   // app.get("*", (req, res) => {
//   //     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//   // })
// }

app.listen(PORT, () => {
  console.log(`server is running at ${PORT}`);
});
