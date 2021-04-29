
const { Router } = require('express');

const t9Routes = require('./t-9-routes');
const router = Router();

router.use("/t9", t9Routes);

module.exports = router;