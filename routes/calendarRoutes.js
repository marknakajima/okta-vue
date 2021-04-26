require('dotenv').config();
const express = require('express');
const app = express();
const Events = require('../models/Events');
const Exceptions = require('../models/Exceptions');
const calendarRoutes = express.Router();

const parseISO = require('date-fns/parseISO');
const format = require('date-fns/format');
const startOfMonth = require('date-fns/startOfMonth');
const endOfMonth = require('date-fns/endOfMonth');

/* ============================================================
Events
============================================================ */

calendarRoutes.route('/events/').get(async (req, res) => {
	try {
		let events = await Events.find({});

		// MongoDB saves '\n' as '\\n', replace all occurrences of it back to '\n'
		let eventsStringified = JSON.stringify(events);
		eventsStringified.replace(/(\\n)/g, '\n');
		let eventsFixed = JSON.parse(eventsStringified);

		res.json(eventsFixed);
	} catch (err) {
		res.status(500).send(err);
	}
});

// Add new event
calendarRoutes.route('/events/').post(async (req, res) => {
	let event = { ...req.body };
	try {
		await new Events(event).save();
		res.json(event);
	} catch (err) {
		res.status(500).send(err);
	}
});

// Update an event
calendarRoutes.route('/events/:id').patch(async (req, res) => {
	let event = { ...req.body };
	let { _id: mongoID } = event;

	try {
		let result = await Events.findByIdAndUpdate(mongoID, event, { new: true });
		res.json(result);
	} catch (err) {
		res.status(500).send(err);
	}
});

// Delete an event
calendarRoutes.route('/events/:_id').delete(async (req, res) => {
	// axios.delete uses req.params instead of req.body
	let event = { ...req.params };

	// Use mongo's _id to use in findByIdAndDelete
	let { _id: mongoID } = event;

	try {
		let result = await Events.findOneAndDelete({ _id: mongoID });
		res.json(result);
	} catch (err) {
		res.status(500).send(err);
	}
});

/* ============================================================
Exceptions
============================================================ */
calendarRoutes.route('/exceptions/').get(async (req, res) => {
	try {
		let focus = req.query.focus;
		let firstDayOfMonth = format(startOfMonth(parseISO(focus)), 'yyyy-MM-dd HH:mm');
		let lastDayOfMonth = format(endOfMonth(parseISO(focus)), 'yyyy-MM-dd HH:mm');

		let exceptions = await Exceptions.find({
			start : {
				$gte : firstDayOfMonth,
				$lt  : lastDayOfMonth
			}
		});

		// MongoDB saves '\n' as '\\n', replace all occurrences of it back to '\n'
		let exceptionsStringified = JSON.stringify(exceptions);
		exceptionsStringified.replace(/(\\n)/g, '\n');
		let exceptionsFixed = JSON.parse(exceptionsStringified);

		res.json(exceptionsFixed);
	} catch (err) {
		res.status(500).send(err);
	}
});

// Add new exception
calendarRoutes.route('/exceptions/').post(async (req, res) => {
	let event = { ...req.body };

	// This is necessary to prevent duplicate key error when hitting this endpoint from deleteInstance as it will have an _id
	if (event._id) {
		delete event._id;
	}

	try {
		await new Exceptions(event).save();
		res.json(event);
	} catch (err) {
		res.status(500).send(err);
	}
});

// Patch an exception
calendarRoutes.route('/exceptions/:_id').patch(async (req, res) => {
	let event = { ...req.body };

	// Use mongo's _id to use in findByIdAndUpdate
	let { _id: mongoID } = event;

	try {
		let result = await Exceptions.findByIdAndUpdate(mongoID, event, { new: true });
		res.json(result);
	} catch (err) {
		res.status(500).send(err);
	}
});

// Delete an exception
calendarRoutes.route('/exceptions/:_id').delete(async (req, res) => {
	// axios.delete uses req.params instead of req.body
	let event = { ...req.params };

	// Use mongo's _id to use in findByIdAndDelete
	let { _id: mongoID } = event;

	try {
		let result = await Exceptions.findByIdAndDelete(mongoID);
		res.json(result);
	} catch (err) {
		res.status(500).send(err);
	}
});

module.exports = calendarRoutes;
