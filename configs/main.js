"use strict";
var path = require('path'),
    env=process.env.NODE_ENV || 'development';

module.exports = {
    name :"medlib",
    keys:['9c9654dbd01bfa4aaf963c90300f834335e0ca29'],
    env : env,
    debug:env!=='production'
};