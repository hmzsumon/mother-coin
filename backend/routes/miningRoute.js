const express = require('express');
const multer = require('multer');
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');
const { startMining, getMyMining } = require('../controllers/miningConteoller');

// start mining
router.route('/start/mining').post(isAuthenticatedUser, startMining);

// get my mining
router.route('/my/mining').get(isAuthenticatedUser, getMyMining);

module.exports = router;
