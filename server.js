const express = require('express');
const path = require('path');
const app = express();
const port = 5502;
const http = require('http');
const session = require("express-session");
const cookieParser = require("cookie-parser");
const fs = require("fs");
const bodyParser = require("body-parser");
require("dotenv").config({ path: path.resolve(__dirname, '.env') });

app.use(express.static(__dirname))
app.set("views", path.resolve(__dirname, "templates"));
app.set("view engine", "ejs");
app.use(express.json())
app.use(
    session({
      resave: true,
      saveUninitialized: false,
      secret: "Secret", // use .env for secret string
    })
  );

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates/index.html'));
});

app.get('/callback', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates/userWithSpot.html'))
});

const signUpHandling = require('./middleware/signUpHandling')

const logInHandling = require('./middleware/LogInHandling')

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/signup", signUpHandling)

app.use("/signin", logInHandling)

app.get('/user', (req, res) => {
    // res.render(user)
})

// app.post("/user/getRecommendations", async (req, res) => {
//     console.log("in getREC")
//     user1 = req.session.user
//     const artistID = `3TVXtAsR1Inumwj472S9r4`
//     const res1 =  await fetch(`https://api.spotify.com/v1/recommendations?limit=100&seed_artists=${artistID}`)
//     if(res1.ok) {
//         const data = res1.json()
//         console.log("data: ", data)
//     } else {
//         console.log("res1: ", res1)
//     }
//    // console.log("user1: ", user1)
// })

// app.get("/user/getPreferences", (req, res) => {
//     user1 = req.session.user
  
// })

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
