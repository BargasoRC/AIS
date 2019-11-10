let models = require("./schema");

module.exports = function(student, res) {
    models.Visitors.findOne({ name: student}, (err, admin) => {
        
    }).catch(err => {
        if (err) {
            console.log(err);
            res.status(503).json({
                message: "Service unavailable"
            });
        }
    });
};