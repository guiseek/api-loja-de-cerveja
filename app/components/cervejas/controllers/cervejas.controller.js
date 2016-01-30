'use strict';

var mongoose = require('mongoose'),
    Cerveja = require('../models/cerveja.models');


exports.findAll = function (req, res) {
    Cerveja.find({}).populate('cervejaria').exec(function (err, cervejas) {
        res.json(cervejas);
    });
};
exports.find = function (req, res) {
    res.json(req.cerveja);
};
exports.create = function (req, res) {
    var cerveja = new Cerveja(req.body);

    cerveja.save(function (err) {
        if (err) {
            return res.status(400).json({
                message: err
            });
        } else {
            res.json(cerveja);
        }
    });
};
exports.update = function (req, res) {
    var cerveja = req.cerveja;
    cerveja.nome = req.body.nome;
    cerveja.categoria = req.body.categoria;
    cerveja.cervejaria = req.body.cervejaria;

    cerveja.save(function (err) {
        if (err) {
            res.status(400).json({
                message: err
            });
        } else {
            res.json(cerveja);
        }
    });
};
exports.delete = function (req, res) {
    var cerveja = req.cerveja;

    cerveja.remove(function (err) {
        if (err) {
            res.status(400).json({
                message: err
            });
        } else {
            res.json({
                message: 'cerveja removida com sucesso',
                cerveja: cerveja
            });
        }
    });
};

exports.procura = function (req, res) {
  var regex = new RegExp(req.params.query, 'i');
  var query = {nome: regex};
  Cerveja.find(query).exec(function (err, places) {
    if (err) {
        res.status(400).json({
            message: 'Cerveja is invalid'
        });
    } else {
      res.json(places);
    }
  });
};

exports.cervejaByID = function (req, res, next, id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({
            message: 'Cerveja is invalid'
        });
    }
    Cerveja.findById(id).populate('cervejaria').exec(function (err, cerveja) {
        console.log(cerveja);
        if (err) {
            res.status(500).json({
                message: 'No cerveja with that identifier has been found'
            });
        }
        req.cerveja = cerveja;
        next();
    });
};
