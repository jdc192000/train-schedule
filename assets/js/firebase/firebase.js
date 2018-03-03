// Initialize Firebase
var config = {
  apiKey: "AIzaSyB1GJt6R1I5CELlsBXWifJoHL7o4EcIq7Y",
  authDomain: "train-activity-91d44.firebaseapp.com",
  databaseURL: "https://train-activity-91d44.firebaseio.com",
  projectId: "train-activity-91d44",
  storageBucket: "train-activity-91d44.appspot.com",
  messagingSenderId: "297040456616"
};
firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding trains
// $("#add-train-btn").on("click", function (event) {

function addTrain() {
  event.preventDefault();

  var trainName = $("#train-name-input").val().trim();
  var trainDest = $("#dest-input").val().trim();
  var trainStart = moment($("#start-input").val().trim(), "DD/MM/YY").format("X");
  var trainFreq = $("#freq-input").val().trim();

  var newTrain = {
    name: trainName,
    dest: trainDest,
    start: trainStart,
    freq: trainFreq
  };

  // Uploads train data to the database
  database.ref().push(newEmp);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.dest);
  console.log(newTrain.start);
  console.log(newTrain.freq);

  // Alert
  alert("train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#dest-input").val("");
  $("#start-input").val("");
  $("#freq-input").val("");
// });
};

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function (childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var empdest = childSnapshot.val().dest;
  var empStart = childSnapshot.val().start;
  var empRate = childSnapshot.val().rate;

  // train Info
  console.log(trainName);
  console.log(empdest);
  console.log(empStart);
  console.log(empRate);

  // Prettify the train start
  var empStartPretty = moment.unix(empStart).format("MM/DD/YY");

  // Calculate the months worked using hardcore math
  // To calculate the months worked
  var empMonths = moment().diff(moment.unix(empStart, "X"), "months");
  console.log(empMonths);

  // Calculate the total billed rate
  var empBilled = empMonths * empRate;
  console.log(empBilled);

  // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + empdest + "</td><td>" +
    empStartPretty + "</td><td>" + empMonths + "</td><td>" + empRate + "</td><td>" + empBilled + "</td></tr>");
});
