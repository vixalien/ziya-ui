import Notif from "public/notif.js";

let handlers = (formDates, setDates, RN, setNow, defaultPlaces, setPlaces) => {
	let parseTime = (time) => {
		if (typeof time == "object") {
			return [Object.values(time)[0], Object.keys(time)[0]];
		} else {
			return [defaultPlaces, time];
		}
	};

	let sanitizeTime = (time) => {
		let plainTime = time;
		time = new Date("12/9/12 " + time);
		if (time.toString() == "Invalid Date") return plainTime;
		return (
			time.getHours().toString().padStart(2, "0") +
			":" +
			time.getMinutes().toString().padStart(2, "0")
		);
	};

	let addTime = (date, time, places) => {
		let tempDates = formDates;
		if (tempDates[date]) {
			time = sanitizeTime(time);
			if (places && places != defaultPlaces) time = { [time]: places };
			tempDates[date].push(time);
			tempDates[date].sort();
			setDates(tempDates);
			setNow(Date.now());
			return new Notif(
				"Added time: " +
					parseTime(time)[1] +
					" to: " +
					new Date(parseInt(date)).toDateString()
			);
			return;
		} else {
			return "Date invalid";
		}
	};

	let addDate = (date) => {
		date = parseInt(date);
		let tempDates = formDates;
		if (
			date <
			Date.parse(new Date(new Date(Date.now()).toDateString() + " 00:00"))
		)
			return new Notif("Can't add a date from the past", { error: true });
		let already = false;
		Object.keys(tempDates).forEach((d) => {
			if (Math.abs(date - d) < 86400000) {
				new Notif("Date already added", { error: true });
				already = true;
			}
		});
		if (!already) {
			tempDates[date] = [];
			setDates(Object.fromEntries(Object.entries(tempDates).sort()));
			setNow(Date.now());
			new Notif("Added date: " + new Date(date).toDateString());
			return;
		}
	};

	let removeTime = (date, time) => {
		let tempDates = formDates;
		let timeIndex = tempDates[date].findIndex((e) => parseTime(e)[1] == time);
		if (tempDates[date]) {
			if (timeIndex >= 0) {
				time = sanitizeTime(time);
				tempDates[date] = tempDates[date].filter((_, id) => id != timeIndex);
				setDates(tempDates);
				setNow(Date.now());
				return new Notif(
					"Removed time: " +
						parseTime(time)[1] +
						" from: " +
						new Date(parseInt(date)).toDateString()
				);
			} else {
				return "Time invalid";
			}
		} else {
			return "Date invalid";
		}
	};

	let removeDate = (date) => {
		let tempDates = formDates;
		if (tempDates[date]) {
			delete tempDates[date];
			setDates(tempDates);
			setNow(Date.now());
			return new Notif(
				"Removed date: " + new Date(parseInt(date)).toDateString()
			);
			return;
		} else {
			return "Date invalid";
		}
	};

	let generateForThisWeek = () => {
		let dates = {};
		let now = Date.parse(
			new Date(new Date(Date.now()).toDateString() + " 00:00")
		);
		let afterweek = now + 1000 * 60 * 60 * 24 * 7;
		while (now != afterweek) {
			dates[now] =
				new Date(now).getDay() == 0
					? ["07:00", "10:30", "15:30"]
					: ["06:00", "15:30"];
			now = now + 1000 * 60 * 60 * 24;
		}
		return dates;
	};

	normalize: (dates, places) => {
		return Object.fromEntries(
			Object.entries(dates).map(([date, times]) => [
				date,
				times.map((time) =>
					typeof time == "string" ? { [time]: places } : time
				),
			])
		);
	};

	return {
		handleAddTime: (e) => {
			e.preventDefault();

			let timeInput = e.target.querySelector("input.time");
			let placesInput = e.target.querySelector("input.participants");
			let target = e.target.parentElement;

			let date = target.getAttribute("data-date");
			let time = timeInput.value.trim();
			let places = parseInt(placesInput.value.trim());

			if (time.length < 3 || !time.match(/\b\d{1,2}\:\d{1,2}\b/g)) {
				return new Notif("Time has an invalid format, must be like 13:10", {
					error: true,
				});
			}

			if (!places)
				return new Notif("Number of places seems invalid, must be a number", {
					error: true,
				});

			placesInput.value = placesInput.defaultValue;
			timeInput.value = "";
			timeInput.focus();

			return addTime(date, time, places);
		},

		handleRemoveTime: (e) => {
			e.preventDefault();
			let timeEl = e.target.parentElement;
			let dateEl = timeEl.parentElement;

			let date = dateEl.getAttribute("data-date");
			let time = timeEl.getAttribute("data-time");

			removeTime(date, time);
		},

		handleRemoveDate: (e) => {
			e.preventDefault();

			let date = e.target.getAttribute("data-date");

			removeDate(date);
		},

		handleAddDate: (e) => {
			e.preventDefault();

			let date = Date.parse(
				new Date(e.target.querySelector("input").value + " 00:00")
			);

			if (!date)
				return new Notif("Date is invalid or not present.", { error: true });
			console.log("Adding date: ", date);
			addDate(date);
		},

		handlePlacesSubmit: (e) => {
			e.preventDefault();

			let places = parseInt(
				e.target.querySelector("input#defaultPlaces").value
			);
			let keep = e.target.querySelector("input#keep").checked;

			let tempDates = formDates;
			if (keep) tempDates = normalize(tempDates, defaultPlaces);
			if (!places) {
				new Notif("The places given are invalid", { error: true });
				return;
			}
			setPlaces(places);
			setDates(tempDates);
			setNow(Date.now());
		},

		handleGenerate: (e) => {
			e.preventDefault();

			setDates(generateForThisWeek());
			setNow(Date.now());

			return new Notif("Generated data for this week", { success: true });
		},

		handleFinalSubmit: (e) => {
			e.preventDefault();

			let uploadingNotif = new Notif("Saving...", { timeout: 999999 });
			fetch("/api/save", {
				method: "POST",
				body: JSON.stringify({
					places: defaultPlaces,
					dates: formDates,
				}),
			})
				.then(async (e) => {
					let json = await e.json();
					if (e.ok && json.ok === true) {
						new Notif("Saved!", { success: true });
					} else {
						console.log("Error: ", json);
						new Notif("An unexpected error occured, please try again later.", {
							error: true,
						});
					}
				})
				.catch((e) => {
					console.log("Error: ", e);
					new Notif("Error! are you offline!?", { error: true });
				})
				.then((e) => uploadingNotif.close());
		},
	};
};

export default handlers;
