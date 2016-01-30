'use strict';

var mongoose = require('mongoose'),
    Cervejaria = require('../models/cervejaria.models');


exports.findAll = function (req, res) {
    Cervejaria.find({}, function (err, cervejarias) {
        res.json(cervejarias);
    });
};
exports.find = function (req, res) {
    res.json(req.cervejaria);
};
exports.create = function (req, res) {
    var cervejaria = new Cervejaria(req.body);

    cervejaria.save(function (err) {
        if (err) {
            return res.status(400).json({
                message: err
            });
        } else {
            res.json(cervejaria);
        }
    });
};
exports.update = function (req, res) {
    var cervejaria = req.cervejaria;
    cervejaria.nome = req.body.nome;
    console.log(cervejaria);

    cervejaria.save(function (err) {
        if (err) {
            res.status(400).json({
                message: err
            });
        } else {
            res.json(cervejaria);
        }
    });
};
exports.delete = function (req, res) {
    var cervejaria = req.cervejaria;

    cervejaria.remove(function (err) {
        if (err) {
            res.status(400).json({
                message: err
            });
        } else {
            res.json({
                message: 'cervejaria removida com sucesso',
                cervejaria: cervejaria
            });
        }
    });
};

exports.procura = function (req, res) {
  var regex = new RegExp(req.params.query, 'i');
  var query = {nome: regex};
  Cervejaria.find(query).sort('-created').populate('user', 'displayName').exec(function (err, places) {
    if (err) {
        res.status(400).json({
            message: 'Cerveja is invalid'
        });
    } else {
      res.json(places);
    }
  });
};


exports.cervejariaByID = function (req, res, next, id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({
            message: 'Cerveja is invalid'
        });
    }
    Cervejaria.findById(id).exec(function (err, cervejaria) {
        console.log(cervejaria);
        if (err) {
            res.status(500).json({
                message: 'No cervejariaaa with that identifier has been found'
            });
        }
        req.cervejaria = cervejaria;
        next();
    });
};
