const dbComponent = require("./scripts/database.js");
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const http = require("http");
const multer  = require('multer');
const app = express();
const fs = require('fs');
const conf = JSON.parse(fs.readFileSync('conf.json'));
conf.ssl.ca = fs.readFileSync(__dirname + '/ca.pem');
const db = dbComponent(conf);

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use("/", express.static(path.join(__dirname, "public")));
app.use("/images",express.static(path.join(__dirname,"images")));

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
      callback(null, path.join(__dirname, "images"));
  },
  filename: function (req, file, callback) {
      callback(null, file.originalname);
  }
});


app.post("/img/add", multer({ storage: storage}).single('file'), async (req, res) => {
  await db.insert("/images/" + req.file.originalname);
  res.json({result: "ok" });
  });
  

app.get("/img", async(req, res) => {
  const imgs = await db.select();
  res.json({ imgs: imgs });
});

app.delete("/img/:id", async(req, res) => {
  let imgs = await db.select();
  imgs = imgs.filter((element) => element.id == req.params.id);
  await db.del(imgs[0]);
  res.json({ result: "Ok" });
});

const server = http.createServer(app);
server.listen(80, () => {
  console.log("Server running on port 80");
});