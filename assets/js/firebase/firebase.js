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

function addTrain() {

  event.preventDefault();

  var trainName = $("#train-name-input").val().trim();
  var trainDest = $("#dest-input").val().trim();
  var firstTime = $("#start-input").val().trim();
  var trainFreq = $("#freq-input").val().trim();

  var newTrain = {
    name: trainName,
    dest: trainDest,
    freq: trainFreq,
    first: firstTime
    // mins: trainMinsNext
  };

  database.ref().push(newTrain);

  console.log(newTrain.name);
  console.log(newTrain.dest);
  // console.log(newTrain.next);
  console.log(newTrain.freq);
  // console.log(newTrain.mins);
  console.log("==============");

  $("#train-name-input").val("");
  $("#dest-input").val("");
  $("#start-input").val("");
  $("#freq-input").val("");

};

// database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDest = childSnapshot.val().dest;
  var trainFreq = childSnapshot.val().freq;
  var trainFirst = childSnapshot.val().first;
  // var trainMinsNext = childSnapshot.val().mins;

  // var trainStartTime = moment($("#start-input").val().trim(), "DD/MM/YY").format("X");

  var firstTimeConverted = moment(trainFirst, "HH:mm").subtract(1, "years");
  console.log("first time: " + firstTimeConverted);

  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);

  var tRemainder = diffTime % trainFreq;
  console.log(tRemainder);

  // Minute Until Train
  var tMinutesTillTrain = trainFreq - tRemainder;
  var trainMinsNext = tMinutesTillTrain;
  console.log("MINUTES TILL TRAIN: " + trainMinsNext);

  var tNext = moment().add(tMinutesTillTrain, "minutes");
  console.log("ARRIVAL TIME: " + moment(tNext).format("HH:mm"));



  var trainNext = moment(tNext).format("HH:mm");
  console.log(trainNext);
  // var trainStartTime = moment($("#start-input"), "HH:mm").subtract(1, "years");


  console.log("train name: " + trainName);
  console.log("train dest: " + trainDest);
  console.log("train freq: " + trainFreq);
  console.log("train first: " + trainFirst);


  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" +
  trainFreq + "</td><td>" + trainNext + "</td><td>" + trainMinsNext + "</td>");
});

