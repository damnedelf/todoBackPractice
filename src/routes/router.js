/* eslint-disable prefer-arrow-callback */
const express = require('express');

const router = express.Router();

// middleware that is specific to this router

// define the home page route
router.get('/todos', (req, res) => {});
// define the about route
router.post('/todos', (req, res) => {});
router.patch('/todos', (req, res) => {});

router.delete('/todos', (req, res) => {});
module.exports = router;
