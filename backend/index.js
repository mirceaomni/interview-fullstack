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
// app.use(cors())

// middleware
// TODO: implement
const authenticated = (req, res, next) => {
  // INFO: use
  const token = req.cookies.access_token;

  if (!token) {
    res.status(403).send("Forbidden");
  }

  const decoded = jwt.verify(token, secret);

  if (!decoded || !decoded.user_id) {
    res.status(403).send("Forbidden"); //TBC
  }

  next({ user_id: decoded.user_id });
};

// endpoints
app.post("/login", jsonParser, (req, res) => {
  const { email, password } = req.body;

  // TODO: check email and password and get user id from db

  const foundUser = users.find(
    (user) => user.email === email && user.password === password
  );

  if (!foundUser) {
    res.status(401).send("Unauthorized");
  }

  const userId = foundUser.id;
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
app.get("/projects", authenticated, (req, res) => {
  const { userId } = req;

  const userProjects = projects.find(({ user_id }) => user_id === userId);

  res.send(userProjects);
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
