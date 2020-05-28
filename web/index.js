const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;
const users = [];
const path = express.static(__dirname + "/public");
console.log(path);

app.use(bodyParser.json());
app.use("/", path);
app.get("/", function (req, res) {
  res.sendFile("index.html");
});
app.get("/user", function (req, res) {
  res.send(users);
});
app.post("/user/add", function (req, res) {
  const { id, lastName, numbers } = req.body;
  console.log(req.body);
  users.push({ id, lastName, numbers });
  res.send(users);
});
app.get("/user/delete", function (req, res) {
  const { personIndex } = req.query;
  users.splice(personIndex, 1);
  res.send(users);
});
app.get("/user/edit", function (req, res) {
  const { personIndex, newName } = req.query;
  console.log(req.query);
  users[personIndex].lastName = newName;
  res.send(users);
});
app.get("/user/sort", function (req, res) {
  users.sort(function (a, b) {
    if (a.lastName > b.lastName) {
      return 1;
    }
    if (a.lastName < b.lastName) {
      return -1;
    }
    return 0;
  });
  res.send(users);
});

app.get("/user/editn", function (req, res) {
  const { personIndex, numberId, newNumber } = req.query;
  console.log(req.query);

  users[personIndex].numbers[numberId] = newNumber;
  res.send(users);
});
app.listen(port, () =>
  console.log(`App listening at http://localhost:${port}`)
);
