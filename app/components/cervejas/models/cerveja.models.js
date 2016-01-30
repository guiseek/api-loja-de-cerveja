var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Cerveja', new Schema({
    nome: String,
    categoria: String,
    cervejaria: {
        type: Schema.ObjectId,
        ref: 'Cervejaria'
    }
}));
