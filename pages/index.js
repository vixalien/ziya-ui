import Head from "next/head";
import { useState } from "react";
import withErrors from "components/withErrors";

import Input, { Select } from "components/form-input";

import DateTime from "components/datetime";
import Location from "components/places";

import submit from "utils/fn/submit";

import { checkAll } from "lib/validate";

import { Messages, Errors, SubmitButton } from "components/index";

export default function Home({
	dates,
	errors: defaultErrors,
	messages,
	errorMessages,
	defaults,
	...props
}) {
	let [errors, setErrors] = useState(defaultErrors);

	let toObject = (array) => Object.fromEntries(array.map((el) => [el, el]));

	let handleSubmit = (event) => {
		// freeze and prevent Defaults for event
		event = event.nativeEvent;

		let newErrors = checkAll(validate.collectFormValues(event.target));

		setErrors(newErrors);

		let invalid = false;
		Object.entries(newErrors).forEach(([value, key]) => {
			if (key) invalid = true;
		});

		if (invalid) event.preventDefault();
		console.log("is form invalid?: ", invalid);

		return !!newErrors;
	};

	return (
		<main className="container">
			<Head>
				<title>Kibeho Sanctuary</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<h1>Kibeho Sanctuary</h1>
			<h2>Register as attendee</h2>
			<Messages messages={messages} />
			<Errors errors={errorMessages} />
			<form onSubmit={handleSubmit} method="POST">
				<h3>Date & Time</h3>
				<DateTime dates={dates} values={defaults} errors={errors} />
				<h3>Personal Information</h3>
				<Input
					name="Names"
					error={errors.names}
					defaultValue={defaults.names}
					autoComplete="name"
				/>
				<Input
					name="Email"
					type="email"
					error={errors.email}
					defaultValue={defaults.email}
					autoComplete="email"
				/>
				<Input
					name="Phone"
					type="tel"
					error={errors.phone}
					defaultValue={defaults.phone}
					autoComplete="tel"
				/>
				<Select
					name="Gender"
					error={errors.gender}
					defaultValue={defaults.gender}
					options={toObject(["Male", "Female", "Other", "Unspecific"])}
					autoComplete="sex"
				/>
				<Input
					name="Total number of people"
					id="noPeople"
					type="number"
					min={1}
					max={10}
					error={errors.noPeople}
					defaultValue={defaults.noPeople}
					autoComplete="off"
				/>
				<h3>Location details</h3>
				<Location defaults={defaults} errors={errors} />
				<SubmitButton text="Register" />
			</form>
		</main>
	);
}

export async function getServerSideProps({ req }) {
	return await submit(req);
}
