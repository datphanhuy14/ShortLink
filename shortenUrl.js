const db = require('./db');
var {nanoid} = require('nanoid')
let createShortUrl = async (req, res) => {
    let full_link = req.body.fullUrl;
    let short_link = nanoid(7);
    let custom_link = req.body.customLink
    let newdb = await db.uri.create({
        full_link,
        short_link,
        custom_link
    }, {raw: true});
    res.json(newdb)
};
let pagiTable = async function (req, res) {
    let limitPagi = 10;
    let page = req.params.table || 1;
    let showTable = await db.uri.findAndCountAll({
        offset: (page - 1) * limitPagi,
        limit: limitPagi,
        raw: true,
        order: [
            ['id', 'DESC']
        ]
    });
    let countpage = Math.ceil(showTable.count / limitPagi)
    res.render('table', {pages: countpage, data: showTable.rows, Url: "Table", current: page});
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
module.exports = {
    createShortUrl, pagiTable, shortLink
}
