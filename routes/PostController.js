const express = require('express');
const router = express.Router();
const objectID = require('mongoose').Types.ObjectId;

const { postModel } = require('../models/PostModel');

router.get('/', (req, res) => {
    postModel.find((err, docs) => {
        if (!err) res.send(docs);
        else console.log("Error to get data : " + err);
    })
})

router.post('/', (req, res) => {
    const newRecord = new postModel({
        author: req.body.author,
        message: req.body.message
    });

    newRecord.save((err, docs) => {
        if (!err) res.send(docs);
        else console.log("Error creating new data");
    })
})

router.put("/:id", (req, res) => {
    if (!objectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id)

    const updateRecord = {
        author: req.body.author,
        message: req.body.message
    };

    postModel.findByIdAndUpdate(
        req.params.id,
        { $set: updateRecord },
        { new: true },
        (err, docs) => {
            if (!err) res.send(docs);
            else console.log("Update error : " + err);

        }
    )
})

router.delete("/:id", (req, res) => {
    if (!objectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id)

    postModel.findByIdAndRemove(
        req.params.id,
        (err, docs) => {
            if (!err) res.send(docs);
            else console.log("Deleting successfully : " + err);

        }
    )
})


module.exports = router