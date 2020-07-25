var tf = require('@tensorflow/tfjs-node');
const loc = tf.io.fileSystem('../tfjs_target_dir/model.json');
const router = require('express').Router();

//Categories with which model was trained
const categories = ['airplane', 'apple', 'bird', 'face', 'fish', 'flower', 'house', 'star', 'train', 'tree']

router.route('/').post((req, res) => {
    let img = tf.tensor(req.body, [1,28,28,1])
    tf.loadLayersModel(loc)
        .then( model => {
            const predicted = model.predict(img)
            predicted.data()
                .then( result => {
                    const idx = result.indexOf(Math.max(...result))
                    res.json(categories[idx])
                })
        })
        .catch( err => {
            console.log("Model Import: ", err);
        }) 
});

module.exports = router;