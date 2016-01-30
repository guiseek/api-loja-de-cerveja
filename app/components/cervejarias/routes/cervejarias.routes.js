'use strict';

module.exports = function (api) {
    var cervejarias = require('../controllers/cervejarias.controller');

    api.route('/cervejarias')
        .get(cervejarias.findAll)
        .post(cervejarias.create);

    api.route('/cervejarias/:id')
        .get(cervejarias.find)
        .put(cervejarias.update)
        .delete(cervejarias.delete);
    
    api.route('/cervejarias/procura/:query')
        .get(cervejarias.procura);

    api.param('id', cervejarias.cervejariaByID);
};
