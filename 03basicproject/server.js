const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  try {
    fs.readdir("./files", (err, files) => {
      if (err) {
        res.send("Something went wrong");
        console.log(err);
      }
      res.render("index", { files: files });
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

app.post("/create", (req, res) => {
  try {
    if (req.body.taskname === "") {
      res.render("emptycreation", { filedata: "please enter your file name" });
    } else {
      fs.writeFile(
        `./files/${req.body.taskname.split(" ").join("")}.txt`,
        req.body.taskdetails,
        (err) => {
          if (err) {
            res.send("Something went wrong");
            console.log(err);
          }
          res.redirect("/");
        }
      );
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

app.get("/details/:filename", (req, res) => {
  try {
    fs.readFile(`./files/${req.params.filename}`, "utf-8", (err, data) => {
      if (err) {
        res.send("Somthing went wrong");
        console.error(err);
      }
      res.render("details", { filename: req.params.filename, filedata: data });
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

app.get("/edit/:filename", (req, res) => {
  try {
    res.render("edit", { filename: req.params.filename });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server Error");
  }
});
app.post("/edit", (req, res) => {
  try {
    if (req.body.newtaskname === "") {
      res.render("emptycreation", { filedata: "please enter your file name" });
    }
    fs.rename(
      `./files/${req.body.taskname}.txt`,
      `./files/${req.body.newtaskname.split(" ").join("")}.txt`,
      (err) => {
        if (err) {
          console.log(err);
          res.send("Somethong went wrong !");
        }
        res.redirect("/");
      }
    );
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server Error");
  }
});

app.get("/delete/:filename", (req, res) => {
  try {
    res.render("delete", { filename: req.params.filename });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server Error");
  }
});
app.post("/delete", (req, res) => {
  try {
    fs.unlink(`./files/${req.body.filename}`, (err) => {
      if (err) throw err;
      res.redirect("/");
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server Error");
  }
});
app.listen(3000);
