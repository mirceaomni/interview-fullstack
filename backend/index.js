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

// endpoints
app.post("/login", jsonParser, (req, res) => {
  const { email, password } = req.body;

  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return res.status(401).json({
      errors: {
        email: 'The provided email is not valid',
      }
    });
  }

  const matchedUser = users.find(user => user.email === email);
  if (!matchedUser) {
    return res.status(401).json({
      errors: {
        email: 'The email or password is not valid',
      }
    });
  }

  if (matchedUser.password !== password) {
    return res.status(401).json({
      errors: {
        email: 'The email or password is not valid',
      }
    });
  }

  const userId = matchedUser.id;
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
