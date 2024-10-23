const ensureAuthenticated = require('../Middleware/Auth');

const router = require('express').Router();

router.get('/', ensureAuthenticated, (req, res) => {
    res.status(200).json({
        products: [
            {
                name: "mobile",
                price: 10000
            },
            {
                name: "tv",
                price: 20000
            }
        ], success: true
    });
});

module.exports = router;