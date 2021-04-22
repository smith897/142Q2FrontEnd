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

//Check flags
let printRequests = false;
if (process.argv.includes('-rq')) {
  printRequests = true;
}
let printResponses = false;
if (process.argv.includes('-rs')) {
  printResponses = true;
}


//Models
const userSchema = new mongoose.Schema({
  net_id: String,
  name: String,
  blocked: Boolean,
  section: Number,
})
const User = mongoose.model('User', userSchema);

const taSchema = new mongoose.Schema({
  user: userSchema,
  zoom_link: String
})
const TA = mongoose.model('TA', taSchema);

const helpSessionSchema = new mongoose.Schema({
  uniq_id: String,
  student: userSchema,
  ta: [],
  question: String,
  location: String,
  public_to: [], //TODO: Note on documentation: Needs its own class [(id, timestamp), ...]
  enqueue_time: String,
  start_time: String,
  end_time: String,
  join_log: [],
  doesCountAgainstLimit: Boolean,
  chat_log: [] //TODO: Note on documentation: Needs its own class [{timestamp, user, message}]
})
const HelpSession = new mongoose.model('HelpSession', helpSessionSchema);



//Endpoints
app.post('/api/session/leave.php', async (req, res) => {
  //Note: This endpoint is untested
  res.sendStatus(200);
  console.log("Got a leave request! The dummy backend didn't do" +
    "anything, but a real backend would remove a TA from the session");
  if (printRequests) {
    console.log("Here's the request:");
    console.log(req.body);
  }
  if (printResponses) {
    console.log("No response was sent back.");
  }
  console.log("\n");
});
app.post('/api/session/get-available.php', async (req, res) => {
  let sessions = [
    "DummySessionId1",
    "DummySessionId2"
  ]
  res.send(sessions);
  console.log("Got a get-available request!");
  if (printRequests) {
    console.log("Here's the request:");
    console.log(req.body);
  }
  if (printResponses) {
    console.log("Here's our response:");
    console.log(sessions);
  }
  console.log("\n");
});
app.post('/api/session/get-details.php', async (req, res) => {
  let dummyUser = new User({
    net_id: 'DummyNetId',
    name: "DummyName",
    blocked: false,
    section: 42
  })
  let ta = new TA({
      user: dummyUser,
      zoom_link: "DummyTaZoomLink.com"
  })
  let dummySession = new HelpSession({
      uniq_id: 'MYID',
      student: dummyUser,
      ta: [],
      question: 'Dummy question 1',
      location: 'Dummy location 1',
      public_to: [],
      enqueue_time: 'Dummy enqueue_time',
      start_time: 'Dummy start_time',
      end_time: 'Dummy end_time',
      join_log: [],
      doesCountAgainstLimit: true,
      chat_log: []
  })
  res.send(dummySession);
  console.log("Got a get-details request!");
  if (printRequests) {
    console.log("Here's the request:");
    console.log(req.body);
  }
  if (printResponses) {
    console.log("Here's our response:");
    console.log(dummySession);
  }
  console.log("\n");
})
app.post('/api/session/create.php', async (req, res) => {
  console.log("Got a create request! The dummy backend didn't do " +
    "anything, but a real backend would create a new help session.");
  res.sendStatus(200);
  if (printRequests) {
    console.log("Here is the request:");
    console.log(req.body);
  }
  if (printResponses) {
    console.log("No response was sent back.");
  }
  console.log("\n");

});
app.post('/api/session/join.php', async (req, res) => {
  console.log("Got a join request! The dummy backend didn't do " +
    "anything, but a real backend would add a TA to the session");
  res.sendStatus(200);
  if (printRequests) {
    console.log("Here is the request we received:");
    console.log(req.body);
  }
  if (printResponses) {
    console.log("No response was sent back.");
  }
  console.log("\n");
});



//Start the server
app.listen(3001, () => console.log('Server listening on port 3001!\n'));
