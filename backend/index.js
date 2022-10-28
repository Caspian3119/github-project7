const express = require("express");
const port = 8080;
const app =express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

// Install body-parser and cors
app.use(bodyParser.json());
app.use(cors());

// connecting to mongodb
const uri = "mongodb+srv://rererereyds:Hapag12345@project7db.zpxtwvw.mongodb.net/project7db";
mongoose.connect (uri);

// connecting router
const recipesRouter = require("./routes/recipes");
app.use("/api/v1/recipes", recipesRouter);

const accountsRouter = require("./routes/accounts");
app.use("/api/v1/accounts", accountsRouter);

app.get("/", (request, response) => {
    response.send(`Welcome to your Express App.`)
});

app.listen(port, () => {
        console.log(`Express is running on port ${port}.`)
});