var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var visit = new Schema({
    name: {
        firstname: String,
        lastname: String
    },
    age: Number,
    gender: String,
    address: String
}, {
    collection: 'visitors'
}
);
const Visitors = mongoose.model("Visitors", visit);
module.exports = { Visitors }
