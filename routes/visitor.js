const dashboardController = require("../controllers/dashboard");
const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../middleware/auth'); 

// visitor- dashboard
router.get('/', ensureAuth, dashboardController.getVisitorPage)

module.exports = router;