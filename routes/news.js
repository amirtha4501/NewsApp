const express = require("express");
const router = express.Router();

const News = require("../models/News");

// 1. save news
router.post("/save", (req, res) => {
    const newNews = new News({
        headline: req.body.subject,
        description: req.body.description,
        department: req.body.department,
        imageUrl: req.body.imageUrl
    });
    newNews
        .save()
        .then((news) => res.json(news))
        .catch((err) => req.json(err));
});

// 2. get news
router.get("/get-all", (req, res) => {
    // News.find({headline: req.body.headline})  --- may also apply
    News.find()
        .then((news) => res.send(news))
        .catch((err) => res.status(404).json({noNewsFound: "No news found"}));
});

// 3. get news by id
router.get("/get/:id", (req, res) => {
    News.findById(req.params.id)
        .then((news) => res.json(news))
        .catch((err) => res.status(404).json({noNewsFound: "No news found with given id"}));
});

// 4. get by department
router.post("/get-by-dept", (req, res) => {
    News.find({ department: req.body.department})
        .then((news) => res.json(news))
        .catch((err) => res.status(404).json({noNewsFound: "No news found with given department"}));
});

// 5. update/edit notice
router.post("/edit/:id", (req, res) => {
    var newData = {
        headline: req.body.subject,
        description: req.body.description,
        department: req.body.department,
        imageUrl: req.body.imageUrl
    };
    News.findByIdAndUpdate(
            { _id: req.params.id },
            { $set: newData },
            { new: true }
        )
        .then((news) => res.json(news))
        .catch((err) => res.status(404).json(err));

});

// 6. Delete News by
router.delete("/delete/:id", (req, res) => {
    News.findById(req.params.id)
        .then((news) => {
            news.remove().then(() => res.json({ success: true }));
        })
        .catch((err) => res.status(404).json({ success: false }));
});

// 7. Delete all
router.delete("/delete-all", (req, res) => {
    News.deleteMany()
        .then((data) => res.send({ success: true}))
        .catch((err) => res.status(404).json({ success: false }));
});


router.get("/get", (req, res) => {
    res.send("Hey this is the server from router");
});

module.exports = router;
