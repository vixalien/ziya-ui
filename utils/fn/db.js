import PouchDB from "pouchdb";
import Mango from "pouchdb-find";
PouchDB.plugin(Mango);

import loadConfig from "./loadConfig";

import variables from "lib/variables";

let db = new PouchDB(variables.dbs.reservations);
let numbersDB = new PouchDB(variables.dbs.numbers);

// make sure the tables exists
db.info();
numbersDB.info();

let getReservation = async (id) => {
	return await db.get(id);
};

let getNextId = async () => {
	return await db.info()
		.then(({ doc_count }) => {
			if (doc_count > 0) {
				return db
					.allDocs({ descending: true, limit: 1 })
					.then((data) => (parseInt(data.rows[0].id) + 1).toString());
			} else {
				return "0";
			}
		})
		.then(id => id.padStart(8, "0"))
		;
};

let save = async (data) => {
	return await db.put({
		_id: await getNextId(),
		...data,
		timeRegistered: Date.now(),
	});
};

let parseTime = (time, defaultPlaces) => {
	if (typeof time == "object") {
		return [Object.values(time)[0], Object.keys(time)[0]];
	} else {
		return [defaultPlaces, time];
	}
};

let maxPlaces = async (date, time) => {
	return await loadConfig().then(({ places, dates }) => {
		if (!dates[date]) throw new Error("The date selected is invalid!");
		let id = dates[date].findIndex((e) => parseTime(e)[1] == time);
		if (id < 0) throw new Error("The time selected is invalid!");
		return parseTime(dates[date][id], places)[0];
	});
};

let getDate = async (id) => {
	id = id.toString();
	return await numbersDB
		.get(id)
		.catch(async () => {
			return await numbersDB
				.put({
					_id: id,
					times: {},
				})
				.then(() => numbersDB.get(id));
		})
		.then((e) => e);
};

let updateDate = async (id, value) => {
	return await getDate(id).then(async (date) => {
		return await numbersDB
			.put({
				_id: id,
				_rev: date._rev,
				times: value,
			})
			.then(() => numbersDB.get(id));
	});
};

let increment = async (date, time, by = 1) => {
	let current = await currentPlaces(date, time);
	if (current + by >= (await maxPlaces(date, time))) {
		let placesLeft = (await maxPlaces(date, time)) - current;
		throw new Error(
			"The place selected is already full!" +
				(placesLeft ? " only " + placesLeft + " places left" : "")
		);
	}
	return await getDate(date).then(async (date) => {
		return await updateDate(date._id, { ...date.times, [time]: current + by });
	});
};

let currentPlaces = async (date, time) => {
	// Just verify date & time
	maxPlaces(date, time);
	return await getDate(date).then(({ times }) => {
		return times[time] || 0;
	});
};

let allReservations = async (date = null, time = null, opts = {}) => {
	let dateOpts = {};
	return db.find({
	  selector: {
	    _id: {'$exists': true},
	    ...dateOpts,
	    ...opts
	  },
	  sort: [{_id: 'desc'}]
	});
}

export { getNextId, save, increment, getReservation, allReservations };
