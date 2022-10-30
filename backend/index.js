const express = require("express");
const port = 8080;
const app =express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const Imagekit = require("imagekit");

// Install body-parser and cors
app.use(bodyParser.json());
app.use(cors());

// connecting to mongodb
const uri = "mongodb+srv://rererereyds:Hapag12345@project7db.zpxtwvw.mongodb.net/project7db";
mongoose.connect (uri);

// connecting router
const imagekit = new Imagekit({urlEndpoint: "https://ik.imagekit.io/hokmvk3ns", publicKey: "public_p9xGK8Ln6FgEzum27kuv+4/9Qds=", privateKey: "private_+FxrQSnni/XEOkQdPjk8HSzn/tg="});

const recipesRouter = require("./routes/recipes");
app.use("/api/v1/recipes", recipesRouter);
app.get("/imagekit/auth", (request, response) => {
    const result = imagekit.getAuthenticationParameters();
      // const result = imagekit;
    response.send(result);
  });

const accountsRouter = require("./routes/accounts");
app.use("/api/v1/accounts", accountsRouter);

app.get("/", (request, response) => {
    response.send(`Welcome to your Express App.`)
});

app.listen(port, () => {
        console.log(`Express is running on port ${port}.`)
});