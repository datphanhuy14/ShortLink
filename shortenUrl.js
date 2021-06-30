const db = require('./db');
var {nanoid} = require('nanoid')
const QRCode = require('qrcode')


let createShortUrl = async (req, res) => {
    let full_link = req.body.fullUrl;
    let qr_code = await qrCreate(full_link);
    console.log(qr_code);
    let short_link = nanoid(7);
    let custom_link = req.body.customLink
    let newdb = await db.uri.create({
        qr_code,
        full_link,
        short_link,
        custom_link
    }, {raw: true});
    res.json(newdb)
};
let pagiTable = async function (req, res) {
    let limitPagi = 10;
    let page = req.params.page || 1;
    let showTable = await db.uri.findAndCountAll({
        offset: (page - 1) * limitPagi,
        limit: limitPagi,
        raw: true,
        order: [
            ['id', 'DESC']
        ]
    });
    let countpage = Math.ceil(showTable.count / limitPagi)
    // res.json(showTable)
    res.render('table', {pages: countpage, data: showTable.rows, Url: "Table", current: page ,user :req.user});
};

let shortLink = async (req, res) => {
    let shortLink = req.params.shortLink;
    // console.log(shortLink);
    let rdrLink = await db.uri.findOne(
        {
            where: {
                short_link: shortLink
            }
        }
    )
    // console.log(rdrLink.full_link)
    if (!rdrLink)
        console.log("err")
    else res.render('redirect', {data: rdrLink.full_link});
}
let qrCreate = async text => {
    try {
        let qr = await QRCode.toDataURL(text)
        return qr;
    } catch (err) {
        console.log(err)
    }
}
let profile = function (req, res) {
    res.render('profile', {Url: "Profile" ,user : req.user});
}
let index = function (req, res, next) {
    console.log(req.user);
    res.render('index', {user : req.user});
}
let login = (req, res) => {
    res.render('login')
}
module.exports = {
    createShortUrl, pagiTable, shortLink, qrCreate,index,login,profile
}
