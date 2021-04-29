
const { Router } = require('express');
const router = Router();
const { fetchResult } = require('../controllers/t9-controller');

router.route('/fetch-result')
    .get(fetchResult);

module.exports = router;