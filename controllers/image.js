const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: "07a1b4f26d2b4bb693a21fdb0d894c3d"
});

const handleApiCall = (req, res) => {
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
        res.json(data);
    })
    .catch(err => res.status(400).json('Unable to work with api'))
}

const handleImagePut = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entires => {
            res.json(entires[0]);
        })
        .catch(err => res.status(400).json('unable to get entires'))
}

module.exports = {
    handleImagePut: handleImagePut,
    handleApiCall: handleApiCall
}