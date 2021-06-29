var express = require('express');
var router = express.Router();
let passport = require('passport')
const controllers = require('../shortenUrl');
const checkLogin = require('../controllers/login.controller');

router.get('/login', (req, res) => {
    res.render('login');
})
router.get('search', (req, res, next) => {
    console.log(req.query.searchKey);

})
/* GET home page. */
router.post('/login', passport.authenticate('local', {
    successRedirect: '/profile', // chuyển hướng tới trang được bảo vệ
    failureRedirect: '/login',
    // failureFlash: "Đăng nhập không thành công." // allow flash messages
}));
router.get('/table', controllers.pagiTable)
router.get('/profile', function (req, res) {
    res.render('profile', {Url: "Profile"});
});
router.get('/:shortLink', controllers.shortLink)
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});
router.post('/shortenUrl', controllers.createShortUrl)
module.exports = router;
