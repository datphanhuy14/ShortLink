const db = require('../db')

let viewQr = async (req, res, next) => {
    let id = req.params.id || 1;
    let qrCode = await db.uri.findByPk(id);
    res.render('qr', {
        data: qrCode,
    });
}
module.exports = viewQr;