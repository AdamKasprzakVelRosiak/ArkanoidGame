var config = {
    apiKey: "AIzaSyAVaM1YR_QWR3a5CAvkWNcFiWUixxhuc54",
    authDomain: "arkanoid-20107.firebaseapp.com",
    databaseURL: "https://arkanoid-20107-default-rtdb.firebaseio.com",
    projectId: "arkanoid-20107",
    storageBucket: "arkanoid-20107.appspot.com",
    messagingSenderId: "813983642969",
    appId: "1:813983642969:web:e994564b4e5b66a37b8848",
    measurementId: "G-2S848BNXE4"
  };
  // Initialize Firebase
  var app = firebase.initializeApp(config);

//
var score = app.database().ref('bestScore');

score.on("value", function(data) {
    console.log(data.val());
    recordScore = data.val();
}, function (error) {
    console.log("Error: " + error.code);
});


// score.set(2);