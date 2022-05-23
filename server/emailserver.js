//This can be moved when back end is completely ready for production
//for email testing purposes.
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
app.use(cors());
app.use(bodyParser.json());
app.post("/", (req, res) => {
  const body = {
    name: req.body.name,
    email: req.body.email,
    message: req.body.message,
  };
  const send = require("gmail-send")({
    user: "renegadecontactus@gmail.com",
    pass: "Renegadepassword",
    to: "renegadecontactus@gmail.com",
    subject: "From Contact Form",
  });
  send(
    {
      text: JSON.stringify(body),
    },
    (error, result, fullResult) => {
      if (error) console.error(error);
      res.status(200).json({ result: fullResult });
    }
  );
});

console.log("Server running on port 8080"); //change when ready for production 
app.listen(8000);
