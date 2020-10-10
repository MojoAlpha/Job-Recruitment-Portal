var express = require('express')
var bodyParser = require('body-parser');
const { isSignedIn, isVerified } = require('../middleware');
var { companyDetails, chngCompanyLogo } = require('../controllers/company');
const { companyLogoStore } = require('../config/multerStore');

var companyRouter = express.Router();
companyRouter.use(bodyParser.json());

companyRouter.get('/me', isSignedIn, isVerified, companyDetails)

companyRouter.put('/me/logo/edit', isSignedIn, isVerified, companyLogoStore.single('logo'), chngCompanyLogo);

module.exports = companyRouter;