import { Select } from "./input";

import { useState, useEffect } from "react";

let DateTimeInputs = ({ dates: Dates, places, errors = {}, values = {} }) => {
	let generateDates = () => {
		return Object.fromEntries(
			Object.keys(Dates).map((date) => [
				new Date(parseInt(date)).toDateString(),
				date,
			])
		);
	};

	let parseTime = (time) => {
		if (typeof time == "object") {
			return [Object.values(time)[0], Object.keys(time)[0]];
		} else {
			return [places, time];
		}
	};

	let generateTimes = (date) => {
		if (!date) {
			return {};
		} else {
			return Object.fromEntries(
				Dates[date].map((time, id) => [parseTime(time)[1], parseTime(time)[1]])
			);
		}
	};

	let [selectedDate, setDate] = useState("");
	let [times, setTimes] = useState({});

	useEffect(() => {
		setTimes(generateTimes(selectedDate));
	}, [selectedDate]);

	return (
		<div>
			<Select
				name="Date"
				autoComplete="off"
				defaultValue={values.date}
				error={errors.date}
				options={generateDates()}
				onChange={(e) => {
					setDate(e.target.value);
				}}
			/>
			<Select
				name="Time"
				autoComplete="off"
				defaultValue={values.time}
				error={errors.time}
				options={times}
			/>
		</div>
	);
};

export default DateTimeInputs;
