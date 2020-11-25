const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

var corsOptions = {
    //origin: "http://localhost:8081"
    origin: "http://localhost:3000"
  };
  
  app.use(cors(corsOptions));
  
  // parse requests of content-type - application/json
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(express.json());

  // parse requests of content-type - application/x-www-form-urlencoded
  //app.use(bodyParser.urlencoded({ extended: true }));

const db = require('./models');
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to d application." });
});

    

// const home = require('./controllers/HomeController');
// const group = require('./controllers/GroupController');
// const address = require('./controllers/AddressController');
//const routes = require('./routes');



// app.use('/', home);
// app.use('/group', group);
// app.use('/address', address);

require('./routes/address.routes')(app);

app.listen(3001, () => {
    console.log('Example app listening on port 3001!');
});

//Run app, then load http://localhost:3001 in a browser to see the output.