(function() {
	'use strict';
	const express = require('express');
	const router = express.Router();
	const Prices = require('../models/prices.model');
	router.route('/').get(_get).post(_post);
	router.route('/:id').get(_getOne).put(_put).delete(_delete);

	async function _get(req, res) {
		if (req.query.info) {
			try {
				return res.json(await Prices.find({}, {
					_id: 0,
					title: 1,
					price: 1,
				}));
			}
			catch (err) {
				res.sendStatus(500);
				handleErr(err);
			}
		}
		try {
			return res.json(await Prices.find({}));
		}
		catch (err) {
			res.sendStatus(500);
			handleErr(err);
		}
	};
	async function _post(req, res) {
		try {
			const data = await new Prices(req.body).save();
			if (data) {
				return res.json(data);
			}
			return res.sendStatus(500);
		}
		catch (err) {
			res.sendStatus(500);
			handleErr(err);
		}
	};
	async function _getOne(req, res) {
		try {
			const data = await Prices.findOne({ _id: req.params.id });
			if (data) {
				return res.json(data);
			}
			return res.sendStatus(404);
		}
		catch (err) {
			res.sendStatus(500);
			handleErr(err);
		}
	};

	async function _put(req, res) {
		try {
			const { ok } = await Prices.update({ _id: req.params.id }, { $set: req.body });
			return res.sendStatus(ok === 1 ? 200 : 500);
		}
		catch (err) {
			res.sendStatus(500);
			handleErr(err);
		}
	};

	async function _delete(req, res) {
		try {
			await Prices.remove({ _id: req.params.id });
			return res.sendStatus(200);
		}
		catch (err) {
			res.sendStatus(500);
			handleErr(err);
		}
	};
	module.exports = router;

	function handleErr(err) {
		console.log(err);
	}
})();
