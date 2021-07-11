const { Router } = require('express');
const jwt = require('jsonwebtoken');
var path = require('path');
const JWT_SECRET = require('../../config');
const Resize = require('../../services/Resize');
const upload = require('../../middleware/uploadMiddleware');

const itemRouter = Router({ mergeParams: true });

const {} = require('../../services/items');

itemRouter
	.get('/index/:accessToken', (req, res) => {
		const token = req.params.accessToken;
		const decode = jwt.verify(token, JWT_SECRET);
		if (decode) {
			if (decode.user.typeUser === 1) {
				res.render('index', {
					layout: 'index_layout.handlebars',
					username: decode.user.username,
					accessToken: token,
				});
			} else {
				res.render('admin', {
					layout: 'admin_layout.handlebars',
					username: decode.user.username,
					accessToken: token,
				});
			}
		} else {
			res.redirect('index');
		}
	})
	.get('/index', (req, res) => {
		res.render('index', { layout: 'index_layout.handlebars' });
	})
	.post('/addItem/:accessToken', upload.single('image'), async (req, res) => {
		const token = req.params.accessToken;
		const decode = jwt.verify(token, JWT_SECRET);
		if (decode) {
			if (decode.user.typeUser === 0) {
				const { nameItem, price } = req.body;
				const imagePath = path.join(__dirname, '../../public/img/Item');
				const fileUpload = new Resize(imagePath, `${nameItem}.png`);
				if (!req.file) {
					res.status(401).json({ error: 'Please provide an image' });
				}
				const filename = await fileUpload.save(req.file.buffer);
				res.redirect(`index/${token}`);
			} else {
				res.send('Just Admin can access to this page');
			}
		} else {
			res.send('AccessToken is required');
		}
	});

module.exports = itemRouter;
