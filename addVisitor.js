let models = require("./schema");

module.exports = function(student,visitor, res) {
    console.log(student)
    console.log(visitor)
    models.Visitors.update({name: student},{$push:{visitors: visitor}}, (err,callback) => {
        console.log(callback)
    }).catch(err => {
        if (err) {
            console.log(err);
            res.status(503).json({
                message: "Service unavailable"
            });
        }
    });
};