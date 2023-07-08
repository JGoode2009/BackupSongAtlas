const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const request = require("request");
const { URLSearchParams } = require("url");
const morgan = require("morgan");
const port = process.env.PORT || 3001;
const cors = require("cors");
// const cookieParser = require('cookie-parser')


app.use(cors());
app.use(express.static("public"));

const spotify_client_id = process.env.SPOTIFY_CLIENT_ID;
const spotify_client_secret = process.env.SPOTIFY_CLIENT_SECRET;
// console.log(`spotify_client_id: ${spotify_client_id}`);
//.env is working

app.use(morgan("dev"));

let generateRandomString = function (length) {
  let text = "";
  let possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

app.get("/", (req, res)=>{
  // console.log(typeof access_token !== undefined ? access_token : "no access token");
  res.send("Why does app.js want this route!")
})

app.get("/auth/login", (req, res) => {
  const scope = "streaming user-read-email user-read-private";
  const state = generateRandomString(16);

  const auth_query_parameters = new URLSearchParams({
    response_type: "code",
    client_id: process.env.SPOTIFY_CLIENT_ID,
    scope: scope.split(" "),
    redirect_uri: `http://localhost:${port}/auth/callback`,
    state: state,
  });

  res.redirect(
    "https://accounts.spotify.com/authorize/?" +
      auth_query_parameters.toString()
  );
});

// `https://accounts.spotify.com/authorize?client_id=a6ab315119394a7793d134824c63f107&redirect_uri=http://localhost:3001/auth/callback&scope=streaming%20user-read-private%20user-read-email&response_type=token&show_dialog=true`

app.get("/auth/callback", (req, res, next) => {
  // made it to the callback route after manually changing port but stuck on acces token page
  const code = req.query.code;
  // code is is defined
  const authOptions = {
    url: "https://accounts.spotify.com/api/token",
    form: {
      code: code,
      redirect_uri: `http://localhost:${port}/auth/callback`,
      grant_type: "authorization_code",
    },
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(spotify_client_id + ":" + spotify_client_secret).toString(
          "base64"
        ),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    json: true,
  };
  
  request.post(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      const access_token = body.access_token;
      //set the access token in a cookie
      // res.cookie('access_token', access_token);
      // res.json(body);
      res.redirect("/")

    }
  });

});
//the spotify documentation has the clientside fetch this, but I can't get this to work so fetching the auth/callback instead
  // app.get("/auth/token", (req, res) => {
  //   res.json({
  //     access_token: req.access_token,
  //   });
  // });
  
  app.get("/auth/token", (req, res) => {
    // const access_token = req.cookies.access_token;
    res.json({ access_token: access_token });
  });
  

// });
//not sure if this route is necessary (auth/token) it is being retrived in callback route

app.get("/test", (req, res) => {
  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
  res.json({ client_id, client_secret });
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
})
