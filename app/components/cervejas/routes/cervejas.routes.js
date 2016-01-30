'use strict';

module.exports = function (api) {
    var cervejas = require('../controllers/cervejas.controller');

    api.route('/cervejas')
        .get(cervejas.findAll)
        .post(cervejas.create);

    api.route('/cervejas/:id')
        .get(cervejas.find)
        .put(cervejas.update)
        .delete(cervejas.delete);
    
    api.param('id', cervejas.cervejaByID);
};
