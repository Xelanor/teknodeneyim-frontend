const router = require('express').Router();
const mailer = require('../utils/Mailer')
let Report = require('../models/report');

router.route('/new-report').post((req, res) => {
  const { reporter, reported, comment } = req.body
  const newReport = new Report({ reporter, reported, comment });

  newReport.save()
    .then(() => mailer.send({
      to: "berkeozelsel@gmail.com",
      from: 'info@teknodeneyim.com',
      subject: 'TeknoDeneyim Şifre Sıfırlama',
      text: `Rapor Geldi`
    }))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
