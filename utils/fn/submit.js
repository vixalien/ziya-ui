import getRawBody from "raw-body";
import { checkAll } from "lib/validate";

import { save, increment } from "./db";

let isPresent = (obj) => !!Object.entries(obj).length;

let submit = async (req, defaults) => {
	let messages = [],
		errors = [];
	const body = await getRawBody(req);
	let form = {
		...defaults,
		...Object.fromEntries(new URLSearchParams(body.toString()).entries()),
	};

	let select = (obj, whitelist) => {
		let tempObj = Object.assign({}, obj);
		Object.keys(tempObj).forEach((key) => {
			if (!whitelist.includes(key) || !tempObj[key]) delete tempObj[key];
		});
		return tempObj;
	};

	let data = select(form, [
		"names",
		"email",
		"phone",
		"gender",
		"country",
		"specific_country",
		"province",
		"district",
		"sector",
	]);

	let noPeople = parseInt(form["noPeople"]);

	let formErrors = checkAll(form) || {};

	if (isPresent(formErrors)) {
		errors.push("Check for errors then try again");
	} else {
		// Push the data into DB
		await save(data)
			.catch((e) => {
				errors.push(
					"An error occured while creating your account!: " + e.toString()
				);
				throw e;
			})
			.then(() => {
				return increment(form.date, form.time, noPeople).catch((e) => {
					errors.push("Check for errors then try again");
					formErrors["noPeople"] = e.toString();
					throw e;
				});
			})
			.then(() => messages.push("Successfully registered as attendee!"))
			.catch();
	}
	return {
		errors: formErrors,
		defaults: isPresent(formErrors) ? form : {},
		messages,
		errorMessages: errors,
	};
};

export default submit;
