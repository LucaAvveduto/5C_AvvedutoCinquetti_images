const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const http = require("http");
const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use("/", express.static(path.join(__dirname, "public")));


app.post("/todo/add", async(req, res) => {
  res.json({ result: "Ok" });
});

app.get("/todo", async(req, res) => {
  res.json({ todos: todos });
});

app.delete("/todo/:id", async(req, res) => {
  res.json({ result: "Ok" });
});

const server = http.createServer(app);
server.listen(80, () => {
  console.log("- server running");
});