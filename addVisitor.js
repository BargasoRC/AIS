let models = require("./schema");
let response = require("./helper")

module.exports = function(student,visitor, res) {
    console.log(student)
    console.log(visitor)
    models.Visitors.update({name: student},{$push:{visitors: visitor}}, (err,callback) => {
        response.error = false;
        response.status = 200;
        response.data.body = callback
        res.send(response)
    }).catch(err => {
        if (err) {
            console.log(err);
            res.status(503).json({
                message: "Service unavailable"
            });
        }
    });
};