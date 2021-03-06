'use strict';

// Require modules
var express = require('express');

// Init an Express Router
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  // Send simple HTTP response with statuscode 200 (OK)
  res.status(200).send({
    message: "Hello world! This is being live reloaded!"
  });
});

module.exports = router;
