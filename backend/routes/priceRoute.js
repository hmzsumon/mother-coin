const express = require('express');
const multer = require('multer');

const router = express.Router();
const { createPrice, getAllPrices } = require('../controllers/priceController');

const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');
const upload = multer({});

router.post('/create-price', upload.none(), createPrice);
router.get('/prices', getAllPrices);

module.exports = router;
