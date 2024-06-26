const express = require("express");
const FirebaseWrapper = require('./FirebaseWrapper');
// const FirebaseAuth = require('./FirebaseAuth');
const app = express();
const port = process.env.PORT || 3001;

let firebaseWrapper = new FirebaseWrapper();
firebaseWrapper.init();
// let firebaseAuth = new FirebaseAuth();

app.get("/step1", (req, res) =>{
    stepHandler(req, res);
} );
app.get("/finish", (req, res) => {
    finishHandler(req,res);
});

app.get("/store", async (req, res) => {
    let value = await firebaseWrapper.storeId(req.query.uuid, req.query.tid, req.query.utm_campaign);
    res.header(`Access-Control-Allow-Origin`, `https://weatherforecastsdaily.com`);
    res.header(`Access-Control-Allow-Methods`, `GET,PUT,POST,DELETE`);
    res.header(`Access-Control-Allow-Headers`, `Content-Type`);
    res.send(value);
});
app.get("/check", async (req, res) => {
    let value = await firebaseWrapper.getId(req.query.id);
    res.type('json').send(value);
});

/*app.get("/authtoken", async (req, res) => {
    let value = await firebaseAuth.getAuthToken();
    res.send(value);
});*/

const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;

let stepHandler = function(req, res){
    let userId= req.query.id;
    const html = `
<!DOCTYPE html>
<html>
  <head>
    <title>Hello from Render!</title>
    <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js"></script>
    <script>
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          disableForReducedMotion: true
        });
      }, 500);
    </script>
    <style>
      @import url("https://p.typekit.net/p.css?s=1&k=vnd5zic&ht=tk&f=39475.39476.39477.39478.39479.39480.39481.39482&a=18673890&app=typekit&e=css");
      @font-face {
        font-family: "neo-sans";
        src: url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("woff2"), url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("woff"), url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("opentype");
        font-style: normal;
        font-weight: 700;
      }
      html {
        font-family: neo-sans;
        font-weight: 700;
        font-size: calc(62rem / 16);
      }
      body {
        background: white;
      }
      section {
        border-radius: 1em;
        padding: 1em;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-right: -50%;
        transform: translate(-50%, -50%);
      }
    </style>
  </head>
  <body>
    <section>
      Almost done!!</br>
        
      Click below to make payment</br>
	<a href="https://weatherpayment.onrender.com/finish?id=${userId}">Pay</a>
    </section>
  </body>
</html>
`;
    res.type('html').send(html);
};

let finishHandler = function(req,res){
    let userId= req.query.id;
    const finalhtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Hello from Render!</title>
        <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js"></script>
        <script>
          setTimeout(() => {
            confetti({
              particleCount: 100,
              spread: 70,
              origin: { y: 0.6 },
              disableForReducedMotion: true
            });
          }, 500);
        </script>
        <style>
          @import url("https://p.typekit.net/p.css?s=1&k=vnd5zic&ht=tk&f=39475.39476.39477.39478.39479.39480.39481.39482&a=18673890&app=typekit&e=css");
          @font-face {
            font-family: "neo-sans";
            src: url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("woff2"), url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("woff"), url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("opentype");
            font-style: normal;
            font-weight: 700;
          }
          html {
            font-family: neo-sans;
            font-weight: 700;
            font-size: calc(62rem / 16);
          }
          body {
            background: white;
          }
          section {
            border-radius: 1em;
            padding: 1em;
            position: absolute;
            top: 50%;
            left: 50%;
            margin-right: -50%;
            transform: translate(-50%, -50%);
          }
        </style>
      </head>
      <body>
        <section>
          <h1>Surprise!!</h1>
          </br>
        <h2>We’re giving you a free subscription to WeatherForecastsDaily</h2>
        </section>
      </body>
    </html>
`;
    firebaseWrapper.storeId(userId);
    res.type('html').send(finalhtml)
};




