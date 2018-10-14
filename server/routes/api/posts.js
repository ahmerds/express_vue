const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

//Get POSTs
router.get('/', async (req, res) => {
    const posts = await loadPostCollection();
    res.send(await posts.find({}).toArray());
});

//Make POST
router.post('/', async(req, res) => {
    const posts = await loadPostCollection();
    await posts.insertOne({
        text: req.body.text,
        createdAt: new Date()
    });

    res.status(201).send();
});

//Delete POST
router.delete('/:id', async (req, res) => {
    const posts = await loadPostCollection();
    await posts.deleteOne({
        _id: new mongodb.ObjectID(req.params.id)
    });
    res.status(204).send();
});


async function loadPostCollection() {
    const client = await mongodb.MongoClient.connect(
        'mongodb://user1:passw0rd@ds131903.mlab.com:31903/express_vue', {
            useNewUrlParser: true
        }
    );

    return client.db('express_vue').collection('posts');
}

module.exports = router;