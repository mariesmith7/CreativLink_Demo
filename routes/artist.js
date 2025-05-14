const dashboardController = require("../controllers/dashboard");
const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../middleware/auth'); 

// art- dashboard
router.get('/', ensureAuth, dashboardController.getArtistPage)

module.exports = router;