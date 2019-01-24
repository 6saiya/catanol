var express = require('express');
var router = express.Router();
var getfs = require('../dao/getfs')

router.get('/', function(req, res, next) {
    getfs.getfs(req, res, next)
});

module.exports = router;
