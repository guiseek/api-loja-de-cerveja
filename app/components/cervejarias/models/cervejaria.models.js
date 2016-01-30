var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Cervejaria', new Schema({
    nome: String
}));
