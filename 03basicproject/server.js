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
      fs.writeFile(`./files/${req.body.taskname.split(' ').join('')}.txt`,req.body.taskdetails, (err) => {
        if (err) {
          res.send("Something went wrong");
          console.log(err);
        }
        res.redirect("/");
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  });  


app.get('/details/:filename', (req, res) => {
    try {
        fs.readFile(`./files/${req.params.filename}`, 'utf-8', (err, data) =>{
            if(err){
                res.send('Somthing went worng')
                console.error(err);
            }
            res.render('details', {filename: req.params.filename,filedata: data })
        })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})
app.listen(3000);
