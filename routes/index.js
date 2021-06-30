var express = require('express');
var router = express.Router();
let passport = require('passport')
const controllers = require('../shortenUrl');
const checkLogin = require('../controllers/login.controller');
const viewQR = require('../controllers/viewPost.controller')


router.get('/login', controllers.login)

router.get('search', async (req, res, next) => {
    console.log(req.query.searchKey);
    let search = {
        where: {
            post_title: {[db.Op.iLike]: '%' + req.query.searchKey + '%'},
        },
        raw: true
    }
    research = await db.uri.findAll(search);
    res.json(research)
})


/* GET home page. */
// router.post('/login', (req, res) => {
//     console.log(req.body.username);
// })
router.post('/login', passport.authenticate('local', {
    successRedirect: '/profile', // chuyển hướng tới trang được bảo vệ
    failureRedirect: '/login',
    // failureFlash: "Đăng nhập không thành công." // allow flash messages
}));

router.get('/qr/:id', viewQR)
router.get('/table/:page',checkLogin.isLogged, controllers.pagiTable)
router.get('/table',checkLogin.isLogged, controllers.pagiTable)
router.get('/profile',checkLogin.isLogged, controllers.profile);
router.get('/logout', checkLogin.isLogout , (req, res) => {
    res.redirect('/');
})
router.get('/:shortLink', controllers.shortLink)
router.get('/', controllers.index);

router.post('/shortenUrl', controllers.createShortUrl)
module.exports = router;
