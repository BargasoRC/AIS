let models = require("./schema");

module.exports = function(student, res) {
    models.Visitors.findOne({ name: student}, (err, visitors) => {
        res.status(200).send({
            error:false,
            data:visitors
        })
    }).catch(err => {
        if (err) {
            console.log(err);
            res.status(503).json({
                message: "Service unavailable"
            });
        }
    });
};