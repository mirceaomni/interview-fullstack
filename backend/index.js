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
  const token = req.cookies.access_token;
  if(!token) {
    return res.status(401).json({ message: "Unauthorized"});
  }

  try {
    const decoded = jwt.verify(token, secret);
    req.user_id = decoded.user_id;
    next();
  }catch(error) {
    return res.status(401).json({ message: "Invalid_token"});
  }
};

// endpoints
app.post("/login", jsonParser, (req, res) => {
  const { email, password } = req.body;

  if(!email || !password) { 
    return res.status(400).json({ message: "Email and password are required" });
  }

  const user = users.find((user) => user.email === email && user.password === password);

  if(!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  
  const token = jwt.sign({ user_id: user.id }, secret);
  const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 900000,
    path: "/",
  };
  res.cookie("access_token", token, cookieOptions);
  res.status(200).json({ user_id: user.id });
});

app.get("/", (req, res) => {
  res.send("Works!");
});

// TODO: implement
app.get("/projects", authenticated, (req, res) => {

  const userProjects = projects.filter((project) => project.user_id === req.user_id);

  res.send(userProjects);
});


app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
