const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: 'c9019e56e40f4597b4c0603a31cbe9d5'
});

const handleApiCall = (req, res) => {
    app.models
        .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => {
            res.json(data)
        })
        .catch(err => res.status(400).json('Unable to work with API'))
}

const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users')
    .where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0].entries);
    })
    .catch(err => res.status(400).json('Unable to get account'))
}


module.exports = {
    handleImage: handleImage,
    handleApiCall: handleApiCall
};