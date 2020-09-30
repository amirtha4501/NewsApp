const express = require("express");

const app = express();

const bodyParser = require("body-parser");

// middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB
const mongoose = require("mongoose");
mongoose
    .connect("mongodb://localhost:27017", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(console.log("MongoDbConnected"))
    .catch((err) => console.log(err));

    const news = require('./routes/news');
    app.use("/news", news);

// app.get('/', (req, res) => {
//     res.send("Hey this is server");
// });

// app.get('/html', (req, res) => {
//     res.send('<h2 style="color: darkblue">This is the server showing as html</h2>');
// });

app.get('/view', (req, res) => {
    res.status(404).send("Request not found");
});

port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log("Server is running at port", port);
});
