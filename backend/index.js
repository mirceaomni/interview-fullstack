const express = require("express");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");

const users = require("./db/users");
const projects = require("./db/projects");

const app = express();
const secret = "secret";
const port = 3000;

const jsonParser = bodyParser.json();

app.use(bodyParser.json({ type: "application/*+json" }));
app.use(cookieParser());

// middleware
// TODO: implement
const authenticated = (req, res, next) => {
  // INFO: use
  // const token = req.cookies.access_token;
  // const decoded = jwt.verify(token, secret);
  // to decode the jwt
  next();
};

const increment = () => {
  let count = 0

  const incrementCount = () => {
    count+=1
  }
  
  return incrementCount
}

increment()




// endpoints
app.post("/login", jsonParser, (req, res) => {
  const { email, password } = req.body;
  
  // TODO: check email and password and get user id from db
  
  const userData = users.find(item => item.email === email);

  if (!userData) {
    return res.status(401).json({message: "user not found"})
  }

  const userId = userData.id

  if (password !== userData.password) {
    return res.status(401).json({message: "credentials not correct"})
  }

  const token = jwt.sign({ user_id: userId }, secret);
  const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 900000,
    path: "/",
  };
  res.cookie("access_token", token, cookieOptions);
  res.status(200).json({ user_id: userId });
});

app.get("/", (req, res) => {
  res.send("Works!");
});

// TODO: implement
app.get("/projects", (req, res) => {
  res.send(projects);
});


app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
