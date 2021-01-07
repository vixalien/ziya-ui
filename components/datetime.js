import { Select } from "components/form-input";

import { useState, useEffect, useMemo } from "react";

let DateInput = ({ Dates, setDate, value, error }) => {
	let dates = Object.fromEntries(
			Object.keys(Dates).map((date) => [
				new Date(parseInt(date)).toDateString(),
				date,
			])
		);
	return <Select
		name="Date"
		autoComplete="off"
		defaultValue={value}
		error={error}
		options={dates}
		onChange={e => setDate(e.target.value)}
	/>
}

let TimeInput = ({ times, value, error }) => (
	<Select
		name="Time"
		autoComplete="off"
		defaultValue={value}
		error={error}
		options={times}
	/>
)

let DateTimeInputs = ({ dates: Dates, errors = {}, values = {} }) => {
	let parseTime = (time) => {
		if (typeof time == "object") {
			return Object.keys(time)[0];
		} else {
			return time;
		}
	};

	let generateTimes = (date) => {
		if (!date) {
			return {};
		} else {
			return Object.fromEntries(
				Dates[date].map((time, id) => [parseTime(time), parseTime(time)])
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
			<DateInput Dates={Dates} setDate={setDate} value={values.date} error={errors.date}/>
			<TimeInput times={times} value={values.time} error={errors.time}/>
		</div>
	);
};

export default DateTimeInputs;
