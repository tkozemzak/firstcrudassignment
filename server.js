let express = require('express');
let app = express();
let port = process.env.PORT || 8000;
let fs = require('fs');
let bodyParser = require('body-parser');

app.use(bodyParser.json());

//POST new user

app.post('/users', function(req, res) {
  let data = fs.readFileSync("./storage.json", "utf8");
  console.log(data);
  let parsedData = JSON.parse(data);
  parsedData.push(req.body)
  fs.writeFileSync("./storage.json", JSON.stringify(parsedData))
  res.send("Done")

})


//GET all users
app.get('/users', function(req, res) {
  let data = fs.readFileSync('./storage.json', 'utf8')
  let parsedData = JSON.parse(data);
  res.json(parsedData)
})


//GET user by name
app.get('/users/:name', function(req, res) {
  let data = fs.readFileSync('./storage.json', 'utf8')
  let parsedData = JSON.parse(data);
  let name = req.params.name;

  for (let key in parsedData) {
    if (name === parsedData[key].name) {
      res.json(name)
    }
  }
})

//PATCH update user
app.patch('/users/:name', function(req, res) {
  let data = fs.readFileSync('./storage.json', 'utf8')
  let parsedData = JSON.parse(data);
  let updatedData = parsedData.map((item) => {
    if (item.name === req.params.name) {
      return req.body;
    } else {
      return item;
    }
  });
  fs.writeFileSync('./storage.json', JSON.stringify(updatedData));
  res.send("Updated")
})


//DELETE user
app.delete('/users/:name', function(req, res) {
  let data = fs.readFileSync('./storage.json', 'utf8');
  let parsedData = JSON.parse(data);
  let filteredData = parsedData.filter((item) => {
    return item.name !== req.params.name;
  });
  fs.writeFileSync('./storage.json', JSON.stringify(filteredData));
  res.send("Deleted")
});


app.use(function(req, res) {
  res.sendStatus(400);
});

app.listen(port, function() {
  console.log('Listening on port', port);
});
