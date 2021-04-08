/*
  FIXME notes for myself

  So far have just been reworking this part. Made it return dummy
  data, and then worked on the User and TA models.
  Put in all the models, then make sure the endpoints are using those.
  Also modify the paths as necessary.
  Then go to the front end and make it match.

  I'll probably do the endpoints back and front end one at a time.
*/


//Setup and imports
const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express.json());

const mongoose = require('mongoose');



//Models
const userSchema = new mongoose.Schema({
  net_id: String,
  name: String,
  blocked: Boolean,
  section: Number,
})
const User = mongoose.model('User', userSchema);

const taSchema = new mongoose.Schema({
  user: [userSchema],
  zoom_link: String
})
const TA = mongoose.model('TA', taSchema);

const helpSessionSchema = new mongoose.Schema({
  id: String,
  name: String,
  ta: [taSchema],
  question: String,
  location: String
})
const HelpSession = new mongoose.model('HelpSession', helpSessionSchema);



//Endpoints
app.delete('/api/session/leave.php/:id', async (req, res) => {
  //FIXME Note: This one is untested
  console.log("Got a leave request. The dummy backend didn't do" +
    "anything, but a real backend would remove a TA from the session");
  console.log("Here is the request we received:");
  console.log(req.body);
  console.log("\n");
  res.sendStatus(200);
});

app.get('/api/session/get-available.php', async (req, res) => {
  let userForTa = new User({
    net_id: 'DummyTANetId',
    name: "DummyTAName",
    blocked: false,
    section: 42
  })
  let ta = new TA({
      user: userForTa,
      zoom_link: "DummyTaZoomLink.com"
  })
  let session1 = new HelpSession({
      id: 'MYID2',
      name: 'Dummy Student 1',
      ta: ta,
      question: 'Dummy question 1',
      location: 'Dummy location 1',
  })
  let session2 = new HelpSession({
      id: 'MYID2',
      name: 'Dummy Student 2',
      ta: ta,
      question: 'Dummy question 2',
      location: 'Dummy location 2',
  })
  let sessions = [
    session1,
    session2
  ]
  res.send(sessions);

  console.log("Got a get-available request. The dummy backend sent " +
    "back this fake response:");
  console.log(sessions);
  console.log("\n");
});

app.put('/api/session/create.php', async (req, res) => {
  console.log("Got a create request. The dummy backend didn't do " +
    "anything, but a real backend would create a new help session.");
  console.log("Here is the request we received:");
  console.log(req.body);
  console.log("\n");
  res.sendStatus(200);
})

app.put('/api/session/join.php/', async (req, res) => {
  console.log("Got a join request. The dummy backend didn't do" +
    "anything, but a real backend would add a TA to the session");
  console.log("Here is the request we received:");
  console.log(req.body);
  console.log("\n");
  res.sendStatus(200);
});



//Start the server
app.listen(3001, () => console.log('Server listening on port 3001!\n'));
